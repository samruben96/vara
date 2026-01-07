/**
 * ActionButton Component - Story 2.9 Updated
 *
 * Primary CTA button with coral styling and pill shape.
 * AC10: Pill-shaped buttons (borderRadius: 9999)
 * AC11: Coral primary background (#E8A87C)
 * AC12: Darker coral pressed state (#D4956D)
 * AC13: Coral border/text for secondary buttons
 */

import * as Haptics from 'expo-haptics';
import React, { useCallback } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';

import { Text } from '@/components/ui/text';
import {
  ctaColors,
  lightColors,
  spacing,
  textColors,
} from '@/lib/design-system';

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
  testID?: string;
}

// Story 2.9: Updated variant styles with coral colors
const VARIANT_STYLES: Record<
  ActionButtonVariant,
  {
    backgroundColor: string;
    pressedBackgroundColor?: string;
    borderColor?: string;
    textColor: string;
  }
> = {
  primary: {
    backgroundColor: ctaColors.coral, // #E8A87C (AC11)
    pressedBackgroundColor: ctaColors.coralDark, // #D4956D (AC12)
    textColor: textColors.charcoal, // Dark text for contrast
  },
  secondary: {
    backgroundColor: 'transparent',
    borderColor: ctaColors.coral, // Coral border (AC13)
    textColor: ctaColors.coral, // Coral text (AC13)
  },
  danger: {
    backgroundColor: lightColors.status.critical, // Keep red for danger
    pressedBackgroundColor: '#C75050',
    textColor: '#FFFFFF',
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
    minHeight: 44, // Minimum 44pt touch target (AC38)
  },
  md: {
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.lg,
    fontSize: 16,
    minHeight: 48, // Updated to 48px for better touch target
  },
  lg: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    fontSize: 18,
    minHeight: 52,
  },
};

// Pill shape border radius (AC10)
const PILL_BORDER_RADIUS = 9999;

export function ActionButton({
  variant = 'primary',
  label,
  loading = false,
  disabled = false,
  size = 'md',
  onPress,
  icon,
  testID,
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

  // Get background color based on pressed state (AC12)
  const getBackgroundColor = (pressed: boolean) => {
    if (pressed && variantStyle.pressedBackgroundColor) {
      return variantStyle.pressedBackgroundColor;
    }
    return variantStyle.backgroundColor;
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={isDisabled}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
      testID={testID}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: getBackgroundColor(pressed),
          borderColor: variantStyle.borderColor,
          borderWidth: variantStyle.borderColor ? 2 : 0,
          borderRadius: PILL_BORDER_RADIUS, // Pill shape (AC10)
          paddingVertical: sizeStyle.paddingVertical,
          paddingHorizontal: sizeStyle.paddingHorizontal,
          minHeight: sizeStyle.minHeight,
          opacity: isDisabled ? 0.5 : 1,
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
