/**
 * Create Audit Log Mutation Hook (Story 3.1 - Task 2)
 * @description React Query mutation for creating audit log entries
 */
import { useMutation } from '@tanstack/react-query';

import { supabase } from '@/lib/supabase';
import type { Json } from '@/types/database.types';

export interface AuditLogData {
  action: string;
  resourceType: string;
  resourceId?: string;
  metadata?: Json;
}

/**
 * useCreateAuditLog - React Query mutation hook for creating audit log entries
 *
 * @example
 * ```tsx
 * const { mutate } = useCreateAuditLog();
 *
 * // After successful signup
 * mutate({
 *   action: 'registration',
 *   resourceType: 'user',
 *   resourceId: user.id,
 *   metadata: { method: 'email' }
 * });
 * ```
 */
export function useCreateAuditLog() {
  return useMutation<void, Error, AuditLogData>({
    mutationFn: async ({
      action,
      resourceType,
      resourceId,
      metadata,
    }: AuditLogData) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('No authenticated user');
      }

      const { error } = await supabase.from('audit_logs').insert({
        user_id: user.id,
        action,
        resource_type: resourceType,
        resource_id: resourceId,
        metadata: metadata ?? null,
      });

      if (error) {
        throw new Error(error.message);
      }
    },
  });
}
