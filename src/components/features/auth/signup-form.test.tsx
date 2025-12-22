import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';

import { SignupForm } from './signup-form';

// Mock expo-router
const mockBack = jest.fn();
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: mockBack,
  }),
}));

beforeEach(() => {
  mockBack.mockClear();
});

describe('SignupForm', () => {
  it('renders all required fields', () => {
    render(<SignupForm />);

    expect(screen.getByTestId('fullname-input')).toBeTruthy();
    expect(screen.getByTestId('email-input')).toBeTruthy();
    expect(screen.getByTestId('password-input')).toBeTruthy();
    expect(screen.getByTestId('confirm-password-input')).toBeTruthy();
    expect(screen.getByTestId('signup-button')).toBeTruthy();
  });

  it('renders signup title', () => {
    render(<SignupForm />);

    expect(screen.getByTestId('signup-title')).toBeTruthy();
    expect(screen.getAllByText('Create Account').length).toBeGreaterThan(0);
  });

  it('shows social login buttons', () => {
    render(<SignupForm />);

    expect(screen.getByTestId('social-button-google')).toBeTruthy();
    expect(screen.getByTestId('social-button-apple')).toBeTruthy();
  });

  it('shows sign in link', () => {
    render(<SignupForm />);

    expect(screen.getByText('Already have an account?')).toBeTruthy();
    expect(screen.getByText('Sign In')).toBeTruthy();
  });

  it('shows password requirements hint', () => {
    render(<SignupForm />);

    expect(
      screen.getByText(
        'Must be 8+ characters with an uppercase letter and number'
      )
    ).toBeTruthy();
  });

  it('renders with correct styling', () => {
    render(<SignupForm />);

    // Verify the form renders with vara branding
    expect(screen.getByText('vara')).toBeTruthy();
    expect(
      screen.getByText('Start protecting your digital identity today.')
    ).toBeTruthy();
  });
});

// Helper to fill form and submit
type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const fillFormAndSubmit = ({
  name,
  email,
  password,
  confirmPassword,
}: FormData) => {
  fireEvent.changeText(screen.getByTestId('fullname-input'), name);
  fireEvent.changeText(screen.getByTestId('email-input'), email);
  fireEvent.changeText(screen.getByTestId('password-input'), password);
  fireEvent.changeText(
    screen.getByTestId('confirm-password-input'),
    confirmPassword
  );
  fireEvent.press(screen.getByTestId('signup-button'));
};

describe('SignupForm email validation', () => {
  it('validates email format', async () => {
    render(<SignupForm />);
    fillFormAndSubmit({
      name: 'John Doe',
      email: 'invalid-email',
      password: 'Password1',
      confirmPassword: 'Password1',
    });
    await waitFor(() => {
      expect(screen.getByText('Invalid email format')).toBeTruthy();
    });
  });
});

describe('SignupForm password validation', () => {
  it('validates password minimum length', async () => {
    render(<SignupForm />);
    fillFormAndSubmit({
      name: 'John Doe',
      email: 'test@example.com',
      password: 'short',
      confirmPassword: 'short',
    });
    await waitFor(() => {
      expect(
        screen.getByText('Password must be at least 8 characters')
      ).toBeTruthy();
    });
  });

  it('validates password requires uppercase letter', async () => {
    render(<SignupForm />);
    fillFormAndSubmit({
      name: 'John Doe',
      email: 'test@example.com',
      password: 'password1',
      confirmPassword: 'password1',
    });
    await waitFor(() => {
      expect(
        screen.getByText('Password must contain at least one uppercase letter')
      ).toBeTruthy();
    });
  });

  it('validates password requires number', async () => {
    render(<SignupForm />);
    fillFormAndSubmit({
      name: 'John Doe',
      email: 'test@example.com',
      password: 'Password',
      confirmPassword: 'Password',
    });
    await waitFor(() => {
      expect(
        screen.getByText('Password must contain at least one number')
      ).toBeTruthy();
    });
  });

  it('validates passwords match', async () => {
    render(<SignupForm />);
    fillFormAndSubmit({
      name: 'John Doe',
      email: 'test@example.com',
      password: 'Password1',
      confirmPassword: 'DifferentPassword1',
    });
    await waitFor(() => {
      expect(screen.getByText('Passwords do not match')).toBeTruthy();
    });
  });
});

describe('SignupForm navigation', () => {
  it('navigates to login on sign in link press', () => {
    render(<SignupForm />);

    fireEvent.press(screen.getByText('Sign In'));

    expect(mockBack).toHaveBeenCalled();
  });
});
