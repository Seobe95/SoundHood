import React, { createContext, useEffect, useState } from 'react';
import useAuth from '@/hooks/queries/useAuth.ts';
import { UserInfo } from '@/api';

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContext {
  isLogin: boolean;
  userInfo: UserInfo | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContext>({
  isLogin: false,
  userInfo: null,
  logout: () => {},
});

function AuthProvider({ children }: AuthProviderProps) {
  const { getProfileQuery } = useAuth();
  const isLogin = getProfileQuery.isSuccess;
  const [userInfo, setUserInfo] = useState<UserInfo | null>(
    getProfileQuery.data || null,
  );

  function logout() {
    setUserInfo(null);
  }

  useEffect(() => {
    setUserInfo(getProfileQuery.data ?? null);
  }, [getProfileQuery.data]);

  return (
    <AuthContext.Provider value={{ isLogin, userInfo, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
