import React from 'react';
import { StyleSheet, View } from 'react-native';

import { brandColors } from '@/lib/design-system';

interface OnboardingProgressProps {
  currentStep: number;
  totalSteps?: number;
}

export function OnboardingProgress({
  currentStep,
  totalSteps = 5,
}: OnboardingProgressProps) {
  return (
    <View testID="onboarding-progress" style={styles.container}>
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNum = index + 1;
        const isActive = stepNum === currentStep;
        const isCompleted = stepNum < currentStep;

        return (
          <View
            key={stepNum}
            testID={`progress-dot-${stepNum}`}
            style={getDotStyle(isActive, isCompleted)}
          />
        );
      })}
    </View>
  );
}

function getDotStyle(isActive: boolean, isCompleted: boolean) {
  const baseStyle = {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3A3A3A', // pending gray
    width: 8,
  };

  if (isActive) {
    return {
      ...baseStyle,
      backgroundColor: brandColors.mint, // #B1EFE3
      width: 24, // wider for active
    };
  }

  if (isCompleted) {
    return {
      ...baseStyle,
      backgroundColor: brandColors.lavender, // #D7CAE6
    };
  }

  return baseStyle;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 16,
  },
});
