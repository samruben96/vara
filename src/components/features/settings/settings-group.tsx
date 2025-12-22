import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from '@/components/ui/text';
import { borderRadius, lightColors, spacing } from '@/lib/design-system';

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
    fontSize: 12,
    fontWeight: '600',
    color: lightColors.text.tertiary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
  },
  content: {
    backgroundColor: lightColors.background.secondary,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
});
