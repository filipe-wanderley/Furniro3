import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AuthUser = {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

type AuthStore = {
  token: string | null;
  user: AuthUser | null;
  isInitialized: boolean;
  hasHydrated: boolean;
  setSession: (token: string, user: AuthUser) => void;
  clearSession: () => void;
  setInitialized: () => void;
  setHydrated: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isInitialized: false,
      hasHydrated: false,
      setSession: (token, user) => set({ token, user, isInitialized: true }),
      clearSession: () => set({ token: null, user: null, isInitialized: true }),
      setInitialized: () => set({ isInitialized: true }),
      setHydrated: () => set({ hasHydrated: true }),
    }),
    {
      name: "furniro-auth",
      partialize: (state) => ({ token: state.token, user: state.user }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);
