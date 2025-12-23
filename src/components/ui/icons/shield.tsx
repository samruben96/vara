/**
 * ShieldIcon Component - Story 2.9
 *
 * Vara brand shield icon.
 * AC24: Shield icon in dark teal for brand logo area
 */

import React from 'react';
import Svg, { Path } from 'react-native-svg';

import { brandColors } from '@/lib/design-system';

export interface ShieldIconProps {
  size?: number;
  color?: string;
}

export function ShieldIcon({
  size = 24,
  color = brandColors.darkTeal,
}: ShieldIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Shield outline with checkmark */}
      <Path
        d="M12 2L4 5.5V11C4 16.5 7.5 21 12 22C16.5 21 20 16.5 20 11V5.5L12 2Z"
        fill={color}
        fillOpacity={0.1}
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Checkmark inside shield */}
      <Path
        d="M9 12L11 14L15 10"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
