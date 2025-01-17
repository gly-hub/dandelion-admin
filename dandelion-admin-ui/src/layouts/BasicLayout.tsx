import { useState, useEffect, useCallback } from 'react';
import { Layout } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';
import Sider from './components/Sider';
import Header from './components/Header';
import TabView from './components/TabView';
import { useTabStore } from '@/store/tab';
import { useMenuStore } from '@/store/menu';
import type { MenuItem } from '@/types/menu';

const { Content } = Layout;

const BasicLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { addTab } = useTabStore();
  const { menus } = useMenuStore();

  // 递归查找菜单项
  const findMenuItem = useCallback((items: MenuItem[], path: string): MenuItem | null => {
    for (const item of items) {
      if (item.path === path) {
        return item;
      }
      if (item.children?.length) {
        const found = findMenuItem(item.children, path);
        if (found) {
          return found;
        }
      }
    }
    return null;
  }, []);

  // 监听路由变化，添加标签页
  useEffect(() => {
    const path = location.pathname;
    
    // 如果是根路径，不添加标签页
    if (path === '/') {
      return;
    }
    
    // 从菜单数据中获取标题
    const menuItem = findMenuItem(menus, path);
    
    // 只有在菜单中存在的路径才添加标签页
    if (menuItem) {
      addTab({
        key: path,
        label: menuItem.name,
        path,
        closable: true,
      });
    }
  }, [location.pathname, addTab, findMenuItem, menus]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsed={collapsed} />
      <Layout style={{ marginLeft: collapsed ? 80 : 200, transition: 'margin-left 0.2s' }}>
        <Header 
          collapsed={collapsed} 
          onCollapse={(value) => setCollapsed(value)} 
        />
        <TabView />
        <Content style={{ margin: '8px 16px', minHeight: 280 }}>
          <div style={{ padding: 24, background: '#fff', borderRadius: 4 }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default BasicLayout; 