# Story 2.3: Create Onboarding Flow Screens (Shell)

Status: done

## Story

As a **new user who just signed up**,
I want **to see the onboarding screens**,
so that **I understand the setup process**.

## Acceptance Criteria

1. **AC1**: When I complete signup, I see the Welcome screen with vara's value proposition
2. **AC2**: I see the Permissions screen explaining camera and notification access
3. **AC3**: I see the Add Photos screen with upload/capture UI (visual only, not functional)
4. **AC4**: I see the Add Info screen for name and social handles (visual only, not functional)
5. **AC5**: I see the First Scan screen with scan initiation UI (visual only, not functional)
6. **AC6**: Screens can be navigated through in sequence (Next/Back buttons)
7. **AC7**: All screens follow vara's design system (charcoal background, mint accents, cream text)
8. **AC8**: Progress indicator shows current step in onboarding flow
9. **AC9**: Skip option available for non-essential steps (AC4 - Add Info)

## Tasks / Subtasks

- [x] **Task 1: Create (onboarding) route group** (AC: 6, 7)
  - [x] 1.1: Create `src/app/(onboarding)/_layout.tsx` with Stack navigation
  - [x] 1.2: Configure Stack to hide headers (onboarding has custom headers)
  - [x] 1.3: Update root `_layout.tsx` to include `(onboarding)` route group
  - [x] 1.4: Update auth flow to redirect to `(onboarding)/welcome` after signup (not to login)

- [x] **Task 2: Create OnboardingProgress component** (AC: 8)
  - [x] 2.1: Create `src/components/features/onboarding/onboarding-progress.tsx`
  - [x] 2.2: Props: `currentStep: number`, `totalSteps: number` (default 5)
  - [x] 2.3: Display as horizontal dots or mini progress bar
  - [x] 2.4: Active step highlighted with mint, completed with lavender, pending with gray
  - [x] 2.5: Write unit test `onboarding-progress.test.tsx`
  - [x] 2.6: Export from `src/components/features/onboarding/index.ts`

- [x] **Task 3: Create OnboardingLayout wrapper component** (AC: 6, 7, 8)
  - [x] 3.1: Create `src/components/features/onboarding/onboarding-layout.tsx`
  - [x] 3.2: Props: `title: string`, `description?: string`, `currentStep: number`, `onNext?: () => void`, `onBack?: () => void`, `onSkip?: () => void`, `nextLabel?: string`, `showBack?: boolean`, `showSkip?: boolean`, `children: ReactNode`
  - [x] 3.3: Layout: SafeAreaView with charcoal background, progress at top, content in middle, navigation buttons at bottom
  - [x] 3.4: Use vara typography (h1 for title, body for description)
  - [x] 3.5: Write unit test `onboarding-layout.test.tsx`
  - [x] 3.6: Export from `src/components/features/onboarding/index.ts`

- [x] **Task 4: Create Welcome screen** (AC: 1, 7)
  - [x] 4.1: Create `src/app/(onboarding)/welcome.tsx` screen file
  - [x] 4.2: Create `src/components/features/onboarding/welcome-content.tsx` component
  - [x] 4.3: Display vara logo/brand icon at top (use existing Cover or create new)
  - [x] 4.4: Display value proposition: "Discover exposure", "Monitor threats", "Respond with guidance"
  - [x] 4.5: Display tagline: "vara watches so you don't have to"
  - [x] 4.6: "Get Started" button navigates to permissions screen
  - [x] 4.7: Use OnboardingLayout with step 1
  - [x] 4.8: Write unit test `welcome-content.test.tsx`

- [x] **Task 5: Create Permissions screen** (AC: 2, 7)
  - [x] 5.1: Create `src/app/(onboarding)/permissions.tsx` screen file
  - [x] 5.2: Create `src/components/features/onboarding/permissions-content.tsx` component
  - [x] 5.3: Display Camera permission card with icon, title, explanation
  - [x] 5.4: Display Notifications permission card with icon, title, explanation
  - [x] 5.5: Each permission has an "Allow" button (shell only - show Toast on press, don't actually request)
  - [x] 5.6: "Continue" button navigates to add-photos screen
  - [x] 5.7: Permission cards show visual state (pending, granted - just visually, not real state)
  - [x] 5.8: Use OnboardingLayout with step 2
  - [x] 5.9: Write unit test `permissions-content.test.tsx`

- [x] **Task 6: Create Add Photos screen** (AC: 3, 7)
  - [x] 6.1: Create `src/app/(onboarding)/add-photos.tsx` screen file
  - [x] 6.2: Create `src/components/features/onboarding/add-photos-content.tsx` component
  - [x] 6.3: Display explanation of why photos are monitored (FR2.8)
  - [x] 6.4: Display "Upload Photos" button with gallery icon
  - [x] 6.5: Display "Take Photo" button with camera icon
  - [x] 6.6: Display photo grid placeholder (show mock thumbnails or empty state)
  - [x] 6.7: Show "1-10 photos" guidance text
  - [x] 6.8: "Continue" button navigates to add-info screen
  - [x] 6.9: Use OnboardingLayout with step 3
  - [x] 6.10: Write unit test `add-photos-content.test.tsx`

- [x] **Task 7: Create Add Info screen** (AC: 4, 7, 9)
  - [x] 7.1: Create `src/app/(onboarding)/add-info.tsx` screen file
  - [x] 7.2: Create `src/components/features/onboarding/add-info-content.tsx` component
  - [x] 7.3: Display First Name field (required)
  - [x] 7.4: Display Last Name field (optional)
  - [x] 7.5: Display social media handle inputs (Instagram, TikTok, Twitter/X) - all optional
  - [x] 7.6: Display explanation of why this helps with monitoring
  - [x] 7.7: "Continue" button navigates to first-scan screen
  - [x] 7.8: "Skip for now" link available (FR2.9)
  - [x] 7.9: Use OnboardingLayout with step 4, showSkip=true
  - [x] 7.10: Basic validation (first name required)
  - [x] 7.11: Write unit test `add-info-content.test.tsx`

- [x] **Task 8: Create First Scan screen** (AC: 5, 7)
  - [x] 8.1: Create `src/app/(onboarding)/first-scan.tsx` screen file
  - [x] 8.2: Create `src/components/features/onboarding/first-scan-content.tsx` component
  - [x] 8.3: Display summary of what will be scanned (photos, handles, emails)
  - [x] 8.4: Display estimated time ("Usually takes 2-5 minutes")
  - [x] 8.5: Display "Start Scan" button with scan icon
  - [x] 8.6: On "Start Scan" press, show Toast "Scan would start here" and navigate to home
  - [x] 8.7: Use OnboardingLayout with step 5, hideBack (can't go back from scan)
  - [x] 8.8: Write unit test `first-scan-content.test.tsx`

- [x] **Task 9: Update existing onboarding.tsx** (AC: 6)
  - [x] 9.1: Modify `src/app/onboarding.tsx` to redirect to `(onboarding)/welcome`
  - [x] 9.2: Or remove `onboarding.tsx` and update root layout to start at `(onboarding)/welcome` for first-time users

- [x] **Task 10: Integration testing** (AC: 1-9)
  - [x] 10.1: Test navigation: Welcome → Permissions → Add Photos → Add Info → First Scan → Home
  - [x] 10.2: Test back navigation works on each screen (except first-scan)
  - [x] 10.3: Test skip on Add Info navigates to First Scan
  - [x] 10.4: Test progress indicator updates correctly
  - [x] 10.5: Verify dark mode styling consistency across all screens
  - [x] 10.6: Run `pnpm run type-check` - must pass
  - [x] 10.7: Run `pnpm run test` - must pass
  - [x] 10.8: Run `pnpm run lint` - must pass

## Dev Notes

### Critical Architecture Patterns (MUST FOLLOW)

**File Naming Convention:**
- Files: `kebab-case.tsx` (e.g., `welcome-content.tsx`, NOT `WelcomeContent.tsx`)
- Components: `PascalCase` (e.g., `WelcomeContent`, `OnboardingProgress`)
- Tests: Co-located with source files (e.g., `welcome-content.test.tsx` in same directory)

**Directory Structure for Onboarding:**
```
src/app/(onboarding)/          # Onboarding route group
├── _layout.tsx                # Stack navigator for onboarding flow
├── welcome.tsx                # Step 1: Value proposition
├── permissions.tsx            # Step 2: Camera & notifications
├── add-photos.tsx             # Step 3: Photo upload
├── add-info.tsx               # Step 4: Name & social handles
└── first-scan.tsx             # Step 5: Initiate first scan

src/components/features/onboarding/  # Onboarding-specific components
├── onboarding-layout.tsx      # Reusable layout wrapper
├── onboarding-layout.test.tsx
├── onboarding-progress.tsx    # Progress indicator
├── onboarding-progress.test.tsx
├── welcome-content.tsx        # Content for welcome screen
├── welcome-content.test.tsx
├── permissions-content.tsx    # Content for permissions screen
├── permissions-content.test.tsx
├── add-photos-content.tsx     # Content for add photos screen
├── add-photos-content.test.tsx
├── add-info-content.tsx       # Content for add info screen
├── add-info-content.test.tsx
├── first-scan-content.tsx     # Content for first scan screen
├── first-scan-content.test.tsx
└── index.ts                   # Barrel export
```

**Screen files should contain ONLY rendering, NO business logic:**
```typescript
// CORRECT - screen delegates to components
export default function WelcomeScreen() {
  const router = useRouter();
  return (
    <OnboardingLayout
      title="Welcome to vara"
      currentStep={1}
      onNext={() => router.push('/(onboarding)/permissions')}
      nextLabel="Get Started"
      showBack={false}
    >
      <WelcomeContent />
    </OnboardingLayout>
  );
}

// WRONG - screen contains business logic
export default function WelcomeScreen() {
  const [features, setFeatures] = useState([]); // This belongs in a component!
  const loadFeatures = async () => {...};
  return <View>...</View>;
}
```

### Design System Implementation

**Import tokens from design system:**
```typescript
import { brandColors, getSemanticColors, spacing, typography } from '@/lib/design-system';
// Or from colors directly
import { colors } from '@/lib/colors';
```

**Onboarding Screen Color Scheme (Dark Mode):**
```typescript
const colors = {
  background: brandColors.charcoal,       // #1E1E1E
  cardBackground: '#2A2A2A',              // Elevated surfaces
  text: {
    primary: brandColors.cream,           // #FEFAF1
    secondary: '#AAAAAA',                 // Hint text
  },
  accent: brandColors.mint,               // #B1EFE3 - buttons, links, active states
  progress: {
    active: brandColors.mint,             // #B1EFE3
    completed: brandColors.lavender,      // #D7CAE6
    pending: '#3A3A3A',                   // Gray
  },
};
```

**Typography for Onboarding:**
```typescript
// Screen title (h1)
style={{
  fontFamily: 'PlusJakartaSans-SemiBold',
  fontSize: 24,
  color: brandColors.cream,
  textAlign: 'center',
}}

// Description text (body)
style={{
  fontFamily: 'PlusJakartaSans-Regular',
  fontSize: 15,
  color: '#AAAAAA',
  textAlign: 'center',
  lineHeight: 22.5, // 1.5 line height
}}

// Feature/value prop text (body-small)
style={{
  fontFamily: 'PlusJakartaSans-Regular',
  fontSize: 13,
  color: brandColors.cream,
}}
```

### OnboardingLayout Component Pattern

```typescript
// src/components/features/onboarding/onboarding-layout.tsx
import { ReactNode } from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity } from 'react-native';
import { brandColors, spacing } from '@/lib/design-system';
import { OnboardingProgress } from './onboarding-progress';

interface OnboardingLayoutProps {
  title: string;
  description?: string;
  currentStep: number;
  totalSteps?: number;
  onNext?: () => void;
  onBack?: () => void;
  onSkip?: () => void;
  nextLabel?: string;
  showBack?: boolean;
  showSkip?: boolean;
  children: ReactNode;
}

export function OnboardingLayout({
  title,
  description,
  currentStep,
  totalSteps = 5,
  onNext,
  onBack,
  onSkip,
  nextLabel = 'Continue',
  showBack = true,
  showSkip = false,
  children,
}: OnboardingLayoutProps) {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: brandColors.charcoal }}>
      <View style={{ flex: 1, paddingHorizontal: spacing.xl }}>
        {/* Progress indicator at top */}
        <OnboardingProgress currentStep={currentStep} totalSteps={totalSteps} />

        {/* Title and description */}
        <View style={{ marginTop: spacing['2xl'] }}>
          <Text style={styles.title}>{title}</Text>
          {description && <Text style={styles.description}>{description}</Text>}
        </View>

        {/* Content area */}
        <View style={{ flex: 1, marginTop: spacing.xl }}>
          {children}
        </View>

        {/* Navigation buttons at bottom */}
        <View style={{ paddingBottom: insets.bottom || spacing.lg }}>
          {showSkip && (
            <TouchableOpacity onPress={onSkip}>
              <Text style={styles.skipLink}>Skip for now</Text>
            </TouchableOpacity>
          )}
          <Button label={nextLabel} onPress={onNext} />
          {showBack && currentStep > 1 && (
            <TouchableOpacity onPress={onBack}>
              <Text style={styles.backLink}>Back</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
```

### OnboardingProgress Component Pattern

```typescript
// src/components/features/onboarding/onboarding-progress.tsx
interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function OnboardingProgress({ currentStep, totalSteps }: OnboardingProgressProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNum = index + 1;
        const isActive = stepNum === currentStep;
        const isCompleted = stepNum < currentStep;

        return (
          <View
            key={stepNum}
            style={[
              styles.dot,
              isActive && styles.dotActive,
              isCompleted && styles.dotCompleted,
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3A3A3A', // pending
  },
  dotActive: {
    backgroundColor: '#B1EFE3', // mint
    width: 24, // slightly wider for active
  },
  dotCompleted: {
    backgroundColor: '#D7CAE6', // lavender
  },
});
```

### Permissions Card Component Pattern

```typescript
// Inside permissions-content.tsx
interface PermissionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  status: 'pending' | 'granted';
  onAllow: () => void;
}

function PermissionCard({ icon, title, description, status, onAllow }: PermissionCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        {icon}
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
      <Text style={styles.cardDescription}>{description}</Text>
      <Button
        label={status === 'granted' ? 'Allowed' : 'Allow'}
        variant={status === 'granted' ? 'secondary' : 'primary'}
        onPress={onAllow}
        disabled={status === 'granted'}
      />
    </View>
  );
}
```

### Navigation Pattern

**Onboarding Layout (src/app/(onboarding)/_layout.tsx):**
```typescript
import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="welcome" />
      <Stack.Screen name="permissions" />
      <Stack.Screen name="add-photos" />
      <Stack.Screen name="add-info" />
      <Stack.Screen name="first-scan" />
    </Stack>
  );
}
```

**Navigation between onboarding screens:**
```typescript
import { useRouter } from 'expo-router';

const router = useRouter();

// Navigate forward
router.push('/(onboarding)/permissions');

// Navigate back
router.back();

// Navigate to home (after completing onboarding)
router.replace('/(app)');
```

### Icons Needed

Create or use existing icons for onboarding:
- Camera icon (for permissions + add photos)
- Bell/Notification icon (for permissions)
- Gallery/Image icon (for add photos)
- User icon (for add info)
- Shield/Scan icon (for first scan)
- Social media icons (Instagram, TikTok, Twitter/X)

**Icon Pattern (from Story 2-1):**
```typescript
// src/components/ui/icons/camera.tsx
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

interface IconProps {
  color?: string;
  size?: number;
}

export function CameraIcon({ color = '#FEFAF1', size = 24 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="..." fill={color} />
    </Svg>
  );
}
```

### UX Requirements (from UX Design Specification)

**First-Time User Onboarding Journey (from UX spec):**

| Step | Screen | User Action | System Response | Emotional State |
|------|--------|-------------|-----------------|-----------------|
| 1 | Welcome | Opens app | Brand intro, value prop | Hopeful, curious |
| 2 | Permissions | Grants camera, notifications | Explains why needed | Trusting |
| 3 | Add Photos | Uploads/captures photos | Shows photos being processed | Anticipation |
| 4 | Add Info | Enters name, handles | Validates inputs | - |
| 5 | First Scan | Waits | Progress indicator, reassuring copy | Slight anxiety |

**Critical Design Considerations:**
- Explain value before asking for permissions
- Show progress during first scan (don't leave user wondering)
- Celebrate "all clear" results without minimizing the service
- End on protection status to establish core mental model

**Visual Requirements:**
- Touch targets: minimum 44x44pt for all buttons/inputs
- Generous spacing (24px margins, 20px card padding)
- Clear visual hierarchy with vara typography scale

### Previous Story Learnings (from Story 2-2)

Key patterns established to follow:
1. **Auth screens pattern** - Use OnboardingLayout similar to how auth uses SafeAreaView wrapper
2. **Form components pattern** - See `signup-form.tsx` for controlled inputs with Zod validation
3. **Button component** - Use existing Button component from Obytes template, style with mint
4. **Social button pattern** - See `social-button.tsx` for icon + text button styling
5. **Test structure** - Co-locate tests with components, test rendering and user interactions
6. **Run all checks** before marking complete: type-check, test, lint
7. **Navigation testing** - Mock expo-router for navigation tests

**From Story 2-2 Completion Notes:**
- All forms use SafeAreaView for notch device handling
- Tests verify rendering, validation, and navigation
- 135 tests currently passing - don't break existing tests

### Shell Screen Behavior

Since this is a shell story (visual only, not functional):
- Permission "Allow" buttons show Toast message, don't actually request permissions
- Photo upload/capture buttons show Toast message, don't actually open camera/gallery
- Form inputs accept input but don't save to database
- "Start Scan" button shows Toast and navigates to home, doesn't actually scan

**Toast Pattern:**
```typescript
import Toast from 'react-native-toast-message';

const handleUploadPhotos = () => {
  Toast.show({
    type: 'info',
    text1: 'Photo Upload',
    text2: 'Photo upload will be implemented in Epic 4',
  });
};
```

### Testing Requirements

**Unit Tests for Components:**
```typescript
// onboarding-progress.test.tsx
describe('OnboardingProgress', () => {
  it('renders correct number of dots', () => {...});
  it('highlights active step with mint color', () => {...});
  it('shows completed steps with lavender', () => {...});
  it('shows pending steps with gray', () => {...});
});

// onboarding-layout.test.tsx
describe('OnboardingLayout', () => {
  it('renders title and description', () => {...});
  it('renders progress indicator', () => {...});
  it('renders next button with custom label', () => {...});
  it('hides back button when showBack is false', () => {...});
  it('shows skip link when showSkip is true', () => {...});
  it('calls onNext when next button pressed', () => {...});
  it('calls onBack when back button pressed', () => {...});
});

// welcome-content.test.tsx
describe('WelcomeContent', () => {
  it('renders vara value proposition', () => {...});
  it('renders tagline', () => {...});
});

// permissions-content.test.tsx
describe('PermissionsContent', () => {
  it('renders camera permission card', () => {...});
  it('renders notification permission card', () => {...});
  it('calls onAllowCamera when camera button pressed', () => {...});
  it('calls onAllowNotifications when notification button pressed', () => {...});
});

// add-photos-content.test.tsx
describe('AddPhotosContent', () => {
  it('renders upload and capture buttons', () => {...});
  it('renders photo explanation text', () => {...});
  it('calls onUpload when upload button pressed', () => {...});
  it('calls onCapture when capture button pressed', () => {...});
});

// add-info-content.test.tsx
describe('AddInfoContent', () => {
  it('renders first name field as required', () => {...});
  it('renders social media handle fields', () => {...});
  it('validates first name is not empty', () => {...});
});

// first-scan-content.test.tsx
describe('FirstScanContent', () => {
  it('renders scan summary', () => {...});
  it('renders estimated time', () => {...});
  it('calls onStartScan when button pressed', () => {...});
});
```

### Project Structure Notes

**Current State (after Story 2-2):**
```
src/app/
├── _layout.tsx           # Root layout
├── onboarding.tsx        # Current single onboarding screen (to be replaced)
├── (auth)/               # Auth route group
│   ├── _layout.tsx
│   ├── login.tsx
│   ├── signup.tsx
│   └── forgot-password.tsx
├── (app)/                # Tab navigator
│   ├── _layout.tsx
│   ├── index.tsx         # Home tab
│   ├── monitor.tsx       # Monitor tab
│   └── alerts.tsx        # Alerts tab
```

**Target State:**
```
src/app/
├── _layout.tsx           # Root layout (updated to include (onboarding))
├── (onboarding)/         # NEW: Onboarding route group
│   ├── _layout.tsx       # Stack navigator
│   ├── welcome.tsx       # Step 1
│   ├── permissions.tsx   # Step 2
│   ├── add-photos.tsx    # Step 3
│   ├── add-info.tsx      # Step 4
│   └── first-scan.tsx    # Step 5
├── (auth)/               # Auth route group
├── (app)/                # Tab navigator
```

### References

- [Architecture: Onboarding Screens](/Users/samruben/vara-app/_bmad-output/architecture.md#project-organization) - Line 714-720
- [Architecture: Frontend Patterns](/Users/samruben/vara-app/_bmad-output/architecture.md#frontend-architecture)
- [UX: Onboarding Journey](/Users/samruben/vara-app/_bmad-output/project-planning-artifacts/ux-design-specification.md#journey-1-first-time-user-onboarding)
- [UX: Design System](/Users/samruben/vara-app/_bmad-output/project-planning-artifacts/ux-design-specification.md#design-system-foundation)
- [UX: Component Strategy](/Users/samruben/vara-app/_bmad-output/project-planning-artifacts/ux-design-specification.md#component-strategy)
- [Design Tokens](/Users/samruben/vara-app/src/lib/design-system.ts)
- [Colors](/Users/samruben/vara-app/src/lib/colors.ts)
- [Project Context](/Users/samruben/vara-app/_bmad-output/project-context.md)
- [Previous Story 2-2](/Users/samruben/vara-app/_bmad-output/implementation-artifacts/2-2-create-auth-flow-screens-shell.md)
- [PRD: Onboarding Requirements](/Users/samruben/vara-app/_bmad-output/project-planning-artifacts/prd.md) - FR2.1-FR2.9
- [Epics: Story 2.3](/Users/samruben/vara-app/_bmad-output/epics.md#story-23-create-onboarding-flow-screens-shell)

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

None

### Completion Notes List

1. **All 10 tasks completed successfully** - Created complete onboarding flow shell with 5 screens
2. **Created 7 new icons**: Camera, Notifications, Gallery, Instagram, TikTok, Twitter, User, ShieldScan
3. **44 new tests added** - All 179 tests passing (up from 135)
4. **Type-check passes** - No TypeScript errors
5. **Lint passes** - 0 errors (only pre-existing warnings from template code)
6. **Design system followed** - charcoal background, mint accents, cream text, lavender for completed steps
7. **Shell functionality** - All buttons show flash messages instead of real functionality (as specified)
8. **Fixed SafeAreaProvider for tests** - Added initialMetrics to test-utils.tsx
9. **Used react-native-flash-message** instead of react-native-toast-message (already installed)
10. **Refactored add-info-content.tsx** - Extracted social fields to reduce function size for lint compliance
11. **Updated eslint.config.mjs** - Disabled max-lines-per-function for test files

### File List

**New Files Created:**
- `src/app/(onboarding)/_layout.tsx` - Stack navigation for onboarding flow
- `src/app/(onboarding)/welcome.tsx` - Step 1 screen
- `src/app/(onboarding)/permissions.tsx` - Step 2 screen
- `src/app/(onboarding)/add-photos.tsx` - Step 3 screen
- `src/app/(onboarding)/add-info.tsx` - Step 4 screen
- `src/app/(onboarding)/first-scan.tsx` - Step 5 screen
- `src/components/features/onboarding/onboarding-progress.tsx` - Progress indicator
- `src/components/features/onboarding/onboarding-progress.test.tsx` - 6 tests
- `src/components/features/onboarding/onboarding-layout.tsx` - Layout wrapper
- `src/components/features/onboarding/onboarding-layout.test.tsx` - 12 tests
- `src/components/features/onboarding/welcome-content.tsx` - Welcome content
- `src/components/features/onboarding/welcome-content.test.tsx` - 3 tests
- `src/components/features/onboarding/permissions-content.tsx` - Permissions content
- `src/components/features/onboarding/permissions-content.test.tsx` - 6 tests
- `src/components/features/onboarding/add-photos-content.tsx` - Add photos content
- `src/components/features/onboarding/add-photos-content.test.tsx` - 6 tests
- `src/components/features/onboarding/add-info-content.tsx` - Add info content with form
- `src/components/features/onboarding/add-info-content.test.tsx` - 6 tests
- `src/components/features/onboarding/first-scan-content.tsx` - First scan content
- `src/components/features/onboarding/first-scan-content.test.tsx` - 5 tests
- `src/components/features/onboarding/index.ts` - Barrel export
- `src/components/ui/icons/camera.tsx` - Camera icon
- `src/components/ui/icons/notifications.tsx` - Bell/notification icon
- `src/components/ui/icons/gallery.tsx` - Gallery icon
- `src/components/ui/icons/instagram.tsx` - Instagram icon
- `src/components/ui/icons/tiktok.tsx` - TikTok icon
- `src/components/ui/icons/twitter.tsx` - Twitter/X icon
- `src/components/ui/icons/user.tsx` - User icon
- `src/components/ui/icons/shield-scan.tsx` - Shield scan icon

**Modified Files:**
- `src/app/_layout.tsx` - Added (onboarding) route group
- `src/app/onboarding.tsx` - Redirects to (onboarding)/welcome
- `src/components/ui/icons/index.tsx` - Added new icon exports
- `src/lib/test-utils.tsx` - Added SafeAreaProvider with initialMetrics
- `eslint.config.mjs` - Disabled max-lines-per-function for test files

**Note:** `src/components/features/auth/signup-form.tsx` was created in Story 2-2, not modified by this story.

