/**
 * Auth Listener Hook (Story 1.5 - AC #4)
 *
 * Subscribes to Supabase auth state changes and syncs them to Zustand store.
 * Should be called once at app root level to maintain auth state sync.
 *
 * Responsibilities:
 * - Check initial session on mount via supabase.auth.getSession()
 * - Subscribe to onAuthStateChange events
 * - Sync auth state changes to Zustand store
 * - Handle session refresh events
 * - Clean up subscription on unmount
 */
import { useEffect } from 'react';

import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/store/auth-store';

export function useAuthListener() {
  const setSession = useAuthStore((state) => state.setSession);
  const setLoading = useAuthStore((state) => state.setLoading);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  useEffect(() => {
    // Check initial session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Subscribe to auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      // Update session in store for all auth events
      setSession(session);

      // Handle specific events
      if (event === 'SIGNED_OUT') {
        clearAuth();
      }

      // TOKEN_REFRESHED is handled automatically by setSession
      // SIGNED_IN is handled automatically by setSession
    });

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [setSession, setLoading, clearAuth]);
}
