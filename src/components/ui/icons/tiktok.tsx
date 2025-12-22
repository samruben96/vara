import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export const TikTok = ({ color = '#000', ...props }: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.88 2.89 2.89 0 0 1-2.88-2.88 2.89 2.89 0 0 1 2.88-2.88c.28 0 .55.04.81.11V9.4A6.27 6.27 0 0 0 6.5 22a6.27 6.27 0 0 0 6.27-6.27V9.55A8.16 8.16 0 0 0 17.37 11V7.51a4.82 4.82 0 0 1-1.78-.82Z"
      fill={color}
    />
  </Svg>
);
