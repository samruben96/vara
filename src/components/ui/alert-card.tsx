import * as Haptics from 'expo-haptics';
import React, { useCallback } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import {
  SeverityBadge,
  type SeverityLevel,
} from '@/components/ui/severity-badge';
import { Text } from '@/components/ui/text';
import {
  borderRadius,
  brandColors,
  layout,
  lightColors,
  spacing,
} from '@/lib/design-system';

export type AlertStatus = 'new' | 'viewed' | 'resolved';

export interface AlertCardProps {
  title: string;
  description?: string;
  severity: SeverityLevel;
  timestamp: Date;
  status: AlertStatus;
  onPress?: () => void;
}

const STATUS_INDICATOR_COLORS: Record<AlertStatus, string | undefined> = {
  new: brandColors.coral,
  viewed: undefined,
  resolved: brandColors.mint,
};

function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);

  if (diffSeconds < 60) return 'Just now';
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffWeeks < 4) return `${diffWeeks}w ago`;

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

interface AlertCardContentProps {
  title: string;
  description?: string;
  severity: SeverityLevel;
  status: AlertStatus;
  formattedTime: string;
  statusIndicatorColor?: string;
}

function AlertCardContent({
  title,
  description,
  severity,
  status,
  formattedTime,
  statusIndicatorColor,
}: AlertCardContentProps) {
  return (
    <View style={styles.card}>
      {statusIndicatorColor && (
        <View
          style={[
            styles.statusIndicator,
            { backgroundColor: statusIndicatorColor },
          ]}
        />
      )}
      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
          <Text
            style={[
              styles.title,
              status === 'resolved' && styles.titleResolved,
            ]}
            numberOfLines={1}
          >
            {title}
          </Text>
          <SeverityBadge severity={severity} size="sm" />
        </View>
        {description && (
          <Text
            style={[
              styles.description,
              status === 'resolved' && styles.descriptionResolved,
            ]}
            numberOfLines={2}
          >
            {description}
          </Text>
        )}
        <View style={styles.footerRow}>
          <Text style={styles.timestamp}>{formattedTime}</Text>
          {status === 'resolved' && (
            <Text style={styles.resolvedLabel}>Resolved</Text>
          )}
        </View>
      </View>
    </View>
  );
}

export function AlertCard({
  title,
  description,
  severity,
  timestamp,
  status,
  onPress,
}: AlertCardProps) {
  const statusIndicatorColor = STATUS_INDICATOR_COLORS[status];
  const formattedTime = formatRelativeTime(timestamp);
  const descPart = description ? description + '. ' : '';
  const accessibilityLabel = `${title}. Severity: ${severity}. ${descPart}${formattedTime}. Status: ${status}`;

  const handlePress = useCallback(() => {
    if (onPress) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onPress();
    }
  }, [onPress]);

  const contentProps = {
    title,
    description,
    severity,
    status,
    formattedTime,
    statusIndicatorColor,
  };

  if (onPress) {
    return (
      <Pressable
        onPress={handlePress}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        style={({ pressed }) => [pressed && styles.pressed]}
      >
        <AlertCardContent {...contentProps} />
      </Pressable>
    );
  }

  return (
    <View accessibilityLabel={accessibilityLabel} accessibilityRole="text">
      <AlertCardContent {...contentProps} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: lightColors.background.secondary,
    borderRadius: borderRadius.lg,
    padding: layout.cardPadding,
    flexDirection: 'row',
  },
  pressed: { opacity: 0.8 },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacing.sm,
    marginTop: 6,
  },
  contentContainer: { flex: 1 },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: lightColors.text.primary,
    flex: 1,
  },
  titleResolved: { color: lightColors.text.secondary },
  description: {
    fontSize: 14,
    color: lightColors.text.secondary,
    marginBottom: spacing.sm,
    lineHeight: 20,
  },
  descriptionResolved: { color: lightColors.text.tertiary },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timestamp: { fontSize: 12, color: lightColors.text.tertiary },
  resolvedLabel: { fontSize: 12, color: brandColors.mint, fontWeight: '500' },
});
