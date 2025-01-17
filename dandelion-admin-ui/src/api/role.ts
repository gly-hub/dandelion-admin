import request from '@/utils/request';
import type { ApiResponse, RoleSearchParams, RoleListResponse, CreateRoleParams, UpdateRoleParams } from './types';

// 获取角色列表
export const getRoleList = async (params: RoleSearchParams) => {
  const response = await request.post<ApiResponse<RoleListResponse>>('/api/sys_role/search', params);
  return response.data;
};

// 创建角色
export const createRole = async (params: CreateRoleParams) => {
  const response = await request.post<ApiResponse<void>>('/api/sys_role/create', params);
  return response.data;
};

// 更新角色
export const updateRole = async (params: UpdateRoleParams) => {
  const response = await request.put<ApiResponse<void>>('/api/sys_role/update', params);
  return response.data;
};

// 删除角色
export const deleteRole = async (id: number) => {
  const response = await request.delete<ApiResponse<void>>(`/api/sys_role/delete`,{id});
  return response.data;
};

// 分配用户
export const assignUsers = async (params: { role_id: number; user_ids: number[] }) => {
  const response = await request.post<ApiResponse<void>>('/api/sys_role/assign_users', params);
  return response.data;
}; 