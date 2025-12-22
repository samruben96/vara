import * as Haptics from 'expo-haptics';
import React, { useCallback } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';

import { Text } from '@/components/ui/text';
import { borderRadius, brandColors, lightColors, spacing } from '@/lib/design-system';

export type ActionButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
export type ActionButtonSize = 'sm' | 'md' | 'lg';

export interface ActionButtonProps {
  variant?: ActionButtonVariant;
  label: string;
  loading?: boolean;
  disabled?: boolean;
  size?: ActionButtonSize;
  onPress?: () => void;
  icon?: React.ReactNode;
}

const VARIANT_STYLES: Record<
  ActionButtonVariant,
  {
    backgroundColor: string;
    borderColor?: string;
    textColor: string;
  }
> = {
  primary: {
    backgroundColor: brandColors.mint,
    textColor: brandColors.charcoal,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderColor: brandColors.mint,
    textColor: brandColors.mint,
  },
  danger: {
    backgroundColor: brandColors.coral,
    textColor: brandColors.charcoal,
  },
  ghost: {
    backgroundColor: 'transparent',
    textColor: lightColors.text.primary,
  },
};

const SIZE_STYLES: Record<
  ActionButtonSize,
  {
    paddingVertical: number;
    paddingHorizontal: number;
    fontSize: number;
    minHeight: number;
  }
> = {
  sm: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    fontSize: 14,
    minHeight: 44, // Minimum 44pt touch target per AC-18
  },
  md: {
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.lg,
    fontSize: 16,
    minHeight: 44, // Minimum 44pt touch target
  },
  lg: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    fontSize: 18,
    minHeight: 52,
  },
};

export function ActionButton({
  variant = 'primary',
  label,
  loading = false,
  disabled = false,
  size = 'md',
  onPress,
  icon,
}: ActionButtonProps) {
  const variantStyle = VARIANT_STYLES[variant];
  const sizeStyle = SIZE_STYLES[size];
  const isDisabled = disabled || loading;

  const handlePress = useCallback(() => {
    if (!isDisabled && onPress) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onPress();
    }
  }, [isDisabled, onPress]);

  const accessibilityLabel = loading ? `${label}, loading` : label;

  return (
    <Pressable
      onPress={handlePress}
      disabled={isDisabled}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: variantStyle.backgroundColor,
          borderColor: variantStyle.borderColor,
          borderWidth: variantStyle.borderColor ? 2 : 0,
          paddingVertical: sizeStyle.paddingVertical,
          paddingHorizontal: sizeStyle.paddingHorizontal,
          minHeight: sizeStyle.minHeight,
          opacity: isDisabled ? 0.5 : pressed ? 0.8 : 1,
        },
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variantStyle.textColor}
          testID="action-button-loading"
        />
      ) : (
        <View style={styles.content}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <Text
            style={[
              styles.label,
              {
                color: variantStyle.textColor,
                fontSize: sizeStyle.fontSize,
              },
            ]}
          >
            {label}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: spacing.sm,
  },
  label: {
    fontWeight: '600',
    textAlign: 'center',
  },
});
