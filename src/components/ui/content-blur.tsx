import * as Haptics from 'expo-haptics';
import React, { useCallback, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { Text } from '@/components/ui/text';
import {
  borderRadius,
  brandColors,
  darkColors,
  spacing,
} from '@/lib/design-system';

export interface ContentBlurProps {
  blurAmount?: number;
  revealed?: boolean;
  onReveal?: () => void;
  children: React.ReactNode;
}

const DEFAULT_BLUR_AMOUNT = 20;
const REVEAL_DURATION = 200;

function useRevealAnimation(
  isRevealed: boolean,
  reducedMotion: boolean | null
) {
  const overlayOpacity = useSharedValue(isRevealed ? 0 : 1);
  const contentScale = useSharedValue(isRevealed ? 1 : 0.98);

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
  }));
  const contentStyle = useAnimatedStyle(() => ({
    transform: [{ scale: contentScale.value }],
    opacity: 0.3 + (1 - overlayOpacity.value) * 0.7,
  }));

  const animateReveal = useCallback(() => {
    const duration = reducedMotion ? 0 : REVEAL_DURATION;
    overlayOpacity.value = withTiming(0, {
      duration,
      easing: Easing.out(Easing.ease),
    });
    contentScale.value = withTiming(1, {
      duration,
      easing: Easing.out(Easing.ease),
    });
  }, [reducedMotion, overlayOpacity, contentScale]);

  return { overlayStyle, contentStyle, animateReveal };
}

function BlurOverlay() {
  return (
    <View style={styles.overlayContent}>
      <Text style={styles.overlayText}>Tap to reveal</Text>
      <Text style={styles.overlayHint}>Sensitive content hidden</Text>
    </View>
  );
}

export function ContentBlur({
  blurAmount = DEFAULT_BLUR_AMOUNT,
  revealed: controlledRevealed,
  onReveal,
  children,
}: ContentBlurProps) {
  const reducedMotion = useReducedMotion();
  const [internalRevealed, setInternalRevealed] = useState(false);
  const isRevealed = controlledRevealed ?? internalRevealed;

  const { overlayStyle, contentStyle, animateReveal } = useRevealAnimation(
    isRevealed,
    reducedMotion
  );

  const handleReveal = useCallback(() => {
    if (isRevealed) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    animateReveal();
    if (controlledRevealed === undefined) setInternalRevealed(true);
    onReveal?.();
  }, [isRevealed, animateReveal, controlledRevealed, onReveal]);

  const accessibilityLabel = isRevealed
    ? 'Content revealed'
    : 'Tap to reveal sensitive content';

  return (
    <Pressable
      onPress={handleReveal}
      disabled={isRevealed}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={isRevealed ? 'text' : 'button'}
      accessibilityHint={isRevealed ? undefined : 'Double-tap to reveal'}
    >
      <View style={styles.container}>
        <Animated.View style={[styles.contentContainer, contentStyle]}>
          {children}
        </Animated.View>
        {!isRevealed && (
          <Animated.View
            style={[
              styles.overlay,
              overlayStyle,
              {
                backgroundColor: `rgba(30, 30, 30, ${Math.min(blurAmount / 25, 0.95)})`,
              },
            ]}
          >
            <BlurOverlay />
          </Animated.View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: borderRadius.lg,
  },
  contentContainer: { width: '100%' },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: borderRadius.lg,
  },
  overlayContent: { alignItems: 'center', padding: spacing.lg },
  overlayText: {
    fontSize: 16,
    fontWeight: '600',
    color: brandColors.cream,
    marginBottom: spacing.xs,
  },
  overlayHint: { fontSize: 12, color: darkColors.text.secondary },
});
