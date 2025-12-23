// Mock for react-native-gesture-handler
// Provides minimal implementation for testing

import React from 'react';
import { View } from 'react-native';

export const Gesture = {
  Pan: () => ({
    activeOffsetX: () => ({
      onUpdate: () => ({
        onEnd: () => ({}),
      }),
    }),
  }),
  Tap: () => ({
    onEnd: () => ({}),
  }),
};

export const GestureDetector = ({ children }: { children: React.ReactNode }) => {
  return React.createElement(View, null, children);
};

export const GestureHandlerRootView = ({ children }: { children: React.ReactNode }) => {
  return React.createElement(View, null, children);
};

// Export other commonly used components
export const PanGestureHandler = ({ children }: { children: React.ReactNode }) => {
  return React.createElement(View, null, children);
};

export const TapGestureHandler = ({ children }: { children: React.ReactNode }) => {
  return React.createElement(View, null, children);
};

export const ScrollView = ({ children }: { children: React.ReactNode }) => {
  return React.createElement(View, null, children);
};

export const State = {
  UNDETERMINED: 0,
  FAILED: 1,
  BEGAN: 2,
  CANCELLED: 3,
  ACTIVE: 4,
  END: 5,
};

export const Directions = {
  RIGHT: 1,
  LEFT: 2,
  UP: 4,
  DOWN: 8,
};

export default {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  PanGestureHandler,
  TapGestureHandler,
  ScrollView,
  State,
  Directions,
};
