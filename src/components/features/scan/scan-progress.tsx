/**
 * ScanProgress Component - Story 2.9
 *
 * AC33: Scanning screen with gradient progress ring and status text.
 * Shows "Scanning your digital footprint" with gradient ring.
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ProgressRing } from '@/components/ui/progress-ring';
import { Text } from '@/components/ui/text';
import { layout, lightColors, spacing, textStyles } from '@/lib/design-system';

import { type ScanCategory, ScanStatusList } from './scan-status-list';

export interface ScanProgressProps {
  progress: number;
  categories?: ScanCategory[];
  title?: string;
  testID?: string;
}

export function ScanProgress({
  progress,
  categories,
  title = 'Scanning your digital footprint',
  testID,
}: ScanProgressProps) {
  return (
    <View style={styles.container} testID={testID}>
      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Gradient Progress Ring (AC19, AC33) */}
      <View style={styles.ringContainer}>
        <ProgressRing
          progress={progress}
          size={200}
          strokeWidth={12}
          useGradient
          showPercentage={false}
        />
      </View>

      {/* Status List */}
      <View style={styles.statusListContainer}>
        <ScanStatusList categories={categories} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: layout.screenMargin,
    backgroundColor: lightColors.background.primary,
  },
  title: {
    fontSize: textStyles.screenTitle.fontSize,
    fontWeight: '600',
    color: lightColors.text.primary,
    textAlign: 'center',
    marginBottom: spacing['2xl'],
  },
  ringContainer: {
    marginBottom: spacing.xl,
  },
  statusListContainer: {
    marginTop: spacing.lg,
  },
});
