import * as React from 'react';
import { View } from 'react-native';

const inset = { top: 47, left: 0, right: 0, bottom: 34 };
const frame = { x: 0, y: 0, width: 390, height: 844 };

export const SafeAreaProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => React.createElement(View, null, children);

export const SafeAreaView: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => React.createElement(View, null, children);

export const useSafeAreaInsets = () => inset;
export const useSafeAreaFrame = () => frame;
export const SafeAreaFrameContext = React.createContext(frame);
export const SafeAreaInsetsContext = React.createContext(inset);
export const initialWindowMetrics = { frame, insets: inset };

export default {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
  useSafeAreaFrame,
  SafeAreaFrameContext,
  SafeAreaInsetsContext,
  initialWindowMetrics,
};
