import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { Text } from '@/components/ui/text';
import {
  borderRadius,
  brandColors,
  spacing,
  statusColors,
} from '@/lib/design-system';

export type SeverityLevel = 'low' | 'medium' | 'high' | 'critical';
export type SeverityBadgeSize = 'sm' | 'md';

export interface SeverityBadgeProps {
  severity: SeverityLevel;
  size?: SeverityBadgeSize;
}

const SEVERITY_COLORS: Record<SeverityLevel, string> = {
  low: brandColors.mint,
  medium: brandColors.lavender,
  high: brandColors.coral,
  critical: statusColors.critical,
};

const SEVERITY_TEXT_COLORS: Record<SeverityLevel, string> = {
  low: brandColors.charcoal,
  medium: brandColors.charcoal,
  high: brandColors.charcoal,
  critical: brandColors.charcoal,
};

const SEVERITY_LABELS: Record<SeverityLevel, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  critical: 'Critical',
};

const SIZE_CONFIG: Record<
  SeverityBadgeSize,
  { iconSize: number; fontSize: number; paddingH: number; paddingV: number }
> = {
  sm: { iconSize: 12, fontSize: 10, paddingH: spacing.sm, paddingV: 2 },
  md: {
    iconSize: 14,
    fontSize: 12,
    paddingH: spacing.sm,
    paddingV: spacing.xs,
  },
};

// Icons for each severity level
const LowIcon = ({ size, color }: { size: number; color: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="8" stroke={color} strokeWidth="2" />
    <Path d="M12 8v4" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Circle cx="12" cy="16" r="1" fill={color} />
  </Svg>
);

const MediumIcon = ({ size, color }: { size: number; color: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 9v4M12 17h.01"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const HighIcon = ({ size, color }: { size: number; color: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 9v4M12 17h.01"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
      fill={color}
      fillOpacity="0.2"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const CriticalIcon = ({ size, color }: { size: number; color: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle
      cx="12"
      cy="12"
      r="10"
      fill={color}
      fillOpacity="0.2"
      stroke={color}
      strokeWidth="2"
    />
    <Path
      d="M15 9l-6 6M9 9l6 6"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);

const SeverityIcon = ({
  severity,
  size,
  color,
}: {
  severity: SeverityLevel;
  size: number;
  color: string;
}) => {
  switch (severity) {
    case 'low':
      return <LowIcon size={size} color={color} />;
    case 'medium':
      return <MediumIcon size={size} color={color} />;
    case 'high':
      return <HighIcon size={size} color={color} />;
    case 'critical':
      return <CriticalIcon size={size} color={color} />;
  }
};

export function SeverityBadge({ severity, size = 'md' }: SeverityBadgeProps) {
  const backgroundColor = SEVERITY_COLORS[severity];
  const textColor = SEVERITY_TEXT_COLORS[severity];
  const label = SEVERITY_LABELS[severity];
  const config = SIZE_CONFIG[size];
  const accessibilityLabel = `Severity: ${label}`;

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor,
          paddingHorizontal: config.paddingH,
          paddingVertical: config.paddingV,
        },
      ]}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="text"
    >
      <SeverityIcon
        severity={severity}
        size={config.iconSize}
        color={textColor}
      />
      <Text
        style={[styles.label, { color: textColor, fontSize: config.fontSize }]}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: borderRadius.full,
    gap: spacing.xs,
  },
  label: {
    fontWeight: '600',
  },
});
