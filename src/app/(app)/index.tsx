import * as React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HomeContent } from '@/components/features/home';
import { FocusAwareStatusBar, View } from '@/components/ui';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-charcoal-900" style={{ paddingTop: insets.top }}>
      <FocusAwareStatusBar />
      <HomeContent />
    </View>
  );
}
