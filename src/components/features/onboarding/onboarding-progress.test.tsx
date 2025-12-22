import React from 'react';

import { cleanup, render, screen } from '@/lib/test-utils';

import { OnboardingProgress } from './onboarding-progress';

afterEach(cleanup);

describe('OnboardingProgress', () => {
  it('renders correct number of dots', () => {
    render(<OnboardingProgress currentStep={1} totalSteps={5} />);
    const progressContainer = screen.getByTestId('onboarding-progress');
    expect(progressContainer).toBeOnTheScreen();
    // Should render 5 dot elements
    for (let i = 1; i <= 5; i++) {
      expect(screen.getByTestId(`progress-dot-${i}`)).toBeOnTheScreen();
    }
  });

  it('highlights active step with mint color', () => {
    render(<OnboardingProgress currentStep={3} totalSteps={5} />);
    const activeDot = screen.getByTestId('progress-dot-3');
    expect(activeDot).toBeOnTheScreen();
    // Active dot should have mint background and wider width
    expect(activeDot.props.style).toEqual(
      expect.objectContaining({
        backgroundColor: '#B1EFE3', // mint
      })
    );
  });

  it('shows completed steps with lavender', () => {
    render(<OnboardingProgress currentStep={3} totalSteps={5} />);
    // Steps 1 and 2 should be completed (lavender)
    const completedDot1 = screen.getByTestId('progress-dot-1');
    const completedDot2 = screen.getByTestId('progress-dot-2');
    expect(completedDot1.props.style).toEqual(
      expect.objectContaining({
        backgroundColor: '#D7CAE6', // lavender
      })
    );
    expect(completedDot2.props.style).toEqual(
      expect.objectContaining({
        backgroundColor: '#D7CAE6', // lavender
      })
    );
  });

  it('shows pending steps with gray', () => {
    render(<OnboardingProgress currentStep={2} totalSteps={5} />);
    // Steps 3, 4, 5 should be pending (light gray for light theme)
    const pendingDot3 = screen.getByTestId('progress-dot-3');
    const pendingDot4 = screen.getByTestId('progress-dot-4');
    const pendingDot5 = screen.getByTestId('progress-dot-5');
    expect(pendingDot3.props.style).toEqual(
      expect.objectContaining({
        backgroundColor: '#E5E5E5', // light gray
      })
    );
    expect(pendingDot4.props.style).toEqual(
      expect.objectContaining({
        backgroundColor: '#E5E5E5', // light gray
      })
    );
    expect(pendingDot5.props.style).toEqual(
      expect.objectContaining({
        backgroundColor: '#E5E5E5', // light gray
      })
    );
  });

  it('defaults to 5 total steps when not specified', () => {
    render(<OnboardingProgress currentStep={1} />);
    // Should render 5 dots by default
    for (let i = 1; i <= 5; i++) {
      expect(screen.getByTestId(`progress-dot-${i}`)).toBeOnTheScreen();
    }
  });

  it('renders wider dot for active step', () => {
    render(<OnboardingProgress currentStep={2} totalSteps={5} />);
    const activeDot = screen.getByTestId('progress-dot-2');
    const pendingDot = screen.getByTestId('progress-dot-3');
    // Active dot should be wider (24) vs pending (8)
    expect(activeDot.props.style).toEqual(
      expect.objectContaining({
        width: 24,
      })
    );
    expect(pendingDot.props.style).toEqual(
      expect.objectContaining({
        width: 8,
      })
    );
  });
});
