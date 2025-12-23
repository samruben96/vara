/**
 * ImageProtectionDetail Component - Story 2.9
 *
 * AC30: Detail screen with "Last Scan" timestamp, results list with
 * colored bullets, and coral "Review Matches" CTA.
 */

import * as Haptics from 'expo-haptics';
import React, { useCallback, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CheckmarkCircle } from '@/components/ui/icons';
import { Text } from '@/components/ui/text';
import {
  borderRadius,
  ctaColors,
  layout,
  lightColors,
  spacing,
  statusColors,
} from '@/lib/design-system';

import { AssessmentModal } from './assessment-modal';
import type { ResultItem } from './results-list';
import { ResultsList } from './results-list';

export interface ImageProtectionDetailProps {
  lastScanTime?: string;
  hasThreats?: boolean;
  threatMessage?: string;
  results?: ResultItem[];
  onReviewMatches?: () => void;
  testID?: string;
}

const DEFAULT_RESULTS: ResultItem[] = [
  { id: '1', label: 'Adult websites', count: 0, type: 'harmless' },
  { id: '2', label: 'Dating profiles', count: 0, type: 'harmless' },
  { id: '3', label: 'Social media', count: 0, type: 'harmless' },
  { id: '4', label: 'Other websites', count: 0, type: 'harmless' },
];

export function ImageProtectionDetail({
  lastScanTime = 'Today at 2:30 PM',
  hasThreats = false,
  threatMessage = 'No new threats detected',
  results = DEFAULT_RESULTS,
  onReviewMatches,
  testID,
}: ImageProtectionDetailProps) {
  const insets = useSafeAreaInsets();
  const [showModal, setShowModal] = useState(false);

  const handleReviewMatches = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (onReviewMatches) {
      onReviewMatches();
    } else {
      setShowModal(true);
    }
  }, [onReviewMatches]);

  const handleModalAction = useCallback(() => {
    setShowModal(false);
    // Navigate to action or handle in parent
  }, []);

  const handleModalDismiss = useCallback(() => {
    setShowModal(false);
  }, []);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]} testID={testID}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Text style={styles.header}>Image Protection</Text>

        {/* Last Scan */}
        <View style={styles.lastScanContainer}>
          <Text style={styles.lastScanLabel}>Last Scan</Text>
          <Text style={styles.lastScanTime}>{lastScanTime}</Text>
        </View>

        {/* Threat Status */}
        <View style={styles.statusCard}>
          <View style={styles.statusRow}>
            <CheckmarkCircle
              size={24}
              color={hasThreats ? statusColors.attention : statusColors.protected}
            />
            <Text style={styles.statusText}>{threatMessage}</Text>
          </View>
        </View>

        {/* Reverse Image Results */}
        <View style={styles.resultsSection}>
          <ResultsList items={results} title="Reverse Image Results" />
        </View>
      </ScrollView>

      {/* Fixed CTA at bottom */}
      <View style={[styles.ctaContainer, { paddingBottom: insets.bottom + spacing.md }]}>
        <Pressable
          onPress={handleReviewMatches}
          style={({ pressed }) => [
            styles.reviewButton,
            pressed && styles.reviewButtonPressed,
          ]}
          accessibilityRole="button"
          accessibilityLabel="Review Matches"
        >
          <Text style={styles.reviewButtonText}>Review Matches</Text>
        </Pressable>
      </View>

      {/* Assessment Modal (AC31) */}
      <AssessmentModal
        visible={showModal}
        title="Potential Match Found"
        description="We found an image that may be you. Review the match to confirm or dismiss."
        actionLabel="Take Action"
        dismissLabel="Dismiss"
        onAction={handleModalAction}
        onDismiss={handleModalDismiss}
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
    paddingBottom: 100, // Space for fixed CTA
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    color: lightColors.text.primary,
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  lastScanContainer: {
    marginBottom: spacing.lg,
  },
  lastScanLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: lightColors.text.tertiary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.xs,
  },
  lastScanTime: {
    fontSize: 15,
    fontWeight: '400',
    color: lightColors.text.primary,
  },
  statusCard: {
    backgroundColor: lightColors.background.secondary,
    borderRadius: layout.cardRadius,
    padding: layout.cardPadding,
    marginBottom: spacing.lg,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '500',
    color: lightColors.text.primary,
    flex: 1,
  },
  resultsSection: {
    marginTop: spacing.sm,
  },
  ctaContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: layout.screenMargin,
    paddingTop: spacing.md,
    backgroundColor: lightColors.background.primary,
    borderTopWidth: 1,
    borderTopColor: lightColors.border.secondary,
  },
  reviewButton: {
    backgroundColor: ctaColors.coral,
    borderRadius: borderRadius.full,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  reviewButtonPressed: {
    backgroundColor: ctaColors.coralDark,
  },
  reviewButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: lightColors.cta.primaryText,
  },
});
