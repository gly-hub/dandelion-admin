import { Form, Input, Select } from 'antd';
import type { FormInstance } from 'antd/es/form';
import type { CreateUserParams } from '@/api/types';
import { UserStatus } from '@/api/types';

interface CreateUserFormProps {
  form: FormInstance;
}

const CreateUserForm: React.FC<CreateUserFormProps> = ({ form }) => {
  const statusOptions = [
    { label: '正常', value: UserStatus.NORMAL },
    { label: '禁用', value: UserStatus.DISABLED }
  ];

  return (
    <Form
      form={form}
      layout="vertical"
    >
      <Form.Item
        name="user_name"
        label="用户名"
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input placeholder="请输入用户名" />
      </Form.Item>

      <Form.Item
        name="password"
        label="密码"
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input.Password placeholder="请输入密码" />
      </Form.Item>

      <Form.Item
        name="nick_name"
        label="昵称"
        rules={[{ required: true, message: '请输入昵称' }]}
      >
        <Input placeholder="请输入昵称" />
      </Form.Item>

      <Form.Item
        name="phone"
        label="手机号"
        rules={[
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' }
        ]}
      >
        <Input placeholder="请输入手机号" />
      </Form.Item>

      <Form.Item
        name="avatar"
        label="头像"
      >
        <Input placeholder="请输入头像地址" />
      </Form.Item>

      <Form.Item
        name="status"
        label="状态"
        initialValue={UserStatus.NORMAL}
      >
        <Select options={statusOptions} />
      </Form.Item>
    </Form>
  );
};

export default CreateUserForm; 