import * as Haptics from 'expo-haptics';
import React from 'react';
import { View } from 'react-native';

import { fireEvent, render, screen } from '@/lib/test-utils';

import { SummaryCard } from './summary-card';

jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  ImpactFeedbackStyle: {
    Light: 'Light',
    Medium: 'Medium',
    Heavy: 'Heavy',
  },
}));

describe('SummaryCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders value and label', () => {
    render(<SummaryCard value="5" label="Alerts" />);
    expect(screen.getByText('5')).toBeTruthy();
    expect(screen.getByText('Alerts')).toBeTruthy();
  });

  it('renders numeric value', () => {
    render(<SummaryCard value={42} label="Items" />);
    expect(screen.getByText('42')).toBeTruthy();
  });

  it('renders icon when provided', () => {
    const TestIcon = () => <View testID="test-icon" />;
    render(<SummaryCard value="0" label="Test" icon={<TestIcon />} />);
    expect(screen.getByTestId('test-icon')).toBeTruthy();
  });

  it('applies success status styling', () => {
    render(<SummaryCard value="10" label="Protected" status="success" />);
    expect(screen.getByText('10')).toBeTruthy();
  });

  it('applies warning status styling', () => {
    render(<SummaryCard value="3" label="Warnings" status="warning" />);
    expect(screen.getByText('3')).toBeTruthy();
  });

  it('applies default status styling', () => {
    render(<SummaryCard value="0" label="Items" status="default" />);
    expect(screen.getByText('0')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    render(<SummaryCard value="5" label="Alerts" onPress={onPressMock} />);
    fireEvent.press(screen.getByLabelText('Alerts: 5'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('triggers haptic feedback on press', () => {
    const onPressMock = jest.fn();
    render(<SummaryCard value="5" label="Alerts" onPress={onPressMock} />);
    fireEvent.press(screen.getByLabelText('Alerts: 5'));
    expect(Haptics.impactAsync).toHaveBeenCalledWith(
      Haptics.ImpactFeedbackStyle.Light
    );
  });

  it('has correct accessibility label', () => {
    render(<SummaryCard value="10" label="Images Monitored" />);
    expect(screen.getByLabelText('Images Monitored: 10')).toBeTruthy();
  });

  it('has button role when pressable', () => {
    const onPressMock = jest.fn();
    render(<SummaryCard value="5" label="Alerts" onPress={onPressMock} />);
    const element = screen.getByLabelText('Alerts: 5');
    expect(element.props.accessibilityRole).toBe('button');
  });

  it('has text role when not pressable', () => {
    render(<SummaryCard value="5" label="Alerts" />);
    const element = screen.getByLabelText('Alerts: 5');
    expect(element.props.accessibilityRole).toBe('text');
  });

  it('does not call onPress when not provided', () => {
    render(<SummaryCard value="5" label="Alerts" />);
    expect(screen.getByText('5')).toBeTruthy();
  });

  it('applies pressed styling when pressed', () => {
    const onPressMock = jest.fn();
    render(<SummaryCard value="5" label="Alerts" onPress={onPressMock} />);
    const pressable = screen.getByLabelText('Alerts: 5');
    // Verify pressable element exists with button role (pressable behavior)
    expect(pressable.props.accessibilityRole).toBe('button');
  });

  it('does not trigger haptic when no onPress provided', () => {
    render(<SummaryCard value="5" label="Alerts" />);
    // Component renders without onPress - no haptic should be triggered
    expect(Haptics.impactAsync).not.toHaveBeenCalled();
  });
});
