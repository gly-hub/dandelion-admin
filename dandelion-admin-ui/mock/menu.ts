import { MockMethod } from 'vite-plugin-mock';
import type { MenuItem } from '../src/api/types';

// 导出mockMenus以便其他文件使用
export const mockMenus: MenuItem[] = [
  {
    key: 'dashboard',
    label: '仪表盘',
    icon: 'HomeOutlined',
  },
  {
    key: 'system',
    label: '系统管理',
    icon: 'SettingOutlined',
    children: [
      {
        key: 'user',
        label: '用户管理',
        icon: 'UserOutlined',
      },
      {
        key: 'menu',
        label: '菜单管理',
        icon: 'AppstoreOutlined',
      },
    ],
  },
];

// 递归查找并更新菜单项
const updateMenuItem = (items: MenuItem[], key: string, updatedMenu: MenuItem): boolean => {
  for (let i = 0; i < items.length; i++) {
    if (items[i].key === key) {
      // 保留原有的children
      const children = items[i].children;
      items[i] = { ...items[i], ...updatedMenu };
      if (children) {
        items[i].children = children;
      }
      return true;
    }
    if (items[i].children) {
      if (updateMenuItem(items[i].children, key, updatedMenu)) {
        return true;
      }
    }
  }
  return false;
};

// 递归查找并删除菜单项
const deleteMenuItem = (items: MenuItem[], key: string): boolean => {
  for (let i = 0; i < items.length; i++) {
    if (items[i].key === key) {
      items.splice(i, 1);
      return true;
    }
    if (items[i].children) {
      if (deleteMenuItem(items[i].children, key)) {
        // 如果子菜单为空，删除children属性
        if (items[i].children.length === 0) {
          delete items[i].children;
        }
        return true;
      }
    }
  }
  return false;
};

// 递归查找父菜单并添加子菜单
const addChildMenuItem = (items: MenuItem[], parentKey: string, newMenu: MenuItem): boolean => {
  for (let i = 0; i < items.length; i++) {
    if (items[i].key === parentKey) {
      if (!items[i].children) {
        items[i].children = [];
      }
      items[i].children.push(newMenu);
      return true;
    }
    if (items[i].children) {
      if (addChildMenuItem(items[i].children, parentKey, newMenu)) {
        return true;
      }
    }
  }
  return false;
};

export default [
  // 获取菜单列表（返回完整的树形结构）
  {
    url: '/menu/list',
    method: 'get',
    response: () => {
      return {
        code: 20000,
        data: mockMenus,
        msg: '获取菜单列表成功',
        request_id: Date.now().toString(),
      };
    },
  },

  // 添加菜单
  {
    url: '/menu/add',
    method: 'post',
    response: ({ body }) => {
      const newMenu = body as MenuItem;
      // 如果有parentKey，添加到对应的父菜单下
      if (newMenu.parentKey) {
        if (addChildMenuItem(mockMenus, newMenu.parentKey, newMenu)) {
          return {
            code: 20000,
            data: newMenu,
            msg: '添加菜单成功',
            request_id: Date.now().toString(),
          };
        }
        return {
          code: 40004,
          msg: '父菜单不存在',
          request_id: Date.now().toString(),
        };
      }
      // 如果没有parentKey，添加到根级别
      mockMenus.push(newMenu);
      return {
        code: 20000,
        data: newMenu,
        msg: '添加菜单成功',
        request_id: Date.now().toString(),
      };
    },
  },

  // 更新菜单
  {
    url: '/menu/update/:key',
    method: 'put',
    response: ({ body }) => {
      const updatedMenu = body as MenuItem;
      if (updateMenuItem(mockMenus, updatedMenu.key, updatedMenu)) {
        return {
          code: 20000,
          data: updatedMenu,
          msg: '更新菜单成功',
          request_id: Date.now().toString(),
        };
      }
      return {
        code: 40004,
        msg: '菜单不存在',
        request_id: Date.now().toString(),
      };
    },
  },

  // 删除菜单
  {
    url: '/menu/delete/:key',
    method: 'delete',
    response: ({ query }) => {
      const { key } = query;
      if (deleteMenuItem(mockMenus, key)) {
        return {
          code: 20000,
          data: null,
          msg: '删除菜单成功',
          request_id: Date.now().toString(),
        };
      }
      return {
        code: 40004,
        msg: '菜单不存在',
        request_id: Date.now().toString(),
      };
    },
  },
] as MockMethod[]; 