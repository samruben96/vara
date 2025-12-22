import * as React from 'react';

import { FocusAwareStatusBar, Text, View } from '@/components/ui';

export default function MonitorScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-charcoal-900">
      <FocusAwareStatusBar />
      <Text className="text-xl font-bold text-cream">Monitor</Text>
      <Text className="mt-2 text-neutral-400">Coming soon</Text>
    </View>
  );
}
