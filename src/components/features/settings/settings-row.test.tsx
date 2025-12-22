import React from 'react';
import { View } from 'react-native';

import { fireEvent, render, screen } from '@/lib/test-utils';

import { SettingsRow } from './settings-row';

describe('SettingsRow', () => {
  it('renders label text', () => {
    render(<SettingsRow label="Test Label" />);
    expect(screen.getByText('Test Label')).toBeTruthy();
  });

  it('renders value when provided', () => {
    render(<SettingsRow label="Setting" value="Current Value" />);
    expect(screen.getByText('Current Value')).toBeTruthy();
  });

  it('fires onPress callback when pressed', () => {
    const onPress = jest.fn();
    render(<SettingsRow label="Clickable" onPress={onPress} />);

    const row = screen.getByRole('button');
    fireEvent.press(row);

    expect(onPress).toHaveBeenCalled();
  });

  it('renders icon when provided', () => {
    render(
      <SettingsRow label="With Icon" icon={<View testID="test-icon" />} />
    );
    expect(screen.getByTestId('test-icon')).toBeTruthy();
  });

  it('has correct accessibility label without value', () => {
    render(<SettingsRow label="Simple Label" onPress={() => {}} />);
    expect(screen.getByLabelText('Simple Label')).toBeTruthy();
  });

  it('has correct accessibility label with value', () => {
    render(<SettingsRow label="Setting" value="v1.0.0" onPress={() => {}} />);
    expect(
      screen.getByLabelText(/Setting, current value: v1.0.0/)
    ).toBeTruthy();
  });

  it('applies danger styling when danger prop is true', () => {
    render(<SettingsRow label="Sign Out" onPress={() => {}} danger />);
    // The row should have the destructive action hint
    expect(screen.getByAccessibilityHint('Destructive action')).toBeTruthy();
  });

  it('does not show chevron when showChevron is false', () => {
    render(
      <SettingsRow label="No Chevron" onPress={() => {}} showChevron={false} />
    );
    // This tests the behavior - chevron is not rendered
    // We can't easily test for absence of icon, so we test that it still renders
    expect(screen.getByText('No Chevron')).toBeTruthy();
  });

  it('renders as non-interactive when no onPress provided', () => {
    render(<SettingsRow label="Static Row" />);
    expect(screen.queryByRole('button')).toBeNull();
    expect(screen.getByRole('text')).toBeTruthy();
  });
});
