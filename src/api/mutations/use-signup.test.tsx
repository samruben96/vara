/**
 * Signup Mutation Hook Tests (Story 3.1 - Task 1)
 *
 * Test cases per Dev Notes:
 * 1. Successful signup returns user data
 * 2. Handles email already registered error
 * 3. Handles network error
 * 4. Passes fullName in options.data
 */
import type { AuthError, AuthResponse } from '@supabase/supabase-js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react-native';
import React from 'react';

import { useSignup } from './use-signup';

// Mock Supabase client
const mockSignUp = jest.fn();

jest.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      signUp: (params: unknown) => mockSignUp(params),
    },
  },
}));

// Create a wrapper with QueryClientProvider
let queryClient: QueryClient;

const createWrapper = () => {
  queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

// Helper to create mock user
const createMockUser = () => ({
  id: 'test-user-id',
  email: 'test@example.com',
  app_metadata: {},
  user_metadata: { full_name: 'Test User' },
  aud: 'authenticated',
  created_at: '2024-12-17T00:00:00Z',
});

describe('useSignup', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Clean up QueryClient to prevent open handles
    queryClient?.clear();
  });

  describe('successful signup', () => {
    it('should return user data on successful signup', async () => {
      const mockUser = createMockUser();
      mockSignUp.mockResolvedValue({
        data: { user: mockUser, session: null },
        error: null,
      } as AuthResponse);

      const { result } = renderHook(() => useSignup(), {
        wrapper: createWrapper(),
      });

      result.current.mutate({
        email: 'test@example.com',
        password: 'Password123',
        fullName: 'Test User',
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual({
        user: mockUser,
        session: null,
      });
    });

    it('should pass fullName in options.data during signup', async () => {
      mockSignUp.mockResolvedValue({
        data: { user: createMockUser(), session: null },
        error: null,
      });

      const { result } = renderHook(() => useSignup(), {
        wrapper: createWrapper(),
      });

      result.current.mutate({
        email: 'test@example.com',
        password: 'Password123',
        fullName: 'Test User',
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(mockSignUp).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'Password123',
        options: {
          data: { full_name: 'Test User' },
        },
      });
    });

    it('should handle email confirmation required (session is null)', async () => {
      const mockUser = createMockUser();
      mockSignUp.mockResolvedValue({
        data: { user: mockUser, session: null },
        error: null,
      });

      const { result } = renderHook(() => useSignup(), {
        wrapper: createWrapper(),
      });

      result.current.mutate({
        email: 'test@example.com',
        password: 'Password123',
        fullName: 'Test User',
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      // Session should be null (email confirmation required)
      expect(result.current.data?.session).toBeNull();
      expect(result.current.data?.user).toBeDefined();
    });
  });

  describe('error handling', () => {
    it('should handle email already registered error', async () => {
      const mockError = {
        message: 'User already registered',
        status: 400,
        name: 'AuthApiError',
      } as AuthError;

      mockSignUp.mockResolvedValue({
        data: { user: null, session: null },
        error: mockError,
      });

      const { result } = renderHook(() => useSignup(), {
        wrapper: createWrapper(),
      });

      result.current.mutate({
        email: 'existing@example.com',
        password: 'Password123',
        fullName: 'Test User',
      });

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(result.current.error?.message).toBe('User already registered');
    });

    it('should handle network error', async () => {
      mockSignUp.mockRejectedValue(new Error('Network request failed'));

      const { result } = renderHook(() => useSignup(), {
        wrapper: createWrapper(),
      });

      result.current.mutate({
        email: 'test@example.com',
        password: 'Password123',
        fullName: 'Test User',
      });

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(result.current.error?.message).toBe('Network request failed');
    });

    it('should handle weak password error', async () => {
      const mockError = {
        message: 'Password should be at least 6 characters',
        status: 400,
        name: 'AuthApiError',
      } as AuthError;

      mockSignUp.mockResolvedValue({
        data: { user: null, session: null },
        error: mockError,
      });

      const { result } = renderHook(() => useSignup(), {
        wrapper: createWrapper(),
      });

      result.current.mutate({
        email: 'test@example.com',
        password: 'weak',
        fullName: 'Test User',
      });

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(result.current.error?.message).toBe(
        'Password should be at least 6 characters'
      );
    });
  });
});
