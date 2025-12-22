# Story 2.1: Implement Tab Navigation & App Layout

Status: done

## Story

As a **user**,
I want **to navigate between main app sections using a tab bar**,
so that **I can easily access Home, Monitor, Alerts, and Settings**.

## Acceptance Criteria

1. **AC1**: A custom TabBar is displayed at the bottom with 4 tabs: Home, Monitor, Alerts, Settings
2. **AC2**: Each tab has an icon and label following vara's design system
3. **AC3**: The active tab is visually highlighted with mint (#B1EFE3) accent
4. **AC4**: Tapping a tab navigates to that screen
5. **AC5**: The TabBar follows vara's design system (charcoal #1E1E1E background, mint active state)
6. **AC6**: Tab navigation state is preserved when switching tabs
7. **AC7**: All screens maintain proper safe area handling

## Tasks / Subtasks

- [x] **Task 1: Create custom TabBar component** (AC: 1, 2, 3, 5)
  - [x] 1.1: Create `src/components/layout/tab-bar.tsx` following kebab-case naming
  - [x] 1.2: Implement 4 tab buttons: Home, Monitor, Alerts, Settings
  - [x] 1.3: Add icon for each tab (use existing icon system from `src/components/ui/icons/`)
  - [x] 1.4: Add label text under each icon using typography tokens
  - [x] 1.5: Implement active state styling (mint #B1EFE3 icon/label, charcoal background)
  - [x] 1.6: Implement inactive state styling (secondary text color)
  - [x] 1.7: Ensure 44x44pt minimum touch targets (UX requirement)
  - [x] 1.8: Add haptic feedback on tab press using `expo-haptics`
  - [x] 1.9: Write unit test `tab-bar.test.tsx`

- [x] **Task 2: Create new tab icons** (AC: 2)
  - [x] 2.1: Create `src/components/ui/icons/monitor.tsx` icon
  - [x] 2.2: Create `src/components/ui/icons/alerts.tsx` icon
  - [x] 2.3: Export new icons from `src/components/ui/icons/index.tsx`
  - [x] 2.4: Follow existing icon pattern (accept `color` prop, consistent size)

- [x] **Task 3: Restructure app directory for vara navigation** (AC: 4, 6)
  - [x] 3.1: Update `src/app/(app)/_layout.tsx` to use custom TabBar via `tabBar` prop
  - [x] 3.2: Rename `index.tsx` to be Home screen (or create new)
  - [x] 3.3: Create `src/app/(app)/monitor.tsx` shell screen
  - [x] 3.4: Create `src/app/(app)/alerts.tsx` shell screen
  - [x] 3.5: Update `settings.tsx` screen to follow new pattern
  - [x] 3.6: Remove unused `style.tsx` screen (not in vara design)
  - [x] 3.7: Remove feed-related code (not in vara design)

- [x] **Task 4: Configure tab navigation options** (AC: 4, 6)
  - [x] 4.1: Set `tabBarButtonTestID` for each tab for testing
  - [x] 4.2: Set appropriate `title` for each screen
  - [x] 4.3: Configure `headerShown` appropriately for each screen
  - [x] 4.4: Ensure tab state preservation (default Expo Router behavior)

- [x] **Task 5: Implement safe area handling** (AC: 7)
  - [x] 5.1: Ensure TabBar respects bottom safe area
  - [x] 5.2: Use `useSafeAreaInsets` from react-native-safe-area-context
  - [x] 5.3: Test on devices with notches/home indicators

- [x] **Task 6: Integration testing** (AC: 1-7)
  - [x] 6.1: Test tab navigation on iOS simulator
  - [x] 6.2: Test tab navigation on Android emulator
  - [x] 6.3: Verify visual design matches specification
  - [x] 6.4: Run `pnpm run type-check` - must pass
  - [x] 6.5: Run `pnpm run test` - must pass
  - [x] 6.6: Run `pnpm run lint` - must pass

## Dev Notes

### Critical Architecture Patterns

**File Naming Convention (MUST FOLLOW):**
- Files: `kebab-case.tsx` (e.g., `tab-bar.tsx`, NOT `TabBar.tsx`)
- Components: `PascalCase` (e.g., `TabBar`, `AlertsScreen`)
- Tests: Co-located with source files (e.g., `tab-bar.test.tsx` in same directory)

**Component Location:**
- Custom TabBar → `src/components/layout/tab-bar.tsx`
- Icons → `src/components/ui/icons/`
- Screen files → `src/app/(app)/` directory

**Screen files should contain ONLY rendering, NO business logic:**
```typescript
// ✅ CORRECT - screen delegates to components
export default function HomeScreen() {
  return <HomeContent />;
}

// ❌ WRONG - screen contains business logic
export default function HomeScreen() {
  const { data } = useQuery(...); // This belongs in a component!
  return <View>...</View>;
}
```

### Design System Tokens (from `@/lib/design-system`)

```typescript
import { brandColors, getSemanticColors, spacing } from '@/lib/design-system';

// TabBar colors
const tabBarBackground = brandColors.charcoal; // #1E1E1E
const activeColor = brandColors.mint;          // #B1EFE3
const inactiveColor = getSemanticColors('dark').text.secondary; // #AAAAAA

// Spacing (8px base unit)
const tabPadding = spacing.sm;    // 8px
const iconLabelGap = spacing.xs;  // 4px
```

### Custom TabBar Implementation Pattern

Per [Expo Router docs](https://docs.expo.dev/router/advanced/tabs/), use the `tabBar` prop:

```typescript
// src/app/(app)/_layout.tsx
import { Tabs } from 'expo-router';
import { TabBar } from '@/components/layout/tab-bar';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="monitor" options={{ title: 'Monitor' }} />
      <Tabs.Screen name="alerts" options={{ title: 'Alerts' }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings' }} />
    </Tabs>
  );
}
```

### TabBar Component Props

The `tabBar` prop receives props from React Navigation. Key props:
- `state` - Current navigation state
- `descriptors` - Screen descriptors with options
- `navigation` - Navigation object for navigation actions

### Icon Pattern (Follow Existing)

```typescript
// src/components/ui/icons/monitor.tsx
import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export const Monitor = ({ color = '#000', ...props }: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="..." // SVG path data
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
```

### Haptic Feedback

```typescript
import * as Haptics from 'expo-haptics';

const handleTabPress = () => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  // ... navigation
};
```

### Safe Area Handling

```typescript
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TabBar = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ paddingBottom: insets.bottom }}>
      {/* Tab buttons */}
    </View>
  );
};
```

### Project Structure Notes

**Current Structure (from Obytes template):**
```
src/app/
├── _layout.tsx           # Root layout
├── login.tsx            # Login screen
├── onboarding.tsx       # Onboarding screen
├── (app)/               # Tab navigator group
│   ├── _layout.tsx      # Tab layout (UPDATE THIS)
│   ├── index.tsx        # Feed → rename to Home
│   ├── style.tsx        # REMOVE (not in vara)
│   └── settings.tsx     # Keep and update
└── feed/                # REMOVE (not in vara)
```

**Target Structure:**
```
src/app/
├── _layout.tsx           # Root layout
├── login.tsx            # Login screen
├── onboarding.tsx       # Onboarding screen
├── (app)/               # Tab navigator group
│   ├── _layout.tsx      # Tab layout with custom TabBar
│   ├── index.tsx        # Home screen (StatusCircle hero)
│   ├── monitor.tsx      # Monitor screen shell
│   ├── alerts.tsx       # Alerts screen shell
│   └── settings.tsx     # Settings screen (keep existing)
```

**Files to Create:**
1. `src/components/layout/tab-bar.tsx`
2. `src/components/layout/tab-bar.test.tsx`
3. `src/components/ui/icons/monitor.tsx`
4. `src/components/ui/icons/alerts.tsx`
5. `src/app/(app)/monitor.tsx`
6. `src/app/(app)/alerts.tsx`

**Files to Update:**
1. `src/app/(app)/_layout.tsx` - Replace default tabs with custom TabBar
2. `src/app/(app)/index.tsx` - Convert from Feed to Home
3. `src/components/ui/icons/index.tsx` - Export new icons

**Files to Remove:**
1. `src/app/(app)/style.tsx`
2. `src/app/feed/` directory

### UX Requirements (from UX Design Specification)

- **Tab-Based Primary Navigation:** 4 tabs - Home, Monitor, Alerts, Settings
- **Touch Targets:** Minimum 44x44pt for all interactive elements
- **Haptic Feedback:** UX-16 requires haptic feedback on press
- **Color Design:** Charcoal background with mint active state
- **Typography:** Use `body-small` (13px) for tab labels

### Epic 1 Retrospective Learnings

From Epic 1 retrospective to apply here:
1. **Run type-check AND tests** before marking story complete
2. **Follow Obytes template patterns** for new screens
3. **Use existing MMKV storage instance** from `src/lib/storage.tsx`
4. **kebab-case for files** is strictly enforced by ESLint

### Testing Requirements

**Unit Tests for TabBar:**
```typescript
// tab-bar.test.tsx
describe('TabBar', () => {
  it('renders all 4 tabs', () => {...});
  it('highlights active tab with mint color', () => {...});
  it('navigates on tab press', () => {...});
  it('applies haptic feedback on press', () => {...});
});
```

**Integration Tests:**
- Test navigation flow between all tabs
- Test auth redirect works with new tab structure
- Test safe area rendering on different devices

### References

- [Architecture: Project Structure](/Users/samruben/vara-app/_bmad-output/architecture.md#project-organization)
- [Architecture: Navigation Pattern](/Users/samruben/vara-app/_bmad-output/architecture.md#frontend-architecture)
- [UX: Tab Navigation](/Users/samruben/vara-app/_bmad-output/project-planning-artifacts/ux-design-specification.md#navigation-patterns)
- [UX: Design System](/Users/samruben/vara-app/_bmad-output/project-planning-artifacts/ux-design-specification.md#design-system-foundation)
- [Design Tokens](/Users/samruben/vara-app/src/lib/design-system.ts)
- [Colors](/Users/samruben/vara-app/src/lib/colors.ts)
- [Project Context](/Users/samruben/vara-app/_bmad-output/project-context.md)
- [Expo Router Tabs Docs](https://docs.expo.dev/router/advanced/tabs/)
- [Custom Tab Layouts](https://docs.expo.dev/router/advanced/custom-tabs/)

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

None - implementation proceeded without issues.

### Completion Notes List

- **Task 1**: Created custom TabBar component at `src/components/layout/tab-bar.tsx` with:
  - 4 tabs (Home, Monitor, Alerts, Settings) with icons and labels
  - Mint (#B1EFE3) active state, charcoal (#1E1E1E) background
  - 44x44pt minimum touch targets
  - Haptic feedback via expo-haptics
  - Safe area handling via useSafeAreaInsets
  - Unit tests with 7 test cases (100% passing)

- **Task 2**: Created new icons:
  - `src/components/ui/icons/monitor.tsx` - Eye/vision icon for monitoring
  - `src/components/ui/icons/alerts.tsx` - Bell notification icon
  - Exported from icons index

- **Task 3**: Restructured app directory:
  - Updated `_layout.tsx` to use custom TabBar component
  - Converted `index.tsx` to Home screen shell
  - Created `monitor.tsx` and `alerts.tsx` shell screens
  - Removed `style.tsx` and `feed/` directory (not in vara design)

- **Task 4**: Configured tab navigation:
  - Set tabBarButtonTestID for each tab
  - Set appropriate titles
  - Configured headerShown: false for all screens

- **Task 5**: Implemented safe area handling using useSafeAreaInsets

- **Task 6**: All integration tests passing:
  - `pnpm run type-check` - passes
  - `pnpm run test` - 109 tests passing
  - `pnpm run lint` - 0 errors

### File List

**Created:**
- `src/components/layout/tab-bar.tsx`
- `src/components/layout/tab-bar.test.tsx`
- `src/components/ui/icons/monitor.tsx`
- `src/components/ui/icons/alerts.tsx`
- `src/app/(app)/monitor.tsx`
- `src/app/(app)/alerts.tsx`
- `ios/ObytesApp.xcworkspace/` (generated by pod install)

**Modified:**
- `src/app/(app)/_layout.tsx`
- `src/app/(app)/index.tsx`
- `src/components/ui/icons/index.tsx`
- `src/components/ui/icons/home.tsx` (code review fix: export style consistency)
- `package.json` (added expo-haptics, @react-navigation/bottom-tabs)
- `pnpm-lock.yaml` (lockfile update)
- `ios/Podfile.lock` (pod dependencies)
- `ios/ObytesApp.xcodeproj/project.pbxproj` (Xcode project update)
- `ios/ObytesApp/PrivacyInfo.xcprivacy` (privacy manifest)

**Deleted:**
- `src/app/(app)/style.tsx`
- `src/app/feed/[id].tsx`
- `src/app/feed/add-post.tsx`

## Change Log

| Date | Change |
|------|--------|
| 2025-12-19 | Story implementation complete - custom TabBar with 4 tabs, new icons, screen restructuring, safe area handling, all tests passing |
| 2025-12-19 | Code review fixes: (1) TabBar now uses dynamic colorScheme instead of hardcoded dark, (2) Added accessibility labels to all tabs, (3) Tab labels use typography tokens from design system, (4) Home icon export style aligned with other icons, (5) File List updated with all changed files |
