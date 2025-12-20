-- Migration: 20251219_005_functions.sql
-- Description: Create updated_at trigger function and apply to tables
-- Story: 1.4 - Create Core Database Schema & RLS Foundation

-- Create generic function for updating updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to users table
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Apply trigger to monitored_items table
CREATE TRIGGER update_monitored_items_updated_at
  BEFORE UPDATE ON monitored_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Add comment for documentation
COMMENT ON FUNCTION update_updated_at_column() IS 'Auto-update updated_at column on row modification';
