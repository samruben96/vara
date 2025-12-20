-- Migration: 20251219_008_rls_audit_logs.sql
-- Description: Enable RLS and create policies for audit_logs table
-- Story: 1.4 - Create Core Database Schema & RLS Foundation

-- Enable Row Level Security
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs FORCE ROW LEVEL SECURITY;

-- Policy: Users can insert their own audit logs
-- Using subquery for auth.uid() caching (performance best practice)
CREATE POLICY "insert_own_logs" ON audit_logs
FOR INSERT TO authenticated
WITH CHECK ((SELECT auth.uid()) = user_id);

-- Policy: Users can read their own logs (for history viewing)
CREATE POLICY "select_own_logs" ON audit_logs
FOR SELECT TO authenticated
USING ((SELECT auth.uid()) = user_id);

-- NO update or delete policies - audit logs are immutable
-- Add comments for documentation
COMMENT ON POLICY "insert_own_logs" ON audit_logs IS 'Users can only insert their own audit logs';
COMMENT ON POLICY "select_own_logs" ON audit_logs IS 'Users can only read their own audit logs';
