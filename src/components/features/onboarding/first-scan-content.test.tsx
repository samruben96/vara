import React from 'react';

import { cleanup, render, screen } from '@/lib/test-utils';

import { FirstScanContent } from './first-scan-content';

afterEach(cleanup);

describe('FirstScanContent', () => {
  it('renders scan summary', () => {
    render(<FirstScanContent />);
    expect(screen.getByText(/photos/i)).toBeOnTheScreen();
    expect(screen.getByText(/social handles/i)).toBeOnTheScreen();
    expect(screen.getByText(/email/i)).toBeOnTheScreen();
  });

  it('renders estimated time', () => {
    render(<FirstScanContent />);
    expect(screen.getByText(/2-5 minutes/i)).toBeOnTheScreen();
  });

  it('renders what well scan title', () => {
    render(<FirstScanContent />);
    expect(screen.getByText("What we'll scan")).toBeOnTheScreen();
  });

  it('renders scan icon', () => {
    render(<FirstScanContent />);
    expect(screen.getByTestId('scan-icon')).toBeOnTheScreen();
  });

  it('renders scan item descriptions', () => {
    render(<FirstScanContent />);
    expect(screen.getByText(/Facial recognition/i)).toBeOnTheScreen();
    expect(screen.getByText(/Impersonation detection/i)).toBeOnTheScreen();
    expect(screen.getByText(/Data breach monitoring/i)).toBeOnTheScreen();
  });
});
