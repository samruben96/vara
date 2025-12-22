import * as Haptics from 'expo-haptics';
import React, { useCallback } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ChevronRight } from '@/components/ui/icons';
import { Text } from '@/components/ui/text';
import { lightColors, spacing } from '@/lib/design-system';

export interface SettingsRowProps {
  icon?: React.ReactNode;
  label: string;
  value?: string;
  onPress?: () => void;
  showChevron?: boolean;
  danger?: boolean;
}

const MIN_TOUCH_TARGET = 44;

export function SettingsRow({
  icon,
  label,
  value,
  onPress,
  showChevron = true,
  danger = false,
}: SettingsRowProps) {
  const handlePress = useCallback(() => {
    if (onPress) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onPress();
    }
  }, [onPress]);

  const labelColor = danger ? '#E57373' : lightColors.text.primary;
  const accessibilityLabel = value
    ? `${label}, current value: ${value}`
    : label;

  const content = (
    <View style={styles.content}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text style={[styles.label, { color: labelColor }]} numberOfLines={1}>
        {label}
      </Text>
      {value && <Text style={styles.value}>{value}</Text>}
      {showChevron && onPress && (
        <ChevronRight color={lightColors.text.tertiary} />
      )}
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => [styles.row, pressed && styles.pressed]}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        accessibilityHint={danger ? 'Destructive action' : 'Opens setting'}
      >
        {content}
      </Pressable>
    );
  }

  return (
    <View
      style={styles.row}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="text"
    >
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: MIN_TOUCH_TARGET,
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: lightColors.border.primary,
  },
  pressed: {
    backgroundColor: lightColors.border.primary,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 28,
    marginRight: spacing.sm,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    flex: 1,
  },
  value: {
    fontSize: 14,
    color: lightColors.text.tertiary,
    marginRight: spacing.xs,
  },
});
