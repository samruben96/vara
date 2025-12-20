---
project_name: 'vara'
user_name: 'Samruben'
date: '2025-12-17'
sections_completed: ['technology_stack', 'critical_rules', 'patterns', 'anti_patterns']
source_document: 'architecture.md'
---

# Project Context for AI Agents

_Critical rules and patterns for implementing vara. Read before writing any code._

---

## Package Manager

**MUST use pnpm** (not npm or yarn). The Obytes template enforces this.

```bash
pnpm install           # Install deps
pnpm add <package>     # Add new package
pnpm run <script>      # Run scripts
```

---

## Technology Stack (Use These Exact Versions)

| Layer | Technology | Notes |
|-------|------------|-------|
| **Mobile** | React Native + Expo | Obytes template, managed workflow |
| **Navigation** | Expo Router | File-based routing in `/app` |
| **State (client)** | Zustand | Auth, subscription, UI state only |
| **State (server)** | React Query v5 | ALL server data fetching |
| **Forms** | react-hook-form + Zod | Validation on all forms |
| **Animations** | react-native-reanimated | Glow effects, transitions |
| **Backend** | Supabase | PostgreSQL, Auth, Realtime, Storage, Edge Functions |
| **Background Jobs** | Inngest | External API orchestration |
| **Payments** | RevenueCat | iOS/Android subscriptions |
| **Storage** | react-native-mmkv | Secure local storage (tokens) |
| **Push** | Expo Push Notifications | Via expo-notifications |
| **Errors** | Sentry | Mobile + Edge Function errors |
| **Analytics** | PostHog | Product analytics, feature flags |

---

## Critical Implementation Rules

### 1. Naming Conventions (MUST FOLLOW)

```
DATABASE (PostgreSQL):
  Tables:      snake_case, plural    → users, monitored_items, threats
  Columns:     snake_case            → user_id, created_at, subscription_tier
  Foreign keys: {table}_id           → user_id, scan_id
  Indexes:     idx_{table}_{cols}    → idx_users_email
  RLS policies: {action}_{table}     → select_own_threats

TYPESCRIPT/REACT:
  Files:       kebab-case            → user-card.tsx, use-auth-store.ts
  Components:  PascalCase            → UserCard, ScanProgress
  Functions:   camelCase             → getUserData, startScan
  Variables:   camelCase             → userId, scanProgress
  Constants:   SCREAMING_SNAKE       → API_BASE_URL, MAX_RETRY
  Hooks:       use + camelCase       → useAuthStore, useThreats
  Types:       PascalCase            → User, Threat, ScanProgress
```

### 2. File Organization (MUST FOLLOW)

```
/app                    → Expo Router screens ONLY (no business logic)
  /(tabs)/              → Tab navigator screens
  /(auth)/              → Auth flow screens
  /(onboarding)/        → Onboarding screens

/src
  /api
    /queries            → React Query useQuery hooks (use-threats.ts)
    /mutations          → React Query useMutation hooks (use-start-scan.ts)
  /components
    /ui                 → Design system primitives (button.tsx, card.tsx)
    /features           → Feature-specific components (/scan, /threats)
    /layout             → Layout components (tab-bar.tsx, header.tsx)
  /lib                  → Utilities (supabase.ts, constants.ts, colors.ts)
  /store                → Zustand stores (auth-store.ts, subscription-store.ts)
  /types                → TypeScript types (database.types.ts, app.types.ts)
  /hooks                → Custom hooks (use-subscription-tier.ts)

/supabase
  /functions            → Edge Functions (each in own directory with index.ts)
  /migrations           → SQL migrations (timestamped)

/inngest
  /functions            → Inngest workflow functions
```

### 3. State Management Rules

```typescript
// USE React Query for ALL server data
const { data, isLoading } = useThreats(userId);  // ✅ Correct

// USE Zustand ONLY for client-side state
const { user, isAuthenticated } = useAuthStore();  // ✅ Correct
const { tier } = useSubscriptionStore();           // ✅ Correct

// NEVER do this:
const [threats, setThreats] = useState([]);        // ❌ Wrong
useEffect(() => fetch('/api/threats')...);         // ❌ Wrong
```

### 4. API Response Format (All Edge Functions)

```typescript
// Success
{ data: T, error: null }

// Error
{ data: null, error: { code: "ERROR_CODE", message: "Human readable" } }
```

### 5. Feature Gating (Subscription Tiers)

```typescript
// ALWAYS check tier before premium features
const { tier } = useSubscriptionStore();
const canAccessDeepfake = tier === 'premium' || tier === 'pro';
const canAccessDarkWeb = tier === 'pro';

// Render upgrade prompt for locked features
{canAccessDeepfake ? <DeepfakeResults /> : <UpgradePrompt feature="deepfake" />}
```

### 6. Error Handling Pattern

```typescript
// Log to Sentry BEFORE showing user error
if (error) {
  Sentry.captureException(error);
  return <ErrorState message="Unable to load threats" onRetry={refetch} />;
}
```

### 7. Test Location

```
Tests are CO-LOCATED with source files:
/src/components/ui/button.tsx
/src/components/ui/button.test.tsx  ← Same directory
```

---

## Anti-Patterns (NEVER DO THESE)

### State Management
```typescript
// ❌ Manual fetch + useState for server data
const [data, setData] = useState([]);
const [loading, setLoading] = useState(false);
useEffect(() => { fetch(...) }, []);

// ✅ Use React Query instead
const { data, isLoading } = useQuery({...});
```

### Database Naming
```sql
-- ❌ Wrong: camelCase in database
CREATE TABLE Users (userId UUID, createdAt TIMESTAMP);

-- ✅ Correct: snake_case
CREATE TABLE users (user_id UUID, created_at TIMESTAMPTZ);
```

### File Naming
```
❌ /src/components/StatusCircle.tsx     → Should be status-circle.tsx
❌ /src/api/getThreats.ts               → Should be use-threats.ts in /queries
```

### Screen Files
```typescript
// ❌ Business logic in screen files
// app/(tabs)/alerts.tsx should NOT contain fetch logic or state management

// ✅ Screens render components, components use hooks
export default function AlertsScreen() {
  return <AlertList />;  // Component handles its own data
}
```

### Edge Functions
```typescript
// ❌ Never expose service role key to client
const supabase = createClient(url, SERVICE_ROLE_KEY);  // Only in Edge Functions!

// ✅ Client uses anon key, Edge Functions use service role
```

---

## Data Flow Pattern

```
User Action
    ↓
React Component
    ↓
React Query Mutation
    ↓
Supabase (direct) OR Edge Function (complex ops)
    ↓
[If complex] Inngest Event → Inngest Workflow → External APIs
    ↓
Results → Supabase
    ↓
Supabase Realtime Broadcast
    ↓
React Query Invalidation
    ↓
UI Updates
```

---

## Supabase Patterns

### RLS Required
All tables MUST have Row Level Security enabled. Users can only access their own data.

### Realtime Channels
```typescript
// Channel naming: {resource}:{identifier}
supabase.channel(`scan:${scanId}`)
supabase.channel(`alerts:${userId}`)
```

### Edge Function Template
Every Edge Function follows this structure:
1. CORS handling
2. Auth check (get user from JWT)
3. Input validation (Zod)
4. Business logic
5. Return `{ data, error }` format

---

## Inngest Patterns

### Event Naming
```typescript
'scan/started'
'scan/step.completed'
'scan/completed'
'threat/detected'
'subscription/changed'
```

### External API Calls
ALL external API calls (HIBP, image search, deepfake, etc.) go through Inngest, NOT Edge Functions. This ensures retries, timeouts, and observability.

---

## Design System Colors

```typescript
// Brand colors (from UX Design Specification)
const colors = {
  cream: '#FEFAF1',      // Light backgrounds, text on dark
  lavender: '#D7CAE6',   // Secondary accents, soft highlights
  mint: '#B1EFE3',       // Protection status, success states
  coral: '#FFAB91',      // Attention states, soft alerts
  charcoal: '#1E1E1E',   // Dark backgrounds, primary text
  red: '#E57373',        // Critical/Error status
};

// Usage: import { getSemanticColors } from '@/lib/design-system';
// const colors = getSemanticColors(colorScheme); // 'light' | 'dark'
```

---

## Quick Reference

| Question | Answer |
|----------|--------|
| Where do screens go? | `/app/(tabs)/`, `/app/(auth)/`, etc. |
| Where do API hooks go? | `/src/api/queries/` or `/src/api/mutations/` |
| Where do UI components go? | `/src/components/ui/` |
| Where do Zustand stores go? | `/src/store/` |
| Where do Edge Functions go? | `/supabase/functions/{name}/index.ts` |
| Where do tests go? | Same directory as source file |
| How to handle loading? | Use React Query's `isLoading` |
| How to handle errors? | Log to Sentry, show ErrorState component |
| How to check subscription? | `useSubscriptionStore()` |
