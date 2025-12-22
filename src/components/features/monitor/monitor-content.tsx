import React, { useCallback } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text } from '@/components/ui/text';
import { layout, lightColors, spacing } from '@/lib/design-system';

import { type AccountItem, AccountList } from './account-list';
import { AddButton } from './add-button';
import { PhotoGrid, type PhotoItem } from './photo-grid';

// Mock data for photos
const mockPhotos: PhotoItem[] = [
  { id: '1', uri: 'https://picsum.photos/seed/vara1/200', status: 'protected' },
  { id: '2', uri: 'https://picsum.photos/seed/vara2/200', status: 'protected' },
  { id: '3', uri: 'https://picsum.photos/seed/vara3/200', status: 'attention' },
  { id: '4', uri: 'https://picsum.photos/seed/vara4/200', status: 'protected' },
  { id: '5', uri: 'https://picsum.photos/seed/vara5/200', status: 'critical' },
  { id: '6', uri: 'https://picsum.photos/seed/vara6/200', status: 'protected' },
];

// Mock data for accounts
const mockAccounts: AccountItem[] = [
  { id: '1', platform: 'instagram', handle: '@varauser', status: 'connected' },
  { id: '2', platform: 'twitter', handle: '@varauser', status: 'pending' },
  { id: '3', platform: 'tiktok', handle: '@varauser', status: 'connected' },
];

export function MonitorContent() {
  const insets = useSafeAreaInsets();

  const handlePhotoPress = useCallback((id: string) => {
    Alert.alert('Coming Soon', `Image detail view for photo ${id}`);
  }, []);

  const handleAccountPress = useCallback((id: string) => {
    Alert.alert('Coming Soon', `Account settings for account ${id}`);
  }, []);

  const handleAddPhotos = useCallback(() => {
    Alert.alert('Coming Soon', 'Add photos feature is under development');
  }, []);

  const handleLinkAccount = useCallback(() => {
    Alert.alert('Coming Soon', 'Link account feature is under development');
  }, []);

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
        <View style={styles.section}>
          <Text style={styles.sectionTitle} accessibilityRole="header">
            Your Monitored Photos
          </Text>
          <PhotoGrid photos={mockPhotos} onPhotoPress={handlePhotoPress} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle} accessibilityRole="header">
            Linked Accounts
          </Text>
          <AccountList
            accounts={mockAccounts}
            onAccountPress={handleAccountPress}
          />
        </View>

        <View style={styles.fabSpacer} />
      </ScrollView>

      <AddButton
        onAddPhotos={handleAddPhotos}
        onLinkAccount={handleLinkAccount}
      />
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
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: lightColors.text.primary,
    marginBottom: spacing.md,
  },
  fabSpacer: {
    height: 80,
  },
});
