/**
 * Auth Store (Story 1.5)
 *
 * Zustand store for client-side auth state management.
 * Uses MMKV for secure persistence between app sessions.
 *
 * Per Architecture: Use Zustand ONLY for client-side state like auth.
 * Server data should use React Query hooks in /src/api/
 */
import type { Session, User as SupabaseUser } from '@supabase/supabase-js';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { storage } from '@/lib/storage';

// MMKV storage adapter for Zustand persistence
const mmkvStorage = {
  getItem: (name: string) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  setItem: (name: string, value: string) => {
    storage.set(name, value);
  },
  removeItem: (name: string) => {
    storage.delete(name);
  },
};

/**
 * AuthState interface as specified in AC #3
 *
 * State includes: user, session, isAuthenticated, isLoading
 * Actions include: setUser, setSession, signOut, clearAuth
 */
interface AuthState {
  // State
  user: SupabaseUser | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  setUser: (user: SupabaseUser | null) => void;
  setSession: (session: Session | null) => void;
  setLoading: (loading: boolean) => void;
  signOut: () => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      session: null,
      isAuthenticated: false,
      isLoading: true,

      // Actions
      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
        }),

      setSession: (session) =>
        set({
          session,
          user: session?.user ?? null,
          isAuthenticated: !!session,
        }),

      setLoading: (loading) => set({ isLoading: loading }),

      signOut: () =>
        set({
          user: null,
          session: null,
          isAuthenticated: false,
          isLoading: false,
        }),

      clearAuth: () =>
        set({
          user: null,
          session: null,
          isAuthenticated: false,
          isLoading: false,
        }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => mmkvStorage),
      // Only persist auth state (not loading state)
      partialize: (state) => ({
        user: state.user,
        session: state.session,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Re-export User type from Supabase for convenience
export type { Session, SupabaseUser as User };
