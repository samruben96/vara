/**
 * vara Design System - Color Tokens
 *
 * Brand colors and semantic color mappings for light/dark modes.
 * Dual export for TypeScript usage and Tailwind configuration.
 *
 * Updated: Story 2.9 - Modern minimalist visual refresh
 */

// === BRAND COLORS ===
export const brandColors = {
  // Legacy colors (deprecated, use new colors below)
  cream: '#FEFAF1', // Light backgrounds, text on dark
  lavender: '#D7CAE6', // Secondary accents, soft highlights
  mint: '#B1EFE3', // Protection status, success states (use sageGreen instead)
  coral: '#FFAB91', // Legacy coral (use new coral #E8A87C for CTAs)
  charcoal: '#1E1E1E', // Dark backgrounds, primary text

  // NEW: Story 2.9 - Modern minimalist design colors
  warmCream: '#FBF7F4', // Primary background (warmer than cream)
  darkTeal: '#2D4F4F', // Brand elements, logo
  sageGreen: '#A8D5BA', // Success/protected status
  sageTint: '#F5FAF7', // Protection score card background
  teal: '#7DD3C0', // Gradient start
  lavenderGradient: '#B8A9D4', // Gradient end (renamed to avoid conflict)
} as const;

// === CTA COLORS ===
export const ctaColors = {
  coral: '#E8A87C', // Primary CTA buttons
  coralDark: '#D4956D', // Pressed/active state
  coralLight: '#F5D4C0', // Subtle coral tint
} as const;

// === TEXT COLORS ===
export const textColors = {
  charcoal: '#1E1E1E', // Primary text
  darkGray: '#4A4A4A', // Secondary text
  mutedGray: '#8A8A8A', // Tertiary/muted text
  softGray: '#B0B0B0', // Placeholder, disabled
} as const;

// === STATUS COLORS ===
export const statusColors = {
  protected: '#A8D5BA', // Sage Green - Protected/Success (updated from mint)
  attention: '#E8A87C', // Coral - Attention/Warning (updated to new coral)
  critical: '#E57373', // Red - Critical/Error
} as const;

// === FEEDBACK COLORS (for banners, alerts, notifications) ===
export const feedbackColors = {
  success: {
    background: '#E8F5E9', // Light green background
    text: '#2E7D32', // Dark green text
  },
  error: {
    background: '#FFEBEE', // Light red background
    text: '#C62828', // Dark red text
  },
  warning: {
    background: '#FFF3E0', // Light orange background
    text: '#E65100', // Dark orange text
  },
  info: {
    background: '#E3F2FD', // Light blue background
    text: '#1565C0', // Dark blue text
  },
} as const;

// === SEMANTIC COLORS - LIGHT MODE ===
export const lightColors = {
  background: {
    primary: '#FBF7F4', // Warm Cream (updated from #FEFAF1)
    secondary: '#FFFFFF',
    sageTint: '#F5FAF7', // Protection score card background
  },
  text: {
    primary: '#1E1E1E', // Charcoal
    secondary: '#4A4A4A', // Dark Gray (updated)
    tertiary: '#8A8A8A', // Muted Gray (updated)
    muted: '#B0B0B0', // Soft Gray
  },
  status: {
    protected: '#A8D5BA', // Sage Green (updated from mint)
    attention: '#E8A87C', // Coral (updated)
    critical: '#E57373', // Red
  },
  accent: {
    primary: '#D7CAE6', // Lavender
    teal: '#7DD3C0', // Gradient teal
    lavender: '#B8A9D4', // Gradient lavender
  },
  cta: {
    primary: '#E8A87C', // Coral
    primaryPressed: '#D4956D', // Coral dark
    primaryText: '#1E1E1E', // Charcoal for button text (better contrast than dark teal)
  },
  brand: {
    darkTeal: '#2D4F4F',
  },
  border: {
    primary: '#E5E5E5',
    secondary: '#F0F0F0',
  },
} as const;

// === SEMANTIC COLORS - DARK MODE ===
export const darkColors = {
  background: {
    primary: '#1E1E1E', // Charcoal
    secondary: '#2A2A2A',
    sageTint: '#1A2A2A', // Dark version of sage tint
  },
  text: {
    primary: '#FBF7F4', // Warm Cream
    secondary: '#AAAAAA',
    tertiary: '#777777',
    muted: '#555555',
  },
  status: {
    protected: '#A8D5BA', // Sage Green
    attention: '#E8A87C', // Coral
    critical: '#E57373', // Red
  },
  accent: {
    primary: '#D7CAE6', // Lavender
    teal: '#7DD3C0', // Gradient teal
    lavender: '#B8A9D4', // Gradient lavender
  },
  cta: {
    primary: '#E8A87C', // Coral
    primaryPressed: '#D4956D', // Coral dark
    primaryText: '#1E1E1E', // Charcoal for dark mode button text
  },
  brand: {
    darkTeal: '#7DD3C0', // Lighter teal for dark mode
  },
  border: {
    primary: '#3A3A3A',
    secondary: '#2E2E2E',
  },
} as const;

// === COMBINED SEMANTIC COLORS ===
export const semanticColors = {
  light: lightColors,
  dark: darkColors,
} as const;

// === TAILWIND EXPORT ===
// Format for Tailwind's color system
// Note: charcoal is NOT included directly because colors.js already has charcoal shades (50-950)
// Use bg-charcoal-900 for vara's #1E1E1E, or bg-vara-charcoal for explicit access
export const tailwindColors = {
  // Legacy direct brand color access (bg-cream, text-mint, etc.)
  cream: '#FEFAF1',
  lavender: '#D7CAE6',
  mint: '#B1EFE3',

  // NEW: Story 2.9 - Modern minimalist design colors
  'warm-cream': '#FBF7F4',
  'dark-teal': '#2D4F4F',
  'sage-green': '#A8D5BA',
  'sage-tint': '#F5FAF7',
  teal: '#7DD3C0',
  'lavender-gradient': '#B8A9D4',

  // CTA colors (bg-cta-coral, etc.)
  cta: {
    coral: '#E8A87C',
    'coral-dark': '#D4956D',
    'coral-light': '#F5D4C0',
  },

  // Namespaced brand colors (bg-vara-cream, bg-vara-charcoal, etc.)
  vara: {
    cream: '#FEFAF1',
    'warm-cream': '#FBF7F4',
    lavender: '#D7CAE6',
    mint: '#B1EFE3',
    coral: '#E8A87C', // Updated to new coral
    charcoal: '#1E1E1E',
    'dark-teal': '#2D4F4F',
    'sage-green': '#A8D5BA',
  },

  // Status colors (bg-status-protected, etc.)
  status: {
    protected: '#A8D5BA', // Updated to sage green
    attention: '#E8A87C', // Updated to new coral
    critical: '#E57373',
  },

  // Text colors (text-muted-gray, etc.)
  'muted-gray': '#8A8A8A',
  'soft-gray': '#B0B0B0',
  'dark-gray': '#4A4A4A',
};

// === TYPE EXPORTS ===
export type BrandColor = keyof typeof brandColors;
export type StatusColor = keyof typeof statusColors;
export type SemanticColorMode = keyof typeof semanticColors;
export type LightSemanticColor = typeof lightColors;
export type DarkSemanticColor = typeof darkColors;

// === SEMANTIC COLOR HELPER ===
// Use this to get the correct colors based on color scheme
export type ColorScheme = 'light' | 'dark';

export const getSemanticColors = (
  colorScheme: ColorScheme | null | undefined
) => {
  return colorScheme === 'dark' ? darkColors : lightColors;
};

// === COMBINED EXPORT FOR DESIGN SYSTEM ===
export const colors = {
  brand: brandColors,
  cta: ctaColors,
  text: textColors,
  status: statusColors,
  semantic: semanticColors,
  light: lightColors,
  dark: darkColors,
  getSemanticColors,
} as const;
