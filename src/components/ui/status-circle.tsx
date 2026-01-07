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

import {
  CheckmarkCircle,
  ExclamationCircle,
  LoadingDots,
  WarningTriangle,
} from '@/components/ui/icons';
import { Text } from '@/components/ui/text';
import {
  brandColors,
  glowEffects,
  lightColors,
  statusColors,
} from '@/lib/design-system';

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

// Get glow spread values from design system
const getGlowConfig = (status: StatusType) => {
  const glowStatus = status === 'scanning' ? 'protected' : status;
  const glow = glowEffects[glowStatus];
  return {
    innerSpread: glow.inner.spread,
    innerOpacity: glow.inner.opacity,
    outerSpread: glow.outer.spread,
    outerOpacity: glow.outer.opacity,
  };
};

// Render the appropriate icon based on status
const StatusIcon = ({
  status,
  size,
  color,
}: {
  status: StatusType;
  size: number;
  color: string;
}) => {
  switch (status) {
    case 'protected':
      return <CheckmarkCircle color={color} size={size} />;
    case 'attention':
      return <ExclamationCircle color={color} size={size} />;
    case 'critical':
      return <WarningTriangle color={color} size={size} />;
    case 'scanning':
      return <LoadingDots color={color} size={size} />;
  }
};

function useGlowAnimation(status: StatusType) {
  const glowConfig = getGlowConfig(status);
  const reducedMotion = useReducedMotion();
  const glowScale = useSharedValue(1);
  const glowOpacity = useSharedValue(0.3);

  useEffect(() => {
    if (reducedMotion) {
      glowScale.value = 1;
      glowOpacity.value = glowConfig.outerOpacity;
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
        withTiming(glowConfig.innerOpacity, {
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
        }),
        withTiming(glowConfig.outerOpacity, {
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
        }),
        withTiming(glowConfig.outerOpacity, { duration: 2000 })
      ),
      -1,
      false
    );
  }, [reducedMotion, glowScale, glowOpacity, glowConfig]);

  const outerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: glowScale.value }],
    opacity: glowOpacity.value,
  }));

  const innerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + (glowScale.value - 1) * 0.5 }],
    opacity:
      glowConfig.innerOpacity +
      (glowOpacity.value - glowConfig.outerOpacity) * 0.5,
  }));

  return { outerStyle, innerStyle, glowConfig };
}

interface CircleContentProps {
  status: StatusType;
  circleSize: number;
  iconSize: number;
  statusColor: string;
  statusLabel: string;
  showLabel: boolean;
  outerStyle: AnimatedStyle<StyleProps>;
  innerStyle: AnimatedStyle<StyleProps>;
  glowConfig: ReturnType<typeof getGlowConfig>;
}

function CircleContent({
  status,
  circleSize,
  iconSize,
  statusColor,
  statusLabel,
  showLabel,
  outerStyle,
  innerStyle,
  glowConfig,
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
            getGlowDimensions(circleSize, glowConfig.outerSpread, statusColor),
            outerStyle,
          ]}
        />
        <Animated.View
          style={[
            styles.glowLayer,
            styles.innerGlow,
            getGlowDimensions(circleSize, glowConfig.innerSpread, statusColor),
            innerStyle,
          ]}
        />
        <View
          style={[
            styles.mainCircle,
            getCircleDimensions(circleSize, statusColor),
          ]}
        >
          <StatusIcon
            status={status}
            size={iconSize}
            color={brandColors.charcoal}
          />
        </View>
      </View>
      {showLabel && (
        <Text style={[styles.label, { color: lightColors.text.primary }]}>
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
  const { outerStyle, innerStyle, glowConfig } = useGlowAnimation(status);
  const circleSize = SIZE_MAP[size];
  const iconSize = ICON_SIZE_MAP[size];
  const statusColor = STATUS_COLORS[status];
  const statusLabel = STATUS_LABELS[status];
  const accessibilityLabel = ACCESSIBILITY_LABELS[status];

  const content = (
    <CircleContent
      status={status}
      circleSize={circleSize}
      iconSize={iconSize}
      statusColor={statusColor}
      statusLabel={statusLabel}
      showLabel={showLabel}
      outerStyle={outerStyle}
      innerStyle={innerStyle}
      glowConfig={glowConfig}
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
