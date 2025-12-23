/**
 * SparkleIcon Component - Story 2.9
 *
 * 4-point star/sparkle design for feature list items.
 * AC22: Sparkle/star icon prefix for feature list items
 * AC23: Teal-to-coral gradient fill option
 */

import React from 'react';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

import { brandColors, ctaColors } from '@/lib/design-system';

export interface SparkleIconProps {
  size?: number;
  color?: string;
  gradient?: boolean;
}

export function SparkleIcon({
  size = 24,
  color = brandColors.darkTeal,
  gradient = false,
}: SparkleIconProps) {
  // 4-point star path (rotated plus with tapered points)
  const starPath = `
    M12 0
    L14 10
    L24 12
    L14 14
    L12 24
    L10 14
    L0 12
    L10 10
    Z
  `;

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {gradient && (
        <Defs>
          <LinearGradient id="sparkleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={brandColors.teal} />
            <Stop offset="100%" stopColor={ctaColors.coral} />
          </LinearGradient>
        </Defs>
      )}
      <Path
        d={starPath}
        fill={gradient ? 'url(#sparkleGradient)' : color}
      />
    </Svg>
  );
}
