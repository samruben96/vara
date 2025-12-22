import React from 'react';

import { render, screen } from '@/lib/test-utils';

import { HomeContent } from './home-content';

describe('HomeContent', () => {
  it('renders StatusCircle in hero section', () => {
    render(<HomeContent />);
    expect(screen.getByLabelText('Protection status: Protected')).toBeTruthy();
  });

  it('renders 4 summary cards', () => {
    render(<HomeContent />);
    expect(screen.getByLabelText('Images Monitored: 0')).toBeTruthy();
    expect(screen.getByLabelText('Alerts: 0')).toBeTruthy();
    expect(screen.getByLabelText('Last Scan: --')).toBeTruthy();
    expect(screen.getByLabelText('Accounts: 0')).toBeTruthy();
  });

  it('renders summary cards with correct values', () => {
    render(<HomeContent />);
    expect(screen.getByText('Images Monitored')).toBeTruthy();
    expect(screen.getByText('Alerts')).toBeTruthy();
    expect(screen.getByText('Last Scan')).toBeTruthy();
    expect(screen.getByText('Accounts')).toBeTruthy();
  });

  it('renders Protected label', () => {
    render(<HomeContent />);
    expect(screen.getByText('Protected')).toBeTruthy();
  });
});
