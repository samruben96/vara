/**
 * vara Design System - Typography Tokens
 *
 * Plus Jakarta Sans type scale with font sizes, weights, and line heights.
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
  display: 32,
  h1: 24,
  h2: 20,
  h3: 17,
  body: 15,
  bodySmall: 13,
  caption: 11,
} as const;

// === LINE HEIGHTS ===
export const lineHeights = {
  display: 1.2,
  h1: 1.3,
  h2: 1.3,
  h3: 1.4,
  body: 1.5,
  bodySmall: 1.5,
  caption: 1.4,
} as const;

// === LETTER SPACING ===
export const letterSpacing = {
  tight: -0.5,
  normal: 0,
  wide: 0.5,
} as const;

// === TYPE SCALE (Combined) ===
export const typeScale = {
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
} as const;
