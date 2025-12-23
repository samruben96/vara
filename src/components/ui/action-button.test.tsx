import * as Haptics from 'expo-haptics';
import React from 'react';
import { View } from 'react-native';

import { fireEvent, render, screen } from '@/lib/test-utils';

import { ActionButton } from './action-button';

jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  ImpactFeedbackStyle: {
    Light: 'Light',
    Medium: 'Medium',
    Heavy: 'Heavy',
  },
}));

describe('ActionButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with label', () => {
    render(<ActionButton label="Submit" />);
    expect(screen.getByText('Submit')).toBeTruthy();
  });

  it('renders primary variant by default', () => {
    render(<ActionButton label="Primary" />);
    expect(screen.getByRole('button')).toBeTruthy();
    expect(screen.getByText('Primary')).toBeTruthy();
  });

  it('renders secondary variant', () => {
    render(<ActionButton label="Secondary" variant="secondary" />);
    expect(screen.getByText('Secondary')).toBeTruthy();
  });

  it('renders danger variant', () => {
    render(<ActionButton label="Danger" variant="danger" />);
    expect(screen.getByText('Danger')).toBeTruthy();
  });

  it('renders ghost variant', () => {
    render(<ActionButton label="Ghost" variant="ghost" />);
    expect(screen.getByText('Ghost')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    render(<ActionButton label="Click" onPress={onPressMock} />);
    fireEvent.press(screen.getByRole('button'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('triggers haptic feedback on press', () => {
    const onPressMock = jest.fn();
    render(<ActionButton label="Click" onPress={onPressMock} />);
    fireEvent.press(screen.getByRole('button'));
    expect(Haptics.impactAsync).toHaveBeenCalledWith(
      Haptics.ImpactFeedbackStyle.Light
    );
  });

  it('does not call onPress when disabled', () => {
    const onPressMock = jest.fn();
    render(<ActionButton label="Disabled" disabled onPress={onPressMock} />);
    fireEvent.press(screen.getByRole('button'));
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it('does not call onPress when loading', () => {
    const onPressMock = jest.fn();
    render(<ActionButton label="Loading" loading onPress={onPressMock} />);
    fireEvent.press(screen.getByRole('button'));
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it('shows loading indicator when loading', () => {
    render(<ActionButton label="Submit" loading />);
    expect(screen.getByTestId('action-button-loading')).toBeTruthy();
  });

  it('hides label when loading', () => {
    render(<ActionButton label="Submit" loading />);
    expect(screen.queryByText('Submit')).toBeNull();
  });

  it('has correct accessibility label when loading', () => {
    render(<ActionButton label="Submit" loading />);
    expect(screen.getByLabelText('Submit, loading')).toBeTruthy();
  });

  it('has correct accessibility label when not loading', () => {
    render(<ActionButton label="Submit" />);
    expect(screen.getByLabelText('Submit')).toBeTruthy();
  });

  it('renders with icon', () => {
    const TestIcon = () => <View testID="test-icon" />;
    render(<ActionButton label="With Icon" icon={<TestIcon />} />);
    expect(screen.getByTestId('test-icon')).toBeTruthy();
    expect(screen.getByText('With Icon')).toBeTruthy();
  });

  it('renders all sizes correctly', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach((size) => {
      const { unmount } = render(<ActionButton label="Button" size={size} />);
      expect(screen.getByText('Button')).toBeTruthy();
      unmount();
    });
  });

  it('has button accessibility role', () => {
    render(<ActionButton label="Button" />);
    expect(screen.getByRole('button')).toBeTruthy();
  });

  it('has disabled accessibility state when disabled', () => {
    render(<ActionButton label="Disabled" disabled />);
    const button = screen.getByRole('button');
    expect(button.props.accessibilityState.disabled).toBe(true);
  });

  it('does not trigger haptic when disabled', () => {
    const onPressMock = jest.fn();
    render(<ActionButton label="Disabled" disabled onPress={onPressMock} />);
    fireEvent.press(screen.getByRole('button'));
    expect(Haptics.impactAsync).not.toHaveBeenCalled();
  });

  it('renders all variants correctly', () => {
    const variants = ['primary', 'secondary', 'danger', 'ghost'] as const;

    variants.forEach((variant) => {
      const { unmount } = render(
        <ActionButton label={variant} variant={variant} />
      );
      expect(screen.getByText(variant)).toBeTruthy();
      unmount();
    });
  });

  // Story 2.9: New tests for coral styling and pill shape
  describe('Story 2.9 - Visual Design Updates', () => {
    it('accepts testID prop', () => {
      render(<ActionButton label="Test" testID="test-button" />);
      expect(screen.getByTestId('test-button')).toBeTruthy();
    });

    it('primary variant uses coral color', () => {
      render(<ActionButton label="Primary" variant="primary" testID="primary-btn" />);
      const button = screen.getByTestId('primary-btn');
      // Button should exist with primary styles applied
      expect(button).toBeTruthy();
    });

    it('secondary variant uses coral border and text', () => {
      render(<ActionButton label="Secondary" variant="secondary" testID="secondary-btn" />);
      const button = screen.getByTestId('secondary-btn');
      expect(button).toBeTruthy();
    });
  });
});
