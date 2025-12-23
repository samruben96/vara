/**
 * vara Design System - Typography Tokens
 *
 * Plus Jakarta Sans type scale with font sizes, weights, and line heights.
 *
 * Updated: Story 2.9 - Modern minimalist visual refresh
 * - Added scoreDisplay text style (AC9)
 * - Added sectionHeader style (AC6)
 * - Increased body line-height to 1.6 (AC7)
 */

// === FONT FAMILIES ===
export const fontFamilies = {
  jakarta: {
    regular: 'PlusJakartaSans-Regular',
    medium: 'PlusJakartaSans-Medium',
    semibold: 'PlusJakartaSans-SemiBold',
  },
  // Kept for backward compatibility with template
  inter: {
    regular: 'Inter',
  },
} as const;

// === FONT WEIGHTS ===
export const fontWeights = {
  regular: '400',
  medium: '500',
  semibold: '600',
} as const;

// === FONT SIZES ===
export const fontSizes = {
  scoreDisplay: 52, // Large protection score number (AC9)
  display: 32,
  h1: 24,
  h2: 20,
  sectionHeader: 18, // Section headers (AC6)
  h3: 17,
  body: 15,
  bodySmall: 13,
  caption: 11,
} as const;

// === LINE HEIGHTS ===
export const lineHeights = {
  scoreDisplay: 1.1, // Tight for large numbers
  display: 1.25, // Updated for better readability
  h1: 1.3,
  h2: 1.3,
  sectionHeader: 1.4,
  h3: 1.4,
  body: 1.6, // Increased from 1.5 for better readability (AC7)
  bodySmall: 1.5,
  caption: 1.5, // Slightly increased
} as const;

// === LETTER SPACING ===
export const letterSpacing = {
  tight: -0.5,
  normal: 0,
  wide: 0.5,
} as const;

// === TYPE SCALE (Combined) ===
export const typeScale = {
  scoreDisplay: {
    fontSize: fontSizes.scoreDisplay,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.scoreDisplay,
    fontFamily: fontFamilies.jakarta.medium,
  },
  display: {
    fontSize: fontSizes.display,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.display,
    fontFamily: fontFamilies.jakarta.semibold,
  },
  h1: {
    fontSize: fontSizes.h1,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.h1,
    fontFamily: fontFamilies.jakarta.semibold,
  },
  h2: {
    fontSize: fontSizes.h2,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.h2,
    fontFamily: fontFamilies.jakarta.semibold,
  },
  sectionHeader: {
    fontSize: fontSizes.sectionHeader,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.sectionHeader,
    fontFamily: fontFamilies.jakarta.semibold,
  },
  h3: {
    fontSize: fontSizes.h3,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.h3,
    fontFamily: fontFamilies.jakarta.semibold,
  },
  body: {
    fontSize: fontSizes.body,
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.body,
    fontFamily: fontFamilies.jakarta.regular,
  },
  bodySmall: {
    fontSize: fontSizes.bodySmall,
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.bodySmall,
    fontFamily: fontFamilies.jakarta.regular,
  },
  caption: {
    fontSize: fontSizes.caption,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.caption,
    fontFamily: fontFamilies.jakarta.medium,
  },
} as const;

// === TEXT STYLE PRESETS (Story 2.9) ===
// Ready-to-use style objects for consistent typography
export const textStyles = {
  screenTitle: {
    fontSize: 24,
    fontWeight: '600' as const,
    lineHeight: 1.3,
    fontFamily: fontFamilies.jakarta.semibold,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '600' as const,
    lineHeight: 1.4,
    fontFamily: fontFamilies.jakarta.semibold,
  },
  bodyText: {
    fontSize: 15,
    fontWeight: '400' as const,
    lineHeight: 1.6,
    fontFamily: fontFamilies.jakarta.regular,
  },
  secondaryText: {
    fontSize: 15,
    fontWeight: '400' as const,
    lineHeight: 1.5,
    fontFamily: fontFamilies.jakarta.regular,
    // Use with lightColors.text.tertiary or textColors.mutedGray
  },
  caption: {
    fontSize: 13,
    fontWeight: '400' as const,
    lineHeight: 1.5,
    fontFamily: fontFamilies.jakarta.regular,
  },
  scoreDisplay: {
    fontSize: 52,
    fontWeight: '500' as const,
    lineHeight: 1.1,
    fontFamily: fontFamilies.jakarta.medium,
  },
} as const;

// === TYPE EXPORTS ===
export type FontFamily = keyof typeof fontFamilies;
export type FontWeight = keyof typeof fontWeights;
export type FontSize = keyof typeof fontSizes;
export type TypeScaleKey = keyof typeof typeScale;

// === COMBINED EXPORT ===
export const typography = {
  families: fontFamilies,
  weights: fontWeights,
  sizes: fontSizes,
  lineHeights,
  letterSpacing,
  scale: typeScale,
  styles: textStyles,
} as const;
