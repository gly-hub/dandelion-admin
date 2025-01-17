import { useEffect, useState } from 'react';
import { Form, Input, Select, TreeSelect } from 'antd';
import type { FormInstance } from 'antd/es/form';
import type { DefaultOptionType } from 'antd/es/select';
import { UserStatus } from '@/api/types';
import { getMenuList } from '@/api/menu';
import type { MenuItemResponse, RoleListItem } from '@/api/types';

interface UpdateRoleFormProps {
  form: FormInstance;
  initialValues: RoleListItem;
}

const UpdateRoleForm: React.FC<UpdateRoleFormProps> = ({ form, initialValues }) => {
  const [menuLoading, setMenuLoading] = useState(false);
  const [menuTree, setMenuTree] = useState<DefaultOptionType[]>([]);
  const [menuMap, setMenuMap] = useState<Map<number, MenuItemResponse>>(new Map());

  const statusOptions = [
    { label: '正常', value: UserStatus.NORMAL },
    { label: '禁用', value: UserStatus.DISABLED }
  ];

  // 构建菜单ID映射
  const buildMenuMap = (menuList: MenuItemResponse[]) => {
    const map = new Map<number, MenuItemResponse>();
    const traverse = (list: MenuItemResponse[]) => {
      list.forEach(menu => {
        map.set(menu.id, menu);
        if (menu.children?.length) {
          traverse(menu.children);
        }
      });
    };
    traverse(menuList);
    return map;
  };

  // 将菜单列表转换为TreeSelect所需的数据结构
  const convertToTreeData = (menuList: MenuItemResponse[]): DefaultOptionType[] => {
    return menuList.map(menu => ({
      title: menu.name,
      value: menu.id,
      key: menu.id,
      disabled: menu.status === 2,
      children: menu.children ? convertToTreeData(menu.children) : undefined,
      label: (
        <span>
          {menu.icon && <i className={menu.icon} style={{ marginRight: 8 }} />}
          {menu.name}
          <span style={{ marginLeft: 8, fontSize: 12, color: '#999' }}>
            ({menu.type === 0 ? '菜单' : 
              menu.type === 1 ? '页面' : 
              menu.type === 2 ? '标签页' : '按钮'})
          </span>
        </span>
      )
    }));
  };

  // 获取所有父节点ID
  const getParentIds = (menuId: number): number[] => {
    const parentIds: number[] = [];
    let currentMenu = menuMap.get(menuId);
    
    while (currentMenu && currentMenu.parent_id !== 0) {
      parentIds.push(currentMenu.parent_id);
      currentMenu = menuMap.get(currentMenu.parent_id);
    }
    
    return parentIds;
  };

  // 处理菜单选择变化
  const handleMenuChange = (value: number[]) => {
    // 获取所有选中节点的父节点ID
    const parentIds = value.reduce((acc: number[], menuId) => {
      const parents = getParentIds(menuId);
      return [...acc, ...parents];
    }, []);

    // 合并选中的ID和父节点ID，去重
    const allSelectedIds = Array.from(new Set([...value, ...parentIds]));
    
    form.setFieldValue('menu_ids', allSelectedIds);
  };

  // 加载菜单数据
  const loadMenuData = async () => {
    setMenuLoading(true);
    try {
      const { data } = await getMenuList();
      const map = buildMenuMap(data.list);
      setMenuMap(map);
      setMenuTree(convertToTreeData(data.list));
    } finally {
      setMenuLoading(false);
    }
  };

  useEffect(() => {
    loadMenuData();
    // 设置初始值
    form.setFieldsValue({
      ...initialValues,
      menu_ids: initialValues.menu_ids
    });
  }, [initialValues]);

  return (
    <Form
      form={form}
      layout="vertical"
    >
      <Form.Item
        name="name"
        label="角色名称"
        rules={[{ required: true, message: '请输入角色名称' }]}
      >
        <Input placeholder="请输入角色名称" />
      </Form.Item>

      <Form.Item
        name="description"
        label="角色描述"
        rules={[{ required: true, message: '请输入角色描述' }]}
      >
        <Input.TextArea 
          rows={4}
          placeholder="请输入角色描述" 
        />
      </Form.Item>

      <Form.Item
        name="menu_ids"
        label="菜单权限"
        rules={[{ required: true, message: '请选择菜单权限' }]}
      >
        <TreeSelect
          treeData={menuTree}
          loading={menuLoading}
          treeCheckable
          showCheckedStrategy={TreeSelect.SHOW_ALL}
          placeholder="请选择菜单权限"
          style={{ width: '100%' }}
          maxTagCount={3}
          showSearch
          treeNodeFilterProp="title"
          allowClear
          onChange={handleMenuChange}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        />
      </Form.Item>

      <Form.Item
        name="status"
        label="状态"
      >
        <Select options={statusOptions} />
      </Form.Item>
    </Form>
  );
};

export default UpdateRoleForm; 