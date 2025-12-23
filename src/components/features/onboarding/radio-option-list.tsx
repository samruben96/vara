/**
 * RadioOptionList Component - Story 2.9
 *
 * AC32: Clean radio-style list with subtle selection indicator
 * for onboarding question screens.
 */

import * as Haptics from 'expo-haptics';
import React, { useCallback } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { Text } from '@/components/ui/text';
import {
  borderRadius,
  ctaColors,
  layout,
  lightColors,
  spacing,
  textColors,
} from '@/lib/design-system';

export interface RadioOption {
  id: string;
  label: string;
  description?: string;
}

export interface RadioOptionListProps {
  options: RadioOption[];
  selectedId?: string;
  onSelect: (id: string) => void;
  testID?: string;
}

interface RadioOptionItemProps {
  option: RadioOption;
  isSelected: boolean;
  onPress: () => void;
}

function RadioOptionItem({ option, isSelected, onPress }: RadioOptionItemProps) {
  const scale = useSharedValue(1);

  const handlePress = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    scale.value = withSpring(1, { damping: 15, stiffness: 400 });
    onPress();
  }, [onPress, scale]);

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.98, { damping: 15, stiffness: 400 });
  }, [scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable onPress={handlePress} onPressIn={handlePressIn}>
      <Animated.View
        style={[
          styles.optionContainer,
          isSelected && styles.optionContainerSelected,
          animatedStyle,
        ]}
      >
        {/* Radio Circle */}
        <View style={[styles.radioOuter, isSelected && styles.radioOuterSelected]}>
          {isSelected && <View style={styles.radioInner} />}
        </View>

        {/* Content */}
        <View style={styles.optionContent}>
          <Text style={[styles.optionLabel, isSelected && styles.optionLabelSelected]}>
            {option.label}
          </Text>
          {option.description && (
            <Text style={styles.optionDescription}>{option.description}</Text>
          )}
        </View>
      </Animated.View>
    </Pressable>
  );
}

export function RadioOptionList({
  options,
  selectedId,
  onSelect,
  testID,
}: RadioOptionListProps) {
  return (
    <View style={styles.container} testID={testID}>
      {options.map((option) => (
        <RadioOptionItem
          key={option.id}
          option={option}
          isSelected={selectedId === option.id}
          onPress={() => onSelect(option.id)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: lightColors.background.secondary,
    borderRadius: layout.cardRadius,
    padding: layout.cardPadding,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionContainerSelected: {
    borderColor: ctaColors.coral,
    backgroundColor: ctaColors.coralLight,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: textColors.softGray,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  radioOuterSelected: {
    borderColor: ctaColors.coral,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: ctaColors.coral,
  },
  optionContent: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: lightColors.text.primary,
  },
  optionLabelSelected: {
    color: lightColors.text.primary,
  },
  optionDescription: {
    fontSize: 14,
    fontWeight: '400',
    color: lightColors.text.tertiary,
    marginTop: 4,
  },
});
