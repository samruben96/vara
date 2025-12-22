import React, { useEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import type { AnimatedStyle, StyleProps } from 'react-native-reanimated';
import Animated, {
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { CheckmarkCircle } from '@/components/ui/icons';
import { Text } from '@/components/ui/text';
import { brandColors, statusColors } from '@/lib/design-system';

export type StatusType = 'protected' | 'attention' | 'critical' | 'scanning';
export type StatusCircleSize = 'sm' | 'md' | 'lg';

export interface StatusCircleProps {
  status: StatusType;
  size?: StatusCircleSize;
  showLabel?: boolean;
  onPress?: () => void;
}

const SIZE_MAP: Record<StatusCircleSize, number> = {
  sm: 80,
  md: 120,
  lg: 160,
};

const ICON_SIZE_MAP: Record<StatusCircleSize, number> = {
  sm: 32,
  md: 48,
  lg: 64,
};

const STATUS_COLORS: Record<StatusType, string> = {
  protected: statusColors.protected,
  attention: statusColors.attention,
  critical: statusColors.critical,
  scanning: statusColors.protected,
};

const STATUS_LABELS: Record<StatusType, string> = {
  protected: 'Protected',
  attention: 'Attention Needed',
  critical: 'Critical',
  scanning: 'Scanning...',
};

const ACCESSIBILITY_LABELS: Record<StatusType, string> = {
  protected: 'Protection status: Protected',
  attention: 'Protection status: Attention needed',
  critical: 'Protection status: Critical',
  scanning: 'Protection status: Scanning in progress',
};

function useGlowAnimation() {
  const reducedMotion = useReducedMotion();
  const glowScale = useSharedValue(1);
  const glowOpacity = useSharedValue(0.3);

  useEffect(() => {
    if (reducedMotion) {
      glowScale.value = 1;
      glowOpacity.value = 0.3;
      return;
    }
    glowScale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1.0, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1.0, { duration: 2000 })
      ),
      -1,
      false
    );
    glowOpacity.value = withRepeat(
      withSequence(
        withTiming(0.5, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.3, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.3, { duration: 2000 })
      ),
      -1,
      false
    );
  }, [reducedMotion, glowScale, glowOpacity]);

  const outerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: glowScale.value }],
    opacity: glowOpacity.value,
  }));

  const innerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + (glowScale.value - 1) * 0.5 }],
    opacity: 0.5 + (glowOpacity.value - 0.3) * 0.5,
  }));

  return { outerStyle, innerStyle };
}

interface CircleContentProps {
  circleSize: number;
  iconSize: number;
  statusColor: string;
  statusLabel: string;
  showLabel: boolean;
  outerStyle: AnimatedStyle<StyleProps>;
  innerStyle: AnimatedStyle<StyleProps>;
}

function CircleContent({
  circleSize,
  iconSize,
  statusColor,
  statusLabel,
  showLabel,
  outerStyle,
  innerStyle,
}: CircleContentProps) {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.circleContainer,
          { width: circleSize, height: circleSize },
        ]}
      >
        <Animated.View
          style={[
            styles.glowLayer,
            styles.outerGlow,
            getGlowDimensions(circleSize, 80, statusColor),
            outerStyle,
          ]}
        />
        <Animated.View
          style={[
            styles.glowLayer,
            styles.innerGlow,
            getGlowDimensions(circleSize, 40, statusColor),
            innerStyle,
          ]}
        />
        <View
          style={[
            styles.mainCircle,
            getCircleDimensions(circleSize, statusColor),
          ]}
        >
          <CheckmarkCircle color={brandColors.charcoal} size={iconSize} />
        </View>
      </View>
      {showLabel && (
        <Text style={[styles.label, { color: brandColors.cream }]}>
          {statusLabel}
        </Text>
      )}
    </View>
  );
}

const getGlowDimensions = (size: number, offset: number, color: string) => ({
  width: size + offset,
  height: size + offset,
  borderRadius: (size + offset) / 2,
  backgroundColor: color,
});

const getCircleDimensions = (size: number, color: string) => ({
  width: size,
  height: size,
  borderRadius: size / 2,
  backgroundColor: color,
});

export function StatusCircle({
  status,
  size = 'lg',
  showLabel = true,
  onPress,
}: StatusCircleProps) {
  const { outerStyle, innerStyle } = useGlowAnimation();
  const circleSize = SIZE_MAP[size];
  const iconSize = ICON_SIZE_MAP[size];
  const statusColor = STATUS_COLORS[status];
  const statusLabel = STATUS_LABELS[status];
  const accessibilityLabel = ACCESSIBILITY_LABELS[status];

  const content = (
    <CircleContent
      circleSize={circleSize}
      iconSize={iconSize}
      statusColor={statusColor}
      statusLabel={statusLabel}
      showLabel={showLabel}
      outerStyle={outerStyle}
      innerStyle={innerStyle}
    />
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
      >
        {content}
      </Pressable>
    );
  }

  return (
    <View accessibilityLabel={accessibilityLabel} accessibilityRole="text">
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center' },
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  glowLayer: { position: 'absolute' },
  outerGlow: { opacity: 0.3 },
  innerGlow: { opacity: 0.5 },
  mainCircle: { alignItems: 'center', justifyContent: 'center', zIndex: 1 },
  label: { marginTop: 16, fontSize: 18, fontWeight: '600' },
});
