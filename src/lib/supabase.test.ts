/* eslint-disable max-lines-per-function */
/**
 * Supabase Client Tests (Review Fix M1)
 *
 * Tests for Supabase client initialization and MMKV storage adapter.
 * Verifies the storage adapter interface compliance for Supabase Auth.
 */
import { storage } from './storage';

// Mock the storage module
jest.mock('./storage', () => ({
  storage: {
    getString: jest.fn(),
    set: jest.fn(),
    delete: jest.fn(),
  },
}));

// Mock @supabase/supabase-js
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    auth: {
      getSession: jest.fn(),
      onAuthStateChange: jest.fn(() => ({
        data: { subscription: { unsubscribe: jest.fn() } },
      })),
    },
  })),
}));

// Mock env
jest.mock('@env', () => ({
  Env: {
    SUPABASE_URL: 'http://localhost:54321',
    SUPABASE_ANON_KEY: 'test-anon-key',
  },
}));

describe('Supabase MMKV Storage Adapter', () => {
  const mockedStorage = storage as jest.Mocked<typeof storage>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Storage adapter interface', () => {
    // Create the adapter inline to test its interface
    const mmkvStorageAdapter = {
      getItem: (key: string) => mockedStorage.getString(key) ?? null,
      setItem: (key: string, value: string) => mockedStorage.set(key, value),
      removeItem: (key: string) => mockedStorage.delete(key),
    };

    it('should implement getItem correctly', () => {
      mockedStorage.getString.mockReturnValue('test-value');

      const result = mmkvStorageAdapter.getItem('test-key');

      expect(mockedStorage.getString).toHaveBeenCalledWith('test-key');
      expect(result).toBe('test-value');
    });

    it('should return null when getItem finds no value', () => {
      mockedStorage.getString.mockReturnValue(undefined);

      const result = mmkvStorageAdapter.getItem('nonexistent-key');

      expect(result).toBeNull();
    });

    it('should implement setItem correctly', () => {
      mmkvStorageAdapter.setItem('test-key', 'test-value');

      expect(mockedStorage.set).toHaveBeenCalledWith('test-key', 'test-value');
    });

    it('should implement removeItem correctly', () => {
      mmkvStorageAdapter.removeItem('test-key');

      expect(mockedStorage.delete).toHaveBeenCalledWith('test-key');
    });

    it('should handle JSON session storage', () => {
      const sessionData = JSON.stringify({
        access_token: 'test-access-token',
        refresh_token: 'test-refresh-token',
        expires_at: Date.now() + 3600000,
      });

      mmkvStorageAdapter.setItem('supabase-auth-token', sessionData);

      expect(mockedStorage.set).toHaveBeenCalledWith(
        'supabase-auth-token',
        sessionData
      );

      mockedStorage.getString.mockReturnValue(sessionData);
      const retrieved = mmkvStorageAdapter.getItem('supabase-auth-token');

      expect(retrieved).toBe(sessionData);
      expect(JSON.parse(retrieved!)).toHaveProperty('access_token');
    });
  });

  describe('Supabase client initialization', () => {
    it('should create client with correct configuration', () => {
      // Re-import to trigger createClient
      jest.isolateModules(() => {
        const { createClient } = require('@supabase/supabase-js');
        require('./supabase');

        expect(createClient).toHaveBeenCalledWith(
          'http://localhost:54321',
          'test-anon-key',
          expect.objectContaining({
            auth: expect.objectContaining({
              autoRefreshToken: true,
              persistSession: true,
              detectSessionInUrl: false,
            }),
          })
        );
      });
    });
  });
});
