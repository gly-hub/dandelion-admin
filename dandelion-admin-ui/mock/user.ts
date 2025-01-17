import { MockMethod } from 'vite-plugin-mock';
import { mockMenus } from './menu';

const tokens = {
  admin: 'admin-token',
  editor: 'editor-token',
};

const users = {
  'admin-token': {
    id: '1',
    username: 'admin',
    nickname: '管理员',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    roles: ['admin'],
    permissions: ['*'],
  },
  'editor-token': {
    id: '2',
    username: 'editor',
    nickname: '编辑者',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    roles: ['editor'],
    permissions: ['view', 'edit'],
  },
};

export default [
  // 登录
  {
    url: '/auth/login',
    method: 'post',
    response: ({ body }) => {
      const { username, password } = body;
      const token = tokens[username];

      if (!token) {
        return {
          code: 40001,
          msg: '用户名或密码错误',
          request_id: Date.now().toString(),
        };
      }

      return {
        code: 20000,
        data: {
          token,
        },
        msg: '登录成功',
        request_id: Date.now().toString(),
      };
    },
  },

  // 获取用户信息
  {
    url: '/user/info',
    method: 'get',
    response: ({ headers }) => {
      const token = headers.authorization?.replace('Bearer ', '');
      const info = users[token];

      if (!info) {
        return {
          code: 40001,
          msg: '获取用户信息失败',
          request_id: Date.now().toString(),
        };
      }

      return {
        code: 20000,
        data: info,
        msg: '获取用户信息成功',
        request_id: Date.now().toString(),
      };
    },
  },

  // 获取用户菜单
  {
    url: '/user/menus',
    method: 'get',
    response: ({ headers }) => {
      const token = headers.authorization?.replace('Bearer ', '');
      const info = users[token];

      if (!info) {
        return {
          code: 40001,
          msg: '获取菜单失败',
          request_id: Date.now().toString(),
        };
      }

      // admin返回所有菜单，editor返回部分菜单
      const menus = info.roles.includes('admin')
        ? mockMenus
        : mockMenus.filter(item => item.key !== 'system');

      return {
        code: 20000,
        data: menus,
        msg: '获取菜单成功',
        request_id: Date.now().toString(),
      };
    },
  },

  // 退出登录
  {
    url: '/auth/logout',
    method: 'post',
    response: () => {
      return {
        code: 20000,
        data: null,
        msg: '退出成功',
        request_id: Date.now().toString(),
      };
    },
  },
] as MockMethod[]; 