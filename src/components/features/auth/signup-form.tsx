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

const signupSchema = z
  .object({
    fullName: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email format'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type SignupFormType = z.infer<typeof signupSchema>;

export type SignupFormProps = {
  onSubmit?: SubmitHandler<Omit<SignupFormType, 'confirmPassword'>>;
  isLoading?: boolean;
};

function SignupHeader() {
  return (
    <View style={styles.header}>
      <RNView style={styles.logoContainer}>
        <Text style={styles.logoText}>vara</Text>
      </RNView>
      <Text testID="signup-title" style={styles.title}>
        Create Account
      </Text>
      <Text style={styles.subtitle}>
        Start protecting your digital identity today.
      </Text>
    </View>
  );
}

function FormFields({ control }: { control: Control<SignupFormType> }) {
  return (
    <>
      <ControlledInput
        testID="fullname-input"
        control={control}
        name="fullName"
        label="Full Name"
        autoCapitalize="words"
        autoComplete="name"
        style={styles.input}
      />
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
        placeholder="Create a password"
        secureTextEntry={true}
        autoComplete="new-password"
        style={styles.input}
      />
      <Text style={styles.passwordHint}>
        Must be 8+ characters with an uppercase letter and number
      </Text>
      <ControlledInput
        testID="confirm-password-input"
        control={control}
        name="confirmPassword"
        label="Confirm Password"
        placeholder="Re-enter your password"
        secureTextEntry={true}
        autoComplete="new-password"
        style={styles.input}
      />
    </>
  );
}

export function SignupForm({
  onSubmit = () => {},
  isLoading = false,
}: SignupFormProps) {
  const router = useRouter();
  const { handleSubmit, control } = useForm<SignupFormType>({
    resolver: zodResolver(signupSchema),
  });

  const navigateToLogin = () => router.back();

  const handleFormSubmit: SubmitHandler<SignupFormType> = (data) => {
    const { fullName, email, password } = data;
    onSubmit({ fullName, email, password });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior="padding"
        keyboardVerticalOffset={10}
      >
        <View style={styles.container}>
          <SignupHeader />
          <View style={styles.form}>
            <FormFields control={control} />
            <Button
              testID="signup-button"
              label="Create Account"
              onPress={handleSubmit(handleFormSubmit)}
              loading={isLoading}
              disabled={isLoading}
              style={styles.submitButton}
            />
          </View>
          <View style={styles.dividerContainer}>
            <RNView style={styles.dividerLine} />
            <Text style={styles.dividerText}>or sign up with</Text>
            <RNView style={styles.dividerLine} />
          </View>
          <View style={styles.socialButtons}>
            <SocialButton provider="google" onPress={() => {}} />
            <SocialButton provider="apple" onPress={() => {}} />
          </View>
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <Pressable onPress={navigateToLogin}>
              <Text style={styles.loginLink}>Sign In</Text>
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
  header: { alignItems: 'center', marginBottom: 24 },
  logoContainer: { marginBottom: 16 },
  logoText: {
    fontSize: 32,
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
  },
  form: { marginBottom: 16 },
  input: { marginBottom: 12 },
  passwordHint: {
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-Regular',
    color: lightColors.text.tertiary,
    marginBottom: 12,
    marginTop: -8,
  },
  submitButton: { marginTop: 8 },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
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
  socialButtons: { marginBottom: 16 },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 15,
    fontFamily: 'PlusJakartaSans-Regular',
    color: lightColors.text.secondary,
  },
  loginLink: {
    fontSize: 15,
    fontFamily: 'PlusJakartaSans-SemiBold',
    color: brandColors.mint,
  },
});
