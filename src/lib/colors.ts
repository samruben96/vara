/**
 * vara Design System - Color Tokens
 *
 * Brand colors and semantic color mappings for light/dark modes.
 * Dual export for TypeScript usage and Tailwind configuration.
 */

// === BRAND COLORS ===
export const brandColors = {
  cream: '#FEFAF1', // Light backgrounds, text on dark
  lavender: '#D7CAE6', // Secondary accents, soft highlights
  mint: '#B1EFE3', // Protection status, success states
  coral: '#FFAB91', // Attention states, soft alerts
  charcoal: '#1E1E1E', // Dark backgrounds, primary text
} as const;

// === STATUS COLORS ===
export const statusColors = {
  protected: '#B1EFE3', // Mint - Protected/Success
  attention: '#FFAB91', // Coral - Attention/Warning
  critical: '#E57373', // Red - Critical/Error
} as const;

// === SEMANTIC COLORS - LIGHT MODE ===
export const lightColors = {
  background: {
    primary: '#FEFAF1', // Cream
    secondary: '#FFFFFF',
  },
  text: {
    primary: '#1E1E1E', // Charcoal
    secondary: '#666666',
    tertiary: '#999999',
  },
  status: {
    protected: '#B1EFE3', // Mint
    attention: '#FFAB91', // Coral
    critical: '#E57373', // Red
  },
  accent: {
    primary: '#D7CAE6', // Lavender
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
  },
  text: {
    primary: '#FEFAF1', // Cream
    secondary: '#AAAAAA',
    tertiary: '#777777',
  },
  status: {
    protected: '#B1EFE3', // Mint
    attention: '#FFAB91', // Coral
    critical: '#E57373', // Red
  },
  accent: {
    primary: '#D7CAE6', // Lavender
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
  // Direct brand color access (bg-cream, text-mint, etc.)
  cream: '#FEFAF1',
  lavender: '#D7CAE6',
  mint: '#B1EFE3',
  coral: '#FFAB91',
  // Namespaced brand colors (bg-vara-cream, bg-vara-charcoal, etc.)
  vara: {
    cream: '#FEFAF1',
    lavender: '#D7CAE6',
    mint: '#B1EFE3',
    coral: '#FFAB91',
    charcoal: '#1E1E1E',
  },
  // Status colors (bg-status-protected, etc.)
  status: {
    protected: '#B1EFE3',
    attention: '#FFAB91',
    critical: '#E57373',
  },
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
  status: statusColors,
  semantic: semanticColors,
  light: lightColors,
  dark: darkColors,
  getSemanticColors,
} as const;
