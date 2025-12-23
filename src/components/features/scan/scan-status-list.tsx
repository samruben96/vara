/**
 * ScanStatusList Component - Story 2.9
 *
 * AC33: Status list below the gradient ring showing scan categories.
 * Minimal list of scan categories that updates as each completes.
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from '@/components/ui/text';
import { lightColors, spacing, statusColors } from '@/lib/design-system';

export interface ScanCategory {
  id: string;
  label: string;
  status: 'pending' | 'scanning' | 'complete';
}

export interface ScanStatusListProps {
  categories?: ScanCategory[];
  testID?: string;
}

const DEFAULT_CATEGORIES: ScanCategory[] = [
  { id: 'image-misuse', label: 'Image misuse', status: 'pending' },
  { id: 'impersonation', label: 'Impersonation', status: 'pending' },
  { id: 'privacy-leaks', label: 'Privacy leaks', status: 'pending' },
];

const STATUS_COLORS: Record<ScanCategory['status'], string> = {
  pending: lightColors.text.tertiary,
  scanning: statusColors.attention,
  complete: statusColors.protected,
};

export function ScanStatusList({
  categories = DEFAULT_CATEGORIES,
  testID,
}: ScanStatusListProps) {
  return (
    <View style={styles.container} testID={testID}>
      {categories.map((category) => (
        <Text
          key={category.id}
          style={[styles.categoryText, { color: STATUS_COLORS[category.status] }]}
        >
          {category.label}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  categoryText: {
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'center',
  },
});
