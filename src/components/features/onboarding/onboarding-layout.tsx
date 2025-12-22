import React, { type ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { Button, Text } from '@/components/ui';
import { brandColors, lightColors, spacing } from '@/lib/design-system';

import { OnboardingProgress } from './onboarding-progress';

interface OnboardingLayoutProps {
  title: string;
  description?: string;
  currentStep: number;
  totalSteps?: number;
  onNext?: () => void;
  onBack?: () => void;
  onSkip?: () => void;
  nextLabel?: string;
  showBack?: boolean;
  showSkip?: boolean;
  children: ReactNode;
}

export function OnboardingLayout({
  title,
  description,
  currentStep,
  totalSteps = 5,
  onNext,
  onBack,
  onSkip,
  nextLabel = 'Continue',
  showBack = true,
  showSkip = false,
  children,
}: OnboardingLayoutProps) {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Progress indicator at top */}
        <OnboardingProgress currentStep={currentStep} totalSteps={totalSteps} />

        {/* Title and description */}
        <View style={styles.headerSection}>
          <Text style={styles.title}>{title}</Text>
          {description && <Text style={styles.description}>{description}</Text>}
        </View>

        {/* Content area */}
        <View style={styles.contentArea}>{children}</View>

        {/* Navigation buttons at bottom */}
        <View
          style={[
            styles.navigationArea,
            { paddingBottom: insets.bottom || spacing.lg },
          ]}
        >
          {showSkip && onSkip && (
            <Pressable
              testID="onboarding-skip-link"
              onPress={onSkip}
              style={styles.skipLinkContainer}
            >
              <Text style={styles.skipLink}>Skip for now</Text>
            </Pressable>
          )}
          <Button
            testID="onboarding-next-button"
            label={nextLabel}
            onPress={onNext}
            style={styles.nextButton}
          />
          {showBack && currentStep > 1 && onBack && (
            <Pressable
              testID="onboarding-back-button"
              onPress={onBack}
              style={styles.backLinkContainer}
            >
              <Text style={styles.backLink}>Back</Text>
            </Pressable>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: lightColors.background.primary,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.xl,
  },
  headerSection: {
    marginTop: spacing['2xl'],
  },
  title: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 24,
    color: lightColors.text.primary,
    textAlign: 'center',
  },
  description: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 15,
    color: lightColors.text.secondary,
    textAlign: 'center',
    lineHeight: 22.5,
    marginTop: spacing.sm,
  },
  contentArea: {
    flex: 1,
    marginTop: spacing.xl,
  },
  navigationArea: {
    paddingTop: spacing.md,
  },
  skipLinkContainer: {
    alignItems: 'center',
    marginBottom: spacing.md,
    paddingVertical: spacing.xs,
  },
  skipLink: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 14,
    color: brandColors.mint,
  },
  nextButton: {
    marginBottom: spacing.sm,
  },
  backLinkContainer: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  backLink: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 14,
    color: lightColors.text.secondary,
  },
});
