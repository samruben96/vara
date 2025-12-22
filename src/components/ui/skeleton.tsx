import React, { useEffect } from 'react';
import { type DimensionValue, StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { borderRadius, darkColors } from '@/lib/design-system';

export type SkeletonVariant = 'text' | 'circle' | 'rect';

export interface SkeletonProps {
  width?: DimensionValue;
  height?: number;
  borderRadius?: number;
  variant?: SkeletonVariant;
}

const DEFAULT_HEIGHT = 16;
const ANIMATION_DURATION = 1000;

const getDefaultsForVariant = (
  variant: SkeletonVariant
): {
  width: DimensionValue;
  height: number;
  borderRadius: number;
} => {
  switch (variant) {
    case 'text':
      return {
        width: '100%',
        height: 14,
        borderRadius: borderRadius.sm,
      };
    case 'circle':
      return {
        width: 48,
        height: 48,
        borderRadius: borderRadius.full,
      };
    case 'rect':
    default:
      return {
        width: '100%',
        height: DEFAULT_HEIGHT,
        borderRadius: borderRadius.md,
      };
  }
};

function useShimmerAnimation() {
  const reducedMotion = useReducedMotion();
  const opacity = useSharedValue(0.4);

  useEffect(() => {
    if (reducedMotion) {
      opacity.value = 0.4;
      return;
    }
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.7, {
          duration: ANIMATION_DURATION,
          easing: Easing.inOut(Easing.ease),
        }),
        withTiming(0.4, {
          duration: ANIMATION_DURATION,
          easing: Easing.inOut(Easing.ease),
        })
      ),
      -1,
      false
    );
  }, [reducedMotion, opacity]);

  return useAnimatedStyle(() => ({ opacity: opacity.value }));
}

export function Skeleton({
  width,
  height,
  borderRadius: customBorderRadius,
  variant = 'rect',
}: SkeletonProps) {
  const defaults = getDefaultsForVariant(variant);
  const resolvedHeight = height ?? defaults.height;
  const resolvedBorderRadius = customBorderRadius ?? defaults.borderRadius;
  const finalWidth =
    variant === 'circle' && typeof resolvedHeight === 'number'
      ? resolvedHeight
      : (width ?? defaults.width);

  const animatedStyle = useShimmerAnimation();

  return (
    <View
      style={[
        styles.container,
        {
          width: finalWidth,
          height: resolvedHeight,
          borderRadius: resolvedBorderRadius,
        },
      ]}
      accessibilityLabel="Loading content"
      accessibilityRole="progressbar"
    >
      <Animated.View
        style={[
          styles.shimmer,
          { borderRadius: resolvedBorderRadius },
          animatedStyle,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: darkColors.border.primary,
  },
  shimmer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: darkColors.background.secondary,
  },
});
