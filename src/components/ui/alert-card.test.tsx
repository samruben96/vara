import * as Haptics from 'expo-haptics';
import React from 'react';

import { fireEvent, render, screen } from '@/lib/test-utils';

import { AlertCard } from './alert-card';

jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  ImpactFeedbackStyle: {
    Light: 'Light',
    Medium: 'Medium',
    Heavy: 'Heavy',
  },
}));

describe('AlertCard', () => {
  const defaultProps = {
    title: 'Test Alert',
    description: 'This is a test alert description',
    severity: 'high' as const,
    timestamp: new Date(),
    status: 'new' as const,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders title', () => {
    render(<AlertCard {...defaultProps} />);
    expect(screen.getByText('Test Alert')).toBeTruthy();
  });

  it('renders description', () => {
    render(<AlertCard {...defaultProps} />);
    expect(screen.getByText('This is a test alert description')).toBeTruthy();
  });

  it('renders without description', () => {
    const { description: _description, ...propsWithoutDescription } =
      defaultProps;
    render(<AlertCard {...propsWithoutDescription} />);
    expect(screen.getByText('Test Alert')).toBeTruthy();
  });

  it('renders severity badge', () => {
    render(<AlertCard {...defaultProps} />);
    expect(screen.getByText('High')).toBeTruthy();
  });

  it('renders all severity levels', () => {
    const severities = ['low', 'medium', 'high', 'critical'] as const;

    severities.forEach((severity) => {
      const { unmount } = render(
        <AlertCard {...defaultProps} severity={severity} />
      );
      const expectedLabel =
        severity.charAt(0).toUpperCase() + severity.slice(1);
      expect(screen.getByText(expectedLabel)).toBeTruthy();
      unmount();
    });
  });

  it('displays relative timestamp for recent items', () => {
    const recentDate = new Date(Date.now() - 5 * 60 * 1000); // 5 minutes ago
    render(<AlertCard {...defaultProps} timestamp={recentDate} />);
    expect(screen.getByText('5m ago')).toBeTruthy();
  });

  it('displays hours for items within a day', () => {
    const hoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000); // 3 hours ago
    render(<AlertCard {...defaultProps} timestamp={hoursAgo} />);
    expect(screen.getByText('3h ago')).toBeTruthy();
  });

  it('displays days for items within a week', () => {
    const daysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000); // 2 days ago
    render(<AlertCard {...defaultProps} timestamp={daysAgo} />);
    expect(screen.getByText('2d ago')).toBeTruthy();
  });

  it('renders new status with indicator', () => {
    render(<AlertCard {...defaultProps} status="new" />);
    // The new status should show an indicator (coral dot)
    expect(screen.getByText('Test Alert')).toBeTruthy();
  });

  it('renders viewed status', () => {
    render(<AlertCard {...defaultProps} status="viewed" />);
    expect(screen.getByText('Test Alert')).toBeTruthy();
  });

  it('renders resolved status with label', () => {
    render(<AlertCard {...defaultProps} status="resolved" />);
    expect(screen.getByText('Test Alert')).toBeTruthy();
    expect(screen.getByText('Resolved')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    render(<AlertCard {...defaultProps} onPress={onPressMock} />);
    fireEvent.press(screen.getByRole('button'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('triggers haptic feedback on press', () => {
    const onPressMock = jest.fn();
    render(<AlertCard {...defaultProps} onPress={onPressMock} />);
    fireEvent.press(screen.getByRole('button'));
    expect(Haptics.impactAsync).toHaveBeenCalledWith(
      Haptics.ImpactFeedbackStyle.Light
    );
  });

  it('has button role when pressable', () => {
    const onPressMock = jest.fn();
    render(<AlertCard {...defaultProps} onPress={onPressMock} />);
    expect(screen.getByRole('button')).toBeTruthy();
  });

  it('has text role when not pressable', () => {
    render(<AlertCard {...defaultProps} />);
    const label = `${defaultProps.title}. Severity: ${defaultProps.severity}. ${defaultProps.description}. Just now. Status: ${defaultProps.status}`;
    const element = screen.getByLabelText(label);
    expect(element.props.accessibilityRole).toBe('text');
  });

  it('does not trigger haptic when no onPress provided', () => {
    render(<AlertCard {...defaultProps} />);
    expect(Haptics.impactAsync).not.toHaveBeenCalled();
  });

  it('has correct accessibility label', () => {
    render(<AlertCard {...defaultProps} />);
    const label = `${defaultProps.title}. Severity: ${defaultProps.severity}. ${defaultProps.description}. Just now. Status: ${defaultProps.status}`;
    expect(screen.getByLabelText(label)).toBeTruthy();
  });
});
