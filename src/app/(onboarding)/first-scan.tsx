import { useRouter } from 'expo-router';
import React from 'react';
import { showMessage } from 'react-native-flash-message';

import {
  FirstScanContent,
  OnboardingLayout,
} from '@/components/features/onboarding';

export default function FirstScanScreen() {
  const router = useRouter();

  const handleStartScan = () => {
    // Shell only - show message and navigate to home
    showMessage({
      message: 'Scan Started',
      description: 'Scan functionality will be implemented in Epic 6',
      type: 'info',
      duration: 2000,
    });
    router.replace('/(app)');
  };

  return (
    <OnboardingLayout
      title="Ready to Scan"
      description="Let's check your digital presence"
      currentStep={5}
      onNext={handleStartScan}
      nextLabel="Start Scan"
      showBack={false}
    >
      <FirstScanContent />
    </OnboardingLayout>
  );
}
