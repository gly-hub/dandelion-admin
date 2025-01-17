import request from '@/utils/request';
import type { ApiResponse, LoginParams, UserInfoResponse, UserSearchParams, UserListResponse, CreateUserParams, UpdateUserParams } from './types';
import type { MenuItem, MenuResponse } from '@/types/menu';

// 登录
export const login = async (params: LoginParams) => {
  const response = await request.post<ApiResponse<{ token: string }>>('/api/login', params);
  return response.data;
};

// 获取用户信息
export const getUserInfo = async () => {
  const response = await request.get<ApiResponse<UserInfoResponse>>('/api/user/info');
  return response.data.user_info;
};

// 获取用户菜单
export const getUserMenus = async (): Promise<MenuItem[]> => {
  const response = await request.get<ApiResponse<MenuResponse>>('/api/user/menu');
  console.log('response', response);
  return response.data?.list || [];
};

// 退出登录
export const logout = async () => {
  await request.post<ApiResponse<void>>('/api/authorize/logout');
};

// 获取用户列表
export const getUserList = async (params: UserSearchParams) => {
  const response = await request.post<ApiResponse<UserListResponse>>('/api/sys_user/search', params);
  return response.data;
};

// 创建用户
export const createUser = async (params: CreateUserParams) => {
  const response = await request.post<ApiResponse<void>>('/api/sys_user/create', params);
  return response.data;
};

// 更新用户
export const updateUser = async (params: UpdateUserParams) => {
  const response = await request.put<ApiResponse<void>>('/api/sys_user/update', params);
  return response.data;
};

// 删除用户
export const deleteUser = async (id: number) => {
  const response = await request.delete<ApiResponse<void>>(`/api/sys_user/delete`, { id });
  return response.data;
}; 