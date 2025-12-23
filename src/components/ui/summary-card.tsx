/**
 * SummaryCard Component - Story 2.9 Updated
 *
 * AC15: Softer shadows (opacity 0.05-0.08)
 * AC16: Increased border-radius (20px)
 * AC17: Generous padding (24px)
 */

import * as Haptics from 'expo-haptics';
import React, { useCallback } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Text } from '@/components/ui/text';
import {
  cardShadows,
  layout,
  lightColors,
  statusColors,
} from '@/lib/design-system';

export type SummaryCardStatus = 'default' | 'success' | 'warning';

export interface SummaryCardProps {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
  status?: SummaryCardStatus;
  onPress?: () => void;
  testID?: string;
}

// Story 2.9: Updated to use sage green for success
const STATUS_VALUE_COLORS: Record<SummaryCardStatus, string> = {
  default: lightColors.text.primary,
  success: statusColors.protected, // Sage green
  warning: statusColors.attention, // Coral
};

export function SummaryCard({
  value,
  label,
  icon,
  status = 'default',
  onPress,
  testID,
}: SummaryCardProps) {
  const valueColor = STATUS_VALUE_COLORS[status];
  const accessibilityLabel = `${label}: ${value}`;

  const handlePress = useCallback(() => {
    if (onPress) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onPress();
    }
  }, [onPress]);

  const content = (
    <View style={styles.card}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text style={[styles.value, { color: valueColor }]}>{String(value)}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={handlePress}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        testID={testID}
        style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}
      >
        {content}
      </Pressable>
    );
  }

  return (
    <View
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="text"
      testID={testID}
      style={styles.pressable}
    >
      {content}
    </View>
  );
}

// Story 2.9: Updated styles with softer shadows and rounded corners
const styles = StyleSheet.create({
  pressable: {
    flex: 1,
  },
  pressed: {
    opacity: 0.8,
  },
  card: {
    backgroundColor: lightColors.background.secondary,
    borderRadius: layout.cardRadius, // AC16: 20px border radius
    padding: layout.cardPadding, // AC17: 24px padding
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
    ...cardShadows.soft, // AC15: Softer shadow
  },
  iconContainer: {
    marginBottom: 8,
  },
  value: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 34,
  },
  label: {
    fontSize: 14,
    fontWeight: '400',
    color: lightColors.text.secondary,
    marginTop: 4,
    textAlign: 'center',
  },
});
