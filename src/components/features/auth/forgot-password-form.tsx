import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import type { Control, SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { Pressable, StyleSheet, View as RNView } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as z from 'zod';

import { Button, ControlledInput, Text, View } from '@/components/ui';
import { brandColors } from '@/lib/design-system';

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email format'),
});

export type ForgotPasswordFormType = z.infer<typeof forgotPasswordSchema>;
export type ForgotPasswordFormProps = {
  onSubmit?: SubmitHandler<ForgotPasswordFormType>;
};

function SuccessState({
  email,
  onBackToLogin,
}: {
  email: string;
  onBackToLogin: () => void;
}) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.successContainer}>
          <RNView style={styles.checkIconContainer}>
            <Text style={styles.checkIcon}>✓</Text>
          </RNView>
          <Text testID="success-title" style={styles.successTitle}>
            Check Your Email
          </Text>
          <Text style={styles.successMessage}>
            {"We've sent a password reset link to\n"}
            <Text style={styles.emailHighlight}>{email}</Text>
          </Text>
          <Text style={styles.successHint}>
            {"Didn't receive the email? Check your spam folder or try again."}
          </Text>
          <Button
            testID="back-to-login-button"
            label="Back to Sign In"
            onPress={onBackToLogin}
            style={styles.backButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

function FormHeader() {
  return (
    <View style={styles.header}>
      <RNView style={styles.logoContainer}>
        <Text style={styles.logoText}>vara</Text>
      </RNView>
      <Text testID="forgot-password-title" style={styles.title}>
        Reset Password
      </Text>
      <Text style={styles.subtitle}>
        {
          "Enter your email address and we'll send you a link to reset your password."
        }
      </Text>
    </View>
  );
}

function EmailForm({ control }: { control: Control<ForgotPasswordFormType> }) {
  return (
    <ControlledInput
      testID="email-input"
      control={control}
      name="email"
      label="Email"
      keyboardType="email-address"
      autoCapitalize="none"
      autoComplete="email"
      style={styles.input}
    />
  );
}

export function ForgotPasswordForm({
  onSubmit = () => {},
}: ForgotPasswordFormProps) {
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { handleSubmit, control, getValues } = useForm<ForgotPasswordFormType>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const navigateToLogin = () => router.back();
  const handleFormSubmit: SubmitHandler<ForgotPasswordFormType> = (data) => {
    onSubmit(data);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <SuccessState
        email={getValues('email')}
        onBackToLogin={navigateToLogin}
      />
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior="padding"
        keyboardVerticalOffset={10}
      >
        <View style={styles.container}>
          <FormHeader />
          <View style={styles.form}>
            <EmailForm control={control} />
            <Button
              testID="reset-button"
              label="Send Reset Link"
              onPress={handleSubmit(handleFormSubmit)}
              style={styles.submitButton}
            />
          </View>
          <View style={styles.loginContainer}>
            <Pressable onPress={navigateToLogin} style={styles.backLink}>
              <Text style={styles.backLinkText}>← Back to Sign In</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: brandColors.charcoal },
  keyboardView: { flex: 1 },
  container: { flex: 1, paddingHorizontal: 24, justifyContent: 'center' },
  header: { alignItems: 'center', marginBottom: 32 },
  logoContainer: { marginBottom: 24 },
  logoText: {
    fontSize: 32,
    fontFamily: 'PlusJakartaSans-SemiBold',
    color: brandColors.mint,
    letterSpacing: -1,
  },
  title: {
    fontSize: 24,
    fontFamily: 'PlusJakartaSans-SemiBold',
    color: brandColors.cream,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: 'PlusJakartaSans-Regular',
    color: '#AAAAAA',
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 300,
  },
  form: { marginBottom: 24 },
  input: { marginBottom: 16 },
  submitButton: { marginTop: 8 },
  loginContainer: { alignItems: 'center' },
  backLink: { paddingVertical: 8, paddingHorizontal: 16 },
  backLinkText: {
    fontSize: 15,
    fontFamily: 'PlusJakartaSans-Medium',
    color: brandColors.mint,
  },
  successContainer: { alignItems: 'center', paddingHorizontal: 16 },
  checkIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: brandColors.mint,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  checkIcon: { fontSize: 32, color: brandColors.charcoal, fontWeight: 'bold' },
  successTitle: {
    fontSize: 24,
    fontFamily: 'PlusJakartaSans-SemiBold',
    color: brandColors.cream,
    marginBottom: 12,
  },
  successMessage: {
    fontSize: 15,
    fontFamily: 'PlusJakartaSans-Regular',
    color: '#AAAAAA',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 8,
  },
  emailHighlight: {
    color: brandColors.cream,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  successHint: {
    fontSize: 13,
    fontFamily: 'PlusJakartaSans-Regular',
    color: '#777777',
    textAlign: 'center',
    marginBottom: 32,
  },
  backButton: { width: '100%' },
});
