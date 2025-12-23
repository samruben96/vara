/**
 * TextLink Component - Story 2.9
 *
 * Tertiary action link for "Dismiss", "Skip", etc.
 * AC14: Plain text link in muted gray for tertiary actions
 */

import * as Haptics from 'expo-haptics';
import React, { useCallback } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { textColors } from '@/lib/design-system';

export interface TextLinkProps {
  label: string;
  onPress: () => void;
  color?: string;
  disabled?: boolean;
  testID?: string;
}

export function TextLink({
  label,
  onPress,
  color = textColors.mutedGray, // Default muted gray (AC14)
  disabled = false,
  testID,
}: TextLinkProps) {
  const handlePress = useCallback(() => {
    if (!disabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onPress();
    }
  }, [disabled, onPress]);

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      accessibilityLabel={label}
      accessibilityRole="link"
      accessibilityState={{ disabled }}
      testID={testID}
      style={({ pressed }) => [
        styles.container,
        { opacity: disabled ? 0.5 : pressed ? 0.7 : 1 },
      ]}
    >
      <Text style={[styles.label, { color }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    minHeight: 44, // Minimum touch target (AC38)
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'center',
  },
});
