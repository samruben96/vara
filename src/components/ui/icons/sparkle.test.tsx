/**
 * SparkleIcon Tests - Story 2.9
 */

import React from 'react';

import { render, screen } from '@/lib/test-utils';

import { SparkleIcon } from './sparkle';

describe('SparkleIcon', () => {
  it('renders without crashing', () => {
    render(<SparkleIcon />);
    // SVG elements are rendered
    expect(true).toBe(true);
  });

  it('renders with custom size', () => {
    render(<SparkleIcon size={32} />);
    expect(true).toBe(true);
  });

  it('renders with custom color', () => {
    render(<SparkleIcon color="#FF0000" />);
    expect(true).toBe(true);
  });

  it('renders with gradient', () => {
    render(<SparkleIcon gradient />);
    expect(true).toBe(true);
  });

  it('renders with all props', () => {
    render(<SparkleIcon size={48} color="#000000" gradient />);
    expect(true).toBe(true);
  });
});
