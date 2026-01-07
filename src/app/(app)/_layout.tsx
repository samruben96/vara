import { Redirect, SplashScreen, Tabs } from 'expo-router';
import React, { useCallback, useEffect } from 'react';

import { TabBar } from '@/components/layout/tab-bar';
import { useAuth, useIsFirstTime } from '@/lib';

export default function TabLayout() {
  const status = useAuth.use.status();
  const [isFirstTime] = useIsFirstTime();
  const hideSplash = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    if (status !== 'idle') {
      setTimeout(() => {
        hideSplash();
      }, 1000);
    }
  }, [hideSplash, status]);

  if (isFirstTime) {
    return <Redirect href="/onboarding" />;
  }
  if (status === 'signOut') {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarButtonTestID: 'home-tab',
          tabBarAccessibilityLabel: 'Home tab',
        }}
      />
      <Tabs.Screen
        name="monitor"
        options={{
          title: 'Monitor',
          tabBarButtonTestID: 'monitor-tab',
          tabBarAccessibilityLabel: 'Monitor tab',
        }}
      />
      <Tabs.Screen
        name="alerts"
        options={{
          title: 'Alerts',
          tabBarButtonTestID: 'alerts-tab',
          tabBarAccessibilityLabel: 'Alerts tab',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarButtonTestID: 'settings-tab',
          tabBarAccessibilityLabel: 'Settings tab',
        }}
      />
      {/* Scan screens - hidden from tab bar */}
      <Tabs.Screen
        name="scan"
        options={{
          href: null, // Hide from tab bar
        }}
      />
    </Tabs>
  );
}
