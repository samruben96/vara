import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export const Gallery = ({ color = '#000', ...props }: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2Zm-11-4 2.03 2.71L16 11l4 5H8l3-4ZM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2Z"
      fill={color}
    />
  </Svg>
);
