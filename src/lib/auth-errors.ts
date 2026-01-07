/**
 * Auth Error Handler (Story 3.1 - Task 6)
 * @description Maps Supabase auth error codes to user-friendly messages
 */

/**
 * Map Supabase auth errors to user-friendly messages
 * @param error - The error object from Supabase auth
 * @returns A user-friendly error message
 */
export const getAuthErrorMessage = (error: Error | unknown): string => {
  if (!error) {
    return 'An unexpected error occurred. Please try again.';
  }

  const message =
    typeof error === 'object' && 'message' in error
      ? String((error as { message: string }).message).toLowerCase()
      : String(error).toLowerCase();

  // Email already registered
  if (
    message.includes('already registered') ||
    message.includes('already exists') ||
    message.includes('user_already_exists')
  ) {
    return 'An account with this email already exists. Try logging in instead.';
  }

  // Weak password
  if (
    (message.includes('password') && message.includes('weak')) ||
    message.includes('weak_password')
  ) {
    return 'Password must be at least 8 characters with 1 uppercase and 1 number.';
  }

  // Invalid email
  if (
    (message.includes('invalid') && message.includes('email')) ||
    message.includes('invalid_email')
  ) {
    return 'Please enter a valid email address.';
  }

  // Rate limit exceeded
  if (
    message.includes('rate') ||
    message.includes('too many') ||
    message.includes('over_request_rate_limit')
  ) {
    return 'Too many attempts. Please try again later.';
  }

  // Network error
  if (
    message.includes('network') ||
    message.includes('fetch') ||
    message.includes('connection')
  ) {
    return 'Network error. Please check your connection and try again.';
  }

  // Invalid credentials
  if (
    message.includes('invalid') &&
    (message.includes('credentials') || message.includes('login'))
  ) {
    return 'Invalid email or password. Please try again.';
  }

  // Email not confirmed
  if (message.includes('email not confirmed')) {
    return 'Please verify your email address before logging in.';
  }

  // Session expired
  if (message.includes('session') && message.includes('expired')) {
    return 'Your session has expired. Please log in again.';
  }

  // Default error message
  return 'Something went wrong. Please try again.';
};

/**
 * Auth action types for audit logging
 */
export const AUTH_ACTIONS = {
  REGISTRATION: 'registration',
  LOGIN: 'login',
  LOGOUT: 'logout',
  PASSWORD_RESET_REQUEST: 'password_reset_request',
  PASSWORD_RESET_COMPLETE: 'password_reset_complete',
  EMAIL_VERIFIED: 'email_verified',
  PASSWORD_CHANGED: 'password_changed',
} as const;

export type AuthAction = (typeof AUTH_ACTIONS)[keyof typeof AUTH_ACTIONS];
