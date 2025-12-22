import React from 'react';

import { render, screen } from '@/lib/test-utils';

import { ProgressRing } from './progress-ring';

describe('ProgressRing', () => {
  it('renders with default props', () => {
    render(<ProgressRing progress={50} />);
    expect(screen.getByLabelText('Progress: 50%')).toBeTruthy();
  });

  it('displays percentage when showPercentage is true', () => {
    render(<ProgressRing progress={75} showPercentage={true} />);
    expect(screen.getByText('75%')).toBeTruthy();
  });

  it('hides percentage when showPercentage is false', () => {
    render(<ProgressRing progress={75} showPercentage={false} />);
    expect(screen.queryByText('75%')).toBeNull();
  });

  it('clamps progress at 0 when negative', () => {
    render(<ProgressRing progress={-10} />);
    expect(screen.getByLabelText('Progress: 0%')).toBeTruthy();
    expect(screen.getByText('0%')).toBeTruthy();
  });

  it('clamps progress at 100 when over 100', () => {
    render(<ProgressRing progress={150} />);
    expect(screen.getByLabelText('Progress: 100%')).toBeTruthy();
    expect(screen.getByText('100%')).toBeTruthy();
  });

  it('renders 0% correctly', () => {
    render(<ProgressRing progress={0} />);
    expect(screen.getByText('0%')).toBeTruthy();
    expect(screen.getByLabelText('Progress: 0%')).toBeTruthy();
  });

  it('renders 100% correctly', () => {
    render(<ProgressRing progress={100} />);
    expect(screen.getByText('100%')).toBeTruthy();
    expect(screen.getByLabelText('Progress: 100%')).toBeTruthy();
  });

  it('rounds decimal percentages', () => {
    render(<ProgressRing progress={33.7} />);
    expect(screen.getByText('34%')).toBeTruthy();
  });

  it('has correct accessibility role', () => {
    render(<ProgressRing progress={50} />);
    const element = screen.getByLabelText('Progress: 50%');
    expect(element.props.accessibilityRole).toBe('progressbar');
  });

  it('has correct accessibility value', () => {
    render(<ProgressRing progress={75} />);
    const element = screen.getByLabelText('Progress: 75%');
    expect(element.props.accessibilityValue).toEqual({
      min: 0,
      max: 100,
      now: 75,
    });
  });

  it('renders with custom size', () => {
    render(<ProgressRing progress={50} size={120} />);
    expect(screen.getByLabelText('Progress: 50%')).toBeTruthy();
  });

  it('renders with custom stroke width', () => {
    render(<ProgressRing progress={50} strokeWidth={12} />);
    expect(screen.getByLabelText('Progress: 50%')).toBeTruthy();
  });
});
