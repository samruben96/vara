/**
 * BulletIcon Component - Story 2.9
 *
 * Colored bullet for list items in detail screens.
 * AC30: Colored bullets for results list (orange/green/gray)
 */

import React from 'react';
import Svg, { Circle } from 'react-native-svg';

import { ctaColors, statusColors, textColors } from '@/lib/design-system';

export type BulletColor = 'orange' | 'green' | 'gray';

export interface BulletIconProps {
  size?: number;
  color?: BulletColor;
}

const BULLET_COLORS: Record<BulletColor, string> = {
  orange: ctaColors.coral, // Suspicious items
  green: statusColors.protected, // Harmless items
  gray: textColors.mutedGray, // Neutral items
};

export function BulletIcon({ size = 8, color = 'gray' }: BulletIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 8 8" fill="none">
      <Circle cx="4" cy="4" r="4" fill={BULLET_COLORS[color]} />
    </Svg>
  );
}
