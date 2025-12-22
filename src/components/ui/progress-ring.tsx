import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedProps,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

import { Text } from '@/components/ui/text';
import { brandColors, lightColors } from '@/lib/design-system';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  showPercentage?: boolean;
  color?: string;
  backgroundColor?: string;
}

const DEFAULT_SIZE = 80;
const DEFAULT_STROKE_WIDTH = 8;

function useProgressAnimation(clampedProgress: number, circumference: number) {
  const reducedMotion = useReducedMotion();
  const animatedProgress = useSharedValue(0);

  useEffect(() => {
    if (reducedMotion) {
      animatedProgress.value = clampedProgress;
    } else {
      animatedProgress.value = withTiming(clampedProgress, {
        duration: 500,
        easing: Easing.out(Easing.cubic),
      });
    }
  }, [clampedProgress, reducedMotion, animatedProgress]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset:
      circumference - (animatedProgress.value / 100) * circumference,
  }));

  return animatedProps;
}

export function ProgressRing({
  progress,
  size = DEFAULT_SIZE,
  strokeWidth = DEFAULT_STROKE_WIDTH,
  showPercentage = true,
  color = brandColors.mint,
  backgroundColor = lightColors.border.primary,
}: ProgressRingProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  const animatedProps = useProgressAnimation(clampedProgress, circumference);

  return (
    <View
      style={[styles.container, { width: size, height: size }]}
      accessibilityLabel={`Progress: ${Math.round(clampedProgress)}%`}
      accessibilityRole="progressbar"
      accessibilityValue={{
        min: 0,
        max: 100,
        now: Math.round(clampedProgress),
      }}
    >
      <Svg width={size} height={size}>
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <AnimatedCircle
          cx={center}
          cy={center}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          transform={`rotate(-90 ${center} ${center})`}
        />
      </Svg>
      {showPercentage && (
        <View style={styles.percentageContainer}>
          <Text style={styles.percentageText}>
            {Math.round(clampedProgress)}%
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentageContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentageText: {
    fontSize: 16,
    fontWeight: '600',
    color: lightColors.text.primary,
  },
});
