import { Breadcrumb as AntBreadcrumb } from 'antd';
import { useLocation } from 'react-router-dom';
import { menuItems } from './menuConfig.tsx';

// 扁平化菜单配置，方便查找
const flattenMenuItems = (items: any[], parent: any[] = []): any[] => {
  return items.reduce((acc, item) => {
    const path = [...parent, item];
    if (item.children) {
      return [...acc, { ...item, parent }, ...flattenMenuItems(item.children, path)];
    }
    return [...acc, { ...item, parent }];
  }, []);
};

const getBreadcrumbItems = (pathname: string) => {
  const paths = pathname.split('/').filter(Boolean);
  const currentKey = paths[paths.length - 1] || 'dashboard';
  
  const flatMenu = flattenMenuItems(menuItems);
  const currentItem = flatMenu.find(item => item.key === currentKey);
  
  if (!currentItem) return [{ title: '仪表盘' }];

  const breadcrumbItems = currentItem.parent
    .filter((item: any) => item.label)
    .map((item: any) => ({
      title: item.label,
    }));

  return [...breadcrumbItems, { title: currentItem.label }];
};

const Breadcrumb = () => {
  const location = useLocation();
  const items = getBreadcrumbItems(location.pathname);

  return (
    <AntBreadcrumb
      items={items}
      style={{
        margin: '0 16px',
      }}
    />
  );
};

export default Breadcrumb; 