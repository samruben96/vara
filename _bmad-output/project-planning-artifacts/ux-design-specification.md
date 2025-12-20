---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
inputDocuments:
  - docs/product/prd.md
  - docs/product/product-brief.md
workflowType: 'ux-design'
lastStep: 14
project_name: 'vara'
user_name: 'Sam'
date: '2024-12-17'
status: 'complete'
---

# UX Design Specification - vara

**Author:** Sam
**Date:** 2024-12-17
**Status:** Complete

---

## Executive Summary

### Project Vision

vara is a pioneering mobile-first digital safety platform built specifically for women. It fills a critical gap where cybersecurity protects devices and platforms protect themselves, but no product protects *people*. vara provides continuous monitoring, early threat detection, and calm, actionable guidance—giving women a single place to manage their digital safety.

### Target Users

| Segment | Primary Needs | UX Considerations |
|---------|---------------|-------------------|
| **General women 18-45** | Proactive protection, peace of mind | Simple, jargon-free interface |
| **Content creators** | Image monitoring, impersonation detection | Efficient multi-image management |
| **Dating app users** | Identity verification, stalking prevention | Quick status checks |
| **Harassment survivors** | Ongoing monitoring, evidence collection | Trauma-informed design |

**Technical sophistication:** Mixed audience requiring both simplicity for non-technical users and depth for privacy-conscious users.

**Primary usage patterns:** Quick check-ins and responding to alerts (not deep exploration sessions).

### Key Design Challenges

1. **Pioneering UX patterns** - No existing mental models for "digital safety" products. Must teach and guide while remaining intuitive.

2. **Calm urgency balance** - Communicate real threats without causing panic. Empower action, don't trigger fear.

3. **Glanceable status** - Quick check-ins require instant comprehension of protection status.

4. **Sensitive content handling** - Users may encounter their images in disturbing contexts. Requires trauma-informed design.

### Design Opportunities

1. **The "magic moment"** - Finding exposure paired with immediate, actionable remediation steps. This is the core value delivery.

2. **Alert-first mobile design** - Optimize for notification-driven interactions and quick response flows.

3. **Category-defining experience** - As first-of-kind, vara can establish how digital safety should feel: calm, competent, protective.

---

## Core User Experience

### Defining Experience

**Primary interaction pattern:** Quick check-ins to confirm protection status ("all clear"), with alert-driven engagement when threats are detected.

**Core loop:**
1. Open app → See protection status instantly → Close (daily)
2. Receive alert → Understand threat → Take guided action → Confirm resolution (when needed)

**Critical path:** The alert-to-action flow when something is found. This is where vara delivers its core value—finding exposure and providing immediate, actionable remediation.

### The Core Promise

**"vara watches so I don't have to."**

vara's defining experience is a persistent state of protection - users can live their digital life knowing a capable guardian has their back. This creates the ultimate emotional payoff: **"I feel safe, protected, and can live my life."**

### Dual Experience Model

vara delivers its promise through two complementary experiences:

| Experience | Trigger | Duration | Emotional Payoff |
|------------|---------|----------|------------------|
| **Daily Reassurance** | User opens app | < 5 seconds | "I'm protected, carry on" |
| **Decisive Action** | Threat detected | Variable | "Something happened, it's handled" |

Neither experience alone defines vara - together they create persistent protection.

### Platform Strategy

| Aspect | Decision |
|--------|----------|
| **Primary platform** | Mobile (iOS + Android via Expo/React Native) |
| **Future platforms** | Tablet-optimized layouts planned |
| **Interaction model** | Touch-first, notification-driven |
| **Connectivity** | Always-connected (no offline mode required) |

**Device capabilities to leverage:**
- **Camera** - Frictionless photo capture for monitoring
- **Biometrics** - Face ID/fingerprint for secure, quick access
- **Haptics** - Tactile feedback reinforcing protection status and alerts
- **Push notifications** - Critical for alert-driven experience

### Experience Principles

1. **Glanceable confidence** - Protection status understood in under 2 seconds
2. **Calm clarity** - Even bad news delivered in a way that empowers, not panics
3. **Transparent automation** - Show what's happening, handle what we can, escalate only when necessary
4. **Sensory reassurance** - Biometrics, haptics, and visual cues reinforce security and trust
5. **Zero dead ends** - Every screen has a clear next action; users never feel stuck

---

## Desired Emotional Response

### Primary Emotional Goals

**Core emotional promise:** vara makes users feel like they have a vigilant, capable guardian for their digital life.

**Share-worthy feelings (what makes users tell friends):**
1. "I feel so much safer now" - Security and peace of mind
2. "I finally found out about X and they helped me fix it" - Discovery and resolution
3. "It's like having a bodyguard for my online life" - Protective presence

### User Mental Model

**vara is like:**
- A bodyguard watching for threats so you don't have to
- A home security system with green light = all well
- A trusted friend who's really good at digital safety

**Mental state transformation:**

| Without vara | With vara |
|--------------|-----------|
| Anxiety: "I don't know what's out there" | Confidence: "I know my status" |
| Helplessness: "What would I even do?" | Capability: "I have a plan" |
| Avoidance: "I'd rather not know" | Freedom: "I can focus on my life" |

### Emotional Journey Mapping

| Stage | Primary Emotion | Supporting Feelings |
|-------|-----------------|---------------------|
| **First open** | Hopeful curiosity | "Maybe this can help me" |
| **Initial scan** | Anticipation → Revelation | Discovery, validation |
| **All clear status** | Relief, confidence | Protected, peace of mind |
| **Alert received** | Alert but not alarmed | Serious but manageable |
| **Viewing threat** | Validated, supported | "This is real, you're not alone" |
| **Taking action** | Empowered, capable | Control, agency |
| **Resolution** | Accomplished, secure | Closure, confidence restored |
| **Return visit** | Reassured, trusting | Ongoing protection confirmed |

### Trauma-Informed Emotional Design

When users encounter disturbing content (deepfakes, harassment, image misuse), vara delivers a **three-part emotional response**:

1. **Validate** - "This is serious and it matters"
2. **Support** - "You're not alone, we're here"
3. **Empower** - "Here's exactly what we do now"

**Critical anti-patterns to prevent:**
- Never minimize ("It's not that bad")
- Never blame ("You should have...")
- Never overwhelm (information dump without guidance)
- Never abandon (dead ends without next steps)

### Emotional Design Principles

1. **Guardian presence** - vara feels like a protective companion, not a cold tool
2. **Measured urgency** - Serious when needed, calm by default
3. **Validate-Support-Empower** - Three-part response to difficult discoveries
4. **Zero shame design** - Language and framing that never blames the user
5. **Closure completeness** - Every threat resolved ends with clear confirmation and emotional release

---

## Design System Foundation

### Design System Choice

**Approach:** Custom Design System built on React Native primitives

**Rationale:** vara requires a completely unique visual identity that reflects its role as a calm, protective guardian. Rather than fighting against an established system's defaults, we'll build custom components that embody vara's personality from the ground up.

### Core Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Base** | React Native + Expo | Cross-platform foundation |
| **Animation** | react-native-reanimated | Fluid, performant animations |
| **Gestures** | react-native-gesture-handler | Native gesture support |
| **Icons** | Phosphor Icons (or custom) | Elegant, consistent iconography |

### Brand Color System

| Token | Hex | Usage |
|-------|-----|-------|
| `cream` | #FEFAF1 | Light backgrounds, text on dark |
| `lavender` | #D7CAE6 | Secondary accents, soft highlights |
| `mint` | #B1EFE3 | Protection status, success states, "all clear" |
| `coral` | #FFAB91 | Attention states, soft alerts (non-alarming) |
| `charcoal` | #1E1E1E | Dark backgrounds, primary text on light |

**Color Philosophy:**
- Warm, not clinical
- Protective, not scary
- Feminine without being stereotypical
- Calm confidence in every state

### Semantic Color Mapping

| Semantic Token | Light Mode | Dark Mode | Usage |
|----------------|------------|-----------|-------|
| `background.primary` | cream | charcoal | Main app background |
| `background.secondary` | white | #2A2A2A | Cards, elevated surfaces |
| `text.primary` | charcoal | cream | Main text |
| `text.secondary` | #666666 | #AAAAAA | Supporting text |
| `status.protected` | mint | mint | All-clear, safe states |
| `status.attention` | coral | coral | Alerts requiring action |
| `status.critical` | #E57373 | #E57373 | Critical threats (used sparingly) |
| `accent.primary` | lavender | lavender | Interactive elements, highlights |

---

## Visual Design Foundation

### Typography System

**Primary Typeface:** Plus Jakarta Sans (Google Fonts)

**Rationale:** Modern geometric sans-serif with subtle warmth. Delivers premium, sophisticated feel like Oura while maintaining approachability for sensitive content. Works beautifully in dark mode.

**Type Scale:**

| Token | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| `display` | 32px | 600 | 1.2 | Hero status text, protection score |
| `h1` | 24px | 600 | 1.3 | Screen titles |
| `h2` | 20px | 600 | 1.3 | Section headers |
| `h3` | 17px | 600 | 1.4 | Card titles, alert headers |
| `body` | 15px | 400 | 1.5 | Primary content, descriptions |
| `body-small` | 13px | 400 | 1.5 | Secondary content, metadata |
| `caption` | 11px | 500 | 1.4 | Labels, timestamps, badges |

**Font Weights:**
- 400 (Regular) - Body text, descriptions
- 500 (Medium) - Emphasis, labels
- 600 (Semibold) - Headings, important UI elements

### Spacing System

**Base Unit:** 8px
**Philosophy:** Airy and calm - generous white space supports the protective, reassuring aesthetic

**Spacing Scale:**

| Token | Value | Usage |
|-------|-------|-------|
| `space-xs` | 4px | Icon-to-text, tight groupings |
| `space-sm` | 8px | Related elements, button padding |
| `space-md` | 16px | Standard component spacing |
| `space-lg` | 24px | Section breaks, card padding |
| `space-xl` | 32px | Major separations, screen margins |
| `space-2xl` | 48px | Hero breathing room |
| `space-3xl` | 64px | Dramatic white space |

**Layout Principles:**
- Screen margins: 24px (generous, premium feel)
- Card padding: 20px (comfortable for touch, airy)
- Vertical section spacing: 24px minimum
- Hero elements: 48-64px vertical breathing room

### Layout Foundation

**Primary Layout: Hero + Summary Cards**

The home screen uses a hero-dominant layout with supporting summary cards:

1. **Hero Protection Status** (top 40% of screen)
   - Single, dominant element
   - Glanceable in < 2 seconds
   - Mint glow when protected
   - Generous white space around

2. **Summary Cards** (below hero)
   - 2-column grid for quick metrics
   - Images monitored, Alerts, Activity
   - Tap to drill into details

3. **Activity Feed** (scrollable if needed)
   - Recent scan activity
   - Resolved issues
   - Progressive disclosure

**Grid System:**
- 24px screen margins
- 16px gutter between columns
- 2-column grid for summary cards
- Full-width for hero and detailed content

---

## Design Direction

### Chosen Direction: Minimal Zen with Glow

**Combination of:** Direction 1 (Minimal Zen layout) + Direction 6 (Gradient Glow effects)

**Core Concept:** Maximum breathing room with a premium glowing status indicator. The design prioritizes calm, airy aesthetics while the radiating glow communicates active protection.

### Layout Decisions

**From Direction 1 (Minimal Zen):**
- Centered, single focal point layout
- Maximum breathing room and white space
- Ultra-clean aesthetic with minimal elements
- 2-column summary cards below hero
- Zen-like tranquility supporting calm confidence

**From Direction 6 (Gradient Glow):**
- Glowing status circle with radiating mint effect
- Soft shadow layers creating depth
- Premium luminous quality
- Active, "alive" feeling to protection status

### Visual Specifications

**Hero Status Element:**
- Centered glowing circle (120-140px diameter)
- Mint (#B1EFE3) primary color
- Multi-layer glow effect:
  - Inner glow: 40px spread, 50% opacity
  - Outer glow: 80px spread, 30% opacity
- Checkmark icon centered within
- "Protected" label below in cream (#FEFAF1)

**Background:**
- Charcoal (#1E1E1E) base
- Optional subtle gradient wash at top (mint at 10-15% opacity)

**Summary Cards:**
- 2-column grid below hero
- Card background: #2A2A2A
- 16px border radius
- 20px padding
- Generous 16px gap between cards

**Status Circle Implementation:**
```css
.status-circle {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: #B1EFE3;
  box-shadow:
    0 0 40px rgba(177, 239, 227, 0.5),
    0 0 80px rgba(177, 239, 227, 0.3),
    inset 0 -20px 40px rgba(0, 0, 0, 0.1);
}
```

**State Variations:**
- Protected: Mint glow (#B1EFE3)
- Attention needed: Coral glow (#FFAB91)
- Critical: Soft red glow (#E57373) - used sparingly
- Scanning: Pulsing animation on glow

---

## User Journeys

### Journey 1: First-Time User Onboarding

**Goal:** Transform new user from curious to protected and confident

| Step | Screen | User Action | System Response | Emotional State |
|------|--------|-------------|-----------------|-----------------|
| 1 | Welcome | Opens app | Brand intro, value prop | Hopeful, curious |
| 2 | Sign Up | Creates account | Quick auth flow | Committed |
| 3 | Permissions | Grants camera, notifications | Explains why needed | Trusting |
| 4 | Add Photos | Uploads/captures photos | Shows photos being processed | Anticipation |
| 5 | First Scan | Waits | Progress indicator, reassuring copy | Slight anxiety |
| 6 | Results | Views findings | Clear summary, no threats or action items | Relief, impressed |
| 7 | Home | Sees protection status | Glowing "Protected" status | Confident, protected |

**Critical Design Considerations:**
- Explain value before asking for permissions
- Show progress during first scan (don't leave user wondering)
- Celebrate "all clear" results without minimizing the service
- End on protection status to establish core mental model

### Journey 2: Daily Check-In (Primary Flow)

**Goal:** Instant reassurance in under 5 seconds

| Step | Duration | User Action | System Response | Emotional State |
|------|----------|-------------|-----------------|-----------------|
| 1 | <1s | Opens app | Biometric unlock | Secure |
| 2 | <1s | Glances at screen | Hero status visible immediately | Checking |
| 3 | <1s | Sees mint glow | "Protected" with subtle pulse | Relief |
| 4 | <2s | Closes app | - | Confident |

**Design Requirements:**
- Status must be visible within 500ms of app open
- No loading states blocking the hero status
- Background data fetch, never blocks UI
- Haptic pulse on status confirmation (optional)

### Journey 3: Threat Alert Response

**Goal:** Empower user to take action on discovered threat

| Step | Screen | User Action | System Response | Emotional State |
|------|--------|-------------|-----------------|-----------------|
| 1 | Lock screen | Sees notification | "vara found something" (calm tone) | Alert |
| 2 | Alert detail | Taps notification | Opens to threat detail screen | Concerned |
| 3 | Context | Reviews finding | Shows what, where, severity | Informed |
| 4 | Content preview | Optionally views | Blurred by default, tap to reveal | Controlled |
| 5 | Actions | Reviews options | Recommended action highlighted | Empowered |
| 6 | Execute | Taps action | Guided flow or one-tap resolution | In control |
| 7 | Confirmation | Sees result | Clear "Resolved" status | Relief |
| 8 | Return home | Navigates back | Status updated, history logged | Confident |

**Critical Design Considerations:**
- Notification copy must be calm, not alarming
- Sensitive content blurred by default (user controls reveal)
- Recommended action always most prominent
- Clear completion confirmation with emotional closure

### Journey 4: Adding New Photos to Monitor

**Goal:** Frictionless expansion of protection

| Step | Screen | User Action | System Response | Emotional State |
|------|--------|-------------|-----------------|-----------------|
| 1 | Home | Taps "Add" or photo card | Opens add flow | Proactive |
| 2 | Source selection | Chooses camera/library | Permission handling if needed | - |
| 3 | Selection | Picks photos | Multi-select supported | - |
| 4 | Confirmation | Reviews selection | Shows count, "Add to monitoring" | Confirming |
| 5 | Processing | Waits briefly | Progress indicator | Brief patience |
| 6 | Complete | Sees confirmation | "X photos now protected" | Satisfied |

### Journey 5: Subscription Upgrade

**Goal:** Convert free user to paid subscriber

| Step | Screen | User Action | System Response | Emotional State |
|------|--------|-------------|-----------------|-----------------|
| 1 | Paywall trigger | Hits feature limit | Soft paywall, explains value | Considering |
| 2 | Plans | Reviews options | Clear tier comparison | Evaluating |
| 3 | Selection | Chooses plan | Highlights best value | Decided |
| 4 | Payment | Completes purchase | Native payment sheet | Committed |
| 5 | Confirmation | Sees success | Welcome to premium, new features | Valued |

---

## Screen Inventory

### Primary Screens

| Screen | Purpose | Key Components |
|--------|---------|----------------|
| **Home** | Protection status at a glance | Hero status circle, summary cards, tab bar |
| **Monitor** | View all monitored items | Image grid, account list, add buttons |
| **Alerts** | Threat notifications | Alert list, severity badges, action buttons |
| **Settings** | Account & app configuration | Settings groups, toggle switches, navigation |

### Secondary Screens

| Screen | Purpose | Access Point |
|--------|---------|--------------|
| **Alert Detail** | Full threat information | Tap alert in list |
| **Image Detail** | Single image status | Tap image in grid |
| **Account Detail** | Linked account status | Tap account in list |
| **Add Photos** | Photo upload flow | Add button, home card |
| **Link Account** | Social account connection | Add button, monitor screen |
| **Scan History** | Past scan results | Settings or home |
| **Help/Support** | AI assistant, resources | Settings, contextual |
| **Plan Selection** | Subscription options | Settings, paywall |

### Modal/Overlay Screens

| Screen | Purpose | Trigger |
|--------|---------|---------|
| **Content Preview** | View sensitive finding | Tap to reveal in alert |
| **Action Confirmation** | Confirm critical actions | Before destructive actions |
| **Quick Actions** | Contextual action sheet | Long press, overflow menu |
| **Onboarding** | First-time user flow | First app launch |

---

## Component Strategy

### Core Components

#### StatusCircle
**Purpose:** Hero protection status indicator

**Variants:**
- `protected` - Mint glow, checkmark
- `attention` - Coral glow, exclamation
- `critical` - Red glow, warning icon
- `scanning` - Pulsing animation

**Props:**
```typescript
interface StatusCircleProps {
  status: 'protected' | 'attention' | 'critical' | 'scanning';
  size?: 'sm' | 'md' | 'lg'; // 80px, 120px, 160px
  showLabel?: boolean;
  onPress?: () => void;
}
```

#### SummaryCard
**Purpose:** Quick metric display

**Props:**
```typescript
interface SummaryCardProps {
  value: string | number;
  label: string;
  icon?: IconName;
  status?: 'default' | 'success' | 'warning';
  onPress?: () => void;
}
```

#### AlertCard
**Purpose:** Threat notification display

**Props:**
```typescript
interface AlertCardProps {
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
  status: 'new' | 'viewed' | 'resolved';
  onPress: () => void;
}
```

#### ActionButton
**Purpose:** Primary/secondary actions

**Variants:**
- `primary` - Mint background, charcoal text
- `secondary` - Transparent, mint border
- `danger` - Coral background (used sparingly)
- `ghost` - Text only

**Props:**
```typescript
interface ActionButtonProps {
  label: string;
  variant: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  onPress: () => void;
}
```

### Supporting Components

| Component | Purpose |
|-----------|---------|
| `ImageThumbnail` | Photo grid item with status indicator |
| `AccountRow` | Linked account list item |
| `ActivityItem` | Scan history/activity log entry |
| `SeverityBadge` | Threat level indicator |
| `ProgressRing` | Scan/upload progress |
| `ContentBlur` | Sensitive content protection |
| `EmptyState` | No data placeholder |
| `SettingsRow` | Settings list item |

### Navigation Components

| Component | Purpose |
|-----------|---------|
| `TabBar` | Primary navigation (Home, Monitor, Alerts, Settings) |
| `Header` | Screen header with back navigation |
| `BottomSheet` | Modal content sheets |

---

## UX Patterns

### Status Communication

**Protection Status Hierarchy:**
```
Protected (mint) → Attention (coral) → Critical (red)
```

**Visual Indicators:**
- Color: Primary communication method
- Icon: Secondary reinforcement
- Animation: Draws attention when needed
- Haptics: Sensory confirmation

### Progressive Disclosure

**Information Layering:**
1. **Glance level:** Status + count (home screen)
2. **Scan level:** List with previews (monitor/alerts)
3. **Detail level:** Full information (detail screens)

**Sensitive Content Handling:**
```
Blurred (default) → Tap to reveal → Full view
```

### Loading & Feedback

**Loading States:**
- Skeleton screens for content loading
- Progress rings for active operations
- Pulsing glow for background scanning

**Success Feedback:**
- Mint flash/pulse
- Haptic confirmation
- Toast notification for non-blocking

**Error Handling:**
- Inline error messages (not blocking)
- Retry actions always available
- Graceful degradation

### Navigation Patterns

**Tab-Based Primary Navigation:**
- 4 tabs: Home, Monitor, Alerts, Settings
- Always accessible via bottom tab bar
- State preserved per tab

**Drill-Down for Details:**
- Tap list item → Detail screen
- Back button to return
- Swipe gestures for quick navigation

**Modal for Actions:**
- Bottom sheets for action menus
- Full-screen modals for complex flows
- Dismissible via swipe or tap outside

---

## Accessibility

### Visual Accessibility

**Color Contrast:**
- All text meets WCAG AA minimum (4.5:1 for body, 3:1 for large)
- Charcoal on cream: ~15:1 contrast ratio
- Cream on charcoal: ~15:1 contrast ratio
- Status colors tested for colorblind accessibility

**Color Independence:**
- Status never communicated by color alone
- Icons and text labels always accompany color
- Patterns/shapes as secondary indicators

### Touch Accessibility

**Touch Targets:**
- Minimum 44x44pt for all interactive elements
- Generous padding on buttons and cards
- Clear visual feedback on press
- No reliance on hover states

### Screen Reader Support

**VoiceOver/TalkBack:**
- All images have descriptive alt text
- Status announced clearly ("Protection status: Protected")
- Buttons describe action, not appearance
- Logical reading order maintained

### Motion Accessibility

**Reduced Motion:**
- Respect `prefers-reduced-motion` setting
- Essential animations simplified, not removed
- No information conveyed only through animation
- Static alternatives for animated content

### Typography Accessibility

**Dynamic Type Support:**
- Support for iOS Dynamic Type
- Support for Android font scaling
- Minimum body text: 15px
- Line heights optimized for readability (1.4-1.5)

---

## Responsive Strategy

### Device Support

**Primary (Phone):**
- iPhone SE (375pt) to iPhone Pro Max (430pt)
- Android phones 360dp to 420dp
- Full feature support

**Future (Tablet):**
- iPad and Android tablets
- Optimized layouts with sidebar navigation
- Multi-column layouts where appropriate

### Breakpoints

| Breakpoint | Width | Layout Changes |
|------------|-------|----------------|
| `phone-sm` | < 375pt | Compact spacing, smaller type |
| `phone` | 375-430pt | Default layout |
| `tablet` | > 600pt | Sidebar nav, multi-column |

### Orientation

**Portrait (Primary):**
- Optimized for one-handed use
- Full feature support

**Landscape (Supported):**
- Usable but not optimized
- Content reflows appropriately
- No features blocked

---

## Implementation Notes

### Design System Architecture

```
vara-design-system/
├── tokens/
│   ├── colors.ts         # Brand + semantic colors
│   ├── typography.ts     # Font families, sizes, weights
│   ├── spacing.ts        # 8px base unit system
│   ├── radius.ts         # Border radius scale
│   └── shadows.ts        # Elevation system + glow effects
├── primitives/
│   ├── Box.tsx           # Layout primitive with theme support
│   ├── Text.tsx          # Typography with semantic variants
│   ├── Pressable.tsx     # Interactive with haptic feedback
│   └── Icon.tsx          # Themed icon wrapper
├── components/
│   ├── StatusCircle.tsx  # Hero protection status
│   ├── SummaryCard.tsx   # Quick metric cards
│   ├── AlertCard.tsx     # Threat notifications
│   ├── ActionButton.tsx  # Primary/secondary actions
│   ├── ImageThumbnail.tsx
│   ├── ContentBlur.tsx   # Sensitive content protection
│   └── ...
└── navigation/
    ├── TabBar.tsx
    ├── Header.tsx
    └── BottomSheet.tsx
```

### Animation Guidelines

**Glow Pulse (Protected Status):**
```javascript
// Subtle pulse every 4 seconds
withRepeat(
  withSequence(
    withTiming(1.1, { duration: 1000 }),
    withTiming(1.0, { duration: 1000 })
  ),
  -1,
  false
)
```

**Status Transition:**
- Duration: 300ms
- Easing: ease-in-out
- Color and scale animate together

**Content Reveal:**
- Blur: 20px → 0px over 200ms
- Scale: 0.95 → 1.0

### Performance Considerations

- Lazy load images in grids
- Skeleton screens for perceived performance
- Background fetch for scan updates
- Optimize glow effects (use hardware acceleration)
- Minimize re-renders on status updates

---

## Success Metrics

### UX Success Criteria

| Criteria | Target | Measurement |
|----------|--------|-------------|
| **Status comprehension** | < 2 seconds | User testing |
| **Onboarding completion** | > 80% | Analytics |
| **Daily active usage** | > 60% of users | Analytics |
| **Alert response rate** | > 90% | Analytics |
| **Task completion (add photo)** | < 30 seconds | User testing |
| **User satisfaction** | > 4.5/5 | App store reviews |

### Emotional Success Indicators

- Users describe feeling "protected" and "safe"
- Low anxiety around app usage
- High confidence in taking action on threats
- Willingness to recommend to friends

---

## Appendix

### Design Direction Visualizer

Full interactive mockups available at: `docs/product/ux-design-directions.html`

### Reference Designs

- **Oura Ring** - Status score, premium dark aesthetic
- **Flo** - Women-first design, sensitive content handling
- **1Password** - Watchtower monitoring, trust through simplicity
- **DeleteMe** - "We handled it" transparency

### Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2024-12-17 | Initial UX design specification |
