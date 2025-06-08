'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/auth-store';

export function useAuth() {
  const { user, token, isAuthenticated, isAdmin, setAuth, logout, initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return {
    user,
    token,
    isAuthenticated,
    isAdmin,
    setAuth,
    logout,
  };
}