# Story 1.4: Create Core Database Schema & RLS Foundation

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **developer**,
I want **the core database tables and Row Level Security policies created**,
So that **user data is stored securely with proper access controls from day one**.

## Acceptance Criteria

1. **Given** Supabase is configured
   **When** I apply the initial migration
   **Then** `users` table is created with: id, email, full_name, subscription_tier, onboarding_completed, created_at, updated_at
   **And** `monitored_items` table is created with: id, user_id, item_type (enum: 'photo', 'email', 'phone', 'social_handle'), value, platform, storage_path, status, created_at, updated_at
   **And** `audit_logs` table is created with: id, user_id, action, resource_type, resource_id, metadata, created_at
   **And** subscription_tier enum is created: 'free', 'basic', 'premium', 'pro'

2. **Given** the tables are created
   **When** I enable Row Level Security
   **Then** RLS is enabled on all tables
   **And** Base RLS policy ensures users can only read/update their own user record
   **And** Monitored items RLS policy ensures users can only access their own items
   **And** Audit logs are insert-only (no update/delete) with user_id enforced

3. **Given** the storage bucket requirements
   **When** I configure Supabase Storage
   **Then** Storage bucket `user-photos` is created with encryption enabled
   **And** Storage RLS policy restricts access to photo owner only

4. **Given** the database schema is complete
   **When** I generate TypeScript types
   **Then** `src/types/database.types.ts` is updated with the new schema
   **And** TypeScript types are accurate for all tables and enums

5. **Given** all RLS policies are in place
   **When** I test data access from the client
   **Then** Authenticated users can only access their own data
   **And** Unauthenticated users cannot access any protected data

## Tasks / Subtasks

- [x] **Task 1: Create subscription_tier enum** (AC: #1)
  - [x] Create migration file `supabase/migrations/20251219000001_enums.sql`
  - [x] Define enum: `subscription_tier` with values 'free', 'basic', 'premium', 'pro'
  - [x] Define enum: `item_type` with values 'photo', 'email', 'phone', 'social_handle'
  - [x] Define enum: `monitored_item_status` with values 'active', 'processing', 'inactive'

- [x] **Task 2: Create users table** (AC: #1)
  - [x] Create migration file `supabase/migrations/20251219000002_users.sql`
  - [x] Create `users` table with columns:
    - `id` UUID PRIMARY KEY REFERENCES auth.users(id)
    - `email` TEXT NOT NULL (synced from auth.users)
    - `full_name` TEXT
    - `subscription_tier` subscription_tier DEFAULT 'free'
    - `onboarding_completed` BOOLEAN DEFAULT false
    - `created_at` TIMESTAMPTZ DEFAULT now()
    - `updated_at` TIMESTAMPTZ DEFAULT now()
  - [x] Add index on `email` for fast lookups

- [x] **Task 3: Create monitored_items table** (AC: #1)
  - [x] Create migration file `supabase/migrations/20251219000003_monitored_items.sql`
  - [x] Create `monitored_items` table with columns:
    - `id` UUID PRIMARY KEY DEFAULT gen_random_uuid()
    - `user_id` UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE
    - `item_type` item_type NOT NULL
    - `value` TEXT NOT NULL (encrypted email/phone/handle)
    - `platform` TEXT (for social_handle: instagram, tiktok, etc.)
    - `storage_path` TEXT (for photo: path in user-photos bucket)
    - `status` monitored_item_status DEFAULT 'active'
    - `created_at` TIMESTAMPTZ DEFAULT now()
    - `updated_at` TIMESTAMPTZ DEFAULT now()
  - [x] Add index on `user_id` for RLS performance optimization
  - [x] Add composite index on `user_id, item_type` for filtered queries

- [x] **Task 4: Create audit_logs table** (AC: #1, #2)
  - [x] Create migration file `supabase/migrations/20251219000004_audit_logs.sql`
  - [x] Create `audit_logs` table with columns:
    - `id` UUID PRIMARY KEY DEFAULT gen_random_uuid()
    - `user_id` UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE
    - `action` TEXT NOT NULL (e.g., 'login', 'photo_upload', 'threat_viewed')
    - `resource_type` TEXT (e.g., 'user', 'monitored_item', 'threat')
    - `resource_id` UUID
    - `metadata` JSONB DEFAULT '{}'::jsonb
    - `created_at` TIMESTAMPTZ DEFAULT now()
  - [x] Add index on `user_id` for RLS performance
  - [x] Add index on `created_at` for time-based queries
  - [x] NO `updated_at` column - audit logs are immutable

- [x] **Task 5: Create updated_at trigger function** (AC: #1)
  - [x] Create migration file `supabase/migrations/20251219000005_functions.sql`
  - [x] Create `update_updated_at_column()` function
  - [x] Apply trigger to `users` table
  - [x] Apply trigger to `monitored_items` table

- [x] **Task 6: Enable RLS and create policies for users table** (AC: #2)
  - [x] Create migration file `supabase/migrations/20251219000006_rls_users.sql`
  - [x] Enable RLS on `users` table
  - [x] Create policy `select_own_user` - users can read their own record
  - [x] Create policy `update_own_user` - users can update their own record
  - [x] Create policy `insert_own_user` - users can insert their own record (for signup trigger)
  - [x] NO delete policy - users are soft-deleted via account deletion flow

- [x] **Task 7: Enable RLS and create policies for monitored_items table** (AC: #2)
  - [x] Create migration file `supabase/migrations/20251219000007_rls_monitored_items.sql`
  - [x] Enable RLS on `monitored_items` table
  - [x] Create policy `select_own_items` - users can read their own items
  - [x] Create policy `insert_own_items` - users can insert their own items
  - [x] Create policy `update_own_items` - users can update their own items
  - [x] Create policy `delete_own_items` - users can delete their own items

- [x] **Task 8: Enable RLS and create policies for audit_logs table** (AC: #2)
  - [x] Create migration file `supabase/migrations/20251219000008_rls_audit_logs.sql`
  - [x] Enable RLS on `audit_logs` table
  - [x] Create policy `insert_own_logs` - users can insert their own audit logs
  - [x] Create policy `select_own_logs` - users can read their own logs (for history)
  - [x] NO update or delete policies - audit logs are immutable

- [x] **Task 9: Create user-photos storage bucket** (AC: #3)
  - [x] Create migration file `supabase/migrations/20251219000009_storage.sql`
  - [x] Create bucket `user-photos` with `public = false`
  - [x] Create storage policy for authenticated uploads to `user_id/` path
  - [x] Create storage policy for owner-only downloads
  - [x] Create storage policy for owner-only deletes

- [x] **Task 10: Create auth trigger for user creation** (AC: #1)
  - [x] Create migration file `supabase/migrations/20251219000010_auth_trigger.sql`
  - [x] Create function `handle_new_user()` to insert into `users` table
  - [x] Trigger on `auth.users` INSERT
  - [x] Sync `id` and `email` from auth.users to public.users

- [x] **Task 11: Generate TypeScript types** (AC: #4)
  - [x] Run `npx supabase gen types typescript --local > src/types/database.types.ts`
  - [x] Verify types include all enums and tables
  - [x] Run TypeScript check to confirm types are valid

- [x] **Task 12: Test RLS policies** (AC: #5)
  - [x] Create SQL test file for RLS validation
  - [x] Verify user can only read/write their own data via RLS
  - [x] Verify unauthenticated requests are rejected (returns empty arrays)
  - [x] Verify cross-user access is blocked by RLS policies

## Dev Notes

### Critical Architecture Requirements

**Package Manager (MANDATORY):**
- MUST use `pnpm` for all package operations
- Never use `npm` or `yarn`

**Naming Conventions (MANDATORY):**
```
DATABASE (PostgreSQL):
  Tables:      snake_case, plural    → users, monitored_items, audit_logs
  Columns:     snake_case            → user_id, created_at, subscription_tier
  Foreign keys: {table}_id           → user_id, scan_id
  Indexes:     idx_{table}_{cols}    → idx_users_email
  Enums:       snake_case            → subscription_tier, item_type
  RLS policies: {action}_{table}     → select_own_users, insert_own_items

MIGRATION FILES:
  Naming:      YYYYMMDD_NNN_description.sql
  Example:     20251219_001_enums.sql, 20251219_002_users.sql
```

### Database Schema from Architecture Document

**Users Table:**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  subscription_tier subscription_tier DEFAULT 'free',
  onboarding_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Performance index for RLS (CRITICAL for performance)
CREATE INDEX idx_users_id ON users USING btree (id);
```

**Monitored Items Table:**
```sql
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

-- CRITICAL: Index for RLS performance (auth.uid() = user_id)
CREATE INDEX idx_monitored_items_user_id ON monitored_items USING btree (user_id);
```

**Audit Logs Table:**
```sql
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

-- Index for RLS performance
CREATE INDEX idx_audit_logs_user_id ON audit_logs USING btree (user_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs USING btree (created_at);
```

### RLS Best Practices (Critical for Performance)

**From Supabase 2025 Best Practices:**

1. **Index columns used in RLS policies:**
   - For `auth.uid() = user_id` policies, ALWAYS create index on `user_id`
   - Performance improvement of 100x+ on large tables

2. **Wrap function calls in subqueries for caching:**
   ```sql
   -- GOOD: Subquery caches auth.uid() result
   CREATE POLICY "select_own_items" ON monitored_items
   FOR SELECT USING ((SELECT auth.uid()) = user_id);

   -- AVOID: Function called per row
   CREATE POLICY "select_own_items" ON monitored_items
   FOR SELECT USING (auth.uid() = user_id);
   ```

3. **Never use user_metadata in RLS:**
   - `user_metadata` can be modified by authenticated users
   - Use `app_metadata` set by service role only

4. **Enable RLS on ALL tables:**
   - Even for non-sensitive data
   - Prevents accidental exposure

### RLS Policy Template

```sql
-- Standard user-owned data policy pattern
ALTER TABLE {table_name} ENABLE ROW LEVEL SECURITY;
ALTER TABLE {table_name} FORCE ROW LEVEL SECURITY;

-- Select policy (use subquery for auth.uid() caching)
CREATE POLICY "select_own_{table}" ON {table_name}
FOR SELECT TO authenticated
USING ((SELECT auth.uid()) = user_id);

-- Insert policy
CREATE POLICY "insert_own_{table}" ON {table_name}
FOR INSERT TO authenticated
WITH CHECK ((SELECT auth.uid()) = user_id);

-- Update policy
CREATE POLICY "update_own_{table}" ON {table_name}
FOR UPDATE TO authenticated
USING ((SELECT auth.uid()) = user_id)
WITH CHECK ((SELECT auth.uid()) = user_id);

-- Delete policy
CREATE POLICY "delete_own_{table}" ON {table_name}
FOR DELETE TO authenticated
USING ((SELECT auth.uid()) = user_id);
```

### Storage Bucket Configuration

```sql
-- Create bucket for user photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('user-photos', 'user-photos', false);

-- Storage RLS policies
-- Upload: Users can only upload to their own folder
CREATE POLICY "upload_own_photos"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'user-photos' AND
  (storage.foldername(name))[1] = (SELECT auth.uid())::text
);

-- Download: Users can only download their own photos
CREATE POLICY "download_own_photos"
ON storage.objects FOR SELECT TO authenticated
USING (
  bucket_id = 'user-photos' AND
  (storage.foldername(name))[1] = (SELECT auth.uid())::text
);

-- Delete: Users can only delete their own photos
CREATE POLICY "delete_own_photos"
ON storage.objects FOR DELETE TO authenticated
USING (
  bucket_id = 'user-photos' AND
  (storage.foldername(name))[1] = (SELECT auth.uid())::text
);
```

### Auth Trigger for User Creation

```sql
-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
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
```

### Updated_at Trigger Function

```sql
-- Generic function for updating updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to tables with updated_at column
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_monitored_items_updated_at
  BEFORE UPDATE ON monitored_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### Migration Execution Order

Execute migrations in this exact order:
1. `YYYYMMDD_001_enums.sql` - Create enums first (referenced by tables)
2. `YYYYMMDD_002_users.sql` - Create users table (referenced by other tables)
3. `YYYYMMDD_003_monitored_items.sql` - Create monitored_items
4. `YYYYMMDD_004_audit_logs.sql` - Create audit_logs
5. `YYYYMMDD_005_functions.sql` - Create trigger functions
6. `YYYYMMDD_006_rls_users.sql` - Enable RLS on users
7. `YYYYMMDD_007_rls_monitored_items.sql` - Enable RLS on monitored_items
8. `YYYYMMDD_008_rls_audit_logs.sql` - Enable RLS on audit_logs
9. `YYYYMMDD_009_storage.sql` - Create storage bucket and policies
10. `YYYYMMDD_010_auth_trigger.sql` - Create auth trigger

### Compliance Requirements

**From Architecture Document (NFR2, NFR3):**
- Audit logs required for SOC 2 readiness (ARCH-13)
- No PII in logs - use resource_id references, not raw data
- Data encryption at rest provided by Supabase
- User data deletion must cascade properly (ON DELETE CASCADE)

### Testing RLS Policies

**Test Cases:**
1. Create test user A and test user B via Supabase Auth
2. User A inserts monitored_item → should succeed
3. User A selects own items → should return their items only
4. User A tries to select User B's items → should return empty
5. User A tries to update User B's items → should fail
6. Unauthenticated request → should return empty/error

**Test Commands:**
```bash
# Apply migrations to local Supabase
npx supabase db reset

# Generate types after schema changes
npx supabase gen types typescript --local > src/types/database.types.ts

# Verify TypeScript compiles
pnpm run type-check
```

### Project Structure Notes

**File Locations:**
- Migrations: `supabase/migrations/YYYYMMDD_NNN_description.sql`
- TypeScript types: `src/types/database.types.ts`
- Supabase client: `src/lib/supabase.ts` (already exists from Story 1.2)

**Existing Files (DO NOT MODIFY):**
- `src/lib/supabase.ts` - Supabase client already configured
- `supabase/config.toml` - Supabase local config from Story 1.2

### Previous Story Intelligence

**From Story 1.2 (Supabase Setup):**
- Supabase local development is configured
- `supabase/config.toml` exists and is configured
- Environment variables set up in `.env.local`
- Supabase client integration works

**From Story 1.3 (Design System Tokens):**
- TypeScript strict mode is enforced
- `pnpm run type-check` must pass
- All exports should be typed

### References

- [Source: _bmad-output/architecture.md#Data Architecture] - Database tables and relationships
- [Source: _bmad-output/architecture.md#Authentication & Security] - RLS and security patterns
- [Source: _bmad-output/epics.md#Story 1.4] - Acceptance criteria
- [Source: _bmad-output/prd.md#NFR2] - Security requirements (AES-256, TLS 1.3)
- [Source: _bmad-output/prd.md#NFR3] - Privacy & compliance (GDPR, CCPA, SOC 2)
- [Supabase RLS Docs](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Supabase RLS Performance Best Practices](https://supabase.com/docs/guides/troubleshooting/rls-performance-and-best-practices-Z5Jjwv)
- [Supabase Storage Access Control](https://supabase.com/docs/guides/storage/security/access-control)

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

- All 10 migrations applied successfully via `npx supabase db reset`
- TypeScript types generated and validated with `pnpm run type-check`
- RLS verified: unauthenticated requests return empty arrays for all tables
- Database lint: No schema errors found

### Completion Notes List

- Created 10 SQL migration files implementing complete database schema
- Implemented 3 enums: subscription_tier, item_type, monitored_item_status
- Created 3 core tables: users, monitored_items, audit_logs
- Applied RLS best practices: subquery caching for auth.uid(), performance indexes on all user_id columns
- Created user-photos storage bucket with owner-only access policies
- Auth trigger automatically creates user profile on signup (SECURITY DEFINER)
- Audit logs are immutable (insert/select only, no update/delete)
- All policies use `(SELECT auth.uid())` pattern for performance optimization
- TypeScript types generated with all tables, enums, and relationships

### File List

**New Files:**
- supabase/migrations/20251219000001_enums.sql
- supabase/migrations/20251219000002_users.sql
- supabase/migrations/20251219000003_monitored_items.sql
- supabase/migrations/20251219000004_audit_logs.sql
- supabase/migrations/20251219000005_functions.sql
- supabase/migrations/20251219000006_rls_users.sql
- supabase/migrations/20251219000007_rls_monitored_items.sql
- supabase/migrations/20251219000008_rls_audit_logs.sql
- supabase/migrations/20251219000009_storage.sql
- supabase/migrations/20251219000010_auth_trigger.sql
- supabase/tests/rls_policies_test.sql
- src/types/app.types.ts (convenience type aliases)

**Modified Files:**
- src/types/database.types.ts (regenerated with new schema)
- src/types/index.ts (updated exports)

## Change Log

- 2025-12-19: Implemented Story 1.4 - Core Database Schema & RLS Foundation
  - Created subscription_tier, item_type, monitored_item_status enums
  - Created users, monitored_items, audit_logs tables with proper indexes
  - Enabled RLS on all tables with user-scoped access policies
  - Created user-photos storage bucket with owner-only policies
  - Added auth trigger for automatic user profile creation
  - Generated TypeScript types for all database entities

- 2025-12-19: Code Review Fixes (AI Review)
  - Added UNIQUE constraint on users.email for data integrity
  - Added idx_audit_logs_action index for action-based queries
  - Added WITH CHECK clause to storage UPDATE policy
  - Added encryption documentation comment to storage migration
  - Updated RLS insert policy comment for accuracy
  - Added unauthenticated access tests (Tests 8-10)
  - Created src/types/app.types.ts with convenience type aliases
  - Updated migration naming convention documentation

