import * as React from 'react';

import { FocusAwareStatusBar, Text, View } from '@/components/ui';

export default function AlertsScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-charcoal-900">
      <FocusAwareStatusBar />
      <Text className="text-xl font-bold text-cream">Alerts</Text>
      <Text className="mt-2 text-neutral-400">Coming soon</Text>
    </View>
  );
}
