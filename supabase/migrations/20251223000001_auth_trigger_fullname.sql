-- Migration: 20251223000001_auth_trigger_fullname.sql
-- Description: Update auth trigger to extract full_name from user metadata
-- Story: 3.1 - Implement Email/Password Registration

-- Update the handle_new_user function to extract full_name from raw_user_meta_data
-- The full_name is passed during signUp via options.data.full_name
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, created_at)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',  -- Extract full_name from signup metadata
    NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update comment to reflect new functionality
COMMENT ON FUNCTION public.handle_new_user() IS 'Automatically create user profile with full_name when new auth user signs up';
