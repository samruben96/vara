import * as Haptics from 'expo-haptics';
import React, { useCallback } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Text } from '@/components/ui/text';
import {
  borderRadius,
  brandColors,
  layout,
  lightColors,
} from '@/lib/design-system';

export type SummaryCardStatus = 'default' | 'success' | 'warning';

export interface SummaryCardProps {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
  status?: SummaryCardStatus;
  onPress?: () => void;
}

const STATUS_VALUE_COLORS: Record<SummaryCardStatus, string> = {
  default: lightColors.text.primary,
  success: brandColors.mint,
  warning: brandColors.coral,
};

export function SummaryCard({
  value,
  label,
  icon,
  status = 'default',
  onPress,
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
      style={styles.pressable}
    >
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  pressable: {
    flex: 1,
  },
  pressed: {
    opacity: 0.8,
  },
  card: {
    backgroundColor: lightColors.background.secondary,
    borderRadius: borderRadius.xl,
    padding: layout.cardPadding,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
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
