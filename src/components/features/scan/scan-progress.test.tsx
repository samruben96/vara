import React from 'react';

import { render, screen } from '@testing-library/react-native';

import { ScanProgress } from './scan-progress';

describe('ScanProgress', () => {
  it('renders the title', () => {
    render(<ScanProgress progress={50} />);
    expect(screen.getByText('Scanning your digital footprint')).toBeTruthy();
  });

  it('renders with custom title', () => {
    render(<ScanProgress progress={50} title="Custom scan title" />);
    expect(screen.getByText('Custom scan title')).toBeTruthy();
  });

  it('renders default scan categories', () => {
    render(<ScanProgress progress={50} />);
    expect(screen.getByText('Image misuse')).toBeTruthy();
    expect(screen.getByText('Impersonation')).toBeTruthy();
    expect(screen.getByText('Privacy leaks')).toBeTruthy();
  });

  it('renders with testID', () => {
    render(<ScanProgress progress={50} testID="scan-progress" />);
    expect(screen.getByTestId('scan-progress')).toBeTruthy();
  });
});
