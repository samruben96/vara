# Story 1.2: Set Up Supabase Project & Local Development

Status: done

## Story

As a **developer**,
I want **Supabase configured for local development and cloud deployment**,
So that **I can develop with a local database and deploy to staging/production environments**.

## Acceptance Criteria

1. **Given** Supabase CLI is installed
   **When** I run `npx supabase init` and `npx supabase start`
   **Then** local Supabase instance starts with PostgreSQL, Auth, Storage, and Realtime

2. **Given** local Supabase is initialized
   **When** I examine the configuration
   **Then** `supabase/config.toml` is configured correctly for vara project

3. **Given** the project is configured
   **When** I check environment setup
   **Then** environment variables are set up for dev/staging/prod
   **And** `.env.local` and `.env.example` files are created

4. **Given** the Supabase client is configured
   **When** I connect from the mobile app
   **Then** Supabase client can successfully connect and query the local database

5. **Given** the setup is complete
   **When** I verify TypeScript types
   **Then** database types are generated via `supabase gen types typescript`

## Tasks / Subtasks

- [x] **Task 1: Install and Initialize Supabase CLI** (AC: #1)
  - [x] Ensure Docker Desktop is running (required for local Supabase)
  - [x] Run `npx supabase init` in project root
  - [x] Verify `supabase/` directory is created with `config.toml`
  - [x] Add `/supabase/.temp/` to `.gitignore`

- [x] **Task 2: Configure Supabase for vara** (AC: #2)
  - [x] Update `supabase/config.toml` with vara-specific settings:
    - Set `project_id = "vara-app"`
    - Configure API port: 54321 (default)
    - Configure DB port: 54322 (default)
    - Configure Studio port: 54323 (default)
    - Configure Storage with file size limits per UX requirements
  - [x] Add placeholder storage bucket configuration for `user-photos`
  - [x] Configure Auth settings:
    - Set `site_url = "http://127.0.0.1:3000"` for dev
    - Configure JWT expiry: 3600 seconds
    - Enable refresh token rotation

- [x] **Task 3: Create Environment Configuration** (AC: #3)
  - [x] Create `.env.example` with all required environment variables (Obytes pattern, no EXPO_PUBLIC_ prefix)
  - [x] Create `.env.development` with local development values (Obytes APP_ENV pattern)
  - [x] Create `.env.staging` placeholder (values to be filled when project created)
  - [x] Create `.env.production` placeholder (values to be filled when project created)
  - [x] Update `.gitignore` to exclude `.env.development`, `.env.staging`, `.env.production` but NOT `.env.example`
  - [x] **Note:** This project does NOT use `.env.local` - uses APP_ENV-based loading instead

- [x] **Task 4: Install Supabase JS Client** (AC: #4)
  - [x] Install `@supabase/supabase-js` using pnpm: `pnpm add @supabase/supabase-js`
  - [x] Create `src/lib/supabase.ts` with client initialization
  - [x] Implement proper environment variable loading using Obytes Env pattern (@env)
  - [x] Configure client with MMKV storage adapter for secure token persistence
  - [x] Export typed Supabase client

- [x] **Task 5: Start Local Supabase and Verify** (AC: #1, #4)
  - [x] Run `npx supabase start` to start all local services
  - [x] Verify all services start: PostgreSQL, Auth, Storage, Realtime, Studio
  - [x] Access Supabase Studio at http://127.0.0.1:54323
  - [x] Run `npx supabase status` to get connection details
  - [x] Test client connection by running REST API test (200 OK)

- [x] **Task 6: Generate TypeScript Types** (AC: #5)
  - [x] Run `npx supabase gen types typescript --local > src/types/database.types.ts`
  - [x] Verify types file is created (minimal until schema is added in Story 1.4)
  - [x] Update `src/lib/supabase.ts` to use generated Database type
  - [x] Add type generation script to `package.json`: `"db:types": "supabase gen types typescript --local > src/types/database.types.ts"`

- [x] **Task 7: Add npm Scripts** (AC: All)
  - [x] Add to `package.json` scripts:
    - `"supabase:start": "supabase start"`
    - `"supabase:stop": "supabase stop"`
    - `"supabase:status": "supabase status"`
    - `"supabase:reset": "supabase db reset"`
    - `"db:types": "supabase gen types typescript --local > src/types/database.types.ts"`

## Dev Notes

### Critical Architecture Requirements

**Package Manager (MANDATORY):**
- MUST use `pnpm` for all package operations
- Never use `npm` or `yarn` for this project

**From Architecture Document - Backend Platform:**
```
| Decision | Choice | Rationale |
|----------|--------|-----------|
| Backend Platform | Supabase Cloud | Managed PostgreSQL, Edge Functions, Realtime |
```

**From Architecture Document - Data Architecture:**
```
| Decision | Choice | Version | Rationale |
|----------|--------|---------|-----------|
| Database | PostgreSQL (via Supabase) | Latest | Complex relational queries, RLS for compliance |
| ORM/Query | Supabase JS Client | Latest | Type-safe queries, real-time subscriptions built-in |
| Local Storage | react-native-mmkv | Latest | Secure, fast key-value storage for tokens |
```

### Supabase Client Initialization Pattern

From the Architecture document, the client must be initialized in `src/lib/supabase.ts`:

```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
import { MMKV } from 'react-native-mmkv';
import type { Database } from '@/types/database.types';

const mmkvStorage = new MMKV();

// Custom storage adapter for MMKV
const mmkvStorageAdapter = {
  getItem: (key: string) => mmkvStorage.getString(key) ?? null,
  setItem: (key: string, value: string) => mmkvStorage.set(key, value),
  removeItem: (key: string) => mmkvStorage.delete(key),
};

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: mmkvStorageAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false, // Required for React Native
  },
});
```

### Environment Variable Naming

Expo requires environment variables to be prefixed with `EXPO_PUBLIC_` to be accessible in the client:

```
EXPO_PUBLIC_SUPABASE_URL=http://localhost:54321
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
```

For server-only variables (Edge Functions), use without prefix:
```
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...
```

### config.toml Configuration

Key sections to configure in `supabase/config.toml`:

```toml
[api]
enabled = true
port = 54321
schemas = ["public", "graphql_public"]
max_rows = 1000

[db]
port = 54322
major_version = 17

[storage]
enabled = true
file_size_limit = "50MiB"

[storage.buckets.user-photos]
public = false
file_size_limit = "10MiB"
allowed_mime_types = ["image/png", "image/jpeg", "image/gif", "image/webp"]

[auth]
enabled = true
site_url = "http://localhost:3000"
jwt_expiry = 3600
enable_refresh_token_rotation = true
enable_signup = true
```

### Docker Requirements

**CRITICAL:** Docker Desktop must be running before `supabase start` will work. The Supabase CLI uses Docker containers for:
- PostgreSQL database
- PostgREST API
- GoTrue Auth
- Storage API
- Realtime server
- Studio dashboard

If Docker is not running, `supabase start` will fail with an error about Docker.

### Project Structure Notes

Files created/modified in this story:

```
vara-app/
├── supabase/
│   ├── config.toml          # NEW - Supabase configuration with vara-app settings
│   └── .temp/               # AUTO - Temporary files (gitignored via root .gitignore)
├── src/
│   ├── lib/
│   │   └── supabase.ts       # NEW - Supabase client initialization with MMKV
│   └── types/
│       └── database.types.ts # NEW - Auto-generated from schema
├── .env.example              # NEW - Template for env vars (Obytes pattern)
├── .env.development          # NEW - Local dev values (gitignored, used with APP_ENV=development)
├── .env.staging              # NEW - Staging placeholder (gitignored)
├── .env.production           # NEW - Production placeholder (gitignored)
├── .gitignore                # MODIFY - Add env files and /supabase/.temp/
├── package.json              # MODIFY - Add supabase scripts
└── env.js                    # MODIFY - Add SUPABASE_URL and SUPABASE_ANON_KEY
```

**Note:** This project uses Obytes' APP_ENV-based env loading (NOT Expo's default .env.local pattern).
The `.env.{environment}` files are loaded based on `APP_ENV` variable.

### Previous Story Intelligence (1.1)

From Story 1.1 implementation:
- Project initialized with Obytes template (Expo SDK 53, React Native 0.77)
- pnpm is the required package manager
- react-native-mmkv is already installed (used for secure storage)
- Project structure follows `/src/` pattern
- Zustand stores exist in `/src/store/`
- All 40 tests pass

**Files created in 1.1 that are relevant:**
- `src/store/auth-store.ts` - Will need Supabase integration in Story 1.5
- `src/store/subscription-store.ts` - Will need Supabase integration
- `src/hooks/use-subscription-tier.ts` - Uses store pattern

### Naming Conventions (From Architecture)

| Element | Convention | Example |
|---------|------------|---------|
| Files | kebab-case | `supabase.ts`, `database.types.ts` |
| Types | PascalCase | `Database`, `User` |
| Variables | camelCase | `supabaseUrl`, `anonKey` |
| Constants | SCREAMING_SNAKE | `SUPABASE_URL` (env vars) |

### Testing Considerations

- No unit tests required for this story (configuration setup)
- Manual verification steps are sufficient:
  1. `npx supabase status` shows all services running
  2. Supabase Studio accessible at http://localhost:54323
  3. App can import and use supabase client without errors
  4. Type checking passes with generated types

### Potential Issues & Solutions

**Issue: Docker not running**
- Error: "Cannot connect to Docker daemon"
- Solution: Start Docker Desktop before running `supabase start`

**Issue: Port conflicts**
- Error: "Port 54321 already in use"
- Solution: Change ports in `config.toml` or stop conflicting services

**Issue: MMKV initialization in tests**
- The MMKV adapter may fail in Jest tests
- Solution: Mock the storage adapter in tests or use environment detection

**Issue: Environment variables not loading**
- Expo requires restart to pick up new env vars
- Solution: Stop and restart Expo dev server after changing `.env.local`

### References

- [Source: _bmad-output/architecture.md#Data Architecture]
- [Source: _bmad-output/architecture.md#API & Communication Patterns]
- [Source: _bmad-output/architecture.md#Infrastructure & Deployment]
- [Source: _bmad-output/architecture.md#Development Workflow]
- [Source: _bmad-output/project-context.md#Technology Stack]
- [Source: _bmad-output/epics.md#Story 1.2]
- [Source: Supabase CLI Documentation](https://supabase.com/docs/guides/cli)
- [Source: Supabase JS Client Documentation](https://supabase.com/docs/reference/javascript/introduction)

### Supabase CLI Quick Reference

```bash
# Initialize Supabase in project
npx supabase init

# Start local development
npx supabase start

# Stop local development
npx supabase stop

# Check service status
npx supabase status

# Generate TypeScript types
npx supabase gen types typescript --local > src/types/database.types.ts

# Reset database (apply all migrations fresh)
npx supabase db reset

# Create new migration
npx supabase migration new <name>

# Apply migrations locally
npx supabase migration up

# Link to remote project (for later)
npx supabase login
npx supabase link --project-ref <project-id>
```

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5

### Debug Log References

- Supabase local running at http://127.0.0.1:54321
- Studio at http://127.0.0.1:54323
- REST API test: 200 OK
- Type check: PASS

### Completion Notes List

1. Docker was reinstalled fresh - all Supabase Docker images pulled successfully
2. Adapted to Obytes template's env system (env.js with zod validation)
3. Created `.env.development` for local dev (Obytes APP_ENV pattern - NOT .env.local)
4. Updated `env.js` to include `SUPABASE_URL` and `SUPABASE_ANON_KEY` in client schema
5. Used existing `storage` MMKV instance from `src/lib/storage.tsx` instead of creating new one
6. **Stopped Services (Expected):** `imgproxy` and `pooler` show as stopped - this is normal:
   - `imgproxy` - Image transformation service (only needed for Supabase Pro plan)
   - `pooler` - Connection pooler (disabled in config.toml, not needed for local dev)
7. All type checks pass
8. **Important:** This project uses `APP_ENV` based env loading (NOT Expo's default .env.local)

### File List

**New Files:**
- `supabase/config.toml` - Supabase project configuration with vara-app settings
- `src/lib/supabase.ts` - Supabase client initialization with MMKV storage adapter
- `src/types/database.types.ts` - Auto-generated TypeScript types (empty schema)
- `.env.example` - Environment variable template (uses Obytes env.js pattern, NOT EXPO_PUBLIC_ prefix)
- `.env.development` - Local development environment variables (Obytes APP_ENV pattern)
- `.env.staging` - Staging environment placeholder
- `.env.production` - Production environment placeholder
- `.prettierrc` - Prettier configuration (from template customization)
- `README-original.md` - Original template README (preserved for reference)
- `__mocks__/@react-navigation/` - Navigation mocks for testing

**Modified Files:**
- `.gitignore` - Added `.env.development`, `.env.staging`, `.env.production`, and `/supabase/.temp/` to exclusions
- `package.json` - Added Supabase npm scripts and @supabase/supabase-js dependency
- `env.js` - Added SUPABASE_URL and SUPABASE_ANON_KEY to client schema and _clientEnv
- `pnpm-lock.yaml` - Updated with Supabase dependencies

**Removed Files:**
- `android/app/src/main/assets/fonts/Inter.ttf` - Removed (using system fonts)

**Directories Created:**
- `supabase/` - Supabase CLI configuration directory
- `coverage/` - Test coverage reports (gitignored)

## Change Log

| Date | Change | Author |
|------|--------|--------|
| 2025-12-19 | Story created via create-story workflow | Claude Opus 4.5 |
| 2025-12-19 | All tasks completed, story ready for review | Claude Opus 4.5 |
| 2025-12-19 | **Code Review Fixes:** Fixed env variable naming (.env.example, .env.staging, .env.production), removed unused .env.local, updated File List to include all git changes, added explanation for stopped services, standardized 127.0.0.1 usage | Claude Opus 4.5 |
| 2025-12-19 | **Story 1-5 Review:** Added Google OAuth config section to supabase/config.toml | Claude Opus 4.5 |
