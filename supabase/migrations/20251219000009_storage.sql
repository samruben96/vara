-- Migration: 20251219_009_storage.sql
-- Description: Create user-photos storage bucket with RLS policies
-- Story: 1.4 - Create Core Database Schema & RLS Foundation
--
-- ENCRYPTION NOTE: Supabase Storage provides AES-256 encryption at rest by default
-- for all buckets. This is handled at the infrastructure level and cannot be disabled.
-- See: https://supabase.com/docs/guides/storage/security/access-control

-- Create private bucket for user photos (encryption is Supabase-managed AES-256)
INSERT INTO storage.buckets (id, name, public)
VALUES ('user-photos', 'user-photos', false);

-- Policy: Users can upload to their own folder only
-- Path format: {user_id}/filename.ext
CREATE POLICY "upload_own_photos" ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'user-photos' AND
  (storage.foldername(name))[1] = (SELECT auth.uid())::text
);

-- Policy: Users can download their own photos only
CREATE POLICY "download_own_photos" ON storage.objects
FOR SELECT TO authenticated
USING (
  bucket_id = 'user-photos' AND
  (storage.foldername(name))[1] = (SELECT auth.uid())::text
);

-- Policy: Users can delete their own photos only
CREATE POLICY "delete_own_photos" ON storage.objects
FOR DELETE TO authenticated
USING (
  bucket_id = 'user-photos' AND
  (storage.foldername(name))[1] = (SELECT auth.uid())::text
);

-- Policy: Users can update their own photos only
-- WITH CHECK prevents users from moving files to another user's folder
CREATE POLICY "update_own_photos" ON storage.objects
FOR UPDATE TO authenticated
USING (
  bucket_id = 'user-photos' AND
  (storage.foldername(name))[1] = (SELECT auth.uid())::text
)
WITH CHECK (
  bucket_id = 'user-photos' AND
  (storage.foldername(name))[1] = (SELECT auth.uid())::text
);
