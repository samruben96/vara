/**
 * Typography System Tests - Story 2.9
 *
 * Tests for the updated typography tokens ensuring all new styles are properly exported.
 */

import {
  fontSizes,
  lineHeights,
  typeScale,
  textStyles,
  typography,
} from './typography';

describe('Typography System - Story 2.9 Updates', () => {
  describe('Font Sizes', () => {
    it('includes scoreDisplay size (52px) for AC9', () => {
      expect(fontSizes.scoreDisplay).toBe(52);
    });

    it('includes sectionHeader size (18px) for AC6', () => {
      expect(fontSizes.sectionHeader).toBe(18);
    });

    it('keeps existing sizes', () => {
      expect(fontSizes.display).toBe(32);
      expect(fontSizes.h1).toBe(24);
      expect(fontSizes.body).toBe(15);
    });
  });

  describe('Line Heights', () => {
    it('has increased body line-height (1.6) for AC7', () => {
      expect(lineHeights.body).toBe(1.6);
    });

    it('has scoreDisplay line-height (1.1)', () => {
      expect(lineHeights.scoreDisplay).toBe(1.1);
    });

    it('has sectionHeader line-height (1.4)', () => {
      expect(lineHeights.sectionHeader).toBe(1.4);
    });

    it('has updated display line-height (1.25)', () => {
      expect(lineHeights.display).toBe(1.25);
    });
  });

  describe('Type Scale', () => {
    it('includes scoreDisplay scale entry', () => {
      expect(typeScale.scoreDisplay).toBeDefined();
      expect(typeScale.scoreDisplay.fontSize).toBe(52);
      expect(typeScale.scoreDisplay.fontWeight).toBe('500');
      expect(typeScale.scoreDisplay.lineHeight).toBe(1.1);
    });

    it('includes sectionHeader scale entry', () => {
      expect(typeScale.sectionHeader).toBeDefined();
      expect(typeScale.sectionHeader.fontSize).toBe(18);
      expect(typeScale.sectionHeader.fontWeight).toBe('600');
      expect(typeScale.sectionHeader.lineHeight).toBe(1.4);
    });

    it('body scale has updated line-height', () => {
      expect(typeScale.body.lineHeight).toBe(1.6);
    });
  });

  describe('Text Styles Presets', () => {
    it('exports screenTitle style', () => {
      expect(textStyles.screenTitle).toBeDefined();
      expect(textStyles.screenTitle.fontSize).toBe(24);
      expect(textStyles.screenTitle.fontWeight).toBe('600');
      expect(textStyles.screenTitle.lineHeight).toBe(1.3);
    });

    it('exports sectionHeader style', () => {
      expect(textStyles.sectionHeader).toBeDefined();
      expect(textStyles.sectionHeader.fontSize).toBe(18);
      expect(textStyles.sectionHeader.fontWeight).toBe('600');
    });

    it('exports bodyText style with line-height 1.6', () => {
      expect(textStyles.bodyText).toBeDefined();
      expect(textStyles.bodyText.fontSize).toBe(15);
      expect(textStyles.bodyText.fontWeight).toBe('400');
      expect(textStyles.bodyText.lineHeight).toBe(1.6);
    });

    it('exports secondaryText style for muted text (AC8)', () => {
      expect(textStyles.secondaryText).toBeDefined();
      expect(textStyles.secondaryText.fontWeight).toBe('400');
    });

    it('exports scoreDisplay style (AC9)', () => {
      expect(textStyles.scoreDisplay).toBeDefined();
      expect(textStyles.scoreDisplay.fontSize).toBe(52);
      expect(textStyles.scoreDisplay.fontWeight).toBe('500');
      expect(textStyles.scoreDisplay.lineHeight).toBe(1.1);
    });

    it('exports caption style', () => {
      expect(textStyles.caption).toBeDefined();
      expect(textStyles.caption.fontSize).toBe(13);
    });
  });

  describe('Combined Typography Export', () => {
    it('includes styles in combined export', () => {
      expect(typography.styles).toBeDefined();
      expect(typography.styles).toBe(textStyles);
    });

    it('includes all typography categories', () => {
      expect(typography.families).toBeDefined();
      expect(typography.weights).toBeDefined();
      expect(typography.sizes).toBeDefined();
      expect(typography.lineHeights).toBeDefined();
      expect(typography.letterSpacing).toBeDefined();
      expect(typography.scale).toBeDefined();
      expect(typography.styles).toBeDefined();
    });
  });
});
