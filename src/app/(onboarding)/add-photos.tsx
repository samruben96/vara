import { useRouter } from 'expo-router';
import React from 'react';
import { showMessage } from 'react-native-flash-message';

import {
  AddPhotosContent,
  OnboardingLayout,
} from '@/components/features/onboarding';

export default function AddPhotosScreen() {
  const router = useRouter();

  const handleUpload = () => {
    // Shell only - show message instead of opening gallery
    showMessage({
      message: 'Photo Upload',
      description: 'Photo upload will be implemented in Epic 4',
      type: 'info',
      duration: 2000,
    });
  };

  const handleCapture = () => {
    // Shell only - show message instead of opening camera
    showMessage({
      message: 'Camera',
      description: 'Photo capture will be implemented in Epic 4',
      type: 'info',
      duration: 2000,
    });
  };

  return (
    <OnboardingLayout
      title="Add Photos"
      description="Help us protect your digital identity"
      currentStep={3}
      onNext={() => router.push('/(onboarding)/add-info')}
      onBack={() => router.back()}
      nextLabel="Continue"
    >
      <AddPhotosContent onUpload={handleUpload} onCapture={handleCapture} />
    </OnboardingLayout>
  );
}
