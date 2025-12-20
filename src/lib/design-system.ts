/**
 * vara Design System - Barrel Export
 *
 * Single entry point for all design tokens.
 * Import from '@/lib/design-system' for full access to design tokens.
 */

// === COLOR EXPORTS ===
// === COMBINED DESIGN TOKENS TYPE ===
import { colors } from './colors';
import { shadows } from './shadows';
import { spacingTokens } from './spacing';
import { typography } from './typography';

export type {
  BrandColor,
  ColorScheme,
  DarkSemanticColor,
  LightSemanticColor,
  SemanticColorMode,
  StatusColor,
} from './colors';
export {
  brandColors,
  colors,
  darkColors,
  getSemanticColors,
  lightColors,
  semanticColors,
  statusColors,
  tailwindColors,
} from './colors';

// === TYPOGRAPHY EXPORTS ===
export type {
  FontFamily,
  FontSize,
  FontWeight,
  TypeScaleKey,
} from './typography';
export {
  fontFamilies,
  fontSizes,
  fontWeights,
  letterSpacing,
  lineHeights,
  typeScale,
  typography,
} from './typography';

// === SPACING EXPORTS ===
export type { BorderRadiusKey, LayoutKey, SpacingKey } from './spacing';
export { borderRadius, layout, spacing, spacingTokens } from './spacing';

// === SHADOW EXPORTS ===
export type {
  CardShadow,
  CardShadowKey,
  GlowEffect,
  GlowStatus,
} from './shadows';
export { cardShadows, getGlowStyle, glowEffects, shadows } from './shadows';

export interface DesignTokens {
  colors: typeof colors;
  typography: typeof typography;
  spacing: typeof spacingTokens;
  shadows: typeof shadows;
}

export const designTokens: DesignTokens = {
  colors,
  typography,
  spacing: spacingTokens,
  shadows,
};

export default designTokens;
