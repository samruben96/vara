/**
 * ScanResultItem Component
 *
 * Displays a single result from reverse image search.
 * Shows thumbnail, source domain, and title.
 */
import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';

import { Text } from '@/components/ui/text';
import {
  borderRadius,
  lightColors,
  spacing,
  statusColors,
} from '@/lib/design-system';
import type { ScanResult } from '@/types/scan.types';

export interface ScanResultItemProps {
  result: ScanResult;
  onPress: () => void;
  testID?: string;
}

export function ScanResultItem({
  result,
  onPress,
  testID,
}: ScanResultItemProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && styles.containerPressed,
      ]}
      onPress={onPress}
      testID={testID}
    >
      {/* Thumbnail */}
      <View style={styles.thumbnailContainer}>
        {result.thumbnailUrl ? (
          <Image
            source={{ uri: result.thumbnailUrl }}
            style={styles.thumbnail}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.thumbnailPlaceholder}>
            <Text style={styles.thumbnailPlaceholderText}>No Image</Text>
          </View>
        )}
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.domain} numberOfLines={1}>
          {result.sourceDomain}
        </Text>

        <Text style={styles.title} numberOfLines={2}>
          {result.title}
        </Text>

        {result.snippet && (
          <Text style={styles.snippet} numberOfLines={2}>
            {result.snippet}
          </Text>
        )}
      </View>

      {/* Status Indicator */}
      <View style={styles.statusIndicator} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: spacing.md,
    backgroundColor: lightColors.background.secondary,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  containerPressed: {
    backgroundColor: lightColors.background.sageTint,
    transform: [{ scale: 0.98 }],
  },
  thumbnailContainer: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    backgroundColor: lightColors.background.primary,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  thumbnailPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: lightColors.background.primary,
  },
  thumbnailPlaceholderText: {
    fontSize: 10,
    color: lightColors.text.tertiary,
  },
  content: {
    flex: 1,
    marginLeft: spacing.md,
    justifyContent: 'center',
  },
  domain: {
    fontSize: 12,
    fontWeight: '600',
    color: statusColors.attention,
    marginBottom: spacing.xs,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: lightColors.text.primary,
    lineHeight: 20,
  },
  snippet: {
    fontSize: 12,
    color: lightColors.text.tertiary,
    marginTop: spacing.xs,
    lineHeight: 16,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: statusColors.attention,
    alignSelf: 'center',
    marginLeft: spacing.sm,
  },
});
