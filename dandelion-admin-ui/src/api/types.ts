// 用户相关接口类型
export interface LoginParams {
  username: string;
  password: string;
}

export interface UserInfo {
  id: number;
  user_name: string;
  nick_name: string;
  avatar?: string;
  phone?: string;
  status: number;
}

export interface UserInfoResponse {
  user_info: UserInfo;
}

// 菜单类型定义
export enum MenuType {
  MENU = 0,           // 菜单
  PAGE = 1,           // 页面
  TAB = 2,            // 标签页
  BUTTON = 3,         // 按钮
}

// 后端菜单项接口
export interface MenuItemResponse {
  id: number;
  parent_id: number;
  name: string;
  path: string;
  type: MenuType;
  icon?: string;
  sort?: number;
  status: number;
  children?: MenuItemResponse[];
}

// 前端菜单项接口
export interface MenuItem {
  key: string;            // 菜单标识
  label: string;          // 菜单名称
  icon?: string;          // 图标（仅 MENU、PAGE 类型需要）
  type: MenuType;         // 菜单类型
  children?: MenuItem[];  // 子菜单
  parentKey?: string;     // 父级菜单标识
  code?: string;         // 权限代码（仅 TAB、BUTTON 类型需要，格式：模块_操作，如：USER_VIEW）
  routeCode?: string;    // 路由代码（仅 MENU、PAGE 类型需要，如：/system/user）
  sort?: number;          // 排序
  hidden?: boolean;       // 是否在菜单中隐藏（仅 MENU、PAGE 类型可用）
  status: number;         // 状态
}

// 角色相关接口类型
export interface Role {
  id: string;
  name: string;
  code: string;
  description?: string;
  permissions: string[];  // 权限代码列表
  status: number;
  createTime: string;
  updateTime: string;
}

// 通用分页参数
export interface PaginationParams {
  current: number;
  pageSize: number;
}

// 通用分页响应
export interface PaginationResult<T> {
  list: T[];
  total: number;
  current: number;
  pageSize: number;
}

// 通用响应格式
export interface ApiResponse<T> {
  code: number;
  msg: string;
  data: T;
  requestId: string;
}

// 列表响应格式
export interface ListResponse<T> {
  list: T[];
}

// 用户查询参数
export interface UserSearchParams {
  page: number;
  page_size: number;
  phone?: string;
  status?: number;
  user_name?: string;
}

// 用户列表项
export interface UserListItem {
  id: number;
  user_name: string;
  nick_name: string;
  avatar: string;
  phone: string;
  status: number;
  created_at: number;
  updated_at: number;
}

// 用户列表响应
export interface UserListResponse {
  list: UserListItem[];
  total: number;
}

// 用户状态枚举
export enum UserStatus {
  NORMAL = 1,  // 正常
  DISABLED = 2 // 禁用
}

// 创建用户参数
export interface CreateUserParams {
  user_name: string;
  nick_name: string;
  password: string;
  phone: string;
  avatar?: string;
  status: UserStatus;
}

// 更新用户参数
export interface UpdateUserParams {
  id: number;
  nick_name: string;
  phone: string;
  avatar?: string;
  status: UserStatus;
}

// 角色查询参数
export interface RoleSearchParams {
  page: number;
  page_size: number;
  name?: string;
  status?: number;
}

// 角色列表项
export interface RoleListItem {
  id: number;
  name: string;
  description: string;
  menu_ids: number[];
  user_ids: number[];
  status: number;
  created_at: number;
  updated_at: number;
}

// 角色列表响应
export interface RoleListResponse {
  list: RoleListItem[];
  total: number;
}

// 创建角色参数
export interface CreateRoleParams {
  name: string;
  description: string;
  menu_ids: number[];
  status: number;
} 