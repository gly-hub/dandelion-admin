import { Layout, Menu, Spin } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import * as Icons from '@ant-design/icons';
import { useMenuStore } from '@/store/menu';
import type { MenuItem } from '@/types/menu';

interface SiderProps {
  collapsed: boolean;
}

// 动态创建图标组件
const IconComponent = (iconName: string) => {
  const Icon = Icons[`${iconName}Outlined` as keyof typeof Icons];
  return Icon ? <Icon /> : null;
};

// 递归处理菜单数据
const processMenuItems = (items: MenuItem[] = []) => {
  return items.map(item => ({
    key: item.path,
    icon: item.icon ? IconComponent(item.icon) : null,
    label: item.name,
    children: item.children?.length ? processMenuItems(item.children) : undefined,
  }));
};

const Sider = ({ collapsed }: SiderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { menus, loading, fetchMenus } = useMenuStore();
  const selectedKey = location.pathname;

  useEffect(() => {
    // 只在组件挂载时获取一次菜单数据
    fetchMenus();
  }, []); // 移除 fetchMenus 依赖

  // 使用 useMemo 缓存处理后的菜单数据
  const processedMenus = useMemo(() => processMenuItems(menus), [menus]);

  return (
    <Layout.Sider 
      trigger={null} 
      collapsible 
      collapsed={collapsed}
      style={{
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 100,
        background: '#fff',
        boxShadow: '2px 0 8px 0 rgba(29,35,41,.05)',
      }}
      width={200}
    >
      <div style={{ 
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#1890ff',
        fontSize: collapsed ? '20px' : '18px',
        fontWeight: 'bold',
        borderBottom: '1px solid #f0f0f0',
      }}>
        {collapsed ? 'D' : 'Dandelion'}
      </div>
      {loading ? (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <Spin />
        </div>
      ) : (
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[selectedKey]}
          defaultOpenKeys={['/system']}
          items={processedMenus}
          onClick={({ key }) => navigate(key)}
          style={{ 
            borderRight: 0,
          }}
          className="custom-menu"
        />
      )}
      <style>
        {`
          .custom-menu.ant-menu-light .ant-menu-item-selected {
            background-color: #e6f7ff;
            color: #1890ff;
          }
          .custom-menu.ant-menu-light .ant-menu-item:hover {
            color: #1890ff !important;
          }
          .custom-menu.ant-menu-light .ant-menu-item:hover:not(.ant-menu-item-selected) {
            background-color: #f5f5f5;
          }
          .custom-menu .ant-menu-item {
            margin: 4px 8px !important;
            width: calc(100% - 16px);
            border-radius: 4px;
          }
          .custom-menu .anticon {
            color: inherit;
          }
          .custom-menu .ant-menu-submenu-title:hover {
            color: #1890ff !important;
          }
        `}
      </style>
    </Layout.Sider>
  );
};

export default Sider; 