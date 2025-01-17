import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';
import BasicLayout from '../layouts/BasicLayout';
import User from '../pages/system/user';
import Role from '../pages/system/role';
import Login from '../pages/login';
import NotFound from '../pages/error/404';
import Forbidden from '../pages/error/403';
import AuthGuard from '../components/AuthGuard/index';
import Menu from '../pages/menu';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/system/menu" />,
  },
  {
    path: '/login',
    element: (
      <AuthGuard>
        <Login />
      </AuthGuard>
    ),
  },
  {
    path: '/',
    element: (
      <AuthGuard>
        <BasicLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: 'system',
        children: [
          {
            path: 'user',
            element: <User />,
          },
          {
            path: 'menu',
            element: <Menu />,
          },
          {
            path: 'role',
            element: <Role />,
          },
        ],
      },
    ],
  },
  {
    path: '/403',
    element: <Forbidden />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default createBrowserRouter(routes); 