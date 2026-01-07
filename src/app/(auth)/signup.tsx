/**
 * Signup Screen (Story 3.1 - Task 4)
 * @description Handles user registration with email/password
 */
import { useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Alert } from 'react-native';

import { useCreateAuditLog } from '@/api/mutations/use-create-audit-log';
import { useSignup } from '@/api/mutations/use-signup';
import { SignupForm } from '@/components/features/auth/signup-form';
import { FocusAwareStatusBar } from '@/components/ui';
import { AUTH_ACTIONS, getAuthErrorMessage } from '@/lib/auth-errors';
import { Sentry } from '@/lib/sentry';

export default function SignupScreen() {
  const router = useRouter();
  const signupMutation = useSignup();
  const auditLogMutation = useCreateAuditLog();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = useCallback(
    async (data: { fullName: string; email: string; password: string }) => {
      setIsSubmitting(true);

      try {
        const result = await signupMutation.mutateAsync({
          email: data.email,
          password: data.password,
          fullName: data.fullName,
        });

        // Create audit log for successful signup
        if (result.user) {
          try {
            await auditLogMutation.mutateAsync({
              action: AUTH_ACTIONS.REGISTRATION,
              resourceType: 'user',
              resourceId: result.user.id,
              metadata: { method: 'email' },
            });
          } catch {
            // Audit log failure is non-critical, continue with signup flow
            console.warn('Failed to create audit log for registration');
          }

          // Check if email confirmation is required
          if (!result.session) {
            // Email confirmation required - navigate to verify email screen
            router.replace({
              pathname: '/(auth)/verify-email',
              params: { email: data.email },
            });
          } else {
            // Auto-confirmed (if email confirmation disabled) - go to onboarding
            router.replace('/(onboarding)/welcome');
          }
        }
      } catch (error) {
        // Log to Sentry before showing user error (per project-context.md)
        Sentry.captureException(error);
        const errorMessage = getAuthErrorMessage(error);
        Alert.alert('Registration Failed', errorMessage);
      } finally {
        setIsSubmitting(false);
      }
    },
    [signupMutation, auditLogMutation, router]
  );

  return (
    <>
      <FocusAwareStatusBar />
      <SignupForm onSubmit={onSubmit} isLoading={isSubmitting} />
    </>
  );
}
