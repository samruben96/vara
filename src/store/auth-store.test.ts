/* eslint-disable max-lines-per-function */
/**
 * Auth Store Tests (Story 1.5 - Task 3)
 *
 * Test cases per Dev Notes:
 * 1. Initial state is correct (user: null, session: null, isAuthenticated: false)
 * 2. setUser updates user and isAuthenticated correctly
 * 3. setSession updates session, user, and isAuthenticated correctly
 * 4. signOut clears user and session
 * 5. clearAuth clears all auth state
 * 6. Session rehydrates from MMKV storage after simulated app restart
 */
import type { Session, User } from '@supabase/supabase-js';

import { useAuthStore } from './auth-store';

// Mock MMKV storage
jest.mock('@/lib/storage', () => ({
  storage: {
    getString: jest.fn(),
    set: jest.fn(),
    delete: jest.fn(),
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

describe('auth-store', () => {
  beforeEach(() => {
    // Reset store to initial state before each test
    useAuthStore.setState({
      user: null,
      session: null,
      isAuthenticated: false,
      isLoading: true,
    });
  });

  describe('initial state', () => {
    it('should have correct initial state', () => {
      const state = useAuthStore.getState();

      expect(state.user).toBeNull();
      expect(state.session).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.isLoading).toBe(true);
    });
  });

  describe('setUser', () => {
    it('should update user and set isAuthenticated to true when user is provided', () => {
      const mockUser = createMockUser();

      useAuthStore.getState().setUser(mockUser);

      const state = useAuthStore.getState();
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
    });

    it('should set isAuthenticated to false when user is null', () => {
      // First set a user
      useAuthStore.getState().setUser(createMockUser());
      expect(useAuthStore.getState().isAuthenticated).toBe(true);

      // Then clear the user
      useAuthStore.getState().setUser(null);

      const state = useAuthStore.getState();
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
    });
  });

  describe('setSession', () => {
    it('should update session, user, and isAuthenticated when session is provided', () => {
      const mockSession = createMockSession();

      useAuthStore.getState().setSession(mockSession);

      const state = useAuthStore.getState();
      expect(state.session).toEqual(mockSession);
      expect(state.user).toEqual(mockSession.user);
      expect(state.isAuthenticated).toBe(true);
    });

    it('should clear user and isAuthenticated when session is null', () => {
      // First set a session
      useAuthStore.getState().setSession(createMockSession());
      expect(useAuthStore.getState().isAuthenticated).toBe(true);

      // Then clear the session
      useAuthStore.getState().setSession(null);

      const state = useAuthStore.getState();
      expect(state.session).toBeNull();
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
    });
  });

  describe('setLoading', () => {
    it('should update loading state', () => {
      expect(useAuthStore.getState().isLoading).toBe(true);

      useAuthStore.getState().setLoading(false);

      expect(useAuthStore.getState().isLoading).toBe(false);
    });
  });

  describe('signOut', () => {
    it('should clear user, session, and isAuthenticated', () => {
      // Set up authenticated state
      useAuthStore.getState().setSession(createMockSession());
      expect(useAuthStore.getState().isAuthenticated).toBe(true);

      // Sign out
      useAuthStore.getState().signOut();

      const state = useAuthStore.getState();
      expect(state.user).toBeNull();
      expect(state.session).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.isLoading).toBe(false);
    });
  });

  describe('clearAuth', () => {
    it('should clear all auth state', () => {
      // Set up authenticated state
      useAuthStore.getState().setSession(createMockSession());
      expect(useAuthStore.getState().isAuthenticated).toBe(true);

      // Clear auth
      useAuthStore.getState().clearAuth();

      const state = useAuthStore.getState();
      expect(state.user).toBeNull();
      expect(state.session).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.isLoading).toBe(false);
    });
  });

  describe('persistence', () => {
    it('should have persist middleware configured', () => {
      // Verify the store is a persisted store by checking it has the persist API
      const store = useAuthStore;
      expect(store.persist).toBeDefined();
      expect(store.persist.getOptions).toBeDefined();
    });

    it('should persist only user, session, and isAuthenticated (not isLoading)', () => {
      const options = useAuthStore.persist.getOptions();
      const partialize = options.partialize;

      const testState = {
        user: createMockUser(),
        session: createMockSession(),
        isAuthenticated: true,
        isLoading: true,
        setUser: jest.fn(),
        setSession: jest.fn(),
        setLoading: jest.fn(),
        signOut: jest.fn(),
        clearAuth: jest.fn(),
      };

      const persisted = partialize?.(testState);

      expect(persisted).toHaveProperty('user');
      expect(persisted).toHaveProperty('session');
      expect(persisted).toHaveProperty('isAuthenticated');
      expect(persisted).not.toHaveProperty('isLoading');
    });
  });
});
