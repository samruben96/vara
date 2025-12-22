import React, { useCallback } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAuth } from '@/lib';
import { layout, lightColors, spacing } from '@/lib/design-system';

import { type ProfileData, ProfileSummary } from './profile-summary';
import { SettingsGroups } from './settings-groups';

// Mock profile data
const mockProfile: ProfileData = {
  name: 'Vara User',
  email: 'user@example.com',
  subscriptionTier: 'premium',
};

export function SettingsContent() {
  const insets = useSafeAreaInsets();
  const signOut = useAuth.use.signOut();

  const handleNavigate = useCallback((destination: string) => {
    Alert.alert('Coming Soon', `${destination} is under development`);
  }, []);

  const handleSignOut = useCallback(() => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign Out', style: 'destructive', onPress: signOut },
    ]);
  }, [signOut]);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + spacing.md },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileSection}>
          <ProfileSummary profile={mockProfile} />
        </View>
        <SettingsGroups onNavigate={handleNavigate} onSignOut={handleSignOut} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightColors.background.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: layout.screenMargin,
    paddingBottom: spacing.xl,
  },
  profileSection: {
    marginBottom: spacing.lg,
  },
});
