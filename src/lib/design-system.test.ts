/**
 * Design System Token Tests
 *
 * Validates design token structure, types, and helper functions.
 */

import {
  brandColors,
  colors,
  darkColors,
  fontFamilies,
  fontSizes,
  fontWeights,
  getSemanticColors,
  glowEffects,
  layout,
  lightColors,
  spacing,
  statusColors,
  tailwindColors,
  typeScale,
} from './design-system';

describe('Design System - Colors', () => {
  describe('brandColors', () => {
    it('should have all 5 brand colors', () => {
      expect(brandColors).toHaveProperty('cream', '#FEFAF1');
      expect(brandColors).toHaveProperty('lavender', '#D7CAE6');
      expect(brandColors).toHaveProperty('mint', '#B1EFE3');
      expect(brandColors).toHaveProperty('coral', '#FFAB91');
      expect(brandColors).toHaveProperty('charcoal', '#1E1E1E');
    });
  });

  describe('statusColors', () => {
    it('should have protected, attention, and critical colors', () => {
      expect(statusColors).toHaveProperty('protected', '#B1EFE3');
      expect(statusColors).toHaveProperty('attention', '#FFAB91');
      expect(statusColors).toHaveProperty('critical', '#E57373');
    });
  });

  describe('tailwindColors', () => {
    it('should have direct brand color access (except charcoal which has shades)', () => {
      expect(tailwindColors).toHaveProperty('cream');
      expect(tailwindColors).toHaveProperty('lavender');
      expect(tailwindColors).toHaveProperty('mint');
      expect(tailwindColors).toHaveProperty('coral');
      // charcoal is NOT direct - use bg-charcoal-900 or bg-vara-charcoal
    });

    it('should have namespaced vara colors including charcoal', () => {
      expect(tailwindColors.vara).toHaveProperty('cream');
      expect(tailwindColors.vara).toHaveProperty('charcoal', '#1E1E1E');
    });

    it('should have status colors', () => {
      expect(tailwindColors.status).toHaveProperty('protected');
      expect(tailwindColors.status).toHaveProperty('attention');
      expect(tailwindColors.status).toHaveProperty('critical');
    });
  });

  describe('getSemanticColors', () => {
    it('should return light colors for light scheme', () => {
      const result = getSemanticColors('light');
      expect(result).toBe(lightColors);
      expect(result.background.primary).toBe('#FEFAF1');
    });

    it('should return dark colors for dark scheme', () => {
      const result = getSemanticColors('dark');
      expect(result).toBe(darkColors);
      expect(result.background.primary).toBe('#1E1E1E');
    });

    it('should default to light colors for null/undefined', () => {
      expect(getSemanticColors(null)).toBe(lightColors);
      expect(getSemanticColors(undefined)).toBe(lightColors);
    });
  });

  describe('semantic colors structure', () => {
    it('should have matching structure for light and dark modes', () => {
      const lightKeys = Object.keys(lightColors);
      const darkKeys = Object.keys(darkColors);
      expect(lightKeys).toEqual(darkKeys);
    });
  });
});

describe('Design System - Typography', () => {
  describe('fontFamilies', () => {
    it('should have Plus Jakarta Sans variants', () => {
      expect(fontFamilies.jakarta).toHaveProperty(
        'regular',
        'PlusJakartaSans-Regular'
      );
      expect(fontFamilies.jakarta).toHaveProperty(
        'medium',
        'PlusJakartaSans-Medium'
      );
      expect(fontFamilies.jakarta).toHaveProperty(
        'semibold',
        'PlusJakartaSans-SemiBold'
      );
    });

    it('should have Inter for backward compatibility', () => {
      expect(fontFamilies.inter).toHaveProperty('regular', 'Inter');
    });
  });

  describe('fontWeights', () => {
    it('should have regular, medium, and semibold weights', () => {
      expect(fontWeights).toHaveProperty('regular', '400');
      expect(fontWeights).toHaveProperty('medium', '500');
      expect(fontWeights).toHaveProperty('semibold', '600');
    });
  });

  describe('fontSizes', () => {
    it('should have all type scale sizes', () => {
      expect(fontSizes).toHaveProperty('display', 32);
      expect(fontSizes).toHaveProperty('h1', 24);
      expect(fontSizes).toHaveProperty('h2', 20);
      expect(fontSizes).toHaveProperty('h3', 17);
      expect(fontSizes).toHaveProperty('body', 15);
      expect(fontSizes).toHaveProperty('bodySmall', 13);
      expect(fontSizes).toHaveProperty('caption', 11);
    });
  });

  describe('typeScale', () => {
    it('should have complete type definitions for each scale', () => {
      const scales = [
        'display',
        'h1',
        'h2',
        'h3',
        'body',
        'bodySmall',
        'caption',
      ] as const;
      scales.forEach((scale) => {
        expect(typeScale[scale]).toHaveProperty('fontSize');
        expect(typeScale[scale]).toHaveProperty('fontWeight');
        expect(typeScale[scale]).toHaveProperty('lineHeight');
        expect(typeScale[scale]).toHaveProperty('fontFamily');
      });
    });
  });
});

describe('Design System - Spacing', () => {
  describe('spacing scale', () => {
    it('should use 8px base unit system', () => {
      expect(spacing).toHaveProperty('xs', 4);
      expect(spacing).toHaveProperty('sm', 8);
      expect(spacing).toHaveProperty('md', 16);
      expect(spacing).toHaveProperty('lg', 24);
      expect(spacing).toHaveProperty('xl', 32);
      expect(spacing).toHaveProperty('2xl', 48);
      expect(spacing).toHaveProperty('3xl', 64);
    });
  });

  describe('layout constants', () => {
    it('should have required layout values', () => {
      expect(layout).toHaveProperty('screenMargin', 24);
      expect(layout).toHaveProperty('cardPadding', 20);
      expect(layout).toHaveProperty('cardRadius', 16);
    });
  });
});

describe('Design System - Shadows', () => {
  describe('glowEffects', () => {
    it('should have glow effects for all status types', () => {
      expect(glowEffects).toHaveProperty('protected');
      expect(glowEffects).toHaveProperty('attention');
      expect(glowEffects).toHaveProperty('critical');
    });

    it('should have inner and outer glow definitions', () => {
      expect(glowEffects.protected).toHaveProperty('inner');
      expect(glowEffects.protected).toHaveProperty('outer');
      expect(glowEffects.protected.inner).toHaveProperty('spread');
      expect(glowEffects.protected.inner).toHaveProperty('opacity');
      expect(glowEffects.protected.inner).toHaveProperty('color');
    });
  });
});

describe('Design System - Combined Export', () => {
  it('should have all token categories', () => {
    expect(colors).toHaveProperty('brand');
    expect(colors).toHaveProperty('status');
    expect(colors).toHaveProperty('semantic');
    expect(colors).toHaveProperty('light');
    expect(colors).toHaveProperty('dark');
    expect(colors).toHaveProperty('getSemanticColors');
  });
});
