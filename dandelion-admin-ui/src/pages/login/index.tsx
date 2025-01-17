import { Form, Input, Button, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useUserStore } from '@/store/user';
import type { LoginParams } from '@/api/types';
import styles from './index.module.css';

const Login = () => {
  const { login, loading } = useUserStore();

  const onFinish = async (values: LoginParams) => {
    await login(values);
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card} bordered={false}>
        <h2 className={styles.title}>Dandelion Admin</h2>
        <Form
          name="login"
          onFinish={onFinish}
          initialValues={{ user_name: 'admin', password: '123456' }}
        >
          <Form.Item
            name="user_name"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="用户名: admin"
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密码: admin"
              size="large"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={loading}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login; 