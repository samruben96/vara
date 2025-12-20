-- Migration: 20251219_010_auth_trigger.sql
-- Description: Create auth trigger to automatically create user profile on signup
-- Story: 1.4 - Create Core Database Schema & RLS Foundation

-- Function to handle new user signup
-- SECURITY DEFINER allows this function to bypass RLS for the initial insert
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, created_at)
  VALUES (
    NEW.id,
    NEW.email,
    NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on auth.users insert
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Add comment for documentation
COMMENT ON FUNCTION public.handle_new_user() IS 'Automatically create user profile when new auth user signs up';
