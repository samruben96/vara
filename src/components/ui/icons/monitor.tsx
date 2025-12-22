import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export const Monitor = ({ color = '#000', ...props }: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M12 4.5C7.5 4.5 3.73 7.61 3 12c.73 4.39 4.5 7.5 9 7.5s8.27-3.11 9-7.5c-.73-4.39-4.5-7.5-9-7.5ZM12 17a5 5 0 1 1 0-10 5 5 0 0 1 0 10Zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"
      fill={color}
    />
  </Svg>
);
