import { Layout, Button, Space, Dropdown, Avatar } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import { useUserStore } from '@/store/user';
import Breadcrumb from './Breadcrumb';

interface HeaderProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
}

const Header = ({ collapsed, onCollapse }: HeaderProps) => {
  const { userInfo, logout } = useUserStore();

  const userMenuItems = [
    {
      key: 'profile',
      label: '个人信息',
    },
    {
      key: 'settings',
      label: '设置',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: '退出登录',
      onClick: logout,
    },
  ];

  return (
    <Layout.Header
      style={{
        padding: 0,
        background: '#fff',
        position: 'sticky',
        top: 0,
        zIndex: 2,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 1px 4px rgba(0,21,41,.08)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => onCollapse(!collapsed)}
          style={{
            fontSize: '16px',
            width: 64,
            height: 64,
          }}
        />
        <Breadcrumb />
      </div>
      <Space style={{ marginRight: '24px' }}>
        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
          <Space style={{ cursor: 'pointer', padding: '0 12px' }}>
            <Avatar 
              src={userInfo?.avatar} 
              icon={<UserOutlined />}
              size={32}
              style={{ 
                backgroundColor: userInfo?.avatar ? 'transparent' : '#1890ff' 
              }}
            />
            <span style={{ marginLeft: 4 }}>{userInfo?.nickname || 'Admin'}</span>
          </Space>
        </Dropdown>
      </Space>
    </Layout.Header>
  );
};

export default Header; 