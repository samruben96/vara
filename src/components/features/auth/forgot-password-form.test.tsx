import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';

import { ForgotPasswordForm } from './forgot-password-form';

// Mock expo-router
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
  }),
}));

describe('ForgotPasswordForm', () => {
  it('renders email field', () => {
    render(<ForgotPasswordForm />);
    expect(screen.getByTestId('email-input')).toBeTruthy();
  });

  it('renders reset button', () => {
    render(<ForgotPasswordForm />);
    expect(screen.getByTestId('reset-button')).toBeTruthy();
    expect(screen.getByText('Send Reset Link')).toBeTruthy();
  });

  it('renders title', () => {
    render(<ForgotPasswordForm />);
    expect(screen.getByTestId('forgot-password-title')).toBeTruthy();
    expect(screen.getByText('Reset Password')).toBeTruthy();
  });

  it('shows back to login link', () => {
    render(<ForgotPasswordForm />);
    expect(screen.getByText('← Back to Sign In')).toBeTruthy();
  });

  it('renders vara branding', () => {
    render(<ForgotPasswordForm />);
    expect(screen.getByText('vara')).toBeTruthy();
  });

  it('calls onSubmit with email data', async () => {
    const onSubmit = jest.fn();
    render(<ForgotPasswordForm onSubmit={onSubmit} />);

    fireEvent.changeText(screen.getByTestId('email-input'), 'test@example.com');
    fireEvent.press(screen.getByTestId('reset-button'));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({ email: 'test@example.com' });
    });
  });
});

describe('ForgotPasswordForm success state', () => {
  it('shows success message on valid submit', async () => {
    render(<ForgotPasswordForm />);

    fireEvent.changeText(screen.getByTestId('email-input'), 'test@example.com');
    fireEvent.press(screen.getByTestId('reset-button'));

    await waitFor(() => {
      expect(screen.getByTestId('success-title')).toBeTruthy();
    });
  });

  it('shows back to sign in button in success state', async () => {
    render(<ForgotPasswordForm />);

    fireEvent.changeText(screen.getByTestId('email-input'), 'test@example.com');
    fireEvent.press(screen.getByTestId('reset-button'));

    await waitFor(() => {
      expect(screen.getByTestId('back-to-login-button')).toBeTruthy();
    });
  });
});
