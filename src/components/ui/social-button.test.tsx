import { fireEvent, render, screen } from '@testing-library/react-native';

import { SocialButton } from './social-button';

describe('SocialButton', () => {
  it('renders Google variant correctly', () => {
    render(<SocialButton provider="google" />);

    expect(screen.getByTestId('social-button-google')).toBeTruthy();
    expect(screen.getByText('Continue with Google')).toBeTruthy();
  });

  it('renders Apple variant correctly', () => {
    render(<SocialButton provider="apple" />);

    expect(screen.getByTestId('social-button-apple')).toBeTruthy();
    expect(screen.getByText('Sign in with Apple')).toBeTruthy();
  });

  it('handles press events', () => {
    const onPress = jest.fn();
    render(<SocialButton provider="google" onPress={onPress} />);

    fireEvent.press(screen.getByTestId('social-button-google'));
    expect(onPress).toHaveBeenCalled();
  });

  it('shows loading state', () => {
    render(<SocialButton provider="google" loading />);

    // When loading, text should not be visible
    expect(screen.queryByText('Continue with Google')).toBeNull();
  });

  it('is disabled when loading', () => {
    const onPress = jest.fn();
    render(<SocialButton provider="apple" loading onPress={onPress} />);

    fireEvent.press(screen.getByTestId('social-button-apple'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('is disabled when disabled prop is true', () => {
    const onPress = jest.fn();
    render(<SocialButton provider="google" disabled onPress={onPress} />);

    fireEvent.press(screen.getByTestId('social-button-google'));
    expect(onPress).not.toHaveBeenCalled();
  });
});
