/**
 * vara Design System - Shadow & Effect Tokens
 *
 * Status circle glow effects and card elevation shadows.
 */

import { statusColors } from './colors';

// === GLOW EFFECT DEFINITIONS ===
export const glowEffects = {
  protected: {
    inner: { spread: 40, opacity: 0.5, color: statusColors.protected },
    outer: { spread: 80, opacity: 0.3, color: statusColors.protected },
  },
  attention: {
    inner: { spread: 40, opacity: 0.5, color: statusColors.attention },
    outer: { spread: 80, opacity: 0.3, color: statusColors.attention },
  },
  critical: {
    inner: { spread: 40, opacity: 0.5, color: statusColors.critical },
    outer: { spread: 80, opacity: 0.3, color: statusColors.critical },
  },
} as const;

// === CARD ELEVATION SHADOWS ===
export const cardShadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  lg: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  xl: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
} as const;

// === STATUS GLOW STYLE HELPERS ===
// These generate React Native shadow styles for the status circle glow effect
export const getGlowStyle = (status: keyof typeof glowEffects) => {
  const glow = glowEffects[status];
  return {
    shadowColor: glow.outer.color,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: glow.outer.opacity,
    shadowRadius: glow.outer.spread,
    elevation: 8,
  };
};

// === TYPE EXPORTS ===
export type GlowStatus = keyof typeof glowEffects;
export type CardShadowKey = keyof typeof cardShadows;
export type GlowEffect = (typeof glowEffects)[GlowStatus];
export type CardShadow = (typeof cardShadows)[CardShadowKey];

// === COMBINED EXPORT ===
export const shadows = {
  glow: glowEffects,
  card: cardShadows,
  getGlowStyle,
} as const;
