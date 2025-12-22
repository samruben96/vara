import { useRouter } from 'expo-router';
import React from 'react';

import { SignupForm } from '@/components/features/auth/signup-form';
import { FocusAwareStatusBar } from '@/components/ui';

export default function SignupScreen() {
  const router = useRouter();

  const onSubmit = (data: {
    fullName: string;
    email: string;
    password: string;
  }) => {
    console.log('Signup data:', data);
    // TODO: Implement actual signup logic in Epic 3
    // After successful signup, navigate to onboarding welcome screen
    router.replace('/(onboarding)/welcome');
  };

  return (
    <>
      <FocusAwareStatusBar />
      <SignupForm onSubmit={onSubmit} />
    </>
  );
}
