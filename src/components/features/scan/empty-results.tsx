/**
 * EmptyResults Component
 *
 * Displayed when no matching images are found.
 * Shows a positive message that the user's image appears safe.
 */
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ShieldIcon } from '@/components/ui/icons';
import { Text } from '@/components/ui/text';
import {
  layout,
  lightColors,
  spacing,
  statusColors,
} from '@/lib/design-system';

export interface EmptyResultsProps {
  testID?: string;
}

export function EmptyResults({ testID }: EmptyResultsProps) {
  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.iconContainer}>
        <ShieldIcon color={statusColors.protected} size={64} />
      </View>

      <Text style={styles.title}>No Matches Found</Text>

      <Text style={styles.description}>
        Great news! We couldn't find any copies of your image online. Your
        digital presence appears safe.
      </Text>

      <View style={styles.tipContainer}>
        <Text style={styles.tipTitle}>What does this mean?</Text>
        <Text style={styles.tipText}>
          We searched across the web and didn't find any unauthorized copies of
          your photo. Regular scans help ensure your images stay protected.
        </Text>
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
    paddingVertical: spacing['2xl'],
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: lightColors.background.sageTint,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: lightColors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  description: {
    fontSize: 16,
    color: lightColors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: spacing.xl,
  },
  tipContainer: {
    backgroundColor: lightColors.background.sageTint,
    borderRadius: layout.cardRadius,
    padding: spacing.lg,
    width: '100%',
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: lightColors.text.primary,
    marginBottom: spacing.sm,
  },
  tipText: {
    fontSize: 14,
    color: lightColors.text.secondary,
    lineHeight: 20,
  },
});
