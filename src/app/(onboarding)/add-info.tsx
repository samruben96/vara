import { useRouter } from 'expo-router';
import React, { useRef } from 'react';
import { showMessage } from 'react-native-flash-message';

import {
  AddInfoContent,
  type AddInfoContentRef,
  type AddInfoFormType,
  OnboardingLayout,
} from '@/components/features/onboarding';

export default function AddInfoScreen() {
  const router = useRouter();
  const formRef = useRef<AddInfoContentRef>(null);

  const handleSubmit = (_data: AddInfoFormType) => {
    // Shell only - show message instead of saving
    showMessage({
      message: 'Profile Info',
      description: 'Profile data will be saved in Epic 4',
      type: 'info',
      duration: 2000,
    });
    router.push('/(onboarding)/first-scan');
  };

  const handleNext = async () => {
    if (formRef.current) {
      const isValid = await formRef.current.submit();
      // Navigation happens in handleSubmit if valid
      if (!isValid) {
        showMessage({
          message: 'Validation Error',
          description: 'Please enter your first name to continue',
          type: 'warning',
          duration: 2000,
        });
      }
    }
  };

  const handleSkip = () => {
    router.push('/(onboarding)/first-scan');
  };

  return (
    <OnboardingLayout
      title="Tell Us About You"
      description="Help us personalize your protection"
      currentStep={4}
      onNext={handleNext}
      onBack={() => router.back()}
      onSkip={handleSkip}
      nextLabel="Continue"
      showSkip={true}
    >
      <AddInfoContent ref={formRef} onSubmit={handleSubmit} />
    </OnboardingLayout>
  );
}
