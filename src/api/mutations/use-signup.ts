/**
 * Signup Mutation Hook (Story 3.1 - Task 1)
 * @description React Query mutation for user registration with email/password
 */
import type { AuthError, Session, User } from '@supabase/supabase-js';
import { useMutation } from '@tanstack/react-query';

import { supabase } from '@/lib/supabase';

export interface SignupData {
  email: string;
  password: string;
  fullName: string;
}

export interface SignupResult {
  user: User | null;
  session: Session | null;
}

/**
 * useSignup - React Query mutation hook for user registration
 *
 * @example
 * ```tsx
 * const { mutate, isLoading, error } = useSignup();
 *
 * const handleSignup = (data: SignupData) => {
 *   mutate(data, {
 *     onSuccess: (result) => {
 *       if (result.user && !result.session) {
 *         // Email confirmation required
 *         router.replace({ pathname: '/(auth)/verify-email', params: { email: data.email } });
 *       }
 *     },
 *   });
 * };
 * ```
 */
export function useSignup() {
  return useMutation<SignupResult, AuthError, SignupData>({
    mutationFn: async ({ email, password, fullName }: SignupData) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
        },
      });

      if (error) {
        throw error;
      }

      return data;
    },
    // Note: Do NOT update auth store here - useAuthListener handles this
  });
}
