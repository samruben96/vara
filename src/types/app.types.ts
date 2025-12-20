/**
 * Application Type Aliases
 *
 * Convenience types derived from the auto-generated database.types.ts
 * and Supabase Auth types.
 *
 * Usage:
 *   import type { User, MonitoredItem, AuditLog } from '@/types/app.types';
 *   import type { AuthUser, AuthSession, AuthError } from '@/types/app.types';
 */

import type {
  AuthError as SupabaseAuthError,
  Session as SupabaseSession,
  User as SupabaseAuthUser,
} from '@supabase/supabase-js';

import type { Database } from './database.types';

// =============================================================================
// Auth Types (Story 1.5 - AC #3, #4, #5)
// =============================================================================

/** Supabase Auth User (from auth.users table) */
export type AuthUser = SupabaseAuthUser;

/** Supabase Auth Session with access and refresh tokens */
export type AuthSession = SupabaseSession;

/** Supabase Auth Error type */
export type AuthError = SupabaseAuthError;

/**
 * Auth state interface for Zustand store
 * Maps to the auth-store.ts AuthState interface
 */
export interface AuthState {
  user: AuthUser | null;
  session: AuthSession | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

/**
 * Auth provider types supported by the app
 * Per AC #1: email/password, Google OAuth, Apple OAuth
 */
export type AuthProvider = 'email' | 'google' | 'apple';

/**
 * Auth event types from Supabase
 */
export type AuthEvent =
  | 'SIGNED_IN'
  | 'SIGNED_OUT'
  | 'TOKEN_REFRESHED'
  | 'USER_UPDATED'
  | 'PASSWORD_RECOVERY';

// =============================================================================
// Table Row Types (for reading data)
// =============================================================================

/** User profile row from the users table */
export type User = Database['public']['Tables']['users']['Row'];

/** Monitored item row (photos, emails, phones, social handles) */
export type MonitoredItem =
  Database['public']['Tables']['monitored_items']['Row'];

/** Audit log entry (immutable) */
export type AuditLog = Database['public']['Tables']['audit_logs']['Row'];

// =============================================================================
// Insert Types (for creating records)
// =============================================================================

/** Data required to insert a new user */
export type InsertUser = Database['public']['Tables']['users']['Insert'];

/** Data required to insert a new monitored item */
export type InsertMonitoredItem =
  Database['public']['Tables']['monitored_items']['Insert'];

/** Data required to insert a new audit log */
export type InsertAuditLog =
  Database['public']['Tables']['audit_logs']['Insert'];

// =============================================================================
// Update Types (for partial updates)
// =============================================================================

/** Partial data for updating a user */
export type UpdateUser = Database['public']['Tables']['users']['Update'];

/** Partial data for updating a monitored item */
export type UpdateMonitoredItem =
  Database['public']['Tables']['monitored_items']['Update'];

// Note: AuditLog has no update type - audit logs are immutable

// =============================================================================
// Enum Types
// =============================================================================

/** Subscription tier: 'free' | 'basic' | 'premium' | 'pro' */
export type SubscriptionTier = Database['public']['Enums']['subscription_tier'];

/** Item type for monitored items: 'photo' | 'email' | 'phone' | 'social_handle' */
export type ItemType = Database['public']['Enums']['item_type'];

/** Status of a monitored item: 'active' | 'processing' | 'inactive' */
export type MonitoredItemStatus =
  Database['public']['Enums']['monitored_item_status'];

// =============================================================================
// Utility Types
// =============================================================================

/** Helper to get table row type by table name */
export type TableRow<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];

/** Helper to get insert type by table name */
export type TableInsert<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert'];

/** Helper to get update type by table name */
export type TableUpdate<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update'];
