import { 
  HomeOutlined, 
  UserOutlined, 
  SettingOutlined, 
  ShoppingCartOutlined,
  FileTextOutlined,
  TeamOutlined,
  AppstoreOutlined,
  SafetyCertificateOutlined
} from '@ant-design/icons';

export const menuItems = [
  {
    key: 'dashboard',
    icon: <HomeOutlined />,
    label: '仪表盘',
  },
  {
    key: 'system',
    icon: <SettingOutlined />,
    label: '系统管理',
    children: [
      {
        key: 'user',
        icon: <UserOutlined />,
        label: '用户管理',
      },
      {
        key: 'role',
        icon: <SafetyCertificateOutlined />,
        label: '角色管理',
      },
      {
        key: 'menu',
        icon: <AppstoreOutlined />,
        label: '菜单管理',
      }
    ]
  },
  {
    key: 'business',
    icon: <ShoppingCartOutlined />,
    label: '业务管理',
    children: [
      {
        key: 'order',
        icon: <FileTextOutlined />,
        label: '订单管理',
        children: [
          {
            key: 'order-list',
            label: '订单列表'
          },
          {
            key: 'order-review',
            label: '订单审核'
          }
        ]
      },
      {
        key: 'customer',
        icon: <TeamOutlined />,
        label: '客户管理',
        children: [
          {
            key: 'customer-list',
            label: '客户列表'
          },
          {
            key: 'customer-group',
            label: '客户分组'
          }
        ]
      }
    ]
  }
]; 