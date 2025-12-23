/**
 * HomeContent Component - Story 2.9 Updated
 *
 * AC27: StatusCircle with ample vertical padding (32px top, 24px bottom)
 * AC29: "Your Digital Safety Today" design with protection score, feature list, notification banner
 */

import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

import { ShieldIcon } from '@/components/ui/icons';
import { StatusCircle } from '@/components/ui/status-circle';
import { Text } from '@/components/ui/text';
import { layout, lightColors, spacing, brandColors, textStyles } from '@/lib/design-system';

import { FeatureStatusList } from './feature-status-list';
import { NotificationBanner } from './notification-banner';
import { ProtectionScoreCard } from './protection-score-card';

export interface HomeContentProps {
  protectionScore?: number;
  hasNotification?: boolean;
  notificationTitle?: string;
  notificationDescription?: string;
  onNotificationPress?: () => void;
  onNotificationDismiss?: () => void;
  testID?: string;
}

export function HomeContent({
  protectionScore = 92,
  hasNotification = true,
  notificationTitle = 'We noticed something new',
  notificationDescription = 'Review your latest scan results',
  onNotificationPress,
  onNotificationDismiss,
  testID,
}: HomeContentProps) {
  const router = useRouter();
  const [showNotification, setShowNotification] = useState(hasNotification);

  // AC35: Run Scan navigates to scan progress screen
  const handleRunScan = useCallback(() => {
    router.push('/(app)/scan-progress' as any);
  }, [router]);

  const handleNotificationPress = useCallback(() => {
    if (onNotificationPress) {
      onNotificationPress();
    } else {
      // Default: navigate to alerts
      router.push('/(tabs)/alerts' as any);
    }
  }, [router, onNotificationPress]);

  const handleNotificationDismiss = useCallback(() => {
    setShowNotification(false);
    onNotificationDismiss?.();
  }, [onNotificationDismiss]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      testID={testID}
    >
      {/* Header with Logo */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <ShieldIcon size={24} color={brandColors.darkTeal} />
          <Text style={styles.logoText}>vara</Text>
        </View>
      </View>

      {/* Section Header */}
      <Text style={styles.sectionTitle}>Your Digital Safety Today</Text>

      {/* Hero Section with StatusCircle (AC27) */}
      <View style={styles.heroSection}>
        <StatusCircle status="protected" size="lg" showLabel={false} />
      </View>

      {/* Protection Score Card (AC29, AC34) */}
      <View style={styles.scoreCardContainer}>
        <ProtectionScoreCard
          score={protectionScore}
          subtitle="You are protected today"
          secondaryText="No active threats detected"
        />
      </View>

      {/* Feature Status List (AC22, AC29, AC35) */}
      <View style={styles.featureListContainer}>
        <FeatureStatusList onRunScan={handleRunScan} />
      </View>

      {/* Notification Banner (AC36) */}
      {showNotification && (
        <View style={styles.notificationContainer}>
          <NotificationBanner
            title={notificationTitle}
            description={notificationDescription}
            onPress={handleNotificationPress}
            onDismiss={handleNotificationDismiss}
          />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightColors.background.primary,
  },
  contentContainer: {
    paddingHorizontal: layout.screenMargin, // AC25: 24px margins
    paddingBottom: spacing.xl,
  },
  header: {
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  logoText: {
    fontSize: 24,
    fontWeight: '600',
    color: brandColors.darkTeal,
    fontFamily: textStyles.screenTitle.fontFamily,
  },
  sectionTitle: {
    fontSize: textStyles.sectionHeader.fontSize,
    fontWeight: '600',
    color: lightColors.text.primary,
    marginBottom: layout.sectionSpacing, // AC28: 16px spacing
  },
  heroSection: {
    alignItems: 'center',
    paddingTop: spacing.xl, // AC27: 32px top padding
    paddingBottom: spacing['2xl'], // Increased to 48px for glow clearance
    marginBottom: spacing.md, // Extra margin for separation
  },
  scoreCardContainer: {
    marginBottom: spacing.lg,
  },
  featureListContainer: {
    marginBottom: spacing.lg,
  },
  notificationContainer: {
    marginTop: spacing.sm,
  },
});
