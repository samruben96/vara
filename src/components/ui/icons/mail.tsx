/**
 * Mail Icon (Story 3.1 - Task 3)
 * @description Email/envelope icon for verify email screen
 */
import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export const MailIcon = ({
  color = '#000',
  size = 24,
  ...props
}: SvgProps & { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z"
      fill={color}
    />
  </Svg>
);
