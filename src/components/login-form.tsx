import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React from 'react';
import type { Control, SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { Pressable, StyleSheet, View as RNView } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as z from 'zod';

import {
  Button,
  ControlledInput,
  SocialButton,
  Text,
  View,
} from '@/components/ui';
import { brandColors, lightColors } from '@/lib/design-system';

const schema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email format'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(6, 'Password must be at least 6 characters'),
});

export type FormType = z.infer<typeof schema>;
export type LoginFormProps = { onSubmit?: SubmitHandler<FormType> };

function LoginHeader() {
  return (
    <View style={styles.header}>
      <RNView style={styles.logoContainer}>
        <Text style={styles.logoText}>vara</Text>
      </RNView>
      <Text testID="form-title" style={styles.title}>
        Sign In
      </Text>
      <Text style={styles.subtitle}>
        Welcome back! Sign in to continue protecting your digital identity.
      </Text>
    </View>
  );
}

function FormFields({
  control,
  onForgotPassword,
}: {
  control: Control<FormType>;
  onForgotPassword: () => void;
}) {
  return (
    <>
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
      <ControlledInput
        testID="password-input"
        control={control}
        name="password"
        label="Password"
        placeholder="Enter your password"
        secureTextEntry={true}
        autoComplete="password"
        style={styles.input}
      />
      <Pressable onPress={onForgotPassword} style={styles.forgotPasswordLink}>
        <Text style={styles.linkText}>Forgot Password?</Text>
      </Pressable>
    </>
  );
}

export function LoginForm({ onSubmit = () => {} }: LoginFormProps) {
  const router = useRouter();
  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  const navigateToSignup = () => router.push('/(auth)/signup');
  const navigateToForgotPassword = () => router.push('/(auth)/forgot-password');

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior="padding"
        keyboardVerticalOffset={10}
      >
        <View style={styles.container}>
          <LoginHeader />
          <View style={styles.form}>
            <FormFields
              control={control}
              onForgotPassword={navigateToForgotPassword}
            />
            <Button
              testID="login-button"
              label="Sign In"
              onPress={handleSubmit(onSubmit)}
              style={styles.submitButton}
            />
          </View>
          <View style={styles.dividerContainer}>
            <RNView style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with</Text>
            <RNView style={styles.dividerLine} />
          </View>
          <View style={styles.socialButtons}>
            <SocialButton provider="google" onPress={() => {}} />
            <SocialButton provider="apple" onPress={() => {}} />
          </View>
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>{"Don't have an account? "}</Text>
            <Pressable onPress={navigateToSignup}>
              <Text style={styles.signupLink}>Sign Up</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: lightColors.background.primary },
  keyboardView: { flex: 1 },
  container: { flex: 1, paddingHorizontal: 24, justifyContent: 'center' },
  header: { alignItems: 'center', marginBottom: 32 },
  logoContainer: { marginBottom: 24 },
  logoText: {
    fontSize: 40,
    fontFamily: 'PlusJakartaSans-SemiBold',
    color: brandColors.mint,
    letterSpacing: -1,
  },
  title: {
    fontSize: 24,
    fontFamily: 'PlusJakartaSans-SemiBold',
    color: lightColors.text.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: 'PlusJakartaSans-Regular',
    color: lightColors.text.secondary,
    textAlign: 'center',
    maxWidth: 280,
  },
  form: { marginBottom: 24 },
  input: { marginBottom: 16 },
  forgotPasswordLink: {
    alignSelf: 'flex-end',
    marginBottom: 16,
    paddingVertical: 4,
  },
  linkText: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Medium',
    color: brandColors.mint,
  },
  submitButton: { marginTop: 8 },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: lightColors.border.primary,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 13,
    fontFamily: 'PlusJakartaSans-Regular',
    color: lightColors.text.tertiary,
  },
  socialButtons: { marginBottom: 24 },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    fontSize: 15,
    fontFamily: 'PlusJakartaSans-Regular',
    color: lightColors.text.secondary,
  },
  signupLink: {
    fontSize: 15,
    fontFamily: 'PlusJakartaSans-SemiBold',
    color: brandColors.mint,
  },
});
