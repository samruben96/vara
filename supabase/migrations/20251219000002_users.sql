-- Migration: 20251219_002_users.sql
-- Description: Create users table
-- Story: 1.4 - Create Core Database Schema & RLS Foundation

-- Create users table
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  subscription_tier subscription_tier DEFAULT 'free',
  onboarding_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create index on email for fast lookups (UNIQUE constraint already creates an index,
-- but explicit index ensures it uses btree for RLS performance)
CREATE INDEX idx_users_email ON users USING btree (email);

-- Create index on id for RLS performance (critical)
CREATE INDEX idx_users_id ON users USING btree (id);

-- Add comment for documentation
COMMENT ON TABLE users IS 'User profiles synced from auth.users with subscription and onboarding state';
