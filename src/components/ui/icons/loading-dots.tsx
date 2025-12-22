import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Circle } from 'react-native-svg';

export const LoadingDots = ({
  color = '#000',
  size = 24,
  ...props
}: SvgProps & { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <Circle cx="4" cy="12" r="3" fill={color} />
    <Circle cx="12" cy="12" r="3" fill={color} />
    <Circle cx="20" cy="12" r="3" fill={color} />
  </Svg>
);
