import React from 'react';
import { Spin } from 'antd';
import { useAuth } from '@/hooks/useAuth';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { loading, isAuthenticated } = useAuth();

  if (!isAuthenticated && loading) {
    return (
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center' 
      }}>
        <Spin size="large" spinning={true}>
          <div style={{ padding: '50px' }}></div>
        </Spin>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthGuard; 