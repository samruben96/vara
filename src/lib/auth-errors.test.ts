/**
 * Auth Error Handler Tests (Story 3.1 - Code Review Fix)
 * @description Tests for getAuthErrorMessage and AUTH_ACTIONS
 */
import { AUTH_ACTIONS, getAuthErrorMessage } from './auth-errors';

describe('getAuthErrorMessage', () => {
  describe('email already registered', () => {
    it('should handle "already registered" error message', () => {
      const error = new Error('User already registered');
      expect(getAuthErrorMessage(error)).toBe(
        'An account with this email already exists. Try logging in instead.'
      );
    });

    it('should handle "already exists" error message', () => {
      const error = new Error('User already exists');
      expect(getAuthErrorMessage(error)).toBe(
        'An account with this email already exists. Try logging in instead.'
      );
    });

    it('should handle user_already_exists error code', () => {
      const error = new Error('user_already_exists');
      expect(getAuthErrorMessage(error)).toBe(
        'An account with this email already exists. Try logging in instead.'
      );
    });
  });

  describe('weak password', () => {
    it('should handle weak password error', () => {
      const error = new Error('Password is too weak');
      expect(getAuthErrorMessage(error)).toBe(
        'Password must be at least 8 characters with 1 uppercase and 1 number.'
      );
    });

    it('should handle weak_password error code', () => {
      const error = new Error('weak_password');
      expect(getAuthErrorMessage(error)).toBe(
        'Password must be at least 8 characters with 1 uppercase and 1 number.'
      );
    });
  });

  describe('invalid email', () => {
    it('should handle invalid email error', () => {
      const error = new Error('Invalid email format');
      expect(getAuthErrorMessage(error)).toBe(
        'Please enter a valid email address.'
      );
    });

    it('should handle invalid_email error code', () => {
      const error = new Error('invalid_email');
      expect(getAuthErrorMessage(error)).toBe(
        'Please enter a valid email address.'
      );
    });
  });

  describe('rate limiting', () => {
    it('should handle rate limit error', () => {
      const error = new Error('Rate limit exceeded');
      expect(getAuthErrorMessage(error)).toBe(
        'Too many attempts. Please try again later.'
      );
    });

    it('should handle "too many" error', () => {
      const error = new Error('Too many requests');
      expect(getAuthErrorMessage(error)).toBe(
        'Too many attempts. Please try again later.'
      );
    });

    it('should handle over_request_rate_limit error code', () => {
      const error = new Error('over_request_rate_limit');
      expect(getAuthErrorMessage(error)).toBe(
        'Too many attempts. Please try again later.'
      );
    });
  });

  describe('network errors', () => {
    it('should handle network error', () => {
      const error = new Error('Network request failed');
      expect(getAuthErrorMessage(error)).toBe(
        'Network error. Please check your connection and try again.'
      );
    });

    it('should handle fetch error', () => {
      const error = new Error('Fetch failed');
      expect(getAuthErrorMessage(error)).toBe(
        'Network error. Please check your connection and try again.'
      );
    });

    it('should handle connection error', () => {
      const error = new Error('Connection refused');
      expect(getAuthErrorMessage(error)).toBe(
        'Network error. Please check your connection and try again.'
      );
    });
  });

  describe('invalid credentials', () => {
    it('should handle invalid credentials error', () => {
      const error = new Error('Invalid login credentials');
      expect(getAuthErrorMessage(error)).toBe(
        'Invalid email or password. Please try again.'
      );
    });
  });

  describe('email not confirmed', () => {
    it('should handle email not confirmed error', () => {
      const error = new Error('Email not confirmed');
      expect(getAuthErrorMessage(error)).toBe(
        'Please verify your email address before logging in.'
      );
    });
  });

  describe('session expired', () => {
    it('should handle session expired error', () => {
      const error = new Error('Session has expired');
      expect(getAuthErrorMessage(error)).toBe(
        'Your session has expired. Please log in again.'
      );
    });
  });

  describe('fallback handling', () => {
    it('should return default message for unknown errors', () => {
      const error = new Error('Some unknown error');
      expect(getAuthErrorMessage(error)).toBe(
        'Something went wrong. Please try again.'
      );
    });

    it('should handle null/undefined error', () => {
      expect(getAuthErrorMessage(null)).toBe(
        'An unexpected error occurred. Please try again.'
      );
      expect(getAuthErrorMessage(undefined)).toBe(
        'An unexpected error occurred. Please try again.'
      );
    });

    it('should handle string error', () => {
      expect(getAuthErrorMessage('Some error string')).toBe(
        'Something went wrong. Please try again.'
      );
    });

    it('should handle object with message property', () => {
      const error = { message: 'User already registered', code: 'AUTH_ERROR' };
      expect(getAuthErrorMessage(error)).toBe(
        'An account with this email already exists. Try logging in instead.'
      );
    });
  });
});

describe('AUTH_ACTIONS', () => {
  it('should have all required action types', () => {
    expect(AUTH_ACTIONS.REGISTRATION).toBe('registration');
    expect(AUTH_ACTIONS.LOGIN).toBe('login');
    expect(AUTH_ACTIONS.LOGOUT).toBe('logout');
    expect(AUTH_ACTIONS.PASSWORD_RESET_REQUEST).toBe('password_reset_request');
    expect(AUTH_ACTIONS.PASSWORD_RESET_COMPLETE).toBe(
      'password_reset_complete'
    );
    expect(AUTH_ACTIONS.EMAIL_VERIFIED).toBe('email_verified');
    expect(AUTH_ACTIONS.PASSWORD_CHANGED).toBe('password_changed');
  });

  it('should be readonly (const assertion)', () => {
    // TypeScript enforces this at compile time, but we can verify the values exist
    const actions = Object.values(AUTH_ACTIONS);
    expect(actions).toHaveLength(7);
  });
});
