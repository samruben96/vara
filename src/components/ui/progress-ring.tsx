/**
 * ProgressRing Component - Story 2.9 Updated
 *
 * AC19: Gradient support from teal (#7DD3C0) to lavender (#B8A9D4)
 */

import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedProps,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

import { Text } from '@/components/ui/text';
import { brandColors, lightColors, statusColors } from '@/lib/design-system';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

// Story 2.9: Gradient colors for scanning state (AC19)
const GRADIENT_COLORS = {
  start: brandColors.teal, // #7DD3C0
  end: brandColors.lavenderGradient, // #B8A9D4
};

export interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  showPercentage?: boolean;
  color?: string;
  backgroundColor?: string;
  useGradient?: boolean; // AC19: Enable gradient for scanning state
  testID?: string;
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
  color = statusColors.protected, // Updated to sage green
  backgroundColor = lightColors.border.primary,
  useGradient = false, // AC19: Gradient mode for scanning
  testID,
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
      testID={testID}
    >
      <Svg width={size} height={size}>
        {/* AC19: Gradient definition for scanning state */}
        {useGradient && (
          <Defs>
            <LinearGradient
              id="progressGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <Stop offset="0%" stopColor={GRADIENT_COLORS.start} />
              <Stop offset="100%" stopColor={GRADIENT_COLORS.end} />
            </LinearGradient>
          </Defs>
        )}
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
          stroke={useGradient ? 'url(#progressGradient)' : color}
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
