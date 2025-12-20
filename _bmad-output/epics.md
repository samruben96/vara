---
stepsCompleted: [1, 2, 3, 4]
inputDocuments:
  - _bmad-output/project-planning-artifacts/prd.md
  - _bmad-output/architecture.md
  - _bmad-output/project-planning-artifacts/ux-design-specification.md
workflowType: 'epics-and-stories'
lastStep: 4
project_name: 'vara'
user_name: 'Samruben'
date: '2024-12-17'
totalEpics: 13
totalStories: 99
validationStatus: 'complete'
frCoverage: '86/86 (100%)'
nfrCoverage: '31/31'
archRequirements: '26/26'
uxRequirements: '22/22'
readyForDevelopment: true
corrections:
  - 'Added monitored_items table to Story 1.4'
  - 'Split Story 2.12 into 2.12/2.13/2.14'
  - 'Split Story 3.4 into 3.4 (Google) / 3.5 (Apple)'
  - 'Split Story 6.6 into 6.6 (TinEye) / 6.7 (Google Vision)'
  - 'Added Story 6.8: Deepfake Detection'
  - 'Added Story 6.9: Dark Web Monitoring'
  - 'Added circuit breaker implementation to scan stories'
  - 'Specified Anthropic Claude as LLM provider'
  - 'Added Story 3.9: Two-Factor Authentication (FR1.6)'
  - 'Added Story 8.7: SMS Notification Option (FR5.4)'
  - 'Added Story 10.8: Handoff to Human Support (FR8.8)'
  - 'Fixed frontmatter: frCoverage 86/86, nfrCoverage 31/31'
---

# vara - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for vara, decomposing the requirements from the PRD, UX Design, and Architecture into implementable stories.

## Requirements Inventory

### Functional Requirements

**F1: User Authentication & Account**
- FR1.1: Email/password registration (Must, All Tiers)
- FR1.2: Social login - Google, Apple (Must, All Tiers)
- FR1.3: Email verification (Must, All Tiers)
- FR1.4: Password reset flow (Must, All Tiers)
- FR1.5: Biometric login - Face ID, fingerprint (Should, All Tiers)
- FR1.6: Two-factor authentication (Should, All Tiers)
- FR1.7: Account deletion with data purge (Must, All Tiers)

**F2: Onboarding & Data Input**
- FR2.1: Name input - first, last, maiden, aliases (Must, All Tiers)
- FR2.2: Photo upload - 1-10 images (Must, All Tiers)
- FR2.3: Camera capture for photos (Should, All Tiers)
- FR2.4: Social media handle input (Must, All Tiers)
- FR2.5: Email address input for breach monitoring (Should, All Tiers)
- FR2.6: Phone number input for breach monitoring (Should, Premium+)
- FR2.7: Progressive prompts for additional data (Must, All Tiers)
- FR2.8: Data usage explanations (Must, All Tiers)
- FR2.9: Skip/later options for non-essential fields (Must, All Tiers)

**F3: Scanning Engine**
- FR3.1: Initial comprehensive scan (Must, All Tiers)
- FR3.2: Real-time scan progress display (Must, All Tiers)
- FR3.3: Public web image search (Must, All Tiers)
- FR3.4: Social media surface scan (Must, All Tiers)
- FR3.5: Data breach database check (Must, Premium+)
- FR3.6: Dark web monitoring (Should, Pro)
- FR3.7: Deepfake detection analysis (Must, Premium+)
- FR3.8: Impersonation detection (Must, All Tiers)
- FR3.9: Scan scheduling - manual re-scan (Must, All Tiers)
- FR3.10: Background continuous monitoring (Must, Premium+)

**F4: Threat Detection & Classification**
- FR4.1: Image match detection (Must, All Tiers)
- FR4.2: Deepfake/synthetic image detection (Must, Premium+)
- FR4.3: Fake profile detection (Must, All Tiers)
- FR4.4: Breach exposure detection (Must, Premium+)
- FR4.5: Privacy leak detection (Must, Premium+)
- FR4.6: Severity classification - Critical/High/Medium/Low (Must, All Tiers)
- FR4.7: Confidence scoring (Should, All Tiers)
- FR4.8: False positive marking (Must, All Tiers)
- FR4.9: Basic harassment indicator detection (Should, All Tiers)

**F5: Alerts & Notifications**
- FR5.1: Push notification support (Must, All Tiers)
- FR5.2: In-app notification center (Must, All Tiers)
- FR5.3: Email notification option (Must, All Tiers)
- FR5.4: SMS notification option (Should, Premium+)
- FR5.5: Notification preferences configuration (Must, All Tiers)
- FR5.6: Severity-based notification filtering (Should, All Tiers)
- FR5.7: Quiet hours / Do not disturb (Should, All Tiers)
- FR5.8: Alert aggregation - batch low-severity (Should, All Tiers)

**F6: Dashboard & Reporting**
- FR6.1: Protection status overview (Must, All Tiers)
- FR6.2: Recent findings display (Must, All Tiers)
- FR6.3: Threat history (Must, All Tiers)
- FR6.4: Active monitoring status (Must, All Tiers)
- FR6.5: Action items / to-do list (Must, All Tiers)
- FR6.6: Exposure report visualization (Should, All Tiers)
- FR6.7: Trend analysis over time (Should, Premium+)

**F7: Remediation & Actions**
- FR7.1: Guided remediation steps (Must, All Tiers)
- FR7.2: Step-by-step instructions (Must, All Tiers)
- FR7.3: Mark action as complete (Must, All Tiers)
- FR7.4: Platform reporting links (Should, Premium+)
- FR7.5: One-click report generation (Should, Pro)
- FR7.6: Evidence screenshot capture (Should, Premium+)
- FR7.7: Evidence export - PDF (Should, Pro)
- FR7.8: Legal resource links (Should, All Tiers)

**F8: AI Support Assistant**
- FR8.1: Chat interface (Must, All Tiers)
- FR8.2: Natural language understanding (Must, All Tiers)
- FR8.3: Threat explanation (Must, All Tiers)
- FR8.4: Action guidance (Must, All Tiers)
- FR8.5: Emotional support responses (Should, All Tiers)
- FR8.6: Crisis resource escalation (Must, All Tiers)
- FR8.7: Conversation history (Should, All Tiers)
- FR8.8: Handoff to human support (Could, Pro)

**F9: Support Resources**
- FR9.1: Help center / FAQ (Must, All Tiers)
- FR9.2: Safety guides and articles (Must, All Tiers)
- FR9.3: Crisis hotline links (Must, All Tiers)
- FR9.4: External resource directory (Should, All Tiers)
- FR9.5: In-app tutorials (Should, All Tiers)

**F10: Settings & Preferences**
- FR10.1: Profile management (Must, All Tiers)
- FR10.2: Monitored data management - add/remove (Must, All Tiers)
- FR10.3: Notification preferences (Must, All Tiers)
- FR10.4: Privacy settings (Must, All Tiers)
- FR10.5: Subscription management (Must, All Tiers)
- FR10.6: Data export (Should, All Tiers)
- FR10.7: Account deletion (Must, All Tiers)

**F11: Subscription & Payments**
- FR11.1: Free trial initiation (Must, All Tiers)
- FR11.2: Trial expiration handling (Must, All Tiers)
- FR11.3: In-app purchase - iOS (Must, All Tiers)
- FR11.4: Google Play billing - Android (Must, All Tiers)
- FR11.5: Subscription tier selection (Must, All Tiers)
- FR11.6: Upgrade/downgrade flow (Must, All Tiers)
- FR11.7: Billing history (Should, All Tiers)
- FR11.8: Annual vs monthly toggle (Should, All Tiers)

### NonFunctional Requirements

**NFR1: Performance**
- NFR1.1: App launch time < 2 seconds
- NFR1.2: Initial scan completion < 5 minutes
- NFR1.3: Screen load time < 1 second
- NFR1.4: Alert delivery latency < 1 minute for Critical
- NFR1.5: API response time < 500ms (95th percentile)

**NFR2: Security**
- NFR2.1: Data encryption at rest - AES-256
- NFR2.2: Data encryption in transit - TLS 1.3
- NFR2.3: User photos stored encrypted
- NFR2.4: No plain-text PII in logs
- NFR2.5: Regular security audits - Quarterly
- NFR2.6: Penetration testing - Annual minimum

**NFR3: Privacy & Compliance**
- NFR3.1: GDPR compliance required
- NFR3.2: CCPA compliance required
- NFR3.3: SOC 2 Type II target within 12 months
- NFR3.4: Privacy policy required at launch
- NFR3.5: Data retention policy - configurable, default 2 years
- NFR3.6: Right to deletion < 30 days
- NFR3.7: Data portability - export within 72 hours

**NFR4: Reliability**
- NFR4.1: Uptime 99.9%
- NFR4.2: Disaster recovery - RPO < 1 hour, RTO < 4 hours
- NFR4.3: Graceful degradation - core features work if integrations fail

**NFR5: Scalability**
- NFR5.1: Concurrent users - support 100K+
- NFR5.2: Data storage growth - plan for 10x in year 1
- NFR5.3: Scan queue handling - auto-scaling

**NFR6: Accessibility**
- NFR6.1: Screen reader support - WCAG 2.1 AA
- NFR6.2: Dynamic text sizing - iOS/Android standards
- NFR6.3: Color contrast - WCAG 2.1 AA
- NFR6.4: Touch target sizes - 44x44pt minimum

**NFR7: Localization**
- NFR7.1: Launch language - English
- NFR7.2: Localization-ready architecture
- NFR7.3: RTL support - architecture supports future

### Additional Requirements

**From Architecture - Infrastructure & Setup:**
- ARCH-1: Initialize project using Obytes React Native Template: `npx create-expo-app@latest vara-app --template https://github.com/obytes/react-native-template-obytes`
- ARCH-2: Set up Supabase project (PostgreSQL, Auth, Realtime, Storage, Edge Functions)
- ARCH-3: Configure Supabase client integration in mobile app
- ARCH-4: Implement Inngest for background job orchestration
- ARCH-5: Integrate RevenueCat for subscription management
- ARCH-6: Set up Sentry for error tracking
- ARCH-7: Set up PostHog for analytics
- ARCH-8: Configure Expo Push Notifications
- ARCH-9: Implement multi-environment setup (dev/staging/prod)
- ARCH-10: Set up GitHub Actions CI/CD pipeline

**From Architecture - Data & Security:**
- ARCH-11: Create initial database schema with migrations
- ARCH-12: Implement Row Level Security (RLS) policies for all tables
- ARCH-13: Set up audit logging table and triggers for compliance
- ARCH-14: Configure encrypted storage buckets for user photos
- ARCH-15: Implement circuit breaker patterns for external API calls

**From Architecture - Patterns & Structure:**
- ARCH-16: Follow project directory structure exactly as documented
- ARCH-17: Use React Query for all server state (never manual fetch + useState)
- ARCH-18: Use Zustand stores only for client-side state (auth, subscription, UI)
- ARCH-19: Co-locate tests with source files
- ARCH-20: Follow naming conventions: snake_case (DB), camelCase (TS), kebab-case (files)
- ARCH-21: Use Edge Function template for all Supabase functions
- ARCH-22: Implement subscription tier feature gating throughout app

**From Architecture - External Services:**
- ARCH-23: Integrate Have I Been Pwned API for breach checks
- ARCH-24: Integrate reverse image search services (TinEye, Google Vision)
- ARCH-25: Implement graceful degradation for all external service failures
- ARCH-26: Set up webhook handlers for RevenueCat subscription events

**From UX Design - Design System:**
- UX-1: Replace NativeWind with custom vara design system
- UX-2: Implement Plus Jakarta Sans typography (Google Fonts)
- UX-3: Implement brand color system: cream (#FEFAF1), lavender (#D7CAE6), mint (#B1EFE3), coral (#FFAB91), charcoal (#1E1E1E)
- UX-4: Implement 8px base unit spacing system
- UX-5: Create semantic color mapping for light/dark modes

**From UX Design - Core Components:**
- UX-6: Build StatusCircle component with glow effects (protected/attention/critical/scanning states)
- UX-7: Build SummaryCard component for quick metrics
- UX-8: Build AlertCard component with severity badges
- UX-9: Build ActionButton component (primary/secondary/danger/ghost variants)
- UX-10: Build ContentBlur component for sensitive content protection
- UX-11: Build custom TabBar navigation component
- UX-12: Build BottomSheet modal component

**From UX Design - Interaction Patterns:**
- UX-13: Implement glanceable protection status (< 2 second comprehension)
- UX-14: Implement trauma-informed content reveal (blurred by default, tap to reveal)
- UX-15: Implement skeleton screens for loading states
- UX-16: Implement haptic feedback for status confirmations
- UX-17: Support iOS Dynamic Type and Android font scaling
- UX-18: Ensure all touch targets are 44x44pt minimum

**From UX Design - Animation:**
- UX-19: Implement glow pulse animation for protected status (subtle pulse every 4 seconds)
- UX-20: Implement status transition animations (300ms, ease-in-out)
- UX-21: Implement content reveal blur animation (20px → 0px over 200ms)
- UX-22: Respect prefers-reduced-motion system setting

### FR Coverage Map

| Requirement | Epic | Description |
|-------------|------|-------------|
| FR1.1-FR1.7 | Epic 3 | User Authentication & Account |
| FR2.1-FR2.9 | Epic 4 | Onboarding & Data Collection |
| FR3.1-FR3.10 | Epic 6 | Scanning Engine & Real-Time Progress |
| FR4.1-FR4.9 | Epic 7 | Threat Detection & Classification |
| FR5.1-FR5.8 | Epic 8 | Alerts & Notifications |
| FR6.1-FR6.7 | Epic 5 | Dashboard & Protection Status |
| FR7.1-FR7.8 | Epic 9 | Remediation & Actions |
| FR8.1-FR8.8 | Epic 10 | AI Support Assistant |
| FR9.1-FR9.5 | Epic 11 | Support Resources & Help Center |
| FR10.1-FR10.7 | Epic 12 | Settings & Preferences |
| FR11.1-FR11.8 | Epic 13 | Subscription & Payments |
| ARCH-1 to ARCH-15 | Epic 1 | Foundation & Project Setup |
| ARCH-16 to ARCH-22 | Epic 1 | Foundation & Project Setup (patterns) |
| ARCH-23 to ARCH-26 | Epic 6 | Scanning Engine (external services) |
| UX-1 to UX-5 | Epic 1 | Foundation (design tokens) |
| UX-6 to UX-12 | Epic 2 | App Shell (core components) |
| UX-13 to UX-22 | Epic 2 | App Shell (interaction patterns) |
| NFR1.1, NFR1.3 | Epic 5 | Dashboard (performance) |
| NFR1.2 | Epic 6 | Scanning (performance) |
| NFR1.4 | Epic 8 | Alerts (performance) |
| NFR2.1-NFR2.4 | Epic 1 | Foundation (security) |
| NFR3.1-NFR3.5 | Epic 1 | Foundation (compliance) |
| NFR3.6-NFR3.7 | Epic 12 | Settings (data rights) |
| NFR6.1-NFR6.4 | Epic 2 | App Shell (accessibility) |

## Epic List

### Epic 1: Foundation & Project Setup
**Goal:** Establish the development environment with core infrastructure, design tokens, database schema, and security foundations in place.

**User Outcome:** Development team can build features on a solid, compliant, well-structured foundation.

**Requirements Covered:**
- ARCH-1 through ARCH-15 (project init, Supabase, Inngest, RevenueCat, Sentry, PostHog, database, RLS, audit logging)
- UX-1 through UX-5 (design system tokens, colors, typography, spacing)
- NFR2.1-NFR2.4 (security foundations)
- NFR3.1-NFR3.5 (compliance foundations)

---

### Epic 2: App Shell, Screens & Navigation
**Goal:** Create all app screens (shell versions) with working navigation so the complete user experience is visible and navigable.

**User Outcome:** Users can navigate the entire app and experience all user flows visually, even before backend functionality is wired up.

**Requirements Covered:**
- All screen layouts from UX Design specification
- UX-6 through UX-12 (StatusCircle, SummaryCard, AlertCard, ActionButton, ContentBlur, TabBar, BottomSheet)
- UX-13 through UX-22 (interaction patterns, animations, accessibility)
- NFR6.1-NFR6.4 (accessibility requirements)

---

### Epic 3: User Authentication & Account
**Goal:** Implement complete authentication flow including registration, login, social auth, biometrics, and account management.

**User Outcome:** Users can create accounts, login securely via email/social/biometric, verify email, reset passwords, and delete their account.

**Requirements Covered:**
- FR1.1: Email/password registration
- FR1.2: Social login (Google, Apple)
- FR1.3: Email verification
- FR1.4: Password reset flow
- FR1.5: Biometric login (Face ID, fingerprint)
- FR1.6: Two-factor authentication
- FR1.7: Account deletion with data purge

---

### Epic 4: Onboarding & Data Collection
**Goal:** Guide new users through initial setup, collecting the information needed for protection monitoring.

**User Outcome:** New users complete a smooth onboarding flow - entering their name, uploading photos, connecting social handles, and understanding how their data will be used.

**Requirements Covered:**
- FR2.1: Name input (first, last, maiden, aliases)
- FR2.2: Photo upload (1-10 images)
- FR2.3: Camera capture for photos
- FR2.4: Social media handle input
- FR2.5: Email address input for breach monitoring
- FR2.6: Phone number input for breach monitoring
- FR2.7: Progressive prompts for additional data
- FR2.8: Data usage explanations
- FR2.9: Skip/later options for non-essential fields

---

### Epic 5: Dashboard & Protection Status
**Goal:** Display protection status and monitoring summary so users can check their safety at a glance.

**User Outcome:** Users see their protection status instantly upon opening the app, view recent findings, active monitoring summary, and action items.

**Requirements Covered:**
- FR6.1: Protection status overview
- FR6.2: Recent findings display
- FR6.3: Threat history
- FR6.4: Active monitoring status
- FR6.5: Action items / to-do list
- FR6.6: Exposure report visualization
- FR6.7: Trend analysis over time
- NFR1.1: App launch time < 2 seconds
- NFR1.3: Screen load time < 1 second

---

### Epic 6: Scanning Engine & Real-Time Progress
**Goal:** Implement the core scanning functionality with real-time progress streaming and external service integrations.

**User Outcome:** Users can initiate scans, watch real-time progress ("Checking databases... Scanning social platforms..."), and see comprehensive results.

**Requirements Covered:**
- FR3.1: Initial comprehensive scan
- FR3.2: Real-time scan progress display
- FR3.3: Public web image search
- FR3.4: Social media surface scan
- FR3.5: Data breach database check
- FR3.6: Dark web monitoring
- FR3.7: Deepfake detection analysis
- FR3.8: Impersonation detection
- FR3.9: Scan scheduling (manual re-scan)
- FR3.10: Background continuous monitoring
- ARCH-4: Inngest background job orchestration
- ARCH-23-26: External service integrations
- NFR1.2: Initial scan completion < 5 minutes

---

### Epic 7: Threat Detection & Classification
**Goal:** Classify detected threats by severity and type, allowing users to understand and manage findings.

**User Outcome:** Detected threats are clearly classified (Critical/High/Medium/Low), users can view threat details, mark false positives, and see confidence scores.

**Requirements Covered:**
- FR4.1: Image match detection
- FR4.2: Deepfake/synthetic image detection
- FR4.3: Fake profile detection
- FR4.4: Breach exposure detection
- FR4.5: Privacy leak detection
- FR4.6: Severity classification
- FR4.7: Confidence scoring
- FR4.8: False positive marking
- FR4.9: Basic harassment indicator detection

---

### Epic 8: Alerts & Notifications
**Goal:** Deliver timely alerts through multiple channels with user-configurable preferences.

**User Outcome:** Users receive timely alerts via push, email, or in-app notifications. They can configure notification preferences, set quiet hours, and filter by severity.

**Requirements Covered:**
- FR5.1: Push notification support
- FR5.2: In-app notification center
- FR5.3: Email notification option
- FR5.4: SMS notification option
- FR5.5: Notification preferences configuration
- FR5.6: Severity-based notification filtering
- FR5.7: Quiet hours / Do not disturb
- FR5.8: Alert aggregation
- NFR1.4: Alert delivery latency < 1 minute for Critical

---

### Epic 9: Remediation & Actions
**Goal:** Guide users through resolving detected threats with step-by-step remediation workflows.

**User Outcome:** Users can follow guided remediation steps, mark actions as complete, capture evidence, and access platform reporting resources.

**Requirements Covered:**
- FR7.1: Guided remediation steps
- FR7.2: Step-by-step instructions
- FR7.3: Mark action as complete
- FR7.4: Platform reporting links
- FR7.5: One-click report generation
- FR7.6: Evidence screenshot capture
- FR7.7: Evidence export (PDF)
- FR7.8: Legal resource links

---

### Epic 10: AI Support Assistant
**Goal:** Provide an AI-powered assistant that helps users understand threats and take action.

**User Outcome:** Users can chat with an AI assistant for threat explanations, action guidance, emotional support, and crisis resource escalation.

**Requirements Covered:**
- FR8.1: Chat interface
- FR8.2: Natural language understanding
- FR8.3: Threat explanation
- FR8.4: Action guidance
- FR8.5: Emotional support responses
- FR8.6: Crisis resource escalation
- FR8.7: Conversation history
- FR8.8: Handoff to human support

---

### Epic 11: Support Resources & Help Center
**Goal:** Provide comprehensive help resources, safety guides, and crisis support information.

**User Outcome:** Users can access help center, FAQs, safety guides, crisis hotlines, and in-app tutorials.

**Requirements Covered:**
- FR9.1: Help center / FAQ
- FR9.2: Safety guides and articles
- FR9.3: Crisis hotline links
- FR9.4: External resource directory
- FR9.5: In-app tutorials

---

### Epic 12: Settings & Preferences
**Goal:** Allow users to manage their profile, monitored data, preferences, and exercise their data rights.

**User Outcome:** Users can manage profile, add/remove monitored data, configure notification preferences, adjust privacy settings, export data, and delete their account.

**Requirements Covered:**
- FR10.1: Profile management
- FR10.2: Monitored data management
- FR10.3: Notification preferences
- FR10.4: Privacy settings
- FR10.5: Subscription management
- FR10.6: Data export
- FR10.7: Account deletion
- NFR3.6: Right to deletion < 30 days
- NFR3.7: Data portability (export within 72 hours)

---

### Epic 13: Subscription & Payments
**Goal:** Implement subscription management with free trials, tier selection, and payment processing.

**User Outcome:** Users can start a free trial, select subscription tier, upgrade/downgrade, and manage billing through native iOS/Android payment flows.

**Requirements Covered:**
- FR11.1: Free trial initiation
- FR11.2: Trial expiration handling
- FR11.3: In-app purchase (iOS)
- FR11.4: Google Play billing (Android)
- FR11.5: Subscription tier selection
- FR11.6: Upgrade/downgrade flow
- FR11.7: Billing history
- FR11.8: Annual vs monthly toggle
- ARCH-5: RevenueCat integration
- ARCH-22: Subscription tier feature gating

---

## Epic 1: Foundation & Project Setup

**Goal:** Establish the development environment with core infrastructure, design tokens, database schema, and security foundations in place.

### Story 1.1: Initialize Project with Obytes Template

As a **developer**,
I want **the vara project initialized with the Obytes React Native template**,
So that **I have a production-ready foundation with TypeScript, navigation, and core patterns established**.

**Acceptance Criteria:**

**Given** the Obytes template is available
**When** I run `npx create-expo-app@latest vara-app --template https://github.com/obytes/react-native-template-obytes`
**Then** a new Expo project is created with TypeScript configured
**And** Expo Router file-based navigation is working
**And** React Query, Zustand, and react-hook-form are installed
**And** the project builds and runs on iOS simulator and Android emulator
**And** the project structure matches Architecture document specifications

---

### Story 1.2: Set Up Supabase Project & Local Development

As a **developer**,
I want **Supabase configured for local development and cloud deployment**,
So that **I can develop with a local database and deploy to staging/production environments**.

**Acceptance Criteria:**

**Given** Supabase CLI is installed
**When** I run `npx supabase init` and `npx supabase start`
**Then** local Supabase instance starts with PostgreSQL, Auth, Storage, and Realtime
**And** `supabase/config.toml` is configured correctly
**And** environment variables are set up for dev/staging/prod
**And** `.env.local` and `.env.example` files are created
**And** Supabase client can connect from the mobile app

---

### Story 1.3: Implement Design System Tokens

As a **developer**,
I want **vara's design system tokens implemented**,
So that **all UI components use consistent colors, typography, and spacing**.

**Acceptance Criteria:**

**Given** the UX Design specification defines the design system
**When** I create the design token files
**Then** color tokens are defined: cream (#FEFAF1), lavender (#D7CAE6), mint (#B1EFE3), coral (#FFAB91), charcoal (#1E1E1E)
**And** semantic color tokens map to light/dark mode variants
**And** Plus Jakarta Sans font is loaded and typography scale is defined (display, h1, h2, h3, body, body-small, caption)
**And** spacing tokens use 8px base unit (xs:4, sm:8, md:16, lg:24, xl:32, 2xl:48, 3xl:64)
**And** border radius and shadow tokens are defined
**And** tokens are exported from `src/lib/colors.ts` and related files

---

### Story 1.4: Create Core Database Schema & RLS Foundation

As a **developer**,
I want **the core database tables and Row Level Security policies created**,
So that **user data is stored securely with proper access controls from day one**.

**Acceptance Criteria:**

**Given** Supabase is configured
**When** I apply the initial migration
**Then** `users` table is created with: id, email, full_name, subscription_tier, onboarding_completed, created_at, updated_at
**And** `monitored_items` table is created with: id, user_id, item_type (enum: 'photo', 'email', 'phone', 'social_handle'), value, platform, storage_path, status, created_at, updated_at
**And** `audit_logs` table is created with: id, user_id, action, resource_type, resource_id, metadata, created_at
**And** subscription_tier enum is created: 'free', 'basic', 'premium', 'pro'
**And** RLS is enabled on all tables
**And** Base RLS policy ensures users can only read/update their own user record
**And** Monitored items RLS policy ensures users can only access their own items
**And** Audit logs are insert-only (no update/delete) with user_id enforced
**And** Storage bucket `user-photos` is created with encryption enabled
**And** Storage RLS policy restricts access to photo owner only

---

### Story 1.5: Configure Authentication Foundation

As a **developer**,
I want **Supabase Auth configured with email and social providers**,
So that **the authentication infrastructure is ready for the auth flow implementation**.

**Acceptance Criteria:**

**Given** Supabase project exists
**When** I configure authentication
**Then** Email/password auth provider is enabled
**And** Google OAuth provider is configured (with placeholder credentials for dev)
**And** Apple OAuth provider is configured (with placeholder credentials for dev)
**And** Email templates are customized with vara branding
**And** `src/store/auth-store.ts` is created with Zustand following Architecture patterns
**And** `src/lib/supabase.ts` initializes the Supabase client correctly
**And** Auth state changes are listened to and stored in Zustand
**And** Secure token storage uses react-native-mmkv

---

### Story 1.6: Set Up Observability & CI/CD

As a **developer**,
I want **error tracking, analytics, and CI/CD configured**,
So that **we can monitor app health and have automated quality checks**.

**Acceptance Criteria:**

**Given** the project is initialized
**When** I configure observability tools
**Then** Sentry SDK is installed and configured in `src/lib/sentry.ts`
**And** Sentry captures uncaught exceptions and errors
**And** PostHog SDK is installed and configured in `src/lib/posthog.ts`
**And** PostHog is initialized with appropriate API key per environment
**And** GitHub Actions workflow `.github/workflows/ci.yml` runs lint, type-check, and tests on PR
**And** EAS Build configuration is set up in `eas.json`
**And** Environment-specific builds are configured (development, preview, production)

---

## Epic 2: App Shell, Screens & Navigation

**Goal:** Create all app screens (shell versions) with working navigation so the complete user experience is visible and navigable.

### Story 2.1: Implement Tab Navigation & App Layout

As a **user**,
I want **to navigate between main app sections using a tab bar**,
So that **I can easily access Home, Monitor, Alerts, and Settings**.

**Acceptance Criteria:**

**Given** I am logged into the app
**When** the main app loads
**Then** a custom TabBar is displayed at the bottom with 4 tabs: Home, Monitor, Alerts, Settings
**And** each tab has an icon and label
**And** the active tab is visually highlighted
**And** tapping a tab navigates to that screen
**And** the TabBar follows vara's design system (charcoal background, mint active state)
**And** tab navigation state is preserved when switching tabs

---

### Story 2.2: Create Auth Flow Screens (Shell)

As a **user**,
I want **to see login, signup, and password reset screens**,
So that **I can understand the authentication flow**.

**Acceptance Criteria:**

**Given** I am not logged in
**When** I open the app
**Then** I see the Login screen with email/password fields and social login buttons
**And** I can navigate to the Signup screen
**And** I can navigate to the Forgot Password screen
**And** screens use vara's design system (colors, typography, spacing)
**And** all screens have proper safe area handling
**And** screens are shell versions (forms visible but not functional yet)

---

### Story 2.3: Create Onboarding Flow Screens (Shell)

As a **new user**,
I want **to see the onboarding screens**,
So that **I understand the setup process**.

**Acceptance Criteria:**

**Given** I am a new user who just signed up
**When** I go through onboarding
**Then** I see the Welcome screen with value proposition
**And** I see the Permissions screen explaining camera and notification access
**And** I see the Add Photos screen with upload/capture UI
**And** I see the Add Info screen for name and social handles
**And** I see the First Scan screen with scan initiation UI
**And** screens can be navigated through in sequence
**And** all screens follow vara's design system

---

### Story 2.4: Create Home Screen with StatusCircle Component

As a **user**,
I want **to see my protection status at a glance on the home screen**,
So that **I can quickly confirm I'm protected**.

**Acceptance Criteria:**

**Given** I am on the Home tab
**When** the screen loads
**Then** I see a large StatusCircle component in the hero area
**And** the StatusCircle displays with mint glow effect when status is "protected"
**And** the StatusCircle shows different states: protected, attention, critical, scanning
**And** the glow animation pulses subtly every 4 seconds
**And** below the StatusCircle are SummaryCard components (mock data)
**And** summary cards show: Images Monitored, Active Alerts, Last Scan
**And** the screen is glanceable (status comprehensible in < 2 seconds)
**And** the screen follows the "Minimal Zen with Glow" design direction

---

### Story 2.5: Create Monitor Screen (Shell)

As a **user**,
I want **to see what items are being monitored**,
So that **I can review my protected photos and accounts**.

**Acceptance Criteria:**

**Given** I am on the Monitor tab
**When** the screen loads
**Then** I see a grid of ImageThumbnail components showing monitored photos (mock data)
**And** I see a list of linked accounts/social handles
**And** each photo thumbnail shows a small status indicator
**And** there is an "Add" button to add more photos or accounts
**And** tapping a photo navigates to image detail screen
**And** the screen follows vara's design system

---

### Story 2.6: Create Alerts Screen (Shell)

As a **user**,
I want **to see my threat alerts**,
So that **I can review and act on detected issues**.

**Acceptance Criteria:**

**Given** I am on the Alerts tab
**When** the screen loads
**Then** I see a list of AlertCard components (mock data)
**And** each AlertCard shows: title, description, severity badge, timestamp, status
**And** severity badges use correct colors (mint=low, coral=medium, red=critical)
**And** tapping an alert navigates to the threat detail screen
**And** there is an empty state when no alerts exist
**And** the screen follows vara's design system

---

### Story 2.7: Create Settings Screen (Shell)

As a **user**,
I want **to access app settings**,
So that **I can manage my account and preferences**.

**Acceptance Criteria:**

**Given** I am on the Settings tab
**When** the screen loads
**Then** I see grouped settings rows: Account, Notifications, Privacy, Subscription, Support, About
**And** each settings row is tappable and navigates to the appropriate screen
**And** I see my profile summary at the top (name, email, subscription tier)
**And** there is a "Sign Out" option
**And** the screen follows vara's design system

---

### Story 2.8: Create Threat Detail Screen (Shell)

As a **user**,
I want **to see detailed information about a detected threat**,
So that **I can understand what was found and what to do**.

**Acceptance Criteria:**

**Given** I tapped on an alert from the Alerts screen
**When** the threat detail screen loads
**Then** I see the threat title, severity, and detection date
**And** I see a ContentBlur component covering sensitive content (blurred by default)
**And** tapping the blurred content reveals it (with consent logged)
**And** I see the threat source/location information
**And** I see recommended actions as ActionButton components
**And** I can mark the threat as resolved or false positive
**And** there is a back button to return to alerts
**And** the screen follows trauma-informed design principles

---

### Story 2.9: Create Scan Progress Screen (Shell)

As a **user**,
I want **to see scan progress when a scan is running**,
So that **I know what's being checked and how long it will take**.

**Acceptance Criteria:**

**Given** a scan is initiated
**When** I view the scan progress screen
**Then** I see a ProgressRing component showing overall progress
**And** I see a list of scan sources being checked (e.g., "Checking image databases...", "Scanning social platforms...")
**And** each source shows its individual status (pending, in-progress, complete)
**And** I see estimated time remaining
**And** the UI updates in real-time (mock updates for now)
**And** I can see results as they come in
**And** the screen follows vara's design system

---

### Story 2.10: Create AI Assistant Screen (Shell)

As a **user**,
I want **to access the AI support assistant**,
So that **I can get help understanding threats and taking action**.

**Acceptance Criteria:**

**Given** I navigate to the AI Assistant
**When** the screen loads
**Then** I see a chat interface with message bubbles
**And** I see a text input field at the bottom
**And** I see quick action suggestions (e.g., "Explain this threat", "What should I do?")
**And** mock messages demonstrate the conversation flow
**And** the interface handles keyboard properly
**And** the screen follows vara's design system

---

### Story 2.11: Create Subscription Screen (Shell)

As a **user**,
I want **to see subscription plan options**,
So that **I can choose the right protection level**.

**Acceptance Criteria:**

**Given** I navigate to subscription management
**When** the screen loads
**Then** I see plan cards for Basic, Premium, and Pro tiers
**And** each plan shows price, features included, and a select button
**And** the current plan is highlighted
**And** I can toggle between monthly and annual pricing
**And** tapping a plan initiates the upgrade flow (mock for now)
**And** the screen follows vara's design system

---

### Story 2.12: Build Status & Feedback Components

As a **developer**,
I want **status indication and feedback components built**,
So that **users can understand protection status and progress at a glance**.

**Acceptance Criteria:**

**Given** the design system tokens exist
**When** I build the status components
**Then** `StatusCircle` component exists with protected/attention/critical/scanning variants
**And** StatusCircle implements glow pulse animation (subtle pulse every 4 seconds)
**And** StatusCircle respects prefers-reduced-motion setting (UX-22)
**And** `SeverityBadge` component exists with low/medium/high/critical variants using correct colors
**And** `ProgressRing` component exists with percentage display and smooth animation
**And** all components meet WCAG 2.1 AA color contrast requirements
**And** all touch targets are minimum 44x44pt
**And** components are exported from `src/components/ui/index.ts`

---

### Story 2.13: Build Content Display Components

As a **developer**,
I want **content display components built**,
So that **information is presented consistently across the app**.

**Acceptance Criteria:**

**Given** the design system tokens exist
**When** I build the content components
**Then** `SummaryCard` component exists with value, label, icon, and optional status indicator
**And** `AlertCard` component exists with title, description, severity badge, timestamp, and status
**And** `ContentBlur` component exists with configurable blur amount (default 20px)
**And** ContentBlur implements tap-to-reveal with consent callback
**And** ContentBlur animation transitions blur 20px → 0px over 200ms (UX-21)
**And** `ImageThumbnail` component exists with status indicator overlay
**And** all components meet WCAG 2.1 AA accessibility requirements
**And** components are exported from `src/components/ui/index.ts`

---

### Story 2.14: Build Interactive & Utility Components

As a **developer**,
I want **interactive and utility components built**,
So that **common UI patterns are reusable across screens**.

**Acceptance Criteria:**

**Given** the design system tokens exist
**When** I build the interactive components
**Then** `ActionButton` component exists with primary/secondary/danger/ghost variants
**And** ActionButton supports loading state and disabled state
**And** `EmptyState` component exists with icon, title, description, and optional action button
**And** `Skeleton` component exists for loading states with shimmer animation
**And** `BottomSheet` modal component exists with drag-to-dismiss
**And** all interactive components provide haptic feedback on press (UX-16)
**And** all touch targets are minimum 44x44pt
**And** components are exported from `src/components/ui/index.ts`

---

## Epic 3: User Authentication & Account

**Goal:** Implement complete authentication flow including registration, login, social auth, biometrics, and account management.

### Story 3.1: Implement Email/Password Registration

As a **new user**,
I want **to create an account with my email and password**,
So that **I can start using vara's protection services**.

**Acceptance Criteria:**

**Given** I am on the signup screen
**When** I enter a valid email and password (min 8 chars, 1 uppercase, 1 number)
**Then** my account is created in Supabase Auth
**And** a verification email is sent to my email address
**And** I see a confirmation screen asking me to verify my email
**And** my user record is created in the `users` table
**And** an audit log entry is created for the registration
**And** validation errors are shown inline for invalid inputs
**And** loading state is shown during registration

---

### Story 3.2: Implement Email Verification Flow

As a **new user**,
I want **to verify my email address**,
So that **my account is fully activated**.

**Acceptance Criteria:**

**Given** I received a verification email
**When** I click the verification link
**Then** my email is marked as verified in Supabase Auth
**And** I am redirected to the app (deep link handling)
**And** the app recognizes my verified status
**And** I can proceed to onboarding
**And** an audit log entry is created for verification

---

### Story 3.3: Implement Email/Password Login

As a **returning user**,
I want **to log in with my email and password**,
So that **I can access my protected account**.

**Acceptance Criteria:**

**Given** I am on the login screen
**When** I enter my valid email and password
**Then** I am authenticated via Supabase Auth
**And** my session token is stored securely in MMKV
**And** I am navigated to the main app (Home tab)
**And** my auth state is updated in the Zustand store
**And** an audit log entry is created for login
**And** invalid credentials show an error message
**And** loading state is shown during login

---

### Story 3.4: Implement Google OAuth Login

As a **user**,
I want **to sign in with my Google account**,
So that **I can register/login quickly using my existing Google identity**.

**Acceptance Criteria:**

**Given** I am on the login or signup screen
**When** I tap "Continue with Google"
**Then** the Google OAuth flow is initiated via expo-auth-session
**And** Google Sign-In native UI is presented
**And** upon successful auth, my account is created in Supabase or linked if exists
**And** my session token is stored securely in MMKV
**And** I am navigated to the appropriate screen (onboarding for new, home for returning)
**And** an audit log entry is created for the login/registration
**And** OAuth errors show user-friendly messages (e.g., "Sign in cancelled", "Network error")
**And** loading state is shown during authentication

---

### Story 3.5: Implement Apple Sign-In

As a **user**,
I want **to sign in with my Apple ID**,
So that **I can register/login quickly with privacy-focused Apple authentication**.

**Acceptance Criteria:**

**Given** I am on the login or signup screen (iOS device)
**When** I tap "Continue with Apple"
**Then** the Apple Sign-In native flow is initiated via expo-apple-authentication
**And** Apple's authentication UI is presented with Face ID/Touch ID option
**And** upon successful auth, my account is created in Supabase or linked if exists
**And** Apple's "Hide My Email" relay addresses are handled correctly
**And** my session token is stored securely in MMKV
**And** I am navigated to the appropriate screen (onboarding for new, home for returning)
**And** an audit log entry is created for the login/registration
**And** Apple Sign-In button follows Apple's Human Interface Guidelines
**And** loading state is shown during authentication

---

### Story 3.6: Implement Password Reset Flow

As a **user who forgot my password**,
I want **to reset my password via email**,
So that **I can regain access to my account**.

**Acceptance Criteria:**

**Given** I am on the forgot password screen
**When** I enter my email and tap "Send Reset Link"
**Then** a password reset email is sent via Supabase
**And** I see a confirmation message
**When** I click the reset link in the email
**Then** I am taken to a password reset screen in the app
**And** I can enter a new password
**And** my password is updated
**And** I am logged in automatically
**And** an audit log entry is created for password reset

---

### Story 3.7: Implement Biometric Authentication

As a **user**,
I want **to unlock the app with Face ID or fingerprint**,
So that **I can access my account quickly and securely**.

**Acceptance Criteria:**

**Given** biometric auth is available on my device
**When** I enable biometric login in settings
**Then** my preference is stored securely
**When** I open the app subsequently
**Then** I am prompted for biometric authentication
**And** successful biometric auth logs me in
**And** failed biometric falls back to password entry
**And** biometric setting can be toggled on/off
**And** expo-local-authentication is used for biometric prompts

---

### Story 3.8: Implement Account Deletion

As a **user**,
I want **to delete my account and all my data**,
So that **I can exercise my right to be forgotten (GDPR/CCPA)**.

**Acceptance Criteria:**

**Given** I am logged in and in Settings
**When** I tap "Delete Account"
**Then** I see a confirmation dialog explaining what will be deleted
**And** I must type "DELETE" to confirm
**When** I confirm deletion
**Then** my user record is marked for deletion
**And** my photos are deleted from storage
**And** my session is terminated
**And** I am logged out and returned to login screen
**And** an audit log entry is created for deletion request
**And** actual deletion completes within 30 days (NFR3.6)

---

### Story 3.9: Implement Two-Factor Authentication

As a **user**,
I want **to enable two-factor authentication on my account**,
So that **my account has an additional layer of security**.

**Acceptance Criteria:**

**Given** I am logged in and in Settings > Security
**When** I tap "Enable Two-Factor Authentication"
**Then** I see options for TOTP (authenticator app) setup
**And** I can scan a QR code with my authenticator app (Google Authenticator, Authy, etc.)
**And** I must enter a verification code to confirm setup
**And** backup codes are generated and shown for account recovery
**And** backup codes can be copied or downloaded
**And** 2FA status is stored in user profile
**When** I log in with 2FA enabled
**Then** after entering password, I am prompted for 2FA code
**And** I can enter code from authenticator app
**And** I can use a backup code if I don't have access to app
**And** successful 2FA verification completes login
**And** failed 2FA attempts are logged in audit_logs
**And** I can disable 2FA from settings (requires current 2FA code)

---

## Epic 4: Onboarding & Data Collection

**Goal:** Guide new users through initial setup, collecting the information needed for protection monitoring.

### Story 4.1: Implement Welcome & Value Proposition Screen

As a **new user**,
I want **to understand what vara does when I first open the app**,
So that **I'm motivated to complete setup**.

**Acceptance Criteria:**

**Given** I just signed up and verified my email
**When** I enter the onboarding flow
**Then** I see the Welcome screen with vara's value proposition
**And** I see key benefits: Discover exposure, Monitor threats, Respond with guidance
**And** there is a clear "Get Started" CTA button
**And** the screen uses vara's brand aesthetic (calm, protective)
**And** tapping "Get Started" advances to the next onboarding step

---

### Story 4.2: Implement Permissions Request Screen

As a **new user**,
I want **to understand why vara needs certain permissions**,
So that **I can grant them confidently**.

**Acceptance Criteria:**

**Given** I am in the onboarding flow after welcome
**When** I reach the permissions screen
**Then** I see explanations for why camera access is needed (photo capture)
**And** I see explanations for why notification access is needed (alerts)
**And** each permission has a clear "Allow" button
**And** tapping "Allow" triggers the native permission dialog
**And** I can skip optional permissions and proceed
**And** permission status is tracked for later prompts
**And** denied permissions show alternative messaging

---

### Story 4.3: Implement Name & Profile Input

As a **new user**,
I want **to provide my name information**,
So that **vara can monitor for my identity**.

**Acceptance Criteria:**

**Given** I am in the onboarding flow
**When** I reach the name input screen
**Then** I see fields for: First Name, Last Name, Maiden Name (optional), Aliases (optional)
**And** I see an explanation of why this information helps with monitoring
**And** validation ensures first name is provided
**And** "Skip/Later" option is available for optional fields (FR2.9)
**And** submitting saves to my user profile in database
**And** I can proceed to the next step

---

### Story 4.4: Implement Photo Upload

As a **new user**,
I want **to upload photos of myself for monitoring**,
So that **vara can detect if my images appear online without consent**.

**Acceptance Criteria:**

**Given** I am on the photo upload screen
**When** I tap "Upload Photos"
**Then** I can select 1-10 photos from my device library
**And** selected photos show as thumbnails with remove option
**When** I tap "Take Photo"
**Then** the camera opens for me to capture a photo
**And** captured photos are added to the selection
**And** I see an explanation of how photos will be used (FR2.8)
**And** photos are uploaded to Supabase Storage (encrypted bucket)
**And** `monitored_items` records are created for each photo
**And** I can proceed with at least 1 photo uploaded
**And** upload progress is shown for each photo

---

### Story 4.5: Implement Social Media Handle Input

As a **new user**,
I want **to provide my social media handles**,
So that **vara can monitor for impersonation**.

**Acceptance Criteria:**

**Given** I am on the social handles screen
**When** I see the input form
**Then** I see fields for common platforms: Instagram, TikTok, Twitter/X, Facebook, LinkedIn
**And** I can add handles for multiple platforms
**And** I see an explanation of why this helps with impersonation detection
**And** validation checks for valid handle format (@ prefix optional)
**And** I can skip this step and add later (FR2.9)
**And** handles are saved to `monitored_items` table
**And** I can proceed to the next step

---

### Story 4.6: Implement Email/Phone Input for Breach Monitoring

As a **new user**,
I want **to provide additional emails and phone numbers**,
So that **vara can check if they've been exposed in data breaches**.

**Acceptance Criteria:**

**Given** I am on the breach monitoring input screen
**When** I see the form
**Then** I can add additional email addresses (FR2.5)
**And** Premium+ users can add phone numbers (FR2.6)
**And** I see clear explanation of breach monitoring
**And** non-Premium users see upgrade prompt for phone monitoring
**And** inputs are validated (email format, phone format)
**And** data is saved to `monitored_items` table
**And** I can skip and add later
**And** I can proceed to initiate first scan

---

### Story 4.7: Implement First Scan Initiation

As a **new user**,
I want **to start my first scan after completing onboarding**,
So that **I can immediately discover any existing exposure**.

**Acceptance Criteria:**

**Given** I have completed data collection in onboarding
**When** I reach the first scan screen
**Then** I see a summary of what will be scanned (photos, handles, emails)
**And** I see a "Start Scan" button
**When** I tap "Start Scan"
**Then** a scan job is created in the database
**And** I am navigated to the scan progress screen
**And** onboarding is marked as complete in my user profile
**And** subsequent app opens go directly to Home (not onboarding)

---

## Epic 5: Dashboard & Protection Status

**Goal:** Display protection status and monitoring summary so users can check their safety at a glance.

### Story 5.1: Implement Real Protection Status Display

As a **user**,
I want **to see my actual protection status on the home screen**,
So that **I know if I'm protected or if action is needed**.

**Acceptance Criteria:**

**Given** I am on the Home screen
**When** the screen loads
**Then** my protection status is fetched from the database
**And** StatusCircle displays "protected" (mint) if no unresolved threats
**And** StatusCircle displays "attention" (coral) if medium/low threats exist
**And** StatusCircle displays "critical" (red) if critical/high threats exist
**And** status is comprehensible in under 2 seconds (glanceable)
**And** status updates in real-time via Supabase Realtime subscription
**And** loading shows skeleton state, not blank screen

---

### Story 5.2: Implement Dashboard Summary Cards

As a **user**,
I want **to see key metrics at a glance**,
So that **I understand my monitoring coverage and activity**.

**Acceptance Criteria:**

**Given** I am on the Home screen
**When** summary data loads
**Then** I see "Images Monitored" count from `monitored_items`
**And** I see "Active Alerts" count of unresolved threats
**And** I see "Last Scan" timestamp
**And** tapping a card navigates to the relevant detail screen
**And** cards update when underlying data changes
**And** empty states handled gracefully (e.g., "No scans yet")

---

### Story 5.3: Implement Recent Findings Display

As a **user**,
I want **to see recent threat findings on my dashboard**,
So that **I can quickly review new discoveries**.

**Acceptance Criteria:**

**Given** I am on the Home screen
**When** I scroll below the summary cards
**Then** I see a "Recent Findings" section
**And** the 3 most recent threats are shown as compact AlertCards
**And** each card shows threat title, severity, and time
**And** tapping a finding navigates to threat detail
**And** "View All" link navigates to Alerts tab
**And** empty state shows "No findings yet - you're all clear!"

---

### Story 5.4: Implement Action Items Display

As a **user**,
I want **to see what actions I need to take**,
So that **I can address outstanding issues**.

**Acceptance Criteria:**

**Given** I am on the Home screen
**When** there are pending actions
**Then** I see an "Action Required" section
**And** actions are prioritized by severity
**And** each action item shows what needs to be done
**And** tapping an action navigates to the relevant threat/remediation
**And** completed actions are removed from the list
**And** section is hidden when no actions are pending

---

### Story 5.5: Implement Threat History View

As a **user**,
I want **to see my complete threat history**,
So that **I can review past findings and resolutions**.

**Acceptance Criteria:**

**Given** I navigate to threat history (from dashboard or settings)
**When** the history screen loads
**Then** I see all threats sorted by date (newest first)
**And** I can filter by status: All, Active, Resolved, False Positive
**And** I can filter by severity: All, Critical, High, Medium, Low
**And** each entry shows threat summary with status indicator
**And** tapping an entry opens threat detail
**And** pagination/infinite scroll handles large histories

---

## Epic 6: Scanning Engine & Real-Time Progress

**Goal:** Implement the core scanning functionality with real-time progress streaming, external service integrations, and tiered monitoring capabilities (deepfake detection for Premium+, dark web monitoring for Pro).

### Story 6.1: Create Scan Infrastructure & Database Schema

As a **developer**,
I want **the scan-related database tables and types created**,
So that **scan jobs can be tracked and results stored**.

**Acceptance Criteria:**

**Given** the core database schema exists
**When** I apply the scan migration
**Then** `scans` table is created with: id, user_id, status, scan_type, started_at, completed_at, progress, results_summary
**And** `scan_progress` table is created with: id, scan_id, source, status, message, started_at, completed_at
**And** scan_status enum is created: 'pending', 'in_progress', 'completed', 'failed'
**And** scan_source enum is created: 'hibp', 'image_search', 'social_scan', 'deepfake', 'dark_web'
**And** RLS policies ensure users can only access their own scans
**And** Supabase Realtime is enabled for scan_progress table

---

### Story 6.2: Implement Scan Initiation Edge Function

As a **user**,
I want **to start a scan from the app**,
So that **my monitored items are checked for exposure**.

**Acceptance Criteria:**

**Given** I tap "Start Scan" in the app
**When** the request is sent
**Then** Edge Function `start-scan` validates the user is authenticated
**And** a scan record is created with status 'pending'
**And** scan_progress records are created for each source
**And** an Inngest event `scan/started` is emitted
**And** the scan ID is returned to the client
**And** the client subscribes to real-time updates for this scan

---

### Story 6.3: Implement Inngest Scan Workflow

As a **developer**,
I want **scans orchestrated via Inngest**,
So that **scan steps are reliable, retriable, and observable**.

**Acceptance Criteria:**

**Given** a `scan/started` event is received
**When** Inngest processes the workflow
**Then** scan status is updated to 'in_progress'
**And** each scan source is processed as a separate step
**And** steps have appropriate timeouts (3-5s) and retries (2-3)
**And** step completion updates scan_progress table
**And** parallel steps run concurrently where possible
**And** failures are handled gracefully with partial results
**And** scan status is updated to 'completed' when all steps finish

---

### Story 6.4: Implement Real-Time Scan Progress Display

As a **user**,
I want **to see scan progress updating in real-time**,
So that **I know what's being checked and feel confident in the process**.

**Acceptance Criteria:**

**Given** I initiated a scan
**When** I'm on the scan progress screen
**Then** I see overall progress percentage updating
**And** I see each source with its status (pending, checking, complete, failed)
**And** I see friendly messages like "Checking breach databases...", "Scanning social platforms..."
**And** updates arrive via Supabase Realtime (not polling)
**And** completed sources show checkmarks
**And** failed sources show retry option
**And** scan completion navigates to results

---

### Story 6.5: Integrate Have I Been Pwned API

As a **system**,
I want **to check user emails against HIBP**,
So that **breach exposures are detected**.

**Acceptance Criteria:**

**Given** user has emails in monitored_items
**When** the HIBP scan step executes
**Then** each email is checked via HIBP API
**And** API rate limits are respected
**And** breach results are stored in threats table
**And** breaches include: source, date, data types exposed
**And** circuit breaker handles API failures gracefully
**And** cached results are used if available and recent

---

### Story 6.6: Integrate TinEye Reverse Image Search

As a **system**,
I want **to search for user photos via TinEye API**,
So that **image scraping and unauthorized use are detected**.

**Acceptance Criteria:**

**Given** user has photos in monitored_items
**When** the TinEye scan step executes
**Then** each photo is submitted to TinEye reverse image search API
**And** API authentication uses secure environment variables
**And** matches are returned with source URLs and match percentages
**And** results include image dimensions and crawl dates
**And** circuit breaker pattern is implemented (ARCH-15): 5 failures → open circuit for 30s
**And** request timeout is 10 seconds per image
**And** results are stored in threats table with type 'image_match'
**And** API rate limits are respected (queue with delays if needed)
**And** partial results are saved if some searches fail

---

### Story 6.7: Integrate Google Cloud Vision Image Search

As a **system**,
I want **Google Vision as secondary image search**,
So that **broader web coverage supplements TinEye results**.

**Acceptance Criteria:**

**Given** user has photos in monitored_items
**When** the Google Vision scan step executes
**Then** each photo is analyzed via Google Cloud Vision API
**And** web detection feature returns pages and URLs containing similar images
**And** results are deduplicated against TinEye findings
**And** circuit breaker pattern is implemented: 5 failures → open circuit for 30s
**And** request timeout is 15 seconds per image
**And** results are stored in threats table with type 'image_match'
**And** this step runs in parallel with TinEye (not sequentially)
**And** partial results are saved if some searches fail

---

### Story 6.8: Implement Deepfake Detection Analysis (Premium+)

As a **Premium or Pro user**,
I want **my photos analyzed for deepfake/synthetic manipulation**,
So that **I'm alerted if my likeness is used in AI-generated content**.

**Acceptance Criteria:**

**Given** user is Premium or Pro tier with photos in monitored_items
**When** the deepfake detection step executes
**Then** photos are analyzed via deepfake detection service (e.g., Sensity, Microsoft Video Authenticator API)
**And** analysis checks for: face manipulation, AI generation artifacts, inconsistent lighting/shadows
**And** confidence score (0-100) indicates likelihood of synthetic content
**And** results above 70% confidence are flagged as threats
**And** threats are stored with type 'deepfake' and severity 'critical'
**And** circuit breaker pattern is implemented for API failures
**And** this feature is gated: Basic users see upgrade prompt
**And** processing respects scan timeout limits

---

### Story 6.9: Implement Dark Web Monitoring (Pro)

As a **Pro user**,
I want **dark web monitoring for my personal information**,
So that **I'm alerted if my data appears on dark web marketplaces**.

**Acceptance Criteria:**

**Given** user is Pro tier with emails/phone numbers in monitored_items
**When** the dark web scan step executes
**Then** user's emails and phone numbers are checked against dark web intelligence feeds
**And** dark web monitoring service integration (e.g., SpyCloud, Have I Been Pwned Premium)
**And** results include: marketplace name, data type found, date discovered
**And** threats are stored with type 'breach' and appropriate severity
**And** severity is 'critical' for financial data, 'high' for PII
**And** circuit breaker pattern handles service failures
**And** this feature is gated: Basic/Premium users see upgrade prompt
**And** results are cached to avoid redundant API calls

---

### Story 6.10: Implement Basic Impersonation Detection

As a **system**,
I want **to check for fake profiles using user's identity**,
So that **impersonation attempts are detected**.

**Acceptance Criteria:**

**Given** user has social handles in monitored_items
**When** the social scan step executes
**Then** public profile data is checked for the user's name/photos
**And** similar profiles on other platforms are flagged
**And** name variations are considered
**And** results include profile links and screenshots
**And** findings are stored in threats table with impersonation type

---

### Story 6.11: Implement Scan Results Processing

As a **user**,
I want **scan results aggregated and classified**,
So that **I understand what was found**.

**Acceptance Criteria:**

**Given** a scan completes
**When** results are processed
**Then** all findings are stored in threats table with proper classification
**And** severity is calculated based on threat type and confidence
**And** duplicate findings are deduplicated
**And** scan summary is updated (total findings, by severity)
**And** user protection status is recalculated
**And** alerts are generated for new findings

---

### Story 6.12: Implement Manual Re-scan Capability

As a **user**,
I want **to manually trigger a new scan**,
So that **I can check for new threats on demand**.

**Acceptance Criteria:**

**Given** I am on the dashboard or monitor screen
**When** I tap "Scan Now" or "Re-scan"
**Then** a new scan is initiated for all my monitored items
**And** if a scan is already in progress, I see that status instead
**And** scan frequency limits are enforced based on my tier
**And** Basic users can scan weekly, Premium daily, Pro unlimited
**And** exceeded limits show upgrade prompt

---

### Story 6.13: Implement Background Monitoring (Premium+)

As a **Premium/Pro user**,
I want **continuous background monitoring**,
So that **new threats are detected automatically**.

**Acceptance Criteria:**

**Given** I am a Premium or Pro subscriber
**When** my monitoring schedule triggers
**Then** an automated scan runs without manual initiation
**And** Premium users get daily scans
**And** Pro users get real-time/frequent scans
**And** new findings generate push notifications
**And** monitoring status shows on dashboard
**And** basic users see upgrade prompt for background monitoring

---

## Epic 7: Threat Detection & Classification

**Goal:** Classify detected threats by severity and type, allowing users to understand and manage findings.

### Story 7.1: Create Threats Database Schema

As a **developer**,
I want **the threats table and related schema created**,
So that **detected threats can be stored and classified**.

**Acceptance Criteria:**

**Given** the database exists
**When** I apply the threats migration
**Then** `threats` table is created with: id, user_id, scan_id, type, severity, status, title, description, source_url, evidence_urls, confidence_score, detected_at, resolved_at, metadata
**And** threat_type enum: 'image_match', 'deepfake', 'impersonation', 'breach', 'privacy_leak', 'harassment'
**And** threat_severity enum: 'critical', 'high', 'medium', 'low'
**And** threat_status enum: 'new', 'viewed', 'in_progress', 'resolved', 'false_positive'
**And** RLS policies restrict access to owner only
**And** Realtime is enabled for threats table

---

### Story 7.2: Implement Threat Classification Logic

As a **system**,
I want **threats automatically classified by severity**,
So that **users can prioritize their response**.

**Acceptance Criteria:**

**Given** a new threat is detected
**When** classification runs
**Then** severity is assigned based on threat type and context
**And** Critical: deepfakes, non-consensual intimate images, active harassment
**And** High: identity theft, major breaches with sensitive data
**And** Medium: impersonation attempts, minor breaches, image scraping
**And** Low: old breaches, low-confidence matches
**And** confidence score (0-100) reflects detection certainty
**And** classification logic is documented and auditable

---

### Story 7.3: Implement Threat Detail View

As a **user**,
I want **to see full details of a detected threat**,
So that **I understand what was found and where**.

**Acceptance Criteria:**

**Given** I tap on a threat from alerts
**When** the threat detail screen loads
**Then** I see threat title, type, and severity prominently
**And** I see when it was detected and by which scan
**And** I see the source URL where the threat was found
**And** sensitive content is blurred with ContentBlur component
**And** I can tap to reveal sensitive content (consent logged)
**And** I see confidence score with explanation
**And** threat status is shown (new, viewed, resolved, etc.)

---

### Story 7.4: Implement False Positive Marking

As a **user**,
I want **to mark a finding as a false positive**,
So that **it doesn't continue to affect my protection status**.

**Acceptance Criteria:**

**Given** I am viewing a threat detail
**When** I tap "Mark as False Positive"
**Then** I see a confirmation dialog asking for reason (optional)
**And** upon confirmation, threat status is set to 'false_positive'
**And** protection status is recalculated (false positives don't count)
**And** false positives are hidden from active alerts by default
**And** I can view false positives in filtered history
**And** audit log records the action

---

### Story 7.5: Implement Threat Status Updates

As a **user**,
I want **threat status to update as I interact with it**,
So that **I can track my progress addressing issues**.

**Acceptance Criteria:**

**Given** a new threat exists
**When** I view the threat detail
**Then** status changes from 'new' to 'viewed'
**When** I start remediation actions
**Then** status can be set to 'in_progress'
**When** I complete remediation
**Then** status is set to 'resolved'
**And** all status changes are logged in audit_logs
**And** status updates reflect in protection status calculation

---

## Epic 8: Alerts & Notifications

**Goal:** Deliver timely alerts through multiple channels with user-configurable preferences.

### Story 8.1: Implement Push Notification Infrastructure

As a **developer**,
I want **push notification infrastructure configured**,
So that **users can receive alerts on their devices**.

**Acceptance Criteria:**

**Given** Expo Push Notifications service
**When** configuration is complete
**Then** push tokens are collected and stored for each user
**And** tokens are updated when they change
**And** `src/hooks/use-push-notifications.ts` handles registration
**And** notification permissions are requested appropriately
**And** tokens are associated with user in database

---

### Story 8.2: Implement Threat Alert Notifications

As a **user**,
I want **to receive push notifications when threats are detected**,
So that **I'm informed promptly about potential issues**.

**Acceptance Criteria:**

**Given** a new threat is detected during a scan
**When** the threat is classified
**Then** a push notification is sent to the user
**And** notification title reflects severity (e.g., "Critical Alert" vs "New Finding")
**And** notification body is informative but calm
**And** tapping notification opens threat detail screen
**And** Critical alerts are sent immediately (< 1 minute NFR1.4)
**And** low-severity alerts may be batched

---

### Story 8.3: Implement In-App Notification Center

As a **user**,
I want **an in-app notification center**,
So that **I can review all alerts even if I missed push notifications**.

**Acceptance Criteria:**

**Given** I have received alerts
**When** I access the notification center (Alerts tab)
**Then** I see all notifications sorted by date
**And** unread notifications are visually distinct
**And** I can mark notifications as read
**And** I can clear/dismiss notifications
**And** notification count badge shows on Alerts tab
**And** empty state shows when no notifications exist

---

### Story 8.4: Implement Email Notifications

As a **user**,
I want **to receive email notifications for alerts**,
So that **I'm notified even when not using the app**.

**Acceptance Criteria:**

**Given** email notifications are enabled in my settings
**When** a threat is detected
**Then** an email is sent to my registered email
**And** email uses vara branding and formatting
**And** email includes threat summary and link to app
**And** email respects severity filtering preferences
**And** emails are sent via Supabase Edge Function

---

### Story 8.5: Implement Notification Preferences

As a **user**,
I want **to configure my notification preferences**,
So that **I control how and when I'm notified**.

**Acceptance Criteria:**

**Given** I am in Settings > Notifications
**When** I view notification settings
**Then** I can toggle push notifications on/off
**And** I can toggle email notifications on/off
**And** I can filter by severity (e.g., "Only Critical and High")
**And** I can set quiet hours (e.g., 10pm - 8am)
**And** Premium+ users can enable SMS notifications
**And** settings are saved to database and respected

---

### Story 8.6: Implement Alert Aggregation

As a **user**,
I want **low-severity alerts batched together**,
So that **I'm not overwhelmed by many minor notifications**.

**Acceptance Criteria:**

**Given** multiple low-severity threats are detected
**When** notification logic runs
**Then** low-severity alerts are grouped into a digest
**And** digest is sent at most once per day
**And** digest summary shows count and types of findings
**And** critical/high alerts are never batched
**And** tapping digest opens alerts list

---

### Story 8.7: Implement SMS Notification Option (Premium+)

As a **Premium or Pro user**,
I want **to receive SMS notifications for critical alerts**,
So that **I'm notified immediately even when I don't have internet or the app**.

**Acceptance Criteria:**

**Given** I am a Premium or Pro subscriber in Settings > Notifications
**When** I enable SMS notifications
**Then** I can enter and verify my phone number
**And** phone number verification requires entering a code sent via SMS
**And** verified phone number is stored securely
**And** I can choose which severities trigger SMS (default: Critical only)
**When** a Critical alert is detected
**Then** an SMS is sent to my verified number via Twilio/similar service
**And** SMS message is concise: "vara Alert: [severity] - [brief description]. Open app for details."
**And** SMS delivery is logged
**And** SMS rate limiting prevents spam (max 5 per hour)
**And** this feature is gated to Premium+ users
**And** Basic users see upgrade prompt when attempting to enable
**And** I can disable SMS notifications at any time
**And** unverified numbers do not receive SMS

---

## Epic 9: Remediation & Actions

**Goal:** Guide users through resolving detected threats with step-by-step remediation workflows.

### Story 9.1: Create Remediation Content Database

As a **developer**,
I want **remediation steps stored in the database**,
So that **guidance can be dynamically served and updated**.

**Acceptance Criteria:**

**Given** the database exists
**When** I apply the remediation migration
**Then** `remediation_templates` table is created with: id, threat_type, step_order, title, description, action_type, external_link, is_automated
**And** initial templates are seeded for each threat type
**And** templates include: report to platform, contact support, collect evidence, legal resources
**And** steps are ordered logically for each threat type

---

### Story 9.2: Implement Guided Remediation Steps

As a **user**,
I want **to see step-by-step instructions for addressing a threat**,
So that **I know exactly what to do**.

**Acceptance Criteria:**

**Given** I am viewing a threat detail
**When** I tap "Take Action" or scroll to remediation section
**Then** I see ordered steps specific to this threat type
**And** each step shows: title, description, and action button
**And** steps I've completed show as checked
**And** current step is highlighted
**And** I can mark steps as complete
**And** progress is saved to database

---

### Story 9.3: Implement Platform Reporting Links (Premium+)

As a **Premium user**,
I want **direct links to report content on platforms**,
So that **I can request removal more easily**.

**Acceptance Criteria:**

**Given** a threat includes a source URL on a known platform
**When** I view remediation steps
**Then** I see a "Report to [Platform]" action
**And** tapping opens the platform's reporting page (deep link if possible)
**And** instructions explain what to include in the report
**And** this feature is gated to Premium+ users
**And** Basic users see upgrade prompt

---

### Story 9.4: Implement Evidence Capture (Premium+)

As a **Premium user**,
I want **to capture screenshots as evidence**,
So that **I have documentation if the content is removed**.

**Acceptance Criteria:**

**Given** I am viewing a threat
**When** I tap "Capture Evidence"
**Then** a screenshot of the current view is saved
**And** screenshots are stored in encrypted storage
**And** evidence is linked to the threat record
**And** I can view all captured evidence for a threat
**And** timestamps are preserved for legal purposes
**And** this feature is gated to Premium+ users

---

### Story 9.5: Implement Evidence Export (Pro)

As a **Pro user**,
I want **to export evidence as a PDF report**,
So that **I can share with legal counsel or law enforcement**.

**Acceptance Criteria:**

**Given** I have captured evidence for a threat
**When** I tap "Export Evidence"
**Then** a PDF is generated with: threat details, evidence screenshots, timestamps, source URLs
**And** PDF is professionally formatted with vara branding
**And** PDF can be shared via system share sheet
**And** export is logged in audit_logs
**And** this feature is gated to Pro users

---

### Story 9.6: Implement Action Completion Tracking

As a **user**,
I want **my remediation progress tracked**,
So that **I know what I've done and what's left**.

**Acceptance Criteria:**

**Given** I am working through remediation steps
**When** I mark a step as complete
**Then** completion is saved to database
**And** step shows checkmark indicator
**And** progress percentage updates
**When** all steps are complete
**Then** I'm prompted to mark the threat as resolved
**And** completion triggers audit log entry

---

### Story 9.7: Implement Legal Resource Links

As a **user**,
I want **access to legal resources and crisis hotlines**,
So that **I can get professional help if needed**.

**Acceptance Criteria:**

**Given** I am viewing a serious threat
**When** I view remediation options
**Then** I see links to relevant legal resources
**And** crisis hotlines are prominently displayed for harassment/intimate image cases
**And** resources are appropriate to threat type
**And** links open in external browser
**And** this is available to all tiers

---

## Epic 10: AI Support Assistant

**Goal:** Provide an AI-powered assistant that helps users understand threats and take action.

### Story 10.1: Implement Chat Interface

As a **user**,
I want **a chat interface to interact with the AI assistant**,
So that **I can ask questions and get help**.

**Acceptance Criteria:**

**Given** I navigate to the AI Assistant screen
**When** the screen loads
**Then** I see a chat interface with message history
**And** I see a text input field with send button
**And** messages appear in bubbles (user right, assistant left)
**And** keyboard handling works correctly
**And** I can scroll through conversation history
**And** the interface follows vara's design system

---

### Story 10.2: Implement Quick Actions

As a **user**,
I want **quick action buttons for common questions**,
So that **I can get help without typing**.

**Acceptance Criteria:**

**Given** I am in the AI Assistant
**When** I start a new conversation or reach the end
**Then** I see quick action chips like "Explain this threat", "What should I do?", "How does vara work?"
**And** tapping a chip sends that message
**And** chips are contextual (threat-related if viewing a threat)
**And** chips update based on conversation context

---

### Story 10.3: Integrate LLM for Responses

As a **user**,
I want **intelligent responses from the AI assistant**,
So that **I get helpful, accurate information**.

**Acceptance Criteria:**

**Given** I send a message to the assistant
**When** the message is processed
**Then** the message is sent to Anthropic Claude API via Supabase Edge Function
**And** Claude model used is claude-3-haiku for cost efficiency (upgrade path to Sonnet for complex queries)
**And** system prompt includes vara context, trauma-informed guidelines, and user's threat summary
**And** user's active threats are provided as context (without full PII)
**And** response is streamed to client for real-time display
**And** typing indicator shows while waiting for response
**And** response appears in the chat as it streams
**And** conversation context (last 10 messages) is maintained per session
**And** API errors fall back to scripted helpful responses with "I'm having trouble connecting" message
**And** rate limiting prevents abuse (10 messages per minute)

---

### Story 10.4: Implement Threat Explanation

As a **user**,
I want **the assistant to explain what a threat means**,
So that **I understand the risk in plain language**.

**Acceptance Criteria:**

**Given** I have a detected threat
**When** I ask "What does this threat mean?" or tap that quick action
**Then** the assistant explains the threat type in simple terms
**And** explains potential risks and impacts
**And** avoids technical jargon
**And** provides reassurance without minimizing
**And** follows trauma-informed communication principles

---

### Story 10.5: Implement Action Guidance

As a **user**,
I want **the assistant to guide me on what to do**,
So that **I feel empowered to take action**.

**Acceptance Criteria:**

**Given** I ask "What should I do about this?"
**When** the assistant responds
**Then** it provides prioritized action recommendations
**And** explains why each action helps
**And** links to relevant remediation steps
**And** offers to walk through steps together
**And** tone is supportive and empowering

---

### Story 10.6: Implement Crisis Resource Escalation

As a **user in distress**,
I want **the assistant to recognize crisis situations and provide resources**,
So that **I get immediate help when I need it**.

**Acceptance Criteria:**

**Given** I express distress or mention serious harassment/threats
**When** crisis indicators are detected
**Then** the assistant acknowledges the seriousness
**And** provides crisis hotline numbers immediately
**And** offers to connect with human support (if available)
**And** never minimizes or dismisses concerns
**And** follows validate-support-empower pattern

---

### Story 10.7: Implement Conversation History

As a **user**,
I want **my conversations with the assistant saved**,
So that **I can reference previous discussions**.

**Acceptance Criteria:**

**Given** I have had conversations with the assistant
**When** I return to the assistant
**Then** I can see my conversation history
**And** I can start a new conversation
**And** previous conversations are accessible
**And** conversation data is stored securely
**And** conversation history can be deleted

---

### Story 10.8: Implement Handoff to Human Support (Pro)

As a **Pro user**,
I want **to escalate from AI assistant to human support**,
So that **I can get personalized help for complex situations**.

**Acceptance Criteria:**

**Given** I am a Pro subscriber chatting with the AI assistant
**When** I request human support or the AI detects need for escalation
**Then** I see a "Connect with Support" option
**And** tapping it opens a support request form
**And** form pre-fills context from my conversation and active threats
**And** I can add additional details about my situation
**And** submitting creates a support ticket in the support system (Intercom/Zendesk integration)
**And** I receive confirmation with expected response time
**And** support team receives conversation transcript and threat context
**When** support responds
**Then** I receive a push notification
**And** I can continue conversation within the app
**And** this feature is gated to Pro users only
**And** Basic/Premium users see upgrade prompt
**And** escalation is logged in audit_logs
**And** AI assistant informs user if human support is unavailable (hours, holidays)

---

## Epic 11: Support Resources & Help Center

**Goal:** Provide comprehensive help resources, safety guides, and crisis support information.

### Story 11.1: Implement Help Center Structure

As a **user**,
I want **an organized help center**,
So that **I can find answers to my questions**.

**Acceptance Criteria:**

**Given** I navigate to Help/Support
**When** the help center loads
**Then** I see categories: Getting Started, Threats & Alerts, Account & Billing, Safety Resources
**And** each category expands to show articles
**And** I can search across all help content
**And** the interface is clean and navigable

---

### Story 11.2: Implement FAQ Content

As a **user**,
I want **answers to frequently asked questions**,
So that **I can resolve common issues quickly**.

**Acceptance Criteria:**

**Given** I am in the Help Center
**When** I browse the FAQ section
**Then** I see common questions organized by topic
**And** tapping a question expands the answer
**And** answers are clear and concise
**And** content is stored in database for easy updates
**And** questions include: "How does scanning work?", "What happens if something is found?", "How do I cancel?"

---

### Story 11.3: Implement Safety Guides

As a **user**,
I want **comprehensive safety guides**,
So that **I can learn how to protect myself online**.

**Acceptance Criteria:**

**Given** I am in the Support Resources section
**When** I view safety guides
**Then** I see guides on: Protecting Your Images Online, Responding to Harassment, Reporting to Platforms, Evidence Collection
**And** guides are detailed and actionable
**And** guides include step-by-step instructions
**And** content is sensitive and trauma-informed

---

### Story 11.4: Implement Crisis Hotlines

As a **user in crisis**,
I want **immediate access to crisis hotlines**,
So that **I can get emergency help**.

**Acceptance Criteria:**

**Given** I am in the app
**When** I access crisis resources (from help, assistant, or threat detail)
**Then** I see emergency hotline numbers prominently
**And** numbers are tappable to initiate calls
**And** resources include: National DV Hotline, RAINN, Crisis Text Line, Cyber Civil Rights Initiative
**And** resources are available regardless of subscription tier
**And** this section is always quickly accessible

---

### Story 11.5: Implement In-App Tutorials

As a **new user**,
I want **in-app tutorials**,
So that **I can learn how to use vara effectively**.

**Acceptance Criteria:**

**Given** I want to learn how to use a feature
**When** I access tutorials
**Then** I see guided walkthroughs for key features
**And** tutorials include: Adding photos, Understanding your dashboard, Responding to alerts
**And** tutorials use visual guides and animations
**And** I can replay tutorials anytime
**And** first-time feature use can trigger tutorial prompts

---

## Epic 12: Settings & Preferences

**Goal:** Allow users to manage their profile, monitored data, preferences, and exercise their data rights.

### Story 12.1: Implement Profile Management

As a **user**,
I want **to view and edit my profile**,
So that **my information stays up to date**.

**Acceptance Criteria:**

**Given** I am in Settings > Profile
**When** I view my profile
**Then** I see my name, email, and subscription tier
**And** I can edit my name and alias information
**And** I can change my profile photo
**And** changes are saved to database
**And** email changes require verification

---

### Story 12.2: Implement Monitored Items Management

As a **user**,
I want **to manage what items vara monitors**,
So that **I can add or remove photos and handles**.

**Acceptance Criteria:**

**Given** I am in Settings > Monitored Items (or Monitor tab)
**When** I view my monitored items
**Then** I see all photos, social handles, emails, and phone numbers
**And** I can remove items (with confirmation)
**And** I can add new items
**And** removed items are deleted from storage (photos)
**And** changes trigger re-scan option
**And** removal is logged in audit_logs

---

### Story 12.3: Implement Privacy Settings

As a **user**,
I want **to control my privacy settings**,
So that **I understand and manage how my data is used**.

**Acceptance Criteria:**

**Given** I am in Settings > Privacy
**When** I view privacy settings
**Then** I see what data is collected and why
**And** I can view privacy policy
**And** I can opt out of analytics (PostHog)
**And** I can view and manage consent records
**And** settings comply with GDPR/CCPA requirements

---

### Story 12.4: Implement Data Export

As a **user**,
I want **to export my data**,
So that **I can exercise my data portability rights (GDPR/CCPA)**.

**Acceptance Criteria:**

**Given** I am in Settings > Privacy > Export Data
**When** I request data export
**Then** I see what data will be included
**And** I confirm the export request
**And** export is processed within 72 hours (NFR3.7)
**And** I receive notification when export is ready
**And** export is downloadable as JSON/ZIP
**And** export request is logged in audit_logs

---

### Story 12.5: Implement Subscription Management

As a **user**,
I want **to manage my subscription from settings**,
So that **I can upgrade, downgrade, or cancel**.

**Acceptance Criteria:**

**Given** I am in Settings > Subscription
**When** I view subscription settings
**Then** I see my current plan and billing cycle
**And** I see plan comparison and upgrade options
**And** I can navigate to the subscription screen
**And** I can manage subscription via native store (RevenueCat handles)
**And** I see when my trial expires (if applicable)

---

## Epic 13: Subscription & Payments

**Goal:** Implement subscription management with free trials, tier selection, and payment processing.

### Story 13.1: Integrate RevenueCat SDK

As a **developer**,
I want **RevenueCat integrated for subscription management**,
So that **we can handle IAP on iOS and Android**.

**Acceptance Criteria:**

**Given** RevenueCat account is configured
**When** I integrate the SDK
**Then** RevenueCat SDK is initialized in `src/lib/revenuecat.ts`
**And** products are configured: vara_basic_monthly, vara_premium_monthly, vara_pro_monthly (+ annual)
**And** entitlements are configured: basic, premium, pro
**And** SDK identifies users by Supabase user ID
**And** purchase flow works on iOS and Android simulators

---

### Story 13.2: Implement Free Trial Flow

As a **new user**,
I want **to start a free trial**,
So that **I can experience vara before committing**.

**Acceptance Criteria:**

**Given** I am a new user completing onboarding
**When** I reach the trial prompt
**Then** I see trial benefits (7 or 14 day Premium access)
**And** I can start trial without immediate payment
**And** trial start is recorded in database and RevenueCat
**And** trial status shows in app
**And** trial expiration countdown is visible

---

### Story 13.3: Implement Subscription Purchase

As a **user**,
I want **to subscribe to a vara plan**,
So that **I get access to premium features**.

**Acceptance Criteria:**

**Given** I am on the subscription screen
**When** I select a plan and tap "Subscribe"
**Then** the native payment sheet is presented (iOS App Store / Google Play)
**And** successful purchase updates my subscription in RevenueCat
**And** webhook updates my user record in Supabase
**And** my tier in Zustand store updates
**And** I see confirmation of successful subscription
**And** I gain immediate access to tier features

---

### Story 13.4: Implement Tier Feature Gating

As a **user**,
I want **features appropriately gated by my tier**,
So that **I understand what I get and what requires upgrade**.

**Acceptance Criteria:**

**Given** feature gating rules exist per tier
**When** I access a premium feature as a Basic user
**Then** I see a tasteful upgrade prompt
**And** upgrade prompt explains the feature value
**And** I can tap to go to subscription screen
**And** feature gating is checked via `useSubscriptionStore`
**And** gating is consistent across the app

---

### Story 13.5: Implement Upgrade/Downgrade Flow

As a **user**,
I want **to upgrade or downgrade my subscription**,
So that **I can adjust my plan as needed**.

**Acceptance Criteria:**

**Given** I have an active subscription
**When** I choose to upgrade
**Then** proration is handled correctly
**And** I get immediate access to new tier features
**When** I choose to downgrade
**Then** downgrade takes effect at end of billing period
**And** I'm informed of what features I'll lose
**And** changes are reflected in app and RevenueCat

---

### Story 13.6: Implement Trial Expiration Handling

As a **user whose trial is expiring**,
I want **to be reminded before my trial ends**,
So that **I can decide to subscribe or not**.

**Acceptance Criteria:**

**Given** my trial is active
**When** I have 2 days left
**Then** I receive a reminder notification
**When** I have 1 day left
**Then** I receive another reminder
**When** trial expires
**Then** I am downgraded to free/basic tier
**And** premium features become gated
**And** I see a prompt to subscribe
**And** my data is preserved (not deleted)

---

### Story 13.7: Implement Subscription Webhook Handler

As a **developer**,
I want **RevenueCat webhooks processed correctly**,
So that **subscription changes sync to our database**.

**Acceptance Criteria:**

**Given** RevenueCat sends subscription events
**When** webhook is received at Edge Function
**Then** user's subscription_tier is updated in database
**And** supported events: INITIAL_PURCHASE, RENEWAL, CANCELLATION, EXPIRATION
**And** tier changes are logged in audit_logs
**And** webhook validates RevenueCat signature
**And** failed webhooks are retried

---

### Story 13.8: Implement Billing History

As a **user**,
I want **to view my billing history**,
So that **I can track my payments**.

**Acceptance Criteria:**

**Given** I am in Settings > Subscription > Billing History
**When** I view billing history
**Then** I see past transactions with dates and amounts
**And** I see upcoming renewal date and amount
**And** I can manage subscription via link to app store
**And** receipts are available for download
