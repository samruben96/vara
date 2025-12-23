import * as React from 'react';
import { View as RNView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HomeContent } from '@/components/features/home';
import { FocusAwareStatusBar } from '@/components/ui';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <RNView style={{ flex: 1, paddingTop: insets.top }}>
      <FocusAwareStatusBar />
      <HomeContent />
    </RNView>
  );
}
