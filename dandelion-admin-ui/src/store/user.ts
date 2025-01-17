import { create } from 'zustand';
import { getUserInfo, login as loginApi, logout as logoutApi } from '@/api/user';
import type { LoginParams, UserInfo } from '@/api/types';
import { ErrorHandler } from '@/utils/error';

interface UserState {
  token: string | null;
  userInfo: UserInfo | null;
  loading: boolean;
  login: (params: LoginParams) => Promise<void>;
  logout: () => Promise<void>;
  fetchUserInfo: () => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  token: localStorage.getItem('token'),
  userInfo: null,
  loading: false,

  login: async (params) => {
    try {
      set({ loading: true });
      const res = await loginApi(params);
      const token = res.token;
      localStorage.setItem('token', token);
      set({ token });
      await get().fetchUserInfo();
      window.location.href = '/';
    } catch (error) {
      ErrorHandler.handle(error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      set({ loading: true });
      await logoutApi();
      localStorage.removeItem('token');
      set({ token: null, userInfo: null });
      window.location.href = '/login';
    } catch (error) {
      ErrorHandler.handle(error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  fetchUserInfo: async () => {
    const { userInfo, loading } = get();
    if (userInfo || loading) return;
    
    try {
      set({ loading: true });
      const res = await getUserInfo();
      set({ userInfo: res.data });
    } catch (error) {
      ErrorHandler.handle(error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
})); 