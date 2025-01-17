import React, { useState } from 'react';
import { Form, Input, Modal, Select, InputNumber, Row, Col, TreeSelect, Space } from 'antd';
import type { TreeSelectProps } from 'antd/es/tree-select';
import * as Icons from '@ant-design/icons';
import IconSelect from '@/components/IconSelect';
import type { MenuItem } from '@/types/menu';

interface MenuFormProps {
  open: boolean;
  onCancel: () => void;
  onOk: (values: any) => void;
  menuList: MenuItem[];
  editingMenu?: MenuItem;
}

const MenuForm: React.FC<MenuFormProps> = ({
  open,
  onCancel,
  onOk,
  menuList = [],
  editingMenu,
}) => {
  const [form] = Form.useForm();
  const [menuType, setMenuType] = useState<number>(0);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onOk(values);
      form.resetFields();
    } catch (error) {
      console.error('Validate Failed:', error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  const handleTypeChange = (value: number) => {
    setMenuType(value);
    // 清空不需要的字段
    if (value === 3) { // 按钮类型
      form.setFieldsValue({
        icon: undefined,
        path: undefined,
      });
    }
  };

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

  const convertToTreeData = (menus: MenuItem[]): TreeSelectProps['treeData'] => {
    return menus.map(menu => ({
      value: menu.id,
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

  return (
    <Modal
      title={editingMenu ? '编辑菜单' : '新增菜单'}
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          parent_id: 0,
          type: 0,
          sort: 1,
          status: 0,
          ...editingMenu,
        }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="parent_id"
              label="上级菜单"
            >
              <TreeSelect
                treeData={convertToTreeData(menuList)}
                placeholder="请选择上级菜单"
                allowClear
                treeDefaultExpandAll
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="type"
              label="菜单类型"
              rules={[{ required: true, message: '请选择菜单类型' }]}
            >
              <Select onChange={handleTypeChange}>
                <Select.Option value={0}>目录</Select.Option>
                <Select.Option value={1}>菜单</Select.Option>
                <Select.Option value={2}>tab页</Select.Option>
                <Select.Option value={3}>按钮</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="菜单名称"
              rules={[
                { required: true, message: '请输入菜单名称' },
                { max: 50, message: '菜单名称最多50个字符' }
              ]}
            >
              <Input placeholder="请输入菜单名称" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="sort"
              label="排序值"
              rules={[{ required: true, message: '请输入排序值' }]}
            >
              <InputNumber min={0} max={9999} placeholder="请输入排序值" style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>

        {menuType !== 3 && (
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="path"
                label="菜单路径"
                rules={[
                  { required: true, message: '请输入菜单路径' },
                  { pattern: /^\//, message: '路径必须以/开头' },
                  { max: 100, message: '路径最多100个字符' }
                ]}
              >
                <Input placeholder="请输入菜单路径，以/开头" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="icon"
                label="菜单图标"
                rules={[{ required: menuType === 0, message: '目录类型必须选择图标' }]}
              >
                <IconSelect />
              </Form.Item>
            </Col>
          </Row>
        )}

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="status"
              label="状态"
              rules={[{ required: true, message: '请选择状态' }]}
            >
              <Select>
                <Select.Option value={0}>正常</Select.Option>
                <Select.Option value={1}>禁用</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default MenuForm; 