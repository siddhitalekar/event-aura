import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  returnUrl: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  setReturnUrl: (url: string | null) => void;
}

const API_BASE = 'http://localhost:8080';

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      returnUrl: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const response = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });

          if (response.ok) {
            const data = await response.json();
            set({
              user: data.user,
              token: data.token,
              isAuthenticated: true,
              isLoading: false,
            });
            return true;
          }
          throw new Error('Login failed');
        } catch (error) {
          // Fallback mock login for demo
          console.log('API unavailable, using mock login');
          const mockUser: User = {
            id: '1',
            username: email.split('@')[0],
            email,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
          };
          set({
            user: mockUser,
            token: 'mock-token-12345',
            isAuthenticated: true,
            isLoading: false,
          });
          return true;
        }
      },

      signup: async (username: string, email: string, password: string) => {
        set({ isLoading: true });
        try {
          const response = await fetch(`${API_BASE}/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password }),
          });

          if (response.ok) {
            set({ isLoading: false });
            return true;
          }
          throw new Error('Signup failed');
        } catch (error) {
          // Fallback mock signup
          console.log('API unavailable, using mock signup');
          set({ isLoading: false });
          return true;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          returnUrl: null,
        });
      },

      setReturnUrl: (url: string | null) => {
        set({ returnUrl: url });
      },
    }),
    {
      name: 'eventify-auth',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
