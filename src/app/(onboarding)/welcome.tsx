import { useRouter } from 'expo-router';
import React from 'react';

import {
  OnboardingLayout,
  WelcomeContent,
} from '@/components/features/onboarding';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <OnboardingLayout
      title="Welcome to vara"
      description="Your digital guardian"
      currentStep={1}
      onNext={() => router.push('/(onboarding)/permissions')}
      nextLabel="Get Started"
      showBack={false}
    >
      <WelcomeContent />
    </OnboardingLayout>
  );
}
