import { Redirect } from 'expo-router';
import React from 'react';

import { useIsFirstTime } from '@/lib/hooks';

export default function Onboarding() {
  const [isFirstTime, setIsFirstTime] = useIsFirstTime();

  // If first time, redirect to the new onboarding flow
  if (isFirstTime) {
    setIsFirstTime(false);
    return <Redirect href="/(onboarding)/welcome" />;
  }

  // If not first time, redirect to login
  return <Redirect href="/(auth)/login" />;
}
