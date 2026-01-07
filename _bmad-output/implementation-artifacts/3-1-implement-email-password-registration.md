# Story 3.1: Implement Email/Password Registration

Status: done

## Story

As a **new user**,
I want **to create an account with my email and password**,
So that **I can start using vara's protection services**.

## Acceptance Criteria

1. **Given** I am on the signup screen
   **When** I enter a valid email and password (min 8 chars, 1 uppercase, 1 number)
   **Then** my account is created in Supabase Auth
   **And** a verification email is sent to my email address
   **And** I see a confirmation screen asking me to verify my email
   **And** my user record is created in the `users` table (via existing auth trigger)
   **And** an audit log entry is created for the registration
   **And** validation errors are shown inline for invalid inputs
   **And** loading state is shown during registration

## Tasks / Subtasks

- [x] **Task 1: Create signup mutation hook** (AC: #1)
  - [x] Create `src/api/mutations/use-signup.ts` following React Query mutation pattern
  - [x] Implement `supabase.auth.signUp({ email, password, options: { data: { full_name } } })`
  - [x] Handle success response (check if email confirmation required)
  - [x] Handle error responses with user-friendly messages
  - [x] Create unit tests `src/api/mutations/use-signup.test.tsx`

- [x] **Task 2: Create audit log mutation hook** (AC: #1)
  - [x] Create `src/api/mutations/use-create-audit-log.ts`
  - [x] Insert to `audit_logs` table with action='registration', resource_type='user'
  - [x] Call after successful signup (NOT on errors)
  - [x] Create unit tests `src/api/mutations/use-create-audit-log.test.tsx`

- [x] **Task 3: Create email verification pending screen** (AC: #1)
  - [x] Create `src/app/(auth)/verify-email.tsx` screen
  - [x] Display email verification message with instructions
  - [x] Show the user's email address (passed via route params)
  - [x] Add "Resend Email" button (calls `supabase.auth.resend({ type: 'signup' })`)
  - [x] Add "Back to Login" navigation option
  - [x] Follow existing auth screen patterns from `signup.tsx`

- [x] **Task 4: Connect signup form to actual auth** (AC: #1)
  - [x] Update `src/app/(auth)/signup.tsx` to use `useSignup` mutation
  - [x] Replace console.log with actual signup call
  - [x] Handle loading state (disable button, show spinner)
  - [x] On success: navigate to verify-email screen (NOT onboarding - user must verify first)
  - [x] On error: show toast or inline error message
  - [x] Create audit log entry on successful signup

- [x] **Task 5: Handle full_name in signup** (AC: #1)
  - [x] Pass full_name in `options.data` during signup
  - [x] Modify auth trigger OR create separate mutation to update `users.full_name` after signup
  - [x] Note: Created new migration to update auth trigger to extract full_name from metadata

- [x] **Task 6: Add error handling UI component** (AC: #1)
  - [x] Create toast notification system if not exists (or use existing Alert component)
  - [x] Display auth errors: email already registered, invalid password, network errors
  - [x] Map Supabase error codes to user-friendly messages

- [x] **Task 7: Verify TypeScript and test suite** (AC: All)
  - [x] Run `pnpm run type-check` - ensure passing
  - [x] Run `pnpm test` - ensure all tests pass (543 tests passing)
  - [x] Manually test signup flow in development

## Dev Notes

### Critical Architecture Requirements

**Package Manager (MANDATORY):**
- MUST use `pnpm` for all package operations
- Never use `npm` or `yarn`

**Naming Conventions (MANDATORY):**
```
TYPESCRIPT/REACT:
  Files:       kebab-case            -> use-signup.ts, verify-email.tsx
  Components:  PascalCase            -> VerifyEmail, SignupForm
  Functions:   camelCase             -> handleSignup, createAuditLog
  Hooks:       use + camelCase       -> useSignup, useCreateAuditLog
  Types:       PascalCase            -> SignupData, AuthError

DATABASE:
  Tables:      snake_case, plural    -> audit_logs
  Columns:     snake_case            -> full_name, created_at
```

### State Management Rules (CRITICAL)

**Use React Query for mutations:**
```typescript
// src/api/mutations/use-signup.ts
import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

interface SignupData {
  email: string;
  password: string;
  fullName: string;
}

export function useSignup() {
  return useMutation({
    mutationFn: async ({ email, password, fullName }: SignupData) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName }
        }
      });

      if (error) throw error;
      return data;
    },
    // Note: Do NOT update auth store here - useAuthListener handles this
  });
}
```

### Supabase Auth signUp Behavior

**CRITICAL: Email Confirmation is ENABLED by default in Supabase**

When `signUp()` is called:
1. User is created in `auth.users` table
2. Session is returned BUT user.confirmed_at is NULL
3. Verification email is automatically sent
4. User cannot perform authenticated actions until email is verified
5. Auth trigger fires: creates record in public.users with id, email, created_at

**Check if confirmation required:**
```typescript
const { data, error } = await supabase.auth.signUp({ email, password });

if (data.user && !data.session) {
  // Email confirmation required - navigate to verify-email screen
  router.replace({ pathname: '/(auth)/verify-email', params: { email } });
} else if (data.session) {
  // Auto-confirmed (if email confirmation disabled) - go to onboarding
  router.replace('/(onboarding)/welcome');
}
```

### Existing Infrastructure (DO NOT RECREATE)

**Already exists from Epic 1 & 2:**
- `src/lib/supabase.ts` - Supabase client with MMKV storage
- `src/store/auth-store.ts` - Zustand auth store with setSession, setUser
- `src/hooks/use-auth-listener.ts` - Auth state change listener (called in _layout.tsx)
- `src/components/features/auth/signup-form.tsx` - Form UI with validation
- `src/app/(auth)/signup.tsx` - Screen shell with TODO comment
- `supabase/migrations/20251219000010_auth_trigger.sql` - Auto-creates user profile
- `supabase/migrations/20251219000004_audit_logs.sql` - Audit log table

**DO NOT create duplicates of:**
- Supabase client
- Auth store
- Auth listener hook
- Signup form component

### Full Name Handling

**Current auth trigger (20251219000010_auth_trigger.sql):**
```sql
INSERT INTO public.users (id, email, created_at)
VALUES (NEW.id, NEW.email, NOW());
```

**Problem:** Trigger doesn't populate full_name from auth metadata.

**Solution Options (choose one):**

**Option A (Recommended): Update auth trigger to extract metadata**
```sql
-- Create new migration: 20251222000001_auth_trigger_fullname.sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, created_at)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',  -- Extract from metadata
    NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

**Option B: Update users table after signup via mutation**
```typescript
// After successful signUp, update users table
const { error } = await supabase
  .from('users')
  .update({ full_name: fullName })
  .eq('id', data.user.id);
```

### Audit Log Pattern

**Action types for auth events:**
- `registration` - User signs up
- `login` - User logs in (Story 3.3)
- `logout` - User logs out
- `password_reset_request` - User requests password reset (Story 3.6)
- `email_verified` - User verifies email (Story 3.2)

**Insert pattern:**
```typescript
// src/api/mutations/use-create-audit-log.ts
export function useCreateAuditLog() {
  return useMutation({
    mutationFn: async ({
      action,
      resourceType,
      resourceId,
      metadata
    }: AuditLogData) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user');

      const { error } = await supabase.from('audit_logs').insert({
        user_id: user.id,
        action,
        resource_type: resourceType,
        resource_id: resourceId,
        metadata: metadata ?? {}
      });

      if (error) throw error;
    },
  });
}
```

### Error Handling

**Supabase Auth error codes to handle:**
| Error Code | User Message |
|------------|--------------|
| `user_already_exists` | "An account with this email already exists" |
| `weak_password` | "Password is too weak. Please use a stronger password" |
| `invalid_email` | "Please enter a valid email address" |
| `over_request_rate_limit` | "Too many attempts. Please try again later" |
| `unexpected_failure` | "Something went wrong. Please try again" |

**Error handling pattern:**
```typescript
const getErrorMessage = (error: AuthError): string => {
  switch (error.message) {
    case 'User already registered':
      return 'An account with this email already exists. Try logging in instead.';
    case 'Password should be at least 6 characters':
      return 'Password must be at least 8 characters with 1 uppercase and 1 number';
    default:
      Sentry.captureException(error);
      return 'Something went wrong. Please try again.';
  }
};
```

### Verify Email Screen Pattern

**Follow existing auth screen patterns:**
```typescript
// src/app/(auth)/verify-email.tsx
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Button, Text, View, FocusAwareStatusBar } from '@/components/ui';
import { supabase } from '@/lib/supabase';

export default function VerifyEmailScreen() {
  const { email } = useLocalSearchParams<{ email: string }>();
  const router = useRouter();
  const [isResending, setIsResending] = useState(false);

  const handleResend = async () => {
    setIsResending(true);
    try {
      await supabase.auth.resend({ type: 'signup', email });
      // Show success toast
    } catch (error) {
      // Show error toast
    } finally {
      setIsResending(false);
    }
  };

  return (
    <>
      <FocusAwareStatusBar />
      <View style={styles.container}>
        <Text style={styles.title}>Check Your Email</Text>
        <Text style={styles.subtitle}>
          We sent a verification link to {email}
        </Text>
        <Button
          label="Resend Email"
          onPress={handleResend}
          loading={isResending}
        />
        <Button
          label="Back to Login"
          variant="outline"
          onPress={() => router.replace('/(auth)/login')}
        />
      </View>
    </>
  );
}
```

### Testing Standards

**Co-locate tests with source files:**
```
src/api/mutations/use-signup.ts
src/api/mutations/use-signup.test.ts  <- Same directory
```

**Minimum test cases for use-signup.ts:**
1. Successful signup returns user data
2. Handles email already registered error
3. Handles network error
4. Passes fullName in options.data

**Mock Supabase in tests:**
```typescript
jest.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      signUp: jest.fn(),
    },
  },
}));
```

### Project Structure Notes

**Files to Create:**
```
src/
  api/
    mutations/
      use-signup.ts              # Signup mutation hook
      use-signup.test.ts         # Tests
      use-create-audit-log.ts    # Audit log mutation
      use-create-audit-log.test.ts
  app/
    (auth)/
      verify-email.tsx           # Email verification pending screen
supabase/
  migrations/
    20251222000001_auth_trigger_fullname.sql  # Update trigger for full_name
```

**Files to Modify:**
```
src/
  app/
    (auth)/
      signup.tsx                 # Connect form to auth mutation
```

### Previous Story Intelligence

**From Story 1.5 (Configure Authentication Foundation):**
- Auth store exists with user, session, isAuthenticated, isLoading
- useAuthListener hook syncs auth state changes to Zustand
- MMKV storage adapter for secure token persistence
- Google OAuth and Apple Sign-In providers configured (placeholders)

**From Epic 1 Retrospective:**
- Use existing MMKV `storage` instance from `src/lib/storage.tsx`
- Follow kebab-case for files strictly
- Run type-check AND tests before marking complete
- 102 tests exist - don't break them

**From Story 2.2 (Auth Flow Screens Shell):**
- Signup form already has validation: email format, password 8+ chars, uppercase, number
- SocialButton components exist for Google/Apple
- Auth screen styling patterns established

### Git Intelligence

**Recent Commits:**
- `1a9f852` feat(story-2.9): Visual design polish with code review fixes
- `21b4cc7` feat(story-2.6): Create main tab screens with light theme
- `045c0a1` feat(story-2.5): Build core UI components with code review fixes

**Patterns Established:**
- Commit messages: `feat(story-X.Y): Description`
- Tests run before commits
- Code reviews catch 15+ issues per epic

### Web Research Summary (December 2025)

**Supabase Auth + React Native:**
- Email verification enabled by default - handle `data.user && !data.session` case
- Use `supabase.auth.resend({ type: 'signup', email })` for resend verification
- `raw_user_meta_data` stores custom fields passed in `options.data`
- Session auto-refresh handled by Supabase client (already configured)

**Sources:**
- [Supabase React Native Auth Quickstart](https://supabase.com/docs/guides/auth/quickstarts/react-native)
- [Supabase Password Auth Docs](https://supabase.com/docs/guides/auth/passwords)
- [Supabase signUp API Reference](https://supabase.com/docs/reference/javascript/auth-signup)

### References

- [Source: _bmad-output/architecture.md#Authentication & Security] - Auth patterns
- [Source: _bmad-output/architecture.md#API & Communication Patterns] - Mutation patterns
- [Source: _bmad-output/epics.md#Story 3.1] - Acceptance criteria
- [Source: implementation-artifacts/1-5-configure-authentication-foundation.md] - Auth setup
- [Source: _bmad-output/project-context.md#State Management Rules] - React Query patterns

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

- TypeScript check passed with no errors
- All 543 tests passed (up from 102 in Epic 1)
- React Query mutations implemented following project patterns
- Alert.alert used for error display (native pattern)

### Completion Notes List

- **Task 1**: Created `useSignup` mutation hook with 6 passing tests covering success and error cases
- **Task 2**: Created `useCreateAuditLog` mutation hook with 4 passing tests
- **Task 3**: Created verify-email.tsx screen with mail icon, resend functionality, and back navigation
- **Task 4**: Updated signup.tsx to use mutations, handle loading state, navigate to verify-email on success
- **Task 5**: Created migration `20251223000001_auth_trigger_fullname.sql` to extract full_name from metadata
- **Task 6**: Created reusable `src/lib/auth-errors.ts` with `getAuthErrorMessage` function and `AUTH_ACTIONS` constants
- **Task 7**: Verified TypeScript compiles with no errors, all 543 tests pass

### File List

**New Files:**
- `src/api/mutations/use-signup.ts` - Signup mutation hook
- `src/api/mutations/use-signup.test.tsx` - Signup mutation tests (6 tests)
- `src/api/mutations/use-create-audit-log.ts` - Audit log mutation hook
- `src/api/mutations/use-create-audit-log.test.tsx` - Audit log mutation tests (4 tests)
- `src/api/mutations/index.ts` - Barrel export for mutations (Code Review Fix)
- `src/app/(auth)/verify-email.tsx` - Email verification pending screen
- `src/components/ui/icons/mail.tsx` - Mail icon component
- `src/lib/auth-errors.ts` - Auth error handling utilities
- `src/lib/auth-errors.test.ts` - Auth error tests (22 tests) (Code Review Fix)
- `supabase/migrations/20251223000001_auth_trigger_fullname.sql` - Auth trigger update for full_name

**Modified Files:**
- `src/app/(auth)/signup.tsx` - Connected to auth mutations, added loading state, error handling, Sentry logging
- `src/app/(auth)/verify-email.tsx` - Added Sentry logging, design system colors for banners
- `src/components/features/auth/signup-form.tsx` - Added `isLoading` prop
- `src/components/ui/icons/index.tsx` - Exported mail icon
- `src/lib/colors.ts` - Added feedbackColors for banners/alerts (Code Review Fix)
- `src/lib/design-system.ts` - Exported feedbackColors (Code Review Fix)

## Change Log

- 2025-12-23: Implemented email/password registration with verification flow, audit logging, and error handling
- 2025-12-23: **Code Review Fixes**: Added auth-errors tests (22 tests), Sentry error logging, design system feedbackColors, mutations barrel export, Jest open handle cleanup
