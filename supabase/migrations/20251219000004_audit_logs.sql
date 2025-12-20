-- Migration: 20251219_004_audit_logs.sql
-- Description: Create audit_logs table (immutable - no updated_at)
-- Story: 1.4 - Create Core Database Schema & RLS Foundation

-- Create audit_logs table
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  resource_type TEXT,
  resource_id UUID,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
  -- NO updated_at - audit logs are immutable
);

-- Create index on user_id for RLS performance
CREATE INDEX idx_audit_logs_user_id ON audit_logs USING btree (user_id);

-- Create index on created_at for time-based queries
CREATE INDEX idx_audit_logs_created_at ON audit_logs USING btree (created_at);

-- Create index on action for filtering by event type (e.g., "show all login events")
CREATE INDEX idx_audit_logs_action ON audit_logs USING btree (action);

-- Add comment for documentation
COMMENT ON TABLE audit_logs IS 'Immutable audit trail for user actions (SOC 2 compliance)';
COMMENT ON COLUMN audit_logs.action IS 'Action type: login, photo_upload, threat_viewed, etc.';
COMMENT ON COLUMN audit_logs.resource_type IS 'Resource type: user, monitored_item, threat';
COMMENT ON COLUMN audit_logs.metadata IS 'Additional context (no PII - use resource_id references)';
