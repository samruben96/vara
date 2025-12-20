-- Migration: 20251219_007_rls_monitored_items.sql
-- Description: Enable RLS and create policies for monitored_items table
-- Story: 1.4 - Create Core Database Schema & RLS Foundation

-- Enable Row Level Security
ALTER TABLE monitored_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE monitored_items FORCE ROW LEVEL SECURITY;

-- Policy: Users can read their own items
-- Using subquery for auth.uid() caching (performance best practice)
CREATE POLICY "select_own_items" ON monitored_items
FOR SELECT TO authenticated
USING ((SELECT auth.uid()) = user_id);

-- Policy: Users can insert their own items
CREATE POLICY "insert_own_items" ON monitored_items
FOR INSERT TO authenticated
WITH CHECK ((SELECT auth.uid()) = user_id);

-- Policy: Users can update their own items
CREATE POLICY "update_own_items" ON monitored_items
FOR UPDATE TO authenticated
USING ((SELECT auth.uid()) = user_id)
WITH CHECK ((SELECT auth.uid()) = user_id);

-- Policy: Users can delete their own items
CREATE POLICY "delete_own_items" ON monitored_items
FOR DELETE TO authenticated
USING ((SELECT auth.uid()) = user_id);

-- Add comments for documentation
COMMENT ON POLICY "select_own_items" ON monitored_items IS 'Users can only read their own monitored items';
COMMENT ON POLICY "insert_own_items" ON monitored_items IS 'Users can only insert their own monitored items';
COMMENT ON POLICY "update_own_items" ON monitored_items IS 'Users can only update their own monitored items';
COMMENT ON POLICY "delete_own_items" ON monitored_items IS 'Users can only delete their own monitored items';
