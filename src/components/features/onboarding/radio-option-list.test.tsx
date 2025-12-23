/**
 * RadioOptionList Tests - Story 2.9
 *
 * AC32: Clean radio-style list with subtle selection indicator
 */

import React from 'react';

import { fireEvent, render, screen } from '@/lib/test-utils';

import type { RadioOption } from './radio-option-list';
import { RadioOptionList } from './radio-option-list';

describe('RadioOptionList', () => {
  const mockOptions: RadioOption[] = [
    { id: '1', label: 'Option 1' },
    { id: '2', label: 'Option 2', description: 'With description' },
    { id: '3', label: 'Option 3' },
  ];

  const mockOnSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<RadioOptionList options={mockOptions} onSelect={mockOnSelect} />);
    expect(true).toBe(true);
  });

  it('renders all options', () => {
    render(<RadioOptionList options={mockOptions} onSelect={mockOnSelect} />);
    expect(screen.getByText('Option 1')).toBeTruthy();
    expect(screen.getByText('Option 2')).toBeTruthy();
    expect(screen.getByText('Option 3')).toBeTruthy();
  });

  it('renders option description when provided', () => {
    render(<RadioOptionList options={mockOptions} onSelect={mockOnSelect} />);
    expect(screen.getByText('With description')).toBeTruthy();
  });

  it('calls onSelect when option is pressed', () => {
    render(<RadioOptionList options={mockOptions} onSelect={mockOnSelect} />);

    const option1 = screen.getByText('Option 1');
    fireEvent.press(option1);

    expect(mockOnSelect).toHaveBeenCalledWith('1');
  });

  it('renders with testID', () => {
    render(
      <RadioOptionList
        options={mockOptions}
        onSelect={mockOnSelect}
        testID="radio-list"
      />
    );
    expect(screen.getByTestId('radio-list')).toBeTruthy();
  });

  it('handles selection state', () => {
    render(
      <RadioOptionList
        options={mockOptions}
        selectedId="2"
        onSelect={mockOnSelect}
      />
    );
    // Component should render with selection (visual test)
    expect(screen.getByText('Option 2')).toBeTruthy();
  });
});
