import { useEffect, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUserStore } from '@/store/user';

const PUBLIC_PATHS = ['/login'];

export const useAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token, userInfo, loading, fetchUserInfo } = useUserStore();
  const isPublicPath = PUBLIC_PATHS.includes(location.pathname);
  const authChecked = useRef(false);

  const checkAuth = useCallback(async () => {
    // 如果已经检查过认证，且有用户信息，则不再重复检查
    if (authChecked.current && userInfo) {
      return;
    }

    // 如果在公共路径上
    if (isPublicPath) {
      // 已登录则跳转到首页
      if (token) {
        navigate('/', { replace: true });
      }
      return;
    }

    // 非公共路径，未登录则跳转到登录页
    if (!token) {
      navigate('/login', { replace: true, state: { from: location.pathname } });
      return;
    }

    // 已登录但没有用户信息，则获取用户信息
    if (token && !userInfo && !authChecked.current) {
      try {
        await fetchUserInfo();
        authChecked.current = true;
      } catch {
        // 获取用户信息失败，可能是token过期，跳转到登录页
        navigate('/login', { replace: true, state: { from: location.pathname } });
      }
    }
  }, [token, userInfo, location.pathname, navigate, fetchUserInfo, isPublicPath]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return {
    loading: loading && !isPublicPath && !authChecked.current,
    isAuthenticated: !!token && !!userInfo,
    isPublicPath,
  };
}; 