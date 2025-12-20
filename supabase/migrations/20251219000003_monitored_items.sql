-- Migration: 20251219_003_monitored_items.sql
-- Description: Create monitored_items table
-- Story: 1.4 - Create Core Database Schema & RLS Foundation

-- Create monitored_items table
CREATE TABLE monitored_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  item_type item_type NOT NULL,
  value TEXT NOT NULL,
  platform TEXT,
  storage_path TEXT,
  status monitored_item_status DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create index on user_id for RLS performance optimization (critical)
CREATE INDEX idx_monitored_items_user_id ON monitored_items USING btree (user_id);

-- Create composite index for filtered queries
CREATE INDEX idx_monitored_items_user_type ON monitored_items USING btree (user_id, item_type);

-- Add comment for documentation
COMMENT ON TABLE monitored_items IS 'Items being monitored for each user (photos, emails, phones, social handles)';
COMMENT ON COLUMN monitored_items.value IS 'Encrypted email/phone/handle value';
COMMENT ON COLUMN monitored_items.platform IS 'For social_handle: instagram, tiktok, etc.';
COMMENT ON COLUMN monitored_items.storage_path IS 'For photo: path in user-photos bucket';
