import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';

interface UserStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async (email, password) => {
        // Fake authentication - accepts any email/password
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        const encodedEmail = encodeURIComponent(email.split('@')[0]);
        const user: User = {
          id: Math.random().toString(36).substring(7),
          email,
          name: email.split('@')[0],
          avatar: `https://ui-avatars.com/api/?name=${encodedEmail}&background=random`
        };

        set({ user, isAuthenticated: true });
        return true;
      },

      register: async (email, password, name) => {
        // Fake registration - accepts any data
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        const encodedName = encodeURIComponent(name);
        const user: User = {
          id: Math.random().toString(36).substring(7),
          email,
          name,
          avatar: `https://ui-avatars.com/api/?name=${encodedName}&background=random`
        };

        set({ user, isAuthenticated: true });
        return true;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateProfile: (data) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null
        }));
      }
    }),
    {
      name: 'user-storage'
    }
  )
);
