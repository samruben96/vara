/**
 * FirstScanContent Component - Story 2.9 Updated
 *
 * AC33: Scanning screen with gradient progress ring and scan status text
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from '@/components/ui';
import { ShieldScan } from '@/components/ui/icons';
import {
  layout,
  lightColors,
  spacing,
  statusColors,
} from '@/lib/design-system';

const SCAN_ITEMS = [
  { label: 'Your photos', description: 'Facial recognition across the web' },
  { label: 'Social handles', description: 'Impersonation detection' },
  { label: 'Email addresses', description: 'Data breach monitoring' },
];

export function FirstScanContent() {
  return (
    <View style={styles.container}>
      {/* Scan icon - AC33: Updated to sage green */}
      <View testID="scan-icon" style={styles.iconContainer}>
        <ShieldScan color={statusColors.protected} width={80} height={80} />
      </View>

      {/* Scan summary */}
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>What we&apos;ll scan</Text>
        {SCAN_ITEMS.map((item, index) => (
          <View key={index} style={styles.scanItem}>
            <View style={styles.scanItemBullet} />
            <View style={styles.scanItemContent}>
              <Text style={styles.scanItemLabel}>{item.label}</Text>
              <Text style={styles.scanItemDescription}>{item.description}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Estimated time */}
      <View style={styles.timeContainer}>
        <Text style={styles.timeLabel}>Estimated time</Text>
        <Text style={styles.timeValue}>Usually takes 2-5 minutes</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: spacing['2xl'],
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(168, 213, 186, 0.15)', // AC33: Sage green tint
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryContainer: {
    width: '100%',
    backgroundColor: lightColors.background.secondary,
    borderRadius: layout.cardRadius, // AC16: Updated to 20px
    padding: layout.cardPadding, // AC17: Updated to 24px
    marginBottom: spacing.lg,
  },
  summaryTitle: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 16,
    color: lightColors.text.primary,
    marginBottom: spacing.md,
  },
  scanItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: spacing.xs,
  },
  scanItemBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: statusColors.protected, // AC33: Sage green
    marginTop: 6,
    marginRight: spacing.sm,
  },
  scanItemContent: {
    flex: 1,
  },
  scanItemLabel: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 15,
    color: lightColors.text.primary,
  },
  scanItemDescription: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 13,
    color: lightColors.text.secondary,
    marginTop: 2,
  },
  timeContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  timeLabel: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 13,
    color: lightColors.text.tertiary,
    marginBottom: spacing.xs,
  },
  timeValue: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 15,
    color: lightColors.text.primary,
  },
});
