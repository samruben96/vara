/**
 * vara Design System - Spacing Tokens
 *
 * 8px base unit spacing system and layout constants.
 */

// === SPACING SCALE (8px base unit) ===
export const spacing = {
  xs: 4, // Icon-to-text, tight groupings
  sm: 8, // Related elements, button padding
  md: 16, // Standard component spacing
  lg: 24, // Section breaks, card padding
  xl: 32, // Major separations, screen margins
  '2xl': 48, // Hero breathing room
  '3xl': 64, // Dramatic white space
} as const;

// === LAYOUT CONSTANTS ===
export const layout = {
  screenMargin: 24,
  cardPadding: 20,
  cardRadius: 16,
  gutterWidth: 16,
  headerHeight: 56,
  tabBarHeight: 80,
  buttonHeight: 48,
  inputHeight: 48,
} as const;

// === BORDER RADIUS ===
export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  full: 9999,
} as const;

// === TYPE EXPORTS ===
export type SpacingKey = keyof typeof spacing;
export type LayoutKey = keyof typeof layout;
export type BorderRadiusKey = keyof typeof borderRadius;

// === COMBINED EXPORT ===
export const spacingTokens = {
  spacing,
  layout,
  borderRadius,
} as const;
