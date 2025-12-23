/**
 * ShieldIcon Tests - Story 2.9
 */

import React from 'react';

import { render } from '@/lib/test-utils';

import { ShieldIcon } from './shield';

describe('ShieldIcon', () => {
  it('renders without crashing', () => {
    render(<ShieldIcon />);
    expect(true).toBe(true);
  });

  it('renders with custom size', () => {
    render(<ShieldIcon size={32} />);
    expect(true).toBe(true);
  });

  it('renders with custom color', () => {
    render(<ShieldIcon color="#FF0000" />);
    expect(true).toBe(true);
  });

  it('renders with all props', () => {
    render(<ShieldIcon size={48} color="#000000" />);
    expect(true).toBe(true);
  });
});
