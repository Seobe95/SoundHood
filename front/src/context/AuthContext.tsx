import React, { createContext } from 'react';
import useAuth from '@/hooks/queries/useAuth.ts';
import { UserInfo } from '@/api';

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContext {
  isLogin: boolean;
  userInfo: UserInfo | null;
}

const AuthContext = createContext<AuthContext>({
  isLogin: false,
  userInfo: null,
});

function AuthProvider({ children }: AuthProviderProps) {
  const { getProfileQuery } = useAuth();
  const isLogin = getProfileQuery.isSuccess;
  const userInfo =
    getProfileQuery.data === undefined ? null : getProfileQuery.data;

  return (
    <AuthContext.Provider value={{ isLogin, userInfo }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
