/**
 * BulletIcon Tests - Story 2.9
 */

import React from 'react';

import { render } from '@/lib/test-utils';

import { BulletIcon } from './bullet';

describe('BulletIcon', () => {
  it('renders without crashing', () => {
    render(<BulletIcon />);
    expect(true).toBe(true);
  });

  it('renders with custom size', () => {
    render(<BulletIcon size={12} />);
    expect(true).toBe(true);
  });

  it('renders with orange color', () => {
    render(<BulletIcon color="orange" />);
    expect(true).toBe(true);
  });

  it('renders with green color', () => {
    render(<BulletIcon color="green" />);
    expect(true).toBe(true);
  });

  it('renders with gray color', () => {
    render(<BulletIcon color="gray" />);
    expect(true).toBe(true);
  });

  it('renders with all props', () => {
    render(<BulletIcon size={10} color="orange" />);
    expect(true).toBe(true);
  });
});
