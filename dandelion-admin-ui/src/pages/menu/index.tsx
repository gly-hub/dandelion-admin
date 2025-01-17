import React, { useState, useEffect } from 'react';
import { Layout, Tree, Button, Space, Empty, Card, message } from 'antd';
import type { DataNode, TreeProps } from 'antd/es/tree';
import { PlusOutlined } from '@ant-design/icons';
import * as Icons from '@ant-design/icons';
import type { MenuItem } from '@/types/menu';
import { getMenuList, addMenu, updateMenu, deleteMenu, sortMenus } from '@/api/menu';
import MenuForm from './components/MenuForm';
import './index.css';

const { Sider, Content } = Layout;

const Menu = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editingMenu, setEditingMenu] = useState<MenuItem | undefined>();
  const [menuList, setMenuList] = useState<MenuItem[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<MenuItem | undefined>();
  const [loading, setLoading] = useState(false);

  const fetchMenuList = async () => {
    try {
      setLoading(true);
      const res = await getMenuList();
      const list = res.data?.list || [];
      setMenuList(list);
      // 默认选中第一个菜单
      if (list.length > 0 && !selectedMenu) {
        setSelectedMenu(list[0]);
      }
    } catch (error) {
      console.error('获取菜单列表失败:', error);
      message.error('获取菜单列表失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuList();
  }, []);

  const renderIcon = (iconName: string) => {
    const IconComponent = Icons[`${iconName}Outlined` as keyof typeof Icons] as React.ComponentType;
    return IconComponent ? React.createElement(IconComponent) : null;
  };

  const getMenuTypeTag = (type: number) => {
    const typeConfig = {
      0: { text: 'D', className: 'menu-type-dir' },      // Directory
      1: { text: 'M', className: 'menu-type-menu' },     // Menu
      2: { text: 'T', className: 'menu-type-tab' },      // Tab
      3: { text: 'B', className: 'menu-type-button' },   // Button
    }[type] || { text: '-', className: '' };

    return (
      <span className={`menu-type-tag ${typeConfig.className}`}>
        {typeConfig.text}
      </span>
    );
  };

  const convertToTreeData = (menus: MenuItem[]): DataNode[] => {
    return menus.map(menu => ({
      key: menu.id,
      title: (
        <Space>
          {getMenuTypeTag(menu.type)}
          {menu.icon && menu.type !== 3 && renderIcon(menu.icon)}
          <span>{menu.name}</span>
        </Space>
      ),
      children: menu.children?.length ? convertToTreeData(menu.children) : undefined,
    }));
  };

  const handleAdd = (parent?: MenuItem) => {
    setEditingMenu(undefined);
    setModalVisible(true);
  };

  const handleEdit = (menu: MenuItem) => {
    setEditingMenu(menu);
    setModalVisible(true);
  };

  const handleDelete = async (menu: MenuItem) => {
    try {
      await deleteMenu(menu);
      message.success('删除成功');
      fetchMenuList();
      if (selectedMenu?.id === menu.id) {
        setSelectedMenu(undefined);
      }
    } catch (error) {
      console.error('删除菜单失败:', error);
      message.error('删除菜单失败');
    }
  };

  const handleSave = async (values: MenuItem) => {
    try {
      if (editingMenu) {
        await updateMenu({
          ...values,
          id: editingMenu.id
        });
        message.success('编辑成功');
      } else {
        await addMenu(values);
        message.success('添加成功');
      }
      setModalVisible(false);
      fetchMenuList();
    } catch (error) {
      console.error('保存菜单失败:', error);
      message.error('保存菜单失败');
    }
  };

  const handleSelect = (selectedKeys: React.Key[]) => {
    if (selectedKeys.length > 0) {
      const menu = findMenuById(menuList, selectedKeys[0].toString());
      if (menu) {
        setSelectedMenu(menu);
      }
    }
  };

  const findMenuById = (menus: MenuItem[], id: string): MenuItem | undefined => {
    for (const menu of menus) {
      if (menu.id.toString() === id) {
        return menu;
      }
      if (menu.children?.length) {
        const found = findMenuById(menu.children, id);
        if (found) {
          return found;
        }
      }
    }
    return undefined;
  };

  const getMenuTypeText = (type: number) => {
    const typeMap: Record<number, string> = {
      0: '目录',
      1: '菜单',
      2: 'tab页',
      3: '按钮',
    };
    return typeMap[type] || '未知';
  };

  const handleDrop: TreeProps['onDrop'] = async (info) => {
    const dropKey = info.node.key as number;
    const dragKey = info.dragNode.key as number;
    const dropPos = info.node.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (
      data: MenuItem[],
      key: number,
      callback: (item: MenuItem, index: number, arr: MenuItem[]) => void
    ) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === key) {
          callback(data[i], i, data);
          return;
        }
        if (data[i].children) {
          loop(data[i].children!, key, callback);
        }
      }
    };

    // 收集所有需要更新序号的菜单项
    const collectSortItems = (menus: MenuItem[], parentId: number = 0): { id: number; sequence: number; parent_id: number }[] => {
      return menus.reduce((acc: { id: number; sequence: number; parent_id: number }[], menu, index) => {
        // 当前菜单的排序数据
        acc.push({
          id: menu.id,
          sequence: index + 1,
          parent_id: parentId
        });
        
        // 如果有子菜单，递归收集子菜单的排序数据
        if (menu.children && menu.children.length > 0) {
          acc.push(...collectSortItems(menu.children, menu.id));
        }
        
        return acc;
      }, []);
    };

    const data = [...menuList];
    let dragItem: MenuItem | null = null;

    // 找到拖动的节点
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragItem = item;
    });

    if (!dragItem) return;

    if (!info.dropToGap) {
      // 放到目标节点内部
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        dragItem!.parent_id = item.id;
        item.children.push(dragItem!);
      });
    } else if (dropPosition === -1) {
      // 放到目标节点前面
      loop(data, dropKey, (item, index, arr) => {
        dragItem!.parent_id = item.parent_id || 0;
        arr.splice(index, 0, dragItem!);
      });
    } else {
      // 放到目标节点后面
      loop(data, dropKey, (item, index, arr) => {
        dragItem!.parent_id = item.parent_id || 0;
        arr.splice(index + 1, 0, dragItem!);
      });
    }

    // 收集所有菜单的排序数据
    const sortItems = collectSortItems(data);

    try {
      await sortMenus(sortItems);
      message.success('排序更新成功');
      fetchMenuList(); // 重新获取菜单列表
    } catch (error) {
      console.error('更新排序失败:', error);
      message.error('更新排序失败');
    }
  };

  return (
    <Layout className="menu-layout">
      <Sider width={300} className="menu-sider">
        <div className="menu-sider-header">
          <Button type="primary" icon={<PlusOutlined />} onClick={() => handleAdd()}>
            新增菜单
          </Button>
        </div>
        <Tree
          className="menu-tree"
          treeData={convertToTreeData(menuList)}
          selectedKeys={selectedMenu ? [selectedMenu.id.toString()] : []}
          onSelect={handleSelect}
          draggable
          blockNode
          onDrop={handleDrop}
        />
      </Sider>
      <Content className="menu-content">
        {selectedMenu ? (
          <Card
            title="菜单详情"
            extra={
              <Space>
                <Button type="primary" onClick={() => handleAdd()}>添加子菜单</Button>
                <Button onClick={() => handleEdit(selectedMenu)}>编辑</Button>
                <Button danger onClick={() => handleDelete(selectedMenu)}>删除</Button>
              </Space>
            }
          >
            <div className="menu-detail">
              <div className="menu-detail-item">
                <label>名称：</label>
                <span>{selectedMenu.name}</span>
              </div>
              <div className="menu-detail-item">
                <label>类型：</label>
                <span>{getMenuTypeText(selectedMenu.type)}</span>
              </div>
              <div className="menu-detail-item">
                <label>路径：</label>
                <span>{selectedMenu.path || '-'}</span>
              </div>
              {selectedMenu.type !== 3 && (
                <div className="menu-detail-item">
                  <label>图标：</label>
                  <span>{selectedMenu.icon && renderIcon(selectedMenu.icon)}</span>
                </div>
              )}
              <div className="menu-detail-item">
                <label>排序：</label>
                <span>{selectedMenu.sort || '-'}</span>
              </div>
              <div className="menu-detail-item">
                <label>状态：</label>
                <span>{selectedMenu.status === 0 ? '正常' : '禁用'}</span>
              </div>
            </div>
          </Card>
        ) : (
          <Empty description="请选择一个菜单" />
        )}
      </Content>
      <MenuForm
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setEditingMenu(undefined);
        }}
        onOk={handleSave}
        menuList={menuList}
        editingMenu={editingMenu}
      />
    </Layout>
  );
};

export default Menu; 