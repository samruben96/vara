import * as React from 'react';

import { MonitorContent } from '@/components/features/monitor';
import { FocusAwareStatusBar } from '@/components/ui';

export default function MonitorScreen() {
  return (
    <>
      <FocusAwareStatusBar />
      <MonitorContent />
    </>
  );
}
