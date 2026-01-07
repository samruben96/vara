/**
 * Create Audit Log Mutation Hook Tests (Story 3.1 - Task 2)
 *
 * Test cases:
 * 1. Successfully creates audit log entry with all required fields
 * 2. Handles insert error
 * 3. Handles case when no authenticated user
 * 4. Passes correct action, resource_type, resource_id, and metadata
 */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react-native';
import React from 'react';

import { useCreateAuditLog } from './use-create-audit-log';

// Mock Supabase client
const mockGetUser = jest.fn();
const mockInsert = jest.fn();

jest.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      getUser: () => mockGetUser(),
    },
    from: jest.fn(() => ({
      insert: (data: unknown) => mockInsert(data),
    })),
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

describe('useCreateAuditLog', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Clean up QueryClient to prevent open handles
    queryClient?.clear();
  });

  describe('successful audit log creation', () => {
    it('should create audit log entry with all required fields', async () => {
      mockGetUser.mockResolvedValue({
        data: { user: { id: 'test-user-id' } },
        error: null,
      });
      mockInsert.mockResolvedValue({ data: {}, error: null });

      const { result } = renderHook(() => useCreateAuditLog(), {
        wrapper: createWrapper(),
      });

      result.current.mutate({
        action: 'registration',
        resourceType: 'user',
        resourceId: 'test-user-id',
        metadata: { method: 'email' },
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(mockInsert).toHaveBeenCalledWith({
        user_id: 'test-user-id',
        action: 'registration',
        resource_type: 'user',
        resource_id: 'test-user-id',
        metadata: { method: 'email' },
      });
    });

    it('should handle optional resource_id and metadata', async () => {
      mockGetUser.mockResolvedValue({
        data: { user: { id: 'test-user-id' } },
        error: null,
      });
      mockInsert.mockResolvedValue({ data: {}, error: null });

      const { result } = renderHook(() => useCreateAuditLog(), {
        wrapper: createWrapper(),
      });

      result.current.mutate({
        action: 'login',
        resourceType: 'session',
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(mockInsert).toHaveBeenCalledWith({
        user_id: 'test-user-id',
        action: 'login',
        resource_type: 'session',
        resource_id: undefined,
        metadata: null,
      });
    });
  });

  describe('error handling', () => {
    it('should handle case when no authenticated user', async () => {
      mockGetUser.mockResolvedValue({
        data: { user: null },
        error: null,
      });

      const { result } = renderHook(() => useCreateAuditLog(), {
        wrapper: createWrapper(),
      });

      result.current.mutate({
        action: 'registration',
        resourceType: 'user',
      });

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(result.current.error?.message).toBe('No authenticated user');
      expect(mockInsert).not.toHaveBeenCalled();
    });

    it('should handle insert error', async () => {
      mockGetUser.mockResolvedValue({
        data: { user: { id: 'test-user-id' } },
        error: null,
      });
      mockInsert.mockResolvedValue({
        data: null,
        error: { message: 'Insert failed', code: '42501' },
      });

      const { result } = renderHook(() => useCreateAuditLog(), {
        wrapper: createWrapper(),
      });

      result.current.mutate({
        action: 'registration',
        resourceType: 'user',
      });

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(result.current.error?.message).toBe('Insert failed');
    });
  });
});
