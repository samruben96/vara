import React from 'react';

import { render, screen } from '@/lib/test-utils';

import { Skeleton } from './skeleton';

describe('Skeleton', () => {
  it('renders with default props', () => {
    render(<Skeleton />);
    expect(screen.getByLabelText('Loading content')).toBeTruthy();
  });

  it('renders rect variant by default', () => {
    render(<Skeleton />);
    expect(screen.getByLabelText('Loading content')).toBeTruthy();
  });

  it('renders text variant', () => {
    render(<Skeleton variant="text" />);
    expect(screen.getByLabelText('Loading content')).toBeTruthy();
  });

  it('renders circle variant', () => {
    render(<Skeleton variant="circle" />);
    expect(screen.getByLabelText('Loading content')).toBeTruthy();
  });

  it('renders with custom width', () => {
    render(<Skeleton width={200} />);
    expect(screen.getByLabelText('Loading content')).toBeTruthy();
  });

  it('renders with percentage width', () => {
    render(<Skeleton width="50%" />);
    expect(screen.getByLabelText('Loading content')).toBeTruthy();
  });

  it('renders with custom height', () => {
    render(<Skeleton height={24} />);
    expect(screen.getByLabelText('Loading content')).toBeTruthy();
  });

  it('renders with custom border radius', () => {
    render(<Skeleton borderRadius={12} />);
    expect(screen.getByLabelText('Loading content')).toBeTruthy();
  });

  it('has correct accessibility role', () => {
    render(<Skeleton />);
    const element = screen.getByLabelText('Loading content');
    expect(element.props.accessibilityRole).toBe('progressbar');
  });

  it('has correct accessibility label', () => {
    render(<Skeleton />);
    expect(screen.getByLabelText('Loading content')).toBeTruthy();
  });

  it('renders all variants correctly', () => {
    const variants = ['text', 'circle', 'rect'] as const;

    variants.forEach((variant) => {
      const { unmount } = render(<Skeleton variant={variant} />);
      expect(screen.getByLabelText('Loading content')).toBeTruthy();
      unmount();
    });
  });

  it('renders with all custom props', () => {
    render(
      <Skeleton width={100} height={50} borderRadius={8} variant="rect" />
    );
    expect(screen.getByLabelText('Loading content')).toBeTruthy();
  });
});
