import React from 'react';
import { Text } from 'react-native';

import { cleanup, render, screen, setup } from '@/lib/test-utils';

import { OnboardingLayout } from './onboarding-layout';

afterEach(cleanup);

describe('OnboardingLayout', () => {
  it('renders title and description', () => {
    render(
      <OnboardingLayout
        title="Welcome to vara"
        description="Your digital guardian"
        currentStep={1}
      >
        <Text>Content</Text>
      </OnboardingLayout>
    );
    expect(screen.getByText('Welcome to vara')).toBeOnTheScreen();
    expect(screen.getByText('Your digital guardian')).toBeOnTheScreen();
  });

  it('renders progress indicator', () => {
    render(
      <OnboardingLayout title="Test" currentStep={2}>
        <Text>Content</Text>
      </OnboardingLayout>
    );
    expect(screen.getByTestId('onboarding-progress')).toBeOnTheScreen();
  });

  it('renders next button with custom label', () => {
    render(
      <OnboardingLayout
        title="Test"
        currentStep={1}
        nextLabel="Get Started"
        onNext={() => {}}
      >
        <Text>Content</Text>
      </OnboardingLayout>
    );
    expect(screen.getByText('Get Started')).toBeOnTheScreen();
  });

  it('hides back button when showBack is false', () => {
    render(
      <OnboardingLayout
        title="Test"
        currentStep={1}
        showBack={false}
        onBack={() => {}}
      >
        <Text>Content</Text>
      </OnboardingLayout>
    );
    expect(screen.queryByText('Back')).not.toBeOnTheScreen();
  });

  it('shows skip link when showSkip is true', () => {
    render(
      <OnboardingLayout
        title="Test"
        currentStep={4}
        showSkip={true}
        onSkip={() => {}}
      >
        <Text>Content</Text>
      </OnboardingLayout>
    );
    expect(screen.getByText('Skip for now')).toBeOnTheScreen();
  });

  it('hides skip link when showSkip is false', () => {
    render(
      <OnboardingLayout title="Test" currentStep={1} showSkip={false}>
        <Text>Content</Text>
      </OnboardingLayout>
    );
    expect(screen.queryByText('Skip for now')).not.toBeOnTheScreen();
  });

  it('calls onNext when next button pressed', async () => {
    const onNext = jest.fn();
    const { user } = setup(
      <OnboardingLayout title="Test" currentStep={1} onNext={onNext}>
        <Text>Content</Text>
      </OnboardingLayout>
    );
    await user.press(screen.getByTestId('onboarding-next-button'));
    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it('calls onBack when back button pressed', async () => {
    const onBack = jest.fn();
    const { user } = setup(
      <OnboardingLayout
        title="Test"
        currentStep={2}
        showBack={true}
        onBack={onBack}
      >
        <Text>Content</Text>
      </OnboardingLayout>
    );
    await user.press(screen.getByTestId('onboarding-back-button'));
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it('calls onSkip when skip link pressed', async () => {
    const onSkip = jest.fn();
    const { user } = setup(
      <OnboardingLayout
        title="Test"
        currentStep={4}
        showSkip={true}
        onSkip={onSkip}
      >
        <Text>Content</Text>
      </OnboardingLayout>
    );
    await user.press(screen.getByTestId('onboarding-skip-link'));
    expect(onSkip).toHaveBeenCalledTimes(1);
  });

  it('renders children content', () => {
    render(
      <OnboardingLayout title="Test" currentStep={1}>
        <Text testID="child-content">Child content here</Text>
      </OnboardingLayout>
    );
    expect(screen.getByTestId('child-content')).toBeOnTheScreen();
    expect(screen.getByText('Child content here')).toBeOnTheScreen();
  });

  it('shows back button by default when currentStep > 1', () => {
    render(
      <OnboardingLayout title="Test" currentStep={3} onBack={() => {}}>
        <Text>Content</Text>
      </OnboardingLayout>
    );
    expect(screen.getByText('Back')).toBeOnTheScreen();
  });

  it('hides back button on step 1 even when showBack is true', () => {
    render(
      <OnboardingLayout
        title="Test"
        currentStep={1}
        showBack={true}
        onBack={() => {}}
      >
        <Text>Content</Text>
      </OnboardingLayout>
    );
    expect(screen.queryByText('Back')).not.toBeOnTheScreen();
  });
});
