export interface MenuItem {
  id: number;
  parent_id: number;
  name: string;
  path: string;
  type: number;
  icon?: string;
  sort: number;
  status: number;
  children: MenuItem[];
}

export interface MenuResponse {
  list: MenuItem[];
} 