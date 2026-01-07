/**
 * Scan Results Screen
 *
 * Displays results from reverse image search.
 * Shows found images or empty state if no matches.
 */
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { Linking, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { EmptyResults, ScanResultItem } from '@/components/features/scan';
import { Button, FocusAwareStatusBar, Text } from '@/components/ui';
import { layout, lightColors, spacing, textStyles } from '@/lib/design-system';
import { useScanActions, useScanResults } from '@/store/scan-store';
import type { ScanResult } from '@/types/scan.types';

export default function ScanResultsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const results = useScanResults();
  const { reset } = useScanActions();

  const handleNewScan = useCallback(() => {
    reset();
    router.replace('/(app)/scan');
  }, [reset, router]);

  const handleDone = useCallback(() => {
    reset();
    router.replace('/(app)');
  }, [reset, router]);

  const handleResultPress = useCallback((result: ScanResult) => {
    Linking.openURL(result.sourceUrl).catch(() => {
      // Silently fail if URL can't be opened
    });
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: ScanResult }) => (
      <ScanResultItem
        result={item}
        onPress={() => handleResultPress(item)}
        testID={`result-${item.id}`}
      />
    ),
    [handleResultPress]
  );

  const keyExtractor = useCallback((item: ScanResult) => item.id, []);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <FocusAwareStatusBar />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Scan Results</Text>
        <Text style={styles.subtitle}>
          {results.length > 0
            ? `Found ${results.length} potential match${results.length === 1 ? '' : 'es'}`
            : 'Scan complete'}
        </Text>
      </View>

      {/* Results List or Empty State */}
      <View style={styles.content}>
        {results.length > 0 ? (
          <FlashList
            data={results}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            estimatedItemSize={100}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <EmptyResults testID="empty-results" />
        )}
      </View>

      {/* Footer Actions */}
      <View
        style={[styles.footer, { paddingBottom: insets.bottom + spacing.lg }]}
      >
        <View style={styles.buttonRow}>
          <Pressable style={styles.secondaryButton} onPress={handleNewScan}>
            <Text style={styles.secondaryButtonText}>New Scan</Text>
          </Pressable>

          <View style={styles.primaryButtonContainer}>
            <Button label="Done" onPress={handleDone} testID="done-button" />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightColors.background.primary,
  },
  header: {
    paddingHorizontal: layout.screenMargin,
    paddingVertical: spacing.lg,
  },
  title: {
    fontSize: textStyles.screenTitle.fontSize,
    fontWeight: '600',
    color: lightColors.text.primary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 16,
    color: lightColors.text.secondary,
  },
  content: {
    flex: 1,
  },
  list: {
    paddingHorizontal: layout.screenMargin,
    paddingBottom: spacing.lg,
  },
  footer: {
    paddingHorizontal: layout.screenMargin,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: lightColors.border.secondary,
    backgroundColor: lightColors.background.primary,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  secondaryButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: lightColors.border.primary,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: lightColors.text.primary,
  },
  primaryButtonContainer: {
    flex: 1,
  },
});
