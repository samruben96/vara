-- Migration: 20251219_006_rls_users.sql
-- Description: Enable RLS and create policies for users table
-- Story: 1.4 - Create Core Database Schema & RLS Foundation

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE users FORCE ROW LEVEL SECURITY;

-- Policy: Users can read their own record
-- Using subquery for auth.uid() caching (performance best practice)
CREATE POLICY "select_own_user" ON users
FOR SELECT TO authenticated
USING ((SELECT auth.uid()) = id);

-- Policy: Users can update their own record
CREATE POLICY "update_own_user" ON users
FOR UPDATE TO authenticated
USING ((SELECT auth.uid()) = id)
WITH CHECK ((SELECT auth.uid()) = id);

-- Policy: Users can insert their own record
-- NOTE: The auth trigger (handle_new_user) uses SECURITY DEFINER to bypass RLS.
-- This policy exists for edge cases where authenticated users might need to
-- manually create their profile if the trigger fails.
CREATE POLICY "insert_own_user" ON users
FOR INSERT TO authenticated
WITH CHECK ((SELECT auth.uid()) = id);

-- NO delete policy - users are soft-deleted via account deletion flow
-- Add comment for documentation
COMMENT ON POLICY "select_own_user" ON users IS 'Users can only read their own profile';
COMMENT ON POLICY "update_own_user" ON users IS 'Users can only update their own profile';
COMMENT ON POLICY "insert_own_user" ON users IS 'Fallback for manual profile creation if auth trigger fails';
