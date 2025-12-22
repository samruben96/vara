# Deployment Checklist

## Before First Production Build

### 1. GitHub Secrets Setup
Add these secrets in GitHub → Settings → Secrets and variables → Actions:

| Secret | Required | Description |
|--------|----------|-------------|
| `EXPO_TOKEN` | ✅ | EAS authentication token (already added) |
| `SECRET_KEY` | ✅ | App secret key (any random string) |
| `API_URL` | ✅ | Production Supabase URL |
| `SUPABASE_URL` | ✅ | Production Supabase URL |
| `SUPABASE_ANON_KEY` | ✅ | Supabase anon/public key |
| `SENTRY_DSN` | Optional | Sentry error tracking DSN |
| `POSTHOG_API_KEY` | Optional | PostHog analytics key |
| `POSTHOG_HOST` | Optional | PostHog host (defaults to https://app.posthog.com) |

### 2. Enable EAS Build Workflow
In `.github/workflows/eas-build.yml`, uncomment the push trigger:
```yaml
on:
  push:
    branches: [main]  # <-- uncomment these lines
  workflow_dispatch:
```

### 3. Supabase Production Setup
- [ ] Create production Supabase project
- [ ] Run migrations on production database
- [ ] Configure OAuth providers (Google, Apple) in Supabase Dashboard
- [ ] Set up Row Level Security policies

### 4. App Store Setup
- [ ] Apple Developer account configured
- [ ] Google Play Developer account configured
- [ ] App Store Connect app created
- [ ] Google Play Console app created

---
*Created: 2024-12-22*
*Status: Not started - currently in development phase*
