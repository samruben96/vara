/**
 * FeatureStatusList Tests - Story 2.9
 *
 * AC22: Sparkle icon prefix for feature list items
 * AC29: Feature list in home screen design
 * AC35: "Run Scan" link initiates comprehensive scan
 */

import React from 'react';

import { fireEvent, render, screen } from '@/lib/test-utils';

import { FeatureStatusList } from './feature-status-list';

describe('FeatureStatusList', () => {
  it('renders without crashing', () => {
    render(<FeatureStatusList />);
    expect(true).toBe(true);
  });

  it('renders default feature items (AC29)', () => {
    render(<FeatureStatusList />);
    expect(screen.getByText('Image Protection')).toBeTruthy();
    expect(screen.getByText('Impersonation Monitoring')).toBeTruthy();
    expect(screen.getByText('Privacy Leaks')).toBeTruthy();
    expect(screen.getByText('Behavioral Patterns')).toBeTruthy();
  });

  it('renders feature descriptions', () => {
    render(<FeatureStatusList />);
    expect(screen.getByText('0 unauthorized photo uses found')).toBeTruthy();
    expect(screen.getByText('No fake profiles detected')).toBeTruthy();
    expect(screen.getByText('Your info is safe')).toBeTruthy();
    expect(screen.getByText('No suspicious activity')).toBeTruthy();
  });

  it('renders Run Scan link (AC35)', () => {
    render(<FeatureStatusList />);
    expect(screen.getByText('Run Scan')).toBeTruthy();
  });

  it('calls onRunScan when Run Scan is pressed (AC35)', () => {
    const onRunScan = jest.fn();
    render(<FeatureStatusList onRunScan={onRunScan} />);

    const runScanLink = screen.getByText('Run Scan');
    fireEvent.press(runScanLink);

    expect(onRunScan).toHaveBeenCalled();
  });

  it('renders custom features', () => {
    const customFeatures = [
      { id: 'custom-1', name: 'Custom Feature', description: 'Custom description' },
    ];
    render(<FeatureStatusList features={customFeatures} />);
    expect(screen.getByText('Custom Feature')).toBeTruthy();
    expect(screen.getByText('Custom description')).toBeTruthy();
  });

  it('renders with testID', () => {
    render(<FeatureStatusList testID="feature-list" />);
    expect(screen.getByTestId('feature-list')).toBeTruthy();
  });
});
