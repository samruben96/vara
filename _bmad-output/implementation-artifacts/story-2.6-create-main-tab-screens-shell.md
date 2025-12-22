# Story 2.6: Create Main Tab Screens (Shell)

Status: done

## Story

As a **user**,
I want **to see the Monitor, Alerts, and Settings screens**,
so that **I can navigate and understand all main app sections**.

## Acceptance Criteria

### Monitor Screen (consolidated from old 2.5)

1. **AC1**: Given I am on the Monitor tab, when the screen loads, then I see a grid of ImageThumbnail components showing monitored photos (mock data)
2. **AC2**: Given the Monitor screen is loaded, then I see a list of linked accounts/social handles
3. **AC3**: Given a photo thumbnail is displayed, then each shows a small status indicator
4. **AC4**: Given the Monitor screen is loaded, then there is an "Add" button to add more photos or accounts
5. **AC5**: Given I tap on a photo, then it navigates to image detail screen (or shows placeholder alert for now)

### Alerts Screen (consolidated from old 2.6)

6. **AC6**: Given I am on the Alerts tab, when the screen loads, then I see a list of AlertCard components (mock data)
7. **AC7**: Given AlertCards are displayed, then each shows: title, description, severity badge, timestamp, status
8. **AC8**: Given severity badges are displayed, then they use correct colors (mint=low, coral=medium, red=critical)
9. **AC9**: Given I tap an alert, then it navigates to the threat detail screen (or shows placeholder alert for now)
10. **AC10**: Given no alerts exist, then there is an empty state with "No findings yet - you're all clear!" message

### Settings Screen (consolidated from old 2.7)

11. **AC11**: Given I am on the Settings tab, when the screen loads, then I see grouped settings rows: Account, Notifications, Privacy, Subscription, Support, About
12. **AC12**: Given each settings row is rendered, then it is tappable and navigates to the appropriate screen (or shows placeholder alert)
13. **AC13**: Given the Settings screen is loaded, then I see my profile summary at the top (name, email, subscription tier - mock data)
14. **AC14**: Given the Settings screen is loaded, then there is a "Sign Out" option

### Shared Requirements

15. **AC15**: All screens follow vara's design system (light/cream background per updated design, proper spacing, typography)
16. **AC16**: All interactive elements have minimum 44x44pt touch targets
17. **AC17**: All screens have proper accessibility labels for VoiceOver/TalkBack

## Tasks / Subtasks

### Task 1: Create Monitor Screen Content (AC: 1-5, 15-17)

- [x] **1.1 Create MonitorContent component**
  - File: `src/components/features/monitor/monitor-content.tsx`
  - Layout with section header "Your Monitored Items"
  - Use SafeAreaView and proper spacing tokens

- [x] **1.2 Create PhotoGrid component**
  - File: `src/components/features/monitor/photo-grid.tsx`
  - Display ImageThumbnail components in 3-column grid
  - Use ImageThumbnail from `src/components/ui/image-thumbnail.tsx`
  - Mock data: 3-6 photos with different status indicators
  - Each thumbnail tappable with haptic feedback

- [x] **1.3 Create AccountList component**
  - File: `src/components/features/monitor/account-list.tsx`
  - Display linked social accounts (mock data)
  - Show platform icon, handle, and status
  - Props: `accounts: { platform: string, handle: string, status: 'connected' | 'pending' }[]`

- [x] **1.4 Create AddButton FAB**
  - File: `src/components/features/monitor/add-button.tsx`
  - Floating action button with plus icon
  - Opens BottomSheet with options: "Add Photos" / "Link Account"
  - Use BottomSheet from `src/components/ui/bottom-sheet.tsx`

- [x] **1.5 Update Monitor screen**
  - Update `src/app/(app)/monitor.tsx` to render MonitorContent
  - Ensure proper safe area handling
  - Remove placeholder "Monitor screen" text

- [x] **1.6 Write unit tests**
  - `src/components/features/monitor/monitor-content.test.tsx`
  - `src/components/features/monitor/photo-grid.test.tsx`
  - `src/components/features/monitor/account-list.test.tsx`
  - `src/components/features/monitor/add-button.test.tsx`

- [x] **1.7 Create barrel export**
  - Create `src/components/features/monitor/index.ts`
  - Export all monitor components

### Task 2: Create Alerts Screen Content (AC: 6-10, 15-17)

- [x] **2.1 Create AlertsContent component**
  - File: `src/components/features/alerts/alerts-content.tsx`
  - Layout with section header "Recent Alerts"
  - Handle empty state with EmptyState component

- [x] **2.2 Create AlertList component**
  - File: `src/components/features/alerts/alert-list.tsx`
  - Display AlertCard components from `src/components/ui/alert-card.tsx`
  - Mock data: 3-5 alerts with varying severities
  - Each card tappable, navigates to threat detail

- [x] **2.3 Create mock alert data**
  - File: `src/components/features/alerts/mock-data.ts`
  - Define `mockAlerts` array with proper types
  - Include variety of severities and statuses

- [x] **2.4 Update Alerts screen**
  - Update `src/app/(app)/alerts.tsx` to render AlertsContent
  - Ensure proper safe area handling
  - Remove placeholder "Alerts screen" text

- [x] **2.5 Write unit tests**
  - `src/components/features/alerts/alerts-content.test.tsx`
  - `src/components/features/alerts/alert-list.test.tsx`

- [x] **2.6 Create barrel export**
  - Create `src/components/features/alerts/index.ts`
  - Export all alert components

### Task 3: Create Settings Screen Content (AC: 11-14, 15-17)

- [x] **3.1 Create SettingsContent component**
  - File: `src/components/features/settings/settings-content.tsx`
  - Layout with profile summary and settings groups
  - Use ScrollView for long content

- [x] **3.2 Create ProfileSummary component**
  - File: `src/components/features/settings/profile-summary.tsx`
  - Display: avatar (or initials), name, email, subscription tier badge
  - Mock data: user profile info
  - Optional profile photo with default initials fallback

- [x] **3.3 Create SettingsGroup component**
  - File: `src/components/features/settings/settings-group.tsx`
  - Props: `title: string`, `children: React.ReactNode`
  - Renders group title and contained rows

- [x] **3.4 Create SettingsRow component**
  - File: `src/components/features/settings/settings-row.tsx`
  - Props: `icon?: React.ReactNode`, `label: string`, `value?: string`, `onPress?: () => void`, `showChevron?: boolean`, `danger?: boolean`
  - Tappable row with optional right chevron
  - Danger variant for destructive actions (Sign Out, Delete Account)

- [x] **3.5 Configure settings groups**
  - Account: Profile, Security
  - Notifications: Push Notifications, Email Notifications
  - Privacy: Privacy Settings, Data Export
  - Subscription: Manage Subscription, Billing History
  - Support: Help Center, Contact Support, About
  - Danger zone: Sign Out

- [x] **3.6 Update Settings screen**
  - Update `src/app/(app)/settings.tsx` to render SettingsContent
  - Ensure proper safe area handling
  - Keep existing sign out logic if present

- [x] **3.7 Write unit tests**
  - `src/components/features/settings/settings-content.test.tsx`
  - `src/components/features/settings/profile-summary.test.tsx`
  - `src/components/features/settings/settings-row.test.tsx`
  - `src/components/features/settings/settings-group.test.tsx`

- [x] **3.8 Create barrel export**
  - Create `src/components/features/settings/index.ts`
  - Export all settings components

### Task 4: Create Supporting Icons (if needed)

- [x] **4.1 Create chevron-right icon**
  - File: `src/components/ui/icons/chevron-right.tsx` (if not exists)
  - For settings row navigation indicator

- [x] **4.2 Create plus icon**
  - File: `src/components/ui/icons/plus.tsx` (if not exists)
  - For add button FAB

- [x] **4.3 Create social platform icons**
  - Instagram, TikTok, Twitter/X, Facebook, LinkedIn icons
  - Location: `src/components/ui/icons/`
  - Only create if not already available

- [x] **4.4 Update icons barrel export**
  - Update `src/components/ui/icons/index.tsx`

### Task 5: Integration Testing (AC: 1-17)

- [x] **5.1 Visual testing**
  - Test Monitor screen renders correctly on iOS simulator
  - Test Alerts screen renders correctly on iOS simulator
  - Test Settings screen renders correctly on iOS simulator
  - Verify design system compliance (colors, spacing, typography)

- [x] **5.2 Accessibility testing**
  - Verify all interactive elements have accessibility labels
  - Verify touch targets are 44x44pt minimum
  - Test with VoiceOver enabled

- [x] **5.3 Run quality checks**
  - Run `pnpm run type-check` - must pass
  - Run `pnpm run test` - must pass
  - Run `pnpm run lint` - must pass

## Dev Notes

### Critical Patterns to Follow

**File Naming Convention:**
- Files: `kebab-case.tsx` (e.g., `monitor-content.tsx`)
- Components: `PascalCase` (e.g., `MonitorContent`)
- Tests: Co-located with source files (e.g., `monitor-content.test.tsx`)

**Directory Structure:**
```
src/components/features/monitor/
├── monitor-content.tsx
├── monitor-content.test.tsx
├── photo-grid.tsx
├── photo-grid.test.tsx
├── account-list.tsx
├── account-list.test.tsx
├── add-button.tsx
├── add-button.test.tsx
└── index.ts

src/components/features/alerts/
├── alerts-content.tsx
├── alerts-content.test.tsx
├── alert-list.tsx
├── alert-list.test.tsx
├── mock-data.ts
└── index.ts

src/components/features/settings/
├── settings-content.tsx
├── settings-content.test.tsx
├── profile-summary.tsx
├── profile-summary.test.tsx
├── settings-group.tsx
├── settings-group.test.tsx
├── settings-row.tsx
├── settings-row.test.tsx
└── index.ts
```

**Screen files contain ONLY rendering:**
```typescript
// src/app/(app)/monitor.tsx - CORRECT
export default function MonitorScreen() {
  return <MonitorContent />;
}

// WRONG - don't put logic in screen files
export default function MonitorScreen() {
  const [photos, setPhotos] = useState([]); // This belongs in component!
  return <View>...</View>;
}
```

### Design System Integration

**Import pattern:**
```typescript
import { brandColors, getSemanticColors, spacing, layout, borderRadius } from '@/lib/design-system';
```

**Key tokens:**
```typescript
// Colors
const colors = getSemanticColors('dark'); // or 'light' based on colorScheme
const cardBackground = colors.background.secondary; // #2A2A2A in dark mode
const textPrimary = colors.text.primary;
const textSecondary = colors.text.secondary;

// Status colors
const mintGreen = brandColors.mint;  // #B1EFE3 - success/protected
const coral = brandColors.coral;     // #FFAB91 - attention
const red = statusColors.critical;   // #E57373 - critical

// Spacing
const screenMargin = layout.screenMargin; // 24
const cardPadding = layout.cardPadding;   // 20
const gap = layout.gap;                    // 16

// Border radius
const cardRadius = borderRadius.lg; // 12
```

### Existing Components to Use

**From Story 2.5 (UI Components):**
```typescript
import {
  ImageThumbnail,  // For photo grid
  AlertCard,       // For alert list
  EmptyState,      // For no-content states
  ActionButton,    // For primary/secondary actions
  BottomSheet,     // For add options modal
  SeverityBadge,   // Used within AlertCard
} from '@/components/ui';
```

**ImageThumbnail usage:**
```typescript
<ImageThumbnail
  source={{ uri: 'https://...' }}
  status="protected"  // 'protected' | 'attention' | 'critical'
  size={100}
  onPress={() => handlePhotoPress(id)}
/>
```

**AlertCard usage:**
```typescript
<AlertCard
  title="Image found on dating site"
  description="Your photo appears on an unauthorized profile"
  severity="high"  // 'low' | 'medium' | 'high' | 'critical'
  timestamp={new Date()}
  status="new"     // 'new' | 'viewed' | 'resolved'
  onPress={() => handleAlertPress(id)}
/>
```

**EmptyState usage:**
```typescript
<EmptyState
  icon={<CheckCircle color={brandColors.mint} size={64} />}
  title="All Clear!"
  description="No findings yet - you're protected"
  action={{ label: "Start Scan", onPress: handleScan }}  // optional
/>
```

### Haptic Feedback Pattern (from Story 2.4)

```typescript
import * as Haptics from 'expo-haptics';

const handlePress = useCallback(() => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  onPress?.();
}, [onPress]);
```

### Accessibility Pattern (from Story 2.5)

```typescript
// Interactive components
<Pressable
  accessibilityLabel={`View ${itemName}`}
  accessibilityRole="button"
  accessibilityHint="Opens detail screen"
>

// Non-interactive display
<View
  accessibilityLabel={`Status: ${status}`}
  accessibilityRole="text"
>
```

### Mock Data Examples

**Monitor Screen - Photos:**
```typescript
const mockPhotos = [
  { id: '1', uri: 'https://picsum.photos/200', status: 'protected' as const },
  { id: '2', uri: 'https://picsum.photos/201', status: 'protected' as const },
  { id: '3', uri: 'https://picsum.photos/202', status: 'attention' as const },
];
```

**Monitor Screen - Accounts:**
```typescript
const mockAccounts = [
  { id: '1', platform: 'instagram', handle: '@example', status: 'connected' as const },
  { id: '2', platform: 'twitter', handle: '@example', status: 'pending' as const },
];
```

**Alerts Screen:**
```typescript
const mockAlerts = [
  {
    id: '1',
    title: 'Image found on dating site',
    description: 'Your photo appears on an unauthorized profile',
    severity: 'high' as const,
    timestamp: new Date(Date.now() - 3600000),
    status: 'new' as const,
  },
  {
    id: '2',
    title: 'Email in data breach',
    description: 'Your email was found in the XYZ breach',
    severity: 'medium' as const,
    timestamp: new Date(Date.now() - 86400000),
    status: 'viewed' as const,
  },
];
```

### Previous Story Learnings

**From Story 2.5 Code Review:**
1. Delete duplicate files - when moving components, ensure originals are removed
2. Touch targets must be 44pt minimum for `sm` size buttons
3. Use `spacing.md` instead of hardcoded `padding: 16`
4. Use `@/lib/test-utils` import pattern for test consistency

**From Story 2.4:**
1. StatusCircle and SummaryCard patterns - well-implemented with proper design tokens
2. Always use `useCallback` for press handlers to prevent re-renders
3. Ensure all interactive elements have `accessibilityRole` and `accessibilityLabel`

**From Story 2.1:**
1. TabBar uses `useSafeAreaInsets` for bottom padding
2. Icons accept `color` and `size` props consistently
3. Haptic feedback on all interactive elements

### Testing Standards

**Test file location:** Co-located with component (same directory)

**Test coverage requirements:**
- Render with default props
- Render with all variants/states
- Test onPress callbacks fire
- Test accessibility labels present
- Test empty states render correctly

**Test pattern:**
```typescript
import { render, fireEvent, screen } from '@/lib/test-utils';

describe('ComponentName', () => {
  it('renders with default props', () => {
    render(<ComponentName {...requiredProps} />);
    expect(screen.getByText('expected text')).toBeTruthy();
  });

  it('fires onPress callback', () => {
    const onPress = jest.fn();
    render(<ComponentName onPress={onPress} />);
    fireEvent.press(screen.getByRole('button'));
    expect(onPress).toHaveBeenCalled();
  });

  it('renders empty state when no data', () => {
    render(<ComponentName items={[]} />);
    expect(screen.getByText('No items')).toBeTruthy();
  });
});
```

### Project Structure Notes

**Current state (after Story 2.5):**
- 327 tests passing
- All UI components built in `src/components/ui/`
- Home screen complete with StatusCircle and SummaryCards
- Tab navigation working with custom TabBar

**Target state (after Story 2.6):**
- Monitor, Alerts, Settings screens fully implemented as shells
- Each screen has its content components in `src/components/features/{screen}/`
- Mock data displays realistic UI for user experience validation

### Navigation Placeholders

For navigation that isn't implemented yet, use Alert:
```typescript
import { Alert } from 'react-native';

const handleNavigate = () => {
  Alert.alert('Coming Soon', 'This feature is under development');
};
```

Or use router.push with placeholder screens:
```typescript
import { router } from 'expo-router';

const handleThreatPress = (id: string) => {
  // Will navigate to threat detail when implemented
  router.push(`/threat/${id}`);
};
```

### References

- [Source: _bmad-output/architecture.md#Frontend Architecture] - Component patterns
- [Source: _bmad-output/project-planning-artifacts/ux-design-specification.md#Screen Inventory] - Screen requirements
- [Source: _bmad-output/project-planning-artifacts/ux-design-specification.md#Component Strategy] - Component specs
- [Source: _bmad-output/epics.md#Story 2.6] - Story requirements
- [Source: _bmad-output/project-context.md] - Critical implementation rules
- [Source: _bmad-output/implementation-artifacts/story-2.5-build-core-ui-components.md] - Previous story learnings
- [Source: src/components/ui/] - Existing UI components to use
- [Source: src/lib/design-system.ts] - Design token barrel export

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5

### Debug Log References

### Completion Notes List

- Light theme applied throughout (cream background #FEFAF1, white cards #FFFFFF)
- All screens use `lightColors` from design system per updated design direction
- Code review fixes applied: icon colors, ghost button text, pressed states

### File List

**Monitor Screen Components:**
- `src/components/features/monitor/monitor-content.tsx` - Main monitor screen content
- `src/components/features/monitor/monitor-content.test.tsx` - Tests
- `src/components/features/monitor/photo-grid.tsx` - Photo grid component
- `src/components/features/monitor/photo-grid.test.tsx` - Tests
- `src/components/features/monitor/account-list.tsx` - Linked accounts list
- `src/components/features/monitor/account-list.test.tsx` - Tests
- `src/components/features/monitor/add-button.tsx` - FAB with bottom sheet
- `src/components/features/monitor/add-button.test.tsx` - Tests
- `src/components/features/monitor/index.ts` - Barrel export

**Alerts Screen Components:**
- `src/components/features/alerts/alerts-content.tsx` - Main alerts screen content
- `src/components/features/alerts/alerts-content.test.tsx` - Tests
- `src/components/features/alerts/alert-list.tsx` - Alert list component
- `src/components/features/alerts/alert-list.test.tsx` - Tests
- `src/components/features/alerts/mock-data.ts` - Mock alert data
- `src/components/features/alerts/index.ts` - Barrel export

**Settings Screen Components:**
- `src/components/features/settings/settings-content.tsx` - Main settings screen content
- `src/components/features/settings/settings-content.test.tsx` - Tests
- `src/components/features/settings/profile-summary.tsx` - Profile header
- `src/components/features/settings/profile-summary.test.tsx` - Tests
- `src/components/features/settings/settings-group.tsx` - Settings group wrapper
- `src/components/features/settings/settings-group.test.tsx` - Tests
- `src/components/features/settings/settings-groups.tsx` - All settings groups
- `src/components/features/settings/settings-row.tsx` - Individual settings row
- `src/components/features/settings/settings-row.test.tsx` - Tests
- `src/components/features/settings/index.ts` - Barrel export

**Screen Files:**
- `src/app/(app)/monitor.tsx` - Monitor screen route
- `src/app/(app)/alerts.tsx` - Alerts screen route
- `src/app/(app)/settings.tsx` - Settings screen route

**Icons Added:**
- `src/components/ui/icons/chevron-right.tsx` - Navigation chevron
- `src/components/ui/icons/plus.tsx` - Add button icon
- `src/components/ui/icons/index.tsx` - Updated barrel export

**Light Theme Updates (Code Review Fixes):**
- `src/components/ui/action-button.tsx` - Ghost variant text color
- `src/components/ui/tab-bar.tsx` - Light background
- `src/components/ui/skeleton.tsx` - Light colors
- `src/components/ui/content-blur.tsx` - Light colors
- `src/components/ui/progress-ring.tsx` - Light colors
- `src/components/ui/image-thumbnail.tsx` - Light colors
- `src/components/ui/summary-card.tsx` - Light colors
- `src/components/ui/alert-card.tsx` - Light colors
- `src/components/ui/bottom-sheet.tsx` - Light colors
- `src/components/ui/empty-state.tsx` - Light colors

