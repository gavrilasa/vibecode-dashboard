import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types/auth';
import { getToken, setToken, removeToken, decodeToken } from '@/lib/auth';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  setAuth: (token: string) => void;
  logout: () => void;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isAdmin: false,

      setAuth: (token: string) => {
        const decodedToken = decodeToken(token);
        const user: User = {
          id: decodedToken?.id || 0,
          name: decodedToken?.name || '',
          email: decodedToken?.email || '',
          isAdmin: decodedToken?.isAdmin || false,
        };

        setToken(token);
        set({
          user,
          token,
          isAuthenticated: true,
          isAdmin: user.isAdmin || false,
        });
      },

      logout: () => {
        removeToken();
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isAdmin: false,
        });
      },

      initializeAuth: () => {
        const token = getToken();
        if (token) {
          const decodedToken = decodeToken(token);
          if (decodedToken) {
            const user: User = {
              id: decodedToken.id || 0,
              name: decodedToken.name || '',
              email: decodedToken.email || '',
              isAdmin: decodedToken.isAdmin || false,
            };

            set({
              user,
              token,
              isAuthenticated: true,
              isAdmin: user.isAdmin || false,
            });
          } else {
            // Invalid token
            removeToken();
            set({
              user: null,
              token: null,
              isAuthenticated: false,
              isAdmin: false,
            });
          }
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        isAdmin: state.isAdmin,
      }),
    }
  )
);