import { useState, useEffect } from 'react';
import { Table, Input, Select, Space, Button, Form, Modal, message } from 'antd';
import type { TablePaginationConfig } from 'antd/es/table';
import type { TransferItem } from 'antd/es/transfer';
import { getRoleList, createRole, updateRole, deleteRole, assignUsers } from '@/api/role';
import { getUserList } from '@/api/user';
import type { RoleListItem, RoleSearchParams } from '@/api/types';
import styles from './index.module.css';
import { PlusOutlined, EditOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons';
import CreateRoleForm from './components/CreateRoleForm';
import UpdateRoleForm from './components/UpdateRoleForm';
import AssignUsersForm from './components/AssignUsersForm';

const RoleList: React.FC = () => {
  const [form] = Form.useForm();
  const [createForm] = Form.useForm();
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editForm] = Form.useForm();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentRole, setCurrentRole] = useState<RoleListItem>();
  const [assignForm] = Form.useForm();
  const [assignModalVisible, setAssignModalVisible] = useState(false);
  const [userOptions, setUserOptions] = useState<Array<{ label: string; value: number }>>([]);
  const [userList, setUserList] = useState<TransferItem[]>([]);
  const [userLoading, setUserLoading] = useState(false);
  
  // 查询参数
  const [searchParams, setSearchParams] = useState<RoleSearchParams>({
    page: 1,
    page_size: 10
  });
  
  // 表格数据
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<RoleListItem[]>([]);
  const [total, setTotal] = useState(0);

  // 状态选项
  const statusOptions = [
    { label: '启用', value: 1 },
    { label: '禁用', value: 2 }
  ];

  // 表格列定义
  const columns = [
    {
      title: '角色名称',
      dataIndex: 'name',
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (status: number) => (
        <Select
          value={status}
          disabled
          options={statusOptions}
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
      render: (_, record: RoleListItem) => (
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
            icon={<UserOutlined />}
            onClick={() => handleAssignUsers(record)}
          >
            分配用户
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
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
      const res = await getRoleList(searchParams);
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

  // 处理创建角色
  const handleCreate = async () => {
    try {
      const values = await createForm.validateFields();
      await createRole(values);
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
  const handleEdit = (record: RoleListItem) => {
    setCurrentRole(record);
    setEditModalVisible(true);
  };

  // 处理更新
  const handleUpdate = async () => {
    try {
      const values = await editForm.validateFields();
      await updateRole({
        id: currentRole!.id,
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
  const handleDelete = async (id: number) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个角色吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        try {
          await deleteRole(id);
          message.success('删除成功');
          loadData();
        } catch (error) {
          message.error('删除失败');
        }
      }
    });
  };

  // 加载用户列表
  const loadUserList = async () => {
    setUserLoading(true);
    try {
      const res = await getUserList({ page: 1, page_size: 1000 });
      const users = res.list.map(user => ({
        key: user.id.toString(),
        title: `${user.nick_name || user.username}${user.username ? ` (${user.username})` : ''}`,
        description: user.email || '',
        disabled: user.status === 2
      }));
      setUserList(users);
    } catch (error) {
      message.error('获取用户列表失败');
    } finally {
      setUserLoading(false);
    }
  };

  // 处理分配用户
  const handleAssignUsers = (record: RoleListItem) => {
    setCurrentRole(record);
    // 如果还没有加载用户列表,则加载
    if (userList.length === 0) {
      loadUserList();
    }
    // 设置已选择的用户
    assignForm.setFieldsValue({
      user_ids: record.user_ids || []
    });
    setAssignModalVisible(true);
  };

  // 提交分配用户
  const handleAssignSubmit = async () => {
    try {
      const values = await assignForm.validateFields();
      await assignUsers({
        role_id: currentRole!.id,
        user_ids: values.user_ids
      });
      message.success('分配成功');
      setAssignModalVisible(false);
      loadData();
    } catch (error) {
      if (error.errorFields) return;
      message.error('分配失败');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={() => setCreateModalVisible(true)}
        >
          新建角色
        </Button>
      </div>

      <Form 
        form={form}
        className={styles.searchBar}
        layout="inline"
      >
        <Form.Item name="name">
          <Input placeholder="角色名称" allowClear />
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
        title="新建角色"
        open={createModalVisible}
        onOk={handleCreate}
        onCancel={() => {
          setCreateModalVisible(false);
          createForm.resetFields();
        }}
      >
        <CreateRoleForm form={createForm} />
      </Modal>

      <Modal
        title="编辑角色"
        open={editModalVisible}
        onOk={handleUpdate}
        onCancel={() => {
          setEditModalVisible(false);
          editForm.resetFields();
        }}
      >
        <UpdateRoleForm 
          form={editForm}
          initialValues={currentRole!}
        />
      </Modal>

      <Modal
        title="分配用户"
        open={assignModalVisible}
        onOk={handleAssignSubmit}
        onCancel={() => {
          setAssignModalVisible(false);
          assignForm.resetFields();
        }}
        width={650}
      >
        <AssignUsersForm 
          form={assignForm}
          initialValues={currentRole!}
          userList={userList}
          loading={userLoading}
        />
      </Modal>
    </div>
  );
};

export default RoleList; 