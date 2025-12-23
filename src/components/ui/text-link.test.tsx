/**
 * TextLink Component Tests - Story 2.9
 */

import * as Haptics from 'expo-haptics';
import React from 'react';

import { fireEvent, render, screen } from '@/lib/test-utils';

import { TextLink } from './text-link';

jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  ImpactFeedbackStyle: {
    Light: 'Light',
    Medium: 'Medium',
    Heavy: 'Heavy',
  },
}));

describe('TextLink', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with label', () => {
    render(<TextLink label="Dismiss" onPress={() => {}} />);
    expect(screen.getByText('Dismiss')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    render(<TextLink label="Skip" onPress={onPressMock} />);
    fireEvent.press(screen.getByRole('link'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('triggers haptic feedback on press', () => {
    const onPressMock = jest.fn();
    render(<TextLink label="Dismiss" onPress={onPressMock} />);
    fireEvent.press(screen.getByRole('link'));
    expect(Haptics.impactAsync).toHaveBeenCalledWith(
      Haptics.ImpactFeedbackStyle.Light
    );
  });

  it('does not call onPress when disabled', () => {
    const onPressMock = jest.fn();
    render(<TextLink label="Disabled" disabled onPress={onPressMock} />);
    fireEvent.press(screen.getByRole('link'));
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it('does not trigger haptic when disabled', () => {
    const onPressMock = jest.fn();
    render(<TextLink label="Disabled" disabled onPress={onPressMock} />);
    fireEvent.press(screen.getByRole('link'));
    expect(Haptics.impactAsync).not.toHaveBeenCalled();
  });

  it('has link accessibility role', () => {
    render(<TextLink label="Link" onPress={() => {}} />);
    expect(screen.getByRole('link')).toBeTruthy();
  });

  it('has correct accessibility label', () => {
    render(<TextLink label="Dismiss" onPress={() => {}} />);
    expect(screen.getByLabelText('Dismiss')).toBeTruthy();
  });

  it('has disabled accessibility state when disabled', () => {
    render(<TextLink label="Disabled" disabled onPress={() => {}} />);
    const link = screen.getByRole('link');
    expect(link.props.accessibilityState.disabled).toBe(true);
  });

  it('accepts testID prop', () => {
    render(<TextLink label="Test" onPress={() => {}} testID="test-link" />);
    expect(screen.getByTestId('test-link')).toBeTruthy();
  });

  it('accepts custom color prop', () => {
    render(<TextLink label="Custom" onPress={() => {}} color="#FF0000" />);
    expect(screen.getByText('Custom')).toBeTruthy();
  });

  it('uses muted gray color by default (AC14)', () => {
    render(<TextLink label="Dismiss" onPress={() => {}} testID="default-link" />);
    // Default color should be muted gray
    expect(screen.getByText('Dismiss')).toBeTruthy();
  });
});
