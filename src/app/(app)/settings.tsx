import * as React from 'react';

import { SettingsContent } from '@/components/features/settings';
import { FocusAwareStatusBar } from '@/components/ui';

export default function Settings() {
  return (
    <>
      <FocusAwareStatusBar />
      <SettingsContent />
    </>
  );
}
