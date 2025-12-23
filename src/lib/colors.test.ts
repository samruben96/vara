/**
 * Color System Tests - Story 2.9
 *
 * Tests for the updated color tokens ensuring all new colors are properly exported
 * and semantic mappings are correct.
 */

import {
  brandColors,
  ctaColors,
  textColors,
  statusColors,
  lightColors,
  darkColors,
  semanticColors,
  tailwindColors,
  getSemanticColors,
  colors,
} from './colors';

describe('Color System - Story 2.9 Updates', () => {
  describe('Brand Colors', () => {
    it('exports legacy brand colors', () => {
      expect(brandColors.cream).toBe('#FEFAF1');
      expect(brandColors.lavender).toBe('#D7CAE6');
      expect(brandColors.mint).toBe('#B1EFE3');
      expect(brandColors.charcoal).toBe('#1E1E1E');
    });

    it('exports new modern minimalist colors', () => {
      expect(brandColors.warmCream).toBe('#FBF7F4');
      expect(brandColors.darkTeal).toBe('#2D4F4F');
      expect(brandColors.sageGreen).toBe('#A8D5BA');
      expect(brandColors.sageTint).toBe('#F5FAF7');
      expect(brandColors.teal).toBe('#7DD3C0');
      expect(brandColors.lavenderGradient).toBe('#B8A9D4');
    });
  });

  describe('CTA Colors', () => {
    it('exports coral CTA colors', () => {
      expect(ctaColors.coral).toBe('#E8A87C');
      expect(ctaColors.coralDark).toBe('#D4956D');
      expect(ctaColors.coralLight).toBe('#F5D4C0');
    });
  });

  describe('Text Colors', () => {
    it('exports text color hierarchy', () => {
      expect(textColors.charcoal).toBe('#1E1E1E');
      expect(textColors.darkGray).toBe('#4A4A4A');
      expect(textColors.mutedGray).toBe('#8A8A8A');
      expect(textColors.softGray).toBe('#B0B0B0');
    });
  });

  describe('Status Colors', () => {
    it('uses updated sage green for protected status', () => {
      expect(statusColors.protected).toBe('#A8D5BA');
    });

    it('uses updated coral for attention status', () => {
      expect(statusColors.attention).toBe('#E8A87C');
    });

    it('keeps red for critical status', () => {
      expect(statusColors.critical).toBe('#E57373');
    });
  });

  describe('Light Mode Semantic Colors', () => {
    it('uses warm cream as primary background', () => {
      expect(lightColors.background.primary).toBe('#FBF7F4');
    });

    it('includes sage tint background', () => {
      expect(lightColors.background.sageTint).toBe('#F5FAF7');
    });

    it('has updated text hierarchy', () => {
      expect(lightColors.text.primary).toBe('#1E1E1E');
      expect(lightColors.text.secondary).toBe('#4A4A4A');
      expect(lightColors.text.tertiary).toBe('#8A8A8A');
      expect(lightColors.text.muted).toBe('#B0B0B0');
    });

    it('has CTA colors for buttons', () => {
      expect(lightColors.cta.primary).toBe('#E8A87C');
      expect(lightColors.cta.primaryPressed).toBe('#D4956D');
      expect(lightColors.cta.primaryText).toBe('#1E1E1E');
    });

    it('has brand color for dark teal', () => {
      expect(lightColors.brand.darkTeal).toBe('#2D4F4F');
    });

    it('has gradient accent colors', () => {
      expect(lightColors.accent.teal).toBe('#7DD3C0');
      expect(lightColors.accent.lavender).toBe('#B8A9D4');
    });
  });

  describe('Dark Mode Semantic Colors', () => {
    it('keeps charcoal as primary background', () => {
      expect(darkColors.background.primary).toBe('#1E1E1E');
    });

    it('uses warm cream for primary text', () => {
      expect(darkColors.text.primary).toBe('#FBF7F4');
    });

    it('has CTA colors', () => {
      expect(darkColors.cta.primary).toBe('#E8A87C');
      expect(darkColors.cta.primaryPressed).toBe('#D4956D');
    });
  });

  describe('getSemanticColors helper', () => {
    it('returns light colors for light mode', () => {
      const colors = getSemanticColors('light');
      expect(colors.background.primary).toBe('#FBF7F4');
    });

    it('returns dark colors for dark mode', () => {
      const colors = getSemanticColors('dark');
      expect(colors.background.primary).toBe('#1E1E1E');
    });

    it('defaults to light colors for null/undefined', () => {
      expect(getSemanticColors(null).background.primary).toBe('#FBF7F4');
      expect(getSemanticColors(undefined).background.primary).toBe('#FBF7F4');
    });
  });

  describe('Tailwind Colors Export', () => {
    it('exports new modern colors for Tailwind', () => {
      expect(tailwindColors['warm-cream']).toBe('#FBF7F4');
      expect(tailwindColors['dark-teal']).toBe('#2D4F4F');
      expect(tailwindColors['sage-green']).toBe('#A8D5BA');
      expect(tailwindColors['sage-tint']).toBe('#F5FAF7');
      expect(tailwindColors.teal).toBe('#7DD3C0');
    });

    it('exports CTA colors for Tailwind', () => {
      expect(tailwindColors.cta.coral).toBe('#E8A87C');
      expect(tailwindColors.cta['coral-dark']).toBe('#D4956D');
      expect(tailwindColors.cta['coral-light']).toBe('#F5D4C0');
    });

    it('exports updated status colors for Tailwind', () => {
      expect(tailwindColors.status.protected).toBe('#A8D5BA');
      expect(tailwindColors.status.attention).toBe('#E8A87C');
    });

    it('exports text utility colors for Tailwind', () => {
      expect(tailwindColors['muted-gray']).toBe('#8A8A8A');
      expect(tailwindColors['soft-gray']).toBe('#B0B0B0');
      expect(tailwindColors['dark-gray']).toBe('#4A4A4A');
    });
  });

  describe('Combined Colors Export', () => {
    it('includes all color categories', () => {
      expect(colors.brand).toBeDefined();
      expect(colors.cta).toBeDefined();
      expect(colors.text).toBeDefined();
      expect(colors.status).toBeDefined();
      expect(colors.semantic).toBeDefined();
      expect(colors.light).toBeDefined();
      expect(colors.dark).toBeDefined();
      expect(colors.getSemanticColors).toBeDefined();
    });
  });
});

describe('Color Contrast Requirements - AC37', () => {
  // Helper to convert hex to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  // Calculate relative luminance
  const getLuminance = (hex: string) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return 0;

    const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((c) => {
      const sRGB = c / 255;
      return sRGB <= 0.03928
        ? sRGB / 12.92
        : Math.pow((sRGB + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  // Calculate contrast ratio
  const getContrastRatio = (hex1: string, hex2: string) => {
    const lum1 = getLuminance(hex1);
    const lum2 = getLuminance(hex2);
    const lighter = Math.max(lum1, lum2);
    const darker = Math.min(lum1, lum2);
    return (lighter + 0.05) / (darker + 0.05);
  };

  it('charcoal text on warm cream meets AA (4.5:1)', () => {
    const ratio = getContrastRatio('#1E1E1E', '#FBF7F4');
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });

  it('charcoal text on coral button meets AA (4.5:1)', () => {
    const ratio = getContrastRatio('#1E1E1E', '#E8A87C');
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });

  it('muted gray text on warm cream meets AA for large text (3:1)', () => {
    const ratio = getContrastRatio('#8A8A8A', '#FBF7F4');
    expect(ratio).toBeGreaterThanOrEqual(3);
  });
});
