import React from 'react';

import { ForgotPasswordForm } from '@/components/features/auth/forgot-password-form';
import { FocusAwareStatusBar } from '@/components/ui';

export default function ForgotPasswordScreen() {
  const onSubmit = (data: { email: string }) => {
    console.log('Reset password for:', data.email);
    // TODO: Implement actual password reset logic in Epic 3
  };

  return (
    <>
      <FocusAwareStatusBar />
      <ForgotPasswordForm onSubmit={onSubmit} />
    </>
  );
}
