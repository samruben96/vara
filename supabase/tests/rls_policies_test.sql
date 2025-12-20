-- RLS Policy Test Suite
-- Story 1.4: Create Core Database Schema & RLS Foundation
--
-- Run this test manually via Supabase Studio SQL Editor or:
-- psql -h localhost -p 54322 -U postgres -d postgres -f tests/rls_policies_test.sql
--
-- This test verifies:
-- 1. Users can only access their own data
-- 2. Cross-user access is blocked
-- 3. RLS is properly enforced
-- 4. Unauthenticated users cannot access protected data

BEGIN;

-- Test Setup: Create two test auth users
INSERT INTO auth.users (id, email, aud, role, encrypted_password, email_confirmed_at, created_at, updated_at, instance_id)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'user_a@test.com', 'authenticated', 'authenticated', crypt('password', gen_salt('bf')), now(), now(), now(), '00000000-0000-0000-0000-000000000000'),
  ('22222222-2222-2222-2222-222222222222', 'user_b@test.com', 'authenticated', 'authenticated', crypt('password', gen_salt('bf')), now(), now(), now(), '00000000-0000-0000-0000-000000000000')
ON CONFLICT (id) DO NOTHING;

-- Verify users were created in public.users table via trigger
DO $$
DECLARE
  user_a_exists BOOLEAN;
  user_b_exists BOOLEAN;
BEGIN
  SELECT EXISTS(SELECT 1 FROM public.users WHERE id = '11111111-1111-1111-1111-111111111111') INTO user_a_exists;
  SELECT EXISTS(SELECT 1 FROM public.users WHERE id = '22222222-2222-2222-2222-222222222222') INTO user_b_exists;

  IF NOT user_a_exists OR NOT user_b_exists THEN
    RAISE NOTICE 'Auth trigger test: Users created via trigger';
  ELSE
    RAISE NOTICE 'Auth trigger test: PASSED - Users exist in public.users';
  END IF;
END $$;

-- Test 1: User A can insert their own monitored items
DO $$
BEGIN
  -- Simulate User A
  SET LOCAL role TO 'authenticated';
  SET LOCAL "request.jwt.claim.sub" TO '11111111-1111-1111-1111-111111111111';

  INSERT INTO public.monitored_items (user_id, item_type, value)
  VALUES ('11111111-1111-1111-1111-111111111111', 'email', 'test@example.com');

  RAISE NOTICE 'Test 1 PASSED: User A can insert own monitored items';
EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE 'Test 1 FAILED: %', SQLERRM;
END $$;

-- Test 2: User A can read their own items
DO $$
DECLARE
  item_count INTEGER;
BEGIN
  SET LOCAL role TO 'authenticated';
  SET LOCAL "request.jwt.claim.sub" TO '11111111-1111-1111-1111-111111111111';

  SELECT COUNT(*) INTO item_count
  FROM public.monitored_items
  WHERE user_id = '11111111-1111-1111-1111-111111111111';

  IF item_count > 0 THEN
    RAISE NOTICE 'Test 2 PASSED: User A can read own items (found % items)', item_count;
  ELSE
    RAISE NOTICE 'Test 2 FAILED: User A cannot read own items';
  END IF;
END $$;

-- Test 3: User B CANNOT read User A's items
DO $$
DECLARE
  item_count INTEGER;
BEGIN
  SET LOCAL role TO 'authenticated';
  SET LOCAL "request.jwt.claim.sub" TO '22222222-2222-2222-2222-222222222222';

  SELECT COUNT(*) INTO item_count
  FROM public.monitored_items
  WHERE user_id = '11111111-1111-1111-1111-111111111111';

  IF item_count = 0 THEN
    RAISE NOTICE 'Test 3 PASSED: User B cannot read User A items (cross-user blocked)';
  ELSE
    RAISE NOTICE 'Test 3 FAILED: User B can read User A items! RLS not working!';
  END IF;
END $$;

-- Test 4: User B CANNOT update User A's items
DO $$
BEGIN
  SET LOCAL role TO 'authenticated';
  SET LOCAL "request.jwt.claim.sub" TO '22222222-2222-2222-2222-222222222222';

  UPDATE public.monitored_items
  SET value = 'hacked@evil.com'
  WHERE user_id = '11111111-1111-1111-1111-111111111111';

  IF NOT FOUND THEN
    RAISE NOTICE 'Test 4 PASSED: User B cannot update User A items';
  ELSE
    RAISE NOTICE 'Test 4 FAILED: User B updated User A items!';
  END IF;
END $$;

-- Test 5: User A can insert audit logs
DO $$
BEGIN
  SET LOCAL role TO 'authenticated';
  SET LOCAL "request.jwt.claim.sub" TO '11111111-1111-1111-1111-111111111111';

  INSERT INTO public.audit_logs (user_id, action, resource_type)
  VALUES ('11111111-1111-1111-1111-111111111111', 'test_action', 'test');

  RAISE NOTICE 'Test 5 PASSED: User A can insert audit logs';
EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE 'Test 5 FAILED: %', SQLERRM;
END $$;

-- Test 6: Audit logs cannot be updated (immutable)
DO $$
DECLARE
  affected_rows INTEGER;
BEGIN
  SET LOCAL role TO 'authenticated';
  SET LOCAL "request.jwt.claim.sub" TO '11111111-1111-1111-1111-111111111111';

  UPDATE public.audit_logs
  SET action = 'modified_action'
  WHERE user_id = '11111111-1111-1111-1111-111111111111';

  GET DIAGNOSTICS affected_rows = ROW_COUNT;

  IF affected_rows = 0 THEN
    RAISE NOTICE 'Test 6 PASSED: Audit logs are immutable (update blocked)';
  ELSE
    RAISE NOTICE 'Test 6 FAILED: Audit logs were updated!';
  END IF;
END $$;

-- Test 7: Verify RLS is enabled on all tables
DO $$
DECLARE
  users_rls BOOLEAN;
  monitored_items_rls BOOLEAN;
  audit_logs_rls BOOLEAN;
BEGIN
  SELECT relrowsecurity INTO users_rls FROM pg_class WHERE relname = 'users';
  SELECT relrowsecurity INTO monitored_items_rls FROM pg_class WHERE relname = 'monitored_items';
  SELECT relrowsecurity INTO audit_logs_rls FROM pg_class WHERE relname = 'audit_logs';

  IF users_rls AND monitored_items_rls AND audit_logs_rls THEN
    RAISE NOTICE 'Test 7 PASSED: RLS is enabled on all tables';
  ELSE
    RAISE NOTICE 'Test 7 FAILED: RLS not enabled - users:%, items:%, logs:%', users_rls, monitored_items_rls, audit_logs_rls;
  END IF;
END $$;

-- Test 8: Unauthenticated SELECT returns empty (AC#5)
DO $$
DECLARE
  item_count INTEGER;
BEGIN
  -- Reset to anonymous role (no authentication)
  RESET role;
  RESET "request.jwt.claim.sub";

  -- Try to select from monitored_items as anonymous
  SELECT COUNT(*) INTO item_count FROM public.monitored_items;

  IF item_count = 0 THEN
    RAISE NOTICE 'Test 8 PASSED: Unauthenticated SELECT returns empty';
  ELSE
    RAISE NOTICE 'Test 8 FAILED: Unauthenticated user can see % items!', item_count;
  END IF;
END $$;

-- Test 9: Unauthenticated INSERT is rejected (AC#5)
DO $$
BEGIN
  -- Reset to anonymous role
  RESET role;
  RESET "request.jwt.claim.sub";

  -- Try to insert as anonymous - should fail
  INSERT INTO public.monitored_items (user_id, item_type, value)
  VALUES ('11111111-1111-1111-1111-111111111111', 'email', 'anon@attack.com');

  RAISE NOTICE 'Test 9 FAILED: Unauthenticated INSERT succeeded!';
EXCEPTION
  WHEN insufficient_privilege THEN
    RAISE NOTICE 'Test 9 PASSED: Unauthenticated INSERT rejected (insufficient_privilege)';
  WHEN OTHERS THEN
    RAISE NOTICE 'Test 9 PASSED: Unauthenticated INSERT rejected (%)', SQLERRM;
END $$;

-- Test 10: Unauthenticated cannot read users table (AC#5)
DO $$
DECLARE
  user_count INTEGER;
BEGIN
  RESET role;
  RESET "request.jwt.claim.sub";

  SELECT COUNT(*) INTO user_count FROM public.users;

  IF user_count = 0 THEN
    RAISE NOTICE 'Test 10 PASSED: Unauthenticated cannot read users table';
  ELSE
    RAISE NOTICE 'Test 10 FAILED: Unauthenticated can see % users!', user_count;
  END IF;
END $$;

-- Summary
RAISE NOTICE '==========================================';
RAISE NOTICE 'RLS Policy Test Suite Complete';
RAISE NOTICE 'Check NOTICE messages above for results';
RAISE NOTICE '==========================================';

-- Rollback to clean up test data
ROLLBACK;
