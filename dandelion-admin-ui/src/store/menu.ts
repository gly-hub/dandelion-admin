import { create } from 'zustand';
import { getUserMenus } from '@/api/user';
import type { MenuItem } from '@/types/menu';
import { ErrorHandler } from '@/utils/error';

interface MenuState {
  menus: MenuItem[];
  loading: boolean;
  fetchMenus: () => Promise<void>;
}

export const useMenuStore = create<MenuState>((set) => ({
  menus: [],
  loading: false,
  fetchMenus: async () => {
    try {
      set({ loading: true });
      const res = await getUserMenus();
      console.log('Fetched menus:', res);
      set({ menus: res });
    } catch (error) {
      console.error('Error fetching menus:', error);
      ErrorHandler.handle(error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
})); 