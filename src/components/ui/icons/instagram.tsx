import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path, Rect } from 'react-native-svg';

export const Instagram = ({ color = '#000', ...props }: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Rect
      x={2}
      y={2}
      width={20}
      height={20}
      rx={5}
      stroke={color}
      strokeWidth={2}
      fill="none"
    />
    <Path
      d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
      stroke={color}
      strokeWidth={2}
      fill="none"
    />
    <Path
      d="M17.5 6.5h.01"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);
