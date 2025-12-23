import React from 'react';

import { render, screen } from '@testing-library/react-native';

import { ScanStatusList } from './scan-status-list';

describe('ScanStatusList', () => {
  it('renders default categories', () => {
    render(<ScanStatusList />);
    expect(screen.getByText('Image misuse')).toBeTruthy();
    expect(screen.getByText('Impersonation')).toBeTruthy();
    expect(screen.getByText('Privacy leaks')).toBeTruthy();
  });

  it('renders custom categories', () => {
    const categories = [
      { id: 'test-1', label: 'Custom Category 1', status: 'pending' as const },
      { id: 'test-2', label: 'Custom Category 2', status: 'complete' as const },
    ];
    render(<ScanStatusList categories={categories} />);
    expect(screen.getByText('Custom Category 1')).toBeTruthy();
    expect(screen.getByText('Custom Category 2')).toBeTruthy();
  });

  it('renders with testID', () => {
    render(<ScanStatusList testID="scan-status-list" />);
    expect(screen.getByTestId('scan-status-list')).toBeTruthy();
  });
});
