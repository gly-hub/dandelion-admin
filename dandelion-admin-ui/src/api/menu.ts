import request from '@/utils/request';
import type { ApiResponse } from '@/types/api';
import type { MenuItem } from '@/types/menu';

interface MenuItemResponse {
  id: number;
  parent_id: number;
  name: string;
  path: string;
  type: number;
  icon?: string;
  sort: number;
  status: number;
  children: MenuItemResponse[];
}

interface MenuListResponse {
  list: MenuItemResponse[];
}

interface CreateMenuRequest {
  parent_id: number;
  name: string;
  path: string;
  type: number;
  icon?: string;
  sort: number;
  status: number;
}

interface UpdateMenuRequest extends CreateMenuRequest {
  id: number;
}

interface SortMenuItem {
  id: number;
  sequence: number;
  parent_id: number;
}

// 将后端菜单数据转换为前端格式
const convertMenuItem = (item: MenuItemResponse): MenuItem => ({
  id: item.id,
  parent_id: item.parent_id,
  name: item.name,
  path: item.path,
  type: item.type,
  icon: item.icon,
  sort: item.sort,
  status: item.status,
  children: item.children?.map(convertMenuItem) || [],
});

// 将前端菜单数据转换为创建请求格式
const convertToCreateRequest = (item: MenuItem): CreateMenuRequest => ({
  parent_id: item.parent_id,
  name: item.name,
  path: item.path || '',
  type: item.type,
  icon: item.icon,
  sort: item.sort,
  status: item.status,
});

// 将前端菜单数据转换为更新请求格式
const convertToUpdateRequest = (item: MenuItem): UpdateMenuRequest => ({
  id: item.id,
  ...convertToCreateRequest(item),
});

// 获取菜单列表
export const getMenuList = async () => {
  const response = await request.get<ApiResponse<MenuListResponse>>('/api/sys_menu/search');
  return {
    data: {
      list: response.data?.list?.map(convertMenuItem) || [],
    }
  };
};

// 添加菜单
export const addMenu = async (menu: MenuItem) => {
  const response = await request.post<ApiResponse<MenuItemResponse>>('/api/sys_menu/create', convertToCreateRequest(menu));
  return {
    data: convertMenuItem(response.data)
  };
};

// 更新菜单
export const updateMenu = async (menu: MenuItem) => {
  const response = await request.put<ApiResponse<MenuItemResponse>>(`/api/sys_menu/update`, convertToUpdateRequest(menu));
  return {
    data: convertMenuItem(response.data)
  };
};

// 删除菜单
export const deleteMenu = async (menu: MenuItem) => {
  await request.delete<ApiResponse<void>>('/api/sys_menu/delete', { id: menu.id });
};

// 更新菜单排序
export const sortMenus = async (items: SortMenuItem[]) => {
    await request.put<ApiResponse<void>>('/api/sys_menu/sort', { list: items });
}; 