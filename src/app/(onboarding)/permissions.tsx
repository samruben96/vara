import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { showMessage } from 'react-native-flash-message';

import {
  OnboardingLayout,
  PermissionsContent,
} from '@/components/features/onboarding';

type PermissionStatus = 'pending' | 'granted';

export default function PermissionsScreen() {
  const router = useRouter();
  const [cameraStatus, setCameraStatus] = useState<PermissionStatus>('pending');
  const [notificationStatus, setNotificationStatus] =
    useState<PermissionStatus>('pending');

  const handleAllowCamera = () => {
    // Shell only - show message instead of actually requesting permission
    showMessage({
      message: 'Camera Permission',
      description: 'Camera access will be requested in Epic 4',
      type: 'info',
      duration: 2000,
    });
    setCameraStatus('granted');
  };

  const handleAllowNotifications = () => {
    // Shell only - show message instead of actually requesting permission
    showMessage({
      message: 'Notification Permission',
      description: 'Push notifications will be configured in Epic 8',
      type: 'info',
      duration: 2000,
    });
    setNotificationStatus('granted');
  };

  return (
    <OnboardingLayout
      title="Permissions"
      description="vara needs a few permissions to protect you"
      currentStep={2}
      onNext={() => router.push('/(onboarding)/add-photos')}
      onBack={() => router.back()}
      nextLabel="Continue"
    >
      <PermissionsContent
        cameraStatus={cameraStatus}
        notificationStatus={notificationStatus}
        onAllowCamera={handleAllowCamera}
        onAllowNotifications={handleAllowNotifications}
      />
    </OnboardingLayout>
  );
}
