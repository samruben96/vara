/* eslint-disable max-lines-per-function */
/**
 * Auth Listener Hook Tests (Story 1.5 - Task 5)
 *
 * Test cases per Dev Notes:
 * 1. Checks initial session on mount via supabase.auth.getSession()
 * 2. Subscribes to onAuthStateChange on mount
 * 3. Updates Zustand store when auth state changes (SIGNED_IN, SIGNED_OUT, TOKEN_REFRESHED)
 * 4. Calls clearAuth() on SIGNED_OUT event
 * 5. Unsubscribes from listener on unmount (cleanup)
 */
import type { AuthChangeEvent, Session, User } from '@supabase/supabase-js';
import { renderHook } from '@testing-library/react-native';

import { useAuthListener } from './use-auth-listener';

// Mock the Supabase client
const mockUnsubscribe = jest.fn();
const mockOnAuthStateChange = jest.fn();
const mockGetSession = jest.fn();

jest.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      getSession: () => mockGetSession(),
      onAuthStateChange: (
        callback: (event: AuthChangeEvent, session: Session | null) => void
      ) => {
        mockOnAuthStateChange(callback);
        return {
          data: {
            subscription: {
              unsubscribe: mockUnsubscribe,
            },
          },
        };
      },
    },
  },
}));

// Mock the auth store
const mockSetSession = jest.fn();
const mockSetLoading = jest.fn();
const mockClearAuth = jest.fn();

jest.mock('@/store/auth-store', () => ({
  useAuthStore: (selector: (state: unknown) => unknown) => {
    const state = {
      setSession: mockSetSession,
      setLoading: mockSetLoading,
      clearAuth: mockClearAuth,
    };
    return selector(state);
  },
}));

// Helper to create mock User
const createMockUser = (overrides: Partial<User> = {}): User => ({
  id: 'test-user-id',
  app_metadata: {},
  user_metadata: {},
  aud: 'authenticated',
  created_at: '2024-12-17T00:00:00Z',
  email: 'test@example.com',
  ...overrides,
});

// Helper to create mock Session
const createMockSession = (overrides: Partial<Session> = {}): Session => ({
  access_token: 'test-access-token',
  refresh_token: 'test-refresh-token',
  expires_in: 3600,
  token_type: 'bearer',
  user: createMockUser(),
  ...overrides,
});

describe('useAuthListener', () => {
  let authChangeCallback:
    | ((event: AuthChangeEvent, session: Session | null) => void)
    | null = null;

  beforeEach(() => {
    jest.clearAllMocks();
    authChangeCallback = null;

    // Default mock implementation for getSession
    mockGetSession.mockResolvedValue({ data: { session: null } });

    // Capture the callback passed to onAuthStateChange
    mockOnAuthStateChange.mockImplementation((callback) => {
      authChangeCallback = callback;
    });
  });

  describe('initial session check', () => {
    it('should call getSession on mount', () => {
      renderHook(() => useAuthListener());

      expect(mockGetSession).toHaveBeenCalledTimes(1);
    });

    it('should set session and loading state from initial session', async () => {
      const mockSession = createMockSession();
      mockGetSession.mockResolvedValue({ data: { session: mockSession } });

      renderHook(() => useAuthListener());

      // Wait for async getSession to resolve
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(mockSetSession).toHaveBeenCalledWith(mockSession);
      expect(mockSetLoading).toHaveBeenCalledWith(false);
    });

    it('should set null session when no initial session exists', async () => {
      mockGetSession.mockResolvedValue({ data: { session: null } });

      renderHook(() => useAuthListener());

      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(mockSetSession).toHaveBeenCalledWith(null);
      expect(mockSetLoading).toHaveBeenCalledWith(false);
    });
  });

  describe('auth state change subscription', () => {
    it('should subscribe to onAuthStateChange on mount', () => {
      renderHook(() => useAuthListener());

      expect(mockOnAuthStateChange).toHaveBeenCalledTimes(1);
      expect(authChangeCallback).toBeDefined();
    });

    it('should update store when SIGNED_IN event is received', async () => {
      const mockSession = createMockSession();

      renderHook(() => useAuthListener());

      // Simulate SIGNED_IN event
      authChangeCallback?.('SIGNED_IN', mockSession);

      expect(mockSetSession).toHaveBeenCalledWith(mockSession);
    });

    it('should call clearAuth when SIGNED_OUT event is received', async () => {
      renderHook(() => useAuthListener());

      // Simulate SIGNED_OUT event
      authChangeCallback?.('SIGNED_OUT', null);

      expect(mockSetSession).toHaveBeenCalledWith(null);
      expect(mockClearAuth).toHaveBeenCalled();
    });

    it('should update session on TOKEN_REFRESHED event', async () => {
      const mockSession = createMockSession({
        access_token: 'new-refreshed-token',
      });

      renderHook(() => useAuthListener());

      // Simulate TOKEN_REFRESHED event
      authChangeCallback?.('TOKEN_REFRESHED', mockSession);

      expect(mockSetSession).toHaveBeenCalledWith(mockSession);
    });
  });

  describe('cleanup', () => {
    it('should unsubscribe from listener on unmount', () => {
      const { unmount } = renderHook(() => useAuthListener());

      expect(mockUnsubscribe).not.toHaveBeenCalled();

      unmount();

      expect(mockUnsubscribe).toHaveBeenCalledTimes(1);
    });
  });
});
