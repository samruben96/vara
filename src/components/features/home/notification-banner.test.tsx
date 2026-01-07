/**
 * NotificationBanner Tests - Story 2.9
 *
 * AC36: Tappable (navigates to finding) and dismissible (X or swipe)
 */

import React from 'react';

import { fireEvent, render, screen } from '@/lib/test-utils';

import { NotificationBanner } from './notification-banner';

describe('NotificationBanner', () => {
  const defaultProps = {
    title: 'Test notification',
    onPress: jest.fn(),
    onDismiss: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<NotificationBanner {...defaultProps} />);
    expect(true).toBe(true);
  });

  it('renders title', () => {
    render(<NotificationBanner {...defaultProps} />);
    expect(screen.getByText('Test notification')).toBeTruthy();
  });

  it('renders description when provided', () => {
    render(
      <NotificationBanner {...defaultProps} description="Test description" />
    );
    expect(screen.getByText('Test description')).toBeTruthy();
  });

  it('calls onPress when banner is tapped (AC36)', () => {
    const onPress = jest.fn();
    render(<NotificationBanner {...defaultProps} onPress={onPress} />);

    const banner = screen.getByRole('button', { name: /Test notification/i });
    fireEvent.press(banner);

    expect(onPress).toHaveBeenCalled();
  });

  it('has dismiss button with correct accessibility label (AC36)', () => {
    render(<NotificationBanner {...defaultProps} />);
    expect(screen.getByLabelText('Dismiss notification')).toBeTruthy();
  });

  it('renders with testID', () => {
    render(
      <NotificationBanner {...defaultProps} testID="notification-banner" />
    );
    expect(screen.getByTestId('notification-banner')).toBeTruthy();
  });

  it('has correct accessibility label with title and description', () => {
    render(
      <NotificationBanner
        {...defaultProps}
        title="Alert"
        description="Check your results"
      />
    );
    expect(
      screen.getByLabelText(
        'Alert. Check your results Tap to view details. Swipe right to dismiss.'
      )
    ).toBeTruthy();
  });
});
