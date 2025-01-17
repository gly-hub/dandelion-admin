import { useState, useEffect } from 'react';
import { Table, Input, Select, Space, Button, Form, Modal, message, Switch } from 'antd';
import type { TablePaginationConfig } from 'antd/es/table';
import { getUserList, createUser, updateUser, deleteUser } from '@/api/user';
import type { UserListItem, UserSearchParams } from '@/api/types';
import { UserStatus } from '@/api/types';
import styles from './index.module.css';
import CreateUserForm from './components/CreateUserForm';
import UpdateUserForm from './components/UpdateUserForm';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const UserList: React.FC = () => {
  const [form] = Form.useForm();
  const [createForm] = Form.useForm();
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editForm] = Form.useForm();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserListItem>();
  
  // 查询参数
  const [searchParams, setSearchParams] = useState<UserSearchParams>({
    page: 1,
    page_size: 10
  });
  
  // 表格数据
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<UserListItem[]>([]);
  const [total, setTotal] = useState(0);

  // 状态选项
  const statusOptions = [
    { label: '正常', value: UserStatus.NORMAL },
    { label: '禁用', value: UserStatus.DISABLED },
  ];

  // 处理状态更新
  const handleStatusChange = async (checked: boolean, record: UserListItem) => {
    try {
      await updateUser({
        id: record.id,
        status: checked ? UserStatus.NORMAL : UserStatus.DISABLED,
        nick_name: record.nick_name,
        phone: record.phone,
      });
      message.success('状态更新成功');
      loadData();
    } catch (error) {
      message.error('状态更新失败');
      // 更新失败时回滚UI状态
      loadData();
    }
  };

  // 表格列定义
  const columns = [
    {
      title: '用户名',
      dataIndex: 'user_name',
    },
    {
      title: '昵称',
      dataIndex: 'nick_name',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (status: number, record: UserListItem) => (
        <Switch
          checked={status === UserStatus.NORMAL}
          checkedChildren="正常"
          unCheckedChildren="禁用"
          onChange={(checked) => handleStatusChange(checked, record)}
        />
      )
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      render: (time: number) => new Date(time * 1000).toLocaleString()
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record: UserListItem) => (
        <Space>
          <Button 
            type="link" 
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Button 
            type="link" 
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          >
            删除
          </Button>
        </Space>
      )
    }
  ];

  // 加载数据
  const loadData = async () => {
    setLoading(true);
    try {
      const res = await getUserList(searchParams);
      setDataSource(res.list);
      setTotal(res.total);
    } finally {
      setLoading(false);
    }
  };

  // 分页变化
  const handleTableChange = (pagination: TablePaginationConfig) => {
    setSearchParams(prev => ({
      ...prev,
      page: pagination.current || 1,
      page_size: pagination.pageSize || 10
    }));
  };

  // 统一的查询处理
  const handleSearch = () => {
    const values = form.getFieldsValue();
    setSearchParams(prev => ({
      ...prev,
      ...values,
      page: 1
    }));
  };

  // 重置查询
  const handleReset = () => {
    form.resetFields();
    setSearchParams({
      page: 1,
      page_size: 10
    });
  };

  // 监听参数变化重新加载
  useEffect(() => {
    loadData();
  }, [searchParams]);

  // 处理创建用户
  const handleCreate = async () => {
    try {
      const values = await createForm.validateFields();
      await createUser(values);
      message.success('创建成功');
      setCreateModalVisible(false);
      createForm.resetFields();
      loadData(); // 重新加载列表
    } catch (error) {
      // 表单校验失败不需要处理
      if (error.errorFields) return;
      message.error('创建失败');
    }
  };

  // 处理编辑
  const handleEdit = (record: UserListItem) => {
    setCurrentUser(record);
    editForm.setFieldsValue(record);
    setEditModalVisible(true);
  };

  // 处理更新
  const handleUpdate = async () => {
    try {
      const values = await editForm.validateFields();
      await updateUser({
        id: currentUser!.id,
        ...values
      });
      message.success('更新成功');
      setEditModalVisible(false);
      loadData();
    } catch (error) {
      if (error.errorFields) return;
      message.error('更新失败');
    }
  };

  // 处理删除
  const handleDelete = (record: UserListItem) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除用户 ${record.nick_name} 吗？`,
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk: async () => {
        try {
          await deleteUser(record.id);
          message.success('删除成功');
          loadData(); // 重新加载列表
        } catch (error) {
          message.error('删除失败');
        }
      }
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={() => setCreateModalVisible(true)}
        >
          新建用户
        </Button>
      </div>

      <Form 
        form={form}
        className={styles.searchBar}
        layout="inline"
      >
        <Form.Item name="user_name">
          <Input placeholder="用户名" allowClear />
        </Form.Item>
        <Form.Item name="phone">
          <Input placeholder="手机号" allowClear />
        </Form.Item>
        <Form.Item name="status">
          <Select
            placeholder="状态"
            allowClear
            style={{ width: 120 }}
            options={statusOptions}
          />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" onClick={handleSearch}>
              查询
            </Button>
            <Button onClick={handleReset}>
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>

      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey="id"
        loading={loading}
        pagination={{
          total,
          current: searchParams.page,
          pageSize: searchParams.page_size,
          showSizeChanger: true,
          showQuickJumper: true
        }}
        onChange={handleTableChange}
      />

      <Modal
        title="新建用户"
        open={createModalVisible}
        onOk={handleCreate}
        onCancel={() => {
          setCreateModalVisible(false);
          createForm.resetFields();
        }}
      >
        <CreateUserForm form={createForm} />
      </Modal>

      <Modal
        title="编辑用户"
        open={editModalVisible}
        onOk={handleUpdate}
        onCancel={() => {
          setEditModalVisible(false);
          editForm.resetFields();
        }}
      >
        <UpdateUserForm 
          form={editForm}
          initialValues={currentUser}
        />
      </Modal>
    </div>
  );
};

export default UserList; 