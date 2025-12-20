-- Migration: 20251219_001_enums.sql
-- Description: Create subscription tier, item type, and monitored item status enums
-- Story: 1.4 - Create Core Database Schema & RLS Foundation

-- Create subscription tier enum
CREATE TYPE subscription_tier AS ENUM ('free', 'basic', 'premium', 'pro');

-- Create item type enum for monitored items
CREATE TYPE item_type AS ENUM ('photo', 'email', 'phone', 'social_handle');

-- Create monitored item status enum
CREATE TYPE monitored_item_status AS ENUM ('active', 'processing', 'inactive');
