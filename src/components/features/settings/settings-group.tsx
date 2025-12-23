/**
 * SettingsGroup Component - Story 2.9 Updated
 *
 * Groups related settings rows with an optional section header.
 * Uses updated design tokens: 20px card radius, soft shadows, sectionHeader typography.
 */
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from '@/components/ui/text';
import {
  cardShadows,
  layout,
  lightColors,
  spacing,
  textStyles,
} from '@/lib/design-system';

export interface SettingsGroupProps {
  title?: string;
  children: React.ReactNode;
}

export function SettingsGroup({ title, children }: SettingsGroupProps) {
  return (
    <View style={styles.container}>
      {title && (
        <Text style={styles.title} accessibilityRole="header">
          {title}
        </Text>
      )}
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  title: {
    // Story 2.9: Updated to match sectionHeader typography
    fontSize: textStyles.sectionHeader.fontSize, // 18px per AC28
    fontWeight: '600',
    color: lightColors.text.primary, // Primary text color for better visibility
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
  },
  content: {
    backgroundColor: lightColors.background.secondary,
    borderRadius: layout.cardRadius, // Story 2.9: AC16 20px radius
    overflow: 'hidden',
    ...cardShadows.soft, // Story 2.9: AC15 soft shadows
  },
});
