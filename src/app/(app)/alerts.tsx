import * as React from 'react';

import { AlertsContent } from '@/components/features/alerts';
import { FocusAwareStatusBar } from '@/components/ui';

export default function AlertsScreen() {
  return (
    <>
      <FocusAwareStatusBar />
      <AlertsContent />
    </>
  );
}
