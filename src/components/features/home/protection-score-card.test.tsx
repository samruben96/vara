/**
 * ProtectionScoreCard Component Tests - Story 2.9
 */

import React from 'react';

import { render, screen } from '@/lib/test-utils';

import { ProtectionScoreCard } from './protection-score-card';

describe('ProtectionScoreCard', () => {
  it('renders the score', () => {
    render(<ProtectionScoreCard score={92} />);
    expect(screen.getByText('92')).toBeTruthy();
  });

  it('renders default subtitle', () => {
    render(<ProtectionScoreCard score={92} />);
    expect(screen.getByText('You are protected today')).toBeTruthy();
  });

  it('renders default secondary text', () => {
    render(<ProtectionScoreCard score={92} />);
    expect(screen.getByText('No active threats detected')).toBeTruthy();
  });

  it('renders custom subtitle', () => {
    render(<ProtectionScoreCard score={85} subtitle="Custom subtitle" />);
    expect(screen.getByText('Custom subtitle')).toBeTruthy();
  });

  it('renders custom secondary text', () => {
    render(<ProtectionScoreCard score={85} secondaryText="Custom secondary" />);
    expect(screen.getByText('Custom secondary')).toBeTruthy();
  });

  it('accepts testID prop', () => {
    render(<ProtectionScoreCard score={92} testID="score-card" />);
    expect(screen.getByTestId('score-card')).toBeTruthy();
  });

  it('has correct accessibility label for score', () => {
    render(<ProtectionScoreCard score={92} />);
    expect(screen.getByLabelText('Protection score: 92')).toBeTruthy();
  });
});
