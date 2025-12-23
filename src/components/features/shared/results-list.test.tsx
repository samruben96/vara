/**
 * ResultsList Tests - Story 2.9
 *
 * AC30: Bullet list with colored indicators
 */

import React from 'react';

import { render, screen } from '@/lib/test-utils';

import type { ResultItem } from './results-list';
import { ResultsList } from './results-list';

describe('ResultsList', () => {
  const mockItems: ResultItem[] = [
    { id: '1', label: 'Suspicious sites', count: 2, type: 'suspicious' },
    { id: '2', label: 'Safe sites', count: 5, type: 'harmless' },
    { id: '3', label: 'Unknown sites', count: 1, type: 'neutral' },
  ];

  it('renders without crashing', () => {
    render(<ResultsList items={mockItems} />);
    expect(true).toBe(true);
  });

  it('renders all items', () => {
    render(<ResultsList items={mockItems} />);
    // Using regex to match partial text since count is nested
    expect(screen.getByText(/Suspicious sites/)).toBeTruthy();
    expect(screen.getByText(/Safe sites/)).toBeTruthy();
    expect(screen.getByText(/Unknown sites/)).toBeTruthy();
  });

  it('renders item counts', () => {
    render(<ResultsList items={mockItems} />);
    expect(screen.getByText(/\(2\)/)).toBeTruthy();
    expect(screen.getByText(/\(5\)/)).toBeTruthy();
    expect(screen.getByText(/\(1\)/)).toBeTruthy();
  });

  it('renders title when provided', () => {
    render(<ResultsList items={mockItems} title="Scan Results" />);
    expect(screen.getByText('Scan Results')).toBeTruthy();
  });

  it('renders without title', () => {
    render(<ResultsList items={mockItems} />);
    expect(screen.queryByText('Scan Results')).toBeNull();
  });

  it('renders with testID', () => {
    render(<ResultsList items={mockItems} testID="results-list" />);
    expect(screen.getByTestId('results-list')).toBeTruthy();
  });

  it('handles items without count', () => {
    const itemsNoCount: ResultItem[] = [
      { id: '1', label: 'Item without count', type: 'neutral' },
    ];
    render(<ResultsList items={itemsNoCount} />);
    expect(screen.getByText('Item without count')).toBeTruthy();
  });
});
