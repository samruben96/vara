/**
 * Email Verification Pending Screen (Story 3.1 - Task 3)
 * @description Shown after signup to prompt user to verify their email
 */
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View as RNView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, FocusAwareStatusBar, Text, View } from '@/components/ui';
import { MailIcon } from '@/components/ui/icons';
import { brandColors, feedbackColors, lightColors } from '@/lib/design-system';
import { Sentry } from '@/lib/sentry';
import { supabase } from '@/lib/supabase';

export default function VerifyEmailScreen() {
  const { email } = useLocalSearchParams<{ email: string }>();
  const router = useRouter();
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [resendError, setResendError] = useState<string | null>(null);

  const handleResend = async () => {
    if (!email) return;

    setIsResending(true);
    setResendError(null);
    setResendSuccess(false);

    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
      });

      if (error) {
        setResendError(error.message);
      } else {
        setResendSuccess(true);
      }
    } catch (error) {
      // Log to Sentry before showing user error (per project-context.md)
      Sentry.captureException(error);
      console.error('Resend verification failed:', error);
      setResendError('Something went wrong. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  const handleBackToLogin = () => {
    router.replace('/(auth)/login');
  };

  return (
    <>
      <FocusAwareStatusBar />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <RNView style={styles.iconContainer}>
            <MailIcon size={64} color={brandColors.mint} />
          </RNView>

          <Text testID="verify-email-title" style={styles.title}>
            Check Your Email
          </Text>

          <Text style={styles.subtitle}>We sent a verification link to</Text>

          <Text testID="verify-email-address" style={styles.email}>
            {email || 'your email'}
          </Text>

          <Text style={styles.instructions}>
            Click the link in the email to verify your account. If you don't see
            the email, check your spam folder.
          </Text>

          {resendSuccess && (
            <RNView style={styles.successBanner}>
              <Text style={styles.successText}>
                Verification email sent successfully!
              </Text>
            </RNView>
          )}

          {resendError && (
            <RNView style={styles.errorBanner}>
              <Text style={styles.errorText}>{resendError}</Text>
            </RNView>
          )}

          <Button
            testID="resend-email-button"
            label="Resend Email"
            onPress={handleResend}
            loading={isResending}
            disabled={isResending}
            style={styles.resendButton}
          />

          <Button
            testID="back-to-login-button"
            label="Back to Login"
            variant="outline"
            onPress={handleBackToLogin}
            style={styles.backButton}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: lightColors.background.primary,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: 'PlusJakartaSans-SemiBold',
    color: lightColors.text.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    fontFamily: 'PlusJakartaSans-Regular',
    color: lightColors.text.secondary,
    textAlign: 'center',
  },
  email: {
    fontSize: 15,
    fontFamily: 'PlusJakartaSans-SemiBold',
    color: lightColors.text.primary,
    marginBottom: 16,
    textAlign: 'center',
  },
  instructions: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Regular',
    color: lightColors.text.tertiary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
    paddingHorizontal: 16,
  },
  successBanner: {
    backgroundColor: feedbackColors.success.background,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
    width: '100%',
  },
  successText: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Medium',
    color: feedbackColors.success.text,
    textAlign: 'center',
  },
  errorBanner: {
    backgroundColor: feedbackColors.error.background,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
    width: '100%',
  },
  errorText: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Medium',
    color: feedbackColors.error.text,
    textAlign: 'center',
  },
  resendButton: {
    width: '100%',
    marginBottom: 12,
  },
  backButton: {
    width: '100%',
  },
});
