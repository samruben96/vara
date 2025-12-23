/**
 * ResultsList Component - Story 2.9
 *
 * AC30: Bullet list with colored indicators for detail screens
 * Orange bullet: suspicious items
 * Green bullet: harmless/safe items
 * Gray bullet: neutral items
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';

import { BulletIcon } from '@/components/ui/icons';
import { Text } from '@/components/ui/text';
import { layout, lightColors, spacing } from '@/lib/design-system';

export interface ResultItem {
  id: string;
  label: string;
  count?: number;
  type: 'suspicious' | 'harmless' | 'neutral';
}

export interface ResultsListProps {
  items: ResultItem[];
  title?: string;
  testID?: string;
}

const BULLET_COLORS: Record<ResultItem['type'], 'orange' | 'green' | 'gray'> = {
  suspicious: 'orange',
  harmless: 'green',
  neutral: 'gray',
};

export function ResultsList({ items, title, testID }: ResultsListProps) {
  return (
    <View style={styles.container} testID={testID}>
      {title && <Text style={styles.title}>{title}</Text>}
      <View style={styles.list}>
        {items.map((item) => (
          <View key={item.id} style={styles.item}>
            <BulletIcon size={8} color={BULLET_COLORS[item.type]} />
            <Text style={styles.itemText}>
              {item.label}
              {item.count !== undefined && (
                <Text style={styles.countText}> ({item.count})</Text>
              )}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: lightColors.text.primary,
    marginBottom: spacing.md,
  },
  list: {
    gap: spacing.sm,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  itemText: {
    fontSize: 14,
    fontWeight: '400',
    color: lightColors.text.primary,
  },
  countText: {
    fontSize: 14,
    fontWeight: '400',
    color: lightColors.text.tertiary,
  },
});
