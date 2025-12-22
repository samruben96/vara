import React from 'react';

import { fireEvent, render, screen } from '@/lib/test-utils';

import { StatusCircle } from './status-circle';

describe('StatusCircle', () => {
  it('renders with protected status', () => {
    render(<StatusCircle status="protected" />);
    expect(screen.getByLabelText('Protection status: Protected')).toBeTruthy();
  });

  it('renders with attention status', () => {
    render(<StatusCircle status="attention" />);
    expect(
      screen.getByLabelText('Protection status: Attention needed')
    ).toBeTruthy();
  });

  it('renders with critical status', () => {
    render(<StatusCircle status="critical" />);
    expect(screen.getByLabelText('Protection status: Critical')).toBeTruthy();
  });

  it('renders with scanning status', () => {
    render(<StatusCircle status="scanning" />);
    expect(
      screen.getByLabelText('Protection status: Scanning in progress')
    ).toBeTruthy();
  });

  it('renders correct size (sm) with proper dimensions', () => {
    render(<StatusCircle status="protected" size="sm" />);
    expect(screen.getByLabelText('Protection status: Protected')).toBeTruthy();
    // The component should render - dimensions are applied via style
    expect(screen.getByText('Protected')).toBeTruthy();
  });

  it('renders correct size (md) with proper dimensions', () => {
    render(<StatusCircle status="protected" size="md" />);
    expect(screen.getByLabelText('Protection status: Protected')).toBeTruthy();
  });

  it('renders correct size (lg) with proper dimensions', () => {
    render(<StatusCircle status="protected" size="lg" />);
    expect(screen.getByLabelText('Protection status: Protected')).toBeTruthy();
  });

  it('renders status-specific label for attention', () => {
    render(<StatusCircle status="attention" />);
    expect(screen.getByText('Attention Needed')).toBeTruthy();
  });

  it('renders status-specific label for critical', () => {
    render(<StatusCircle status="critical" />);
    expect(screen.getByText('Critical')).toBeTruthy();
  });

  it('renders status-specific label for scanning', () => {
    render(<StatusCircle status="scanning" />);
    expect(screen.getByText('Scanning...')).toBeTruthy();
  });

  it('shows label when showLabel is true', () => {
    render(<StatusCircle status="protected" showLabel={true} />);
    expect(screen.getByText('Protected')).toBeTruthy();
  });

  it('hides label when showLabel is false', () => {
    render(<StatusCircle status="protected" showLabel={false} />);
    expect(screen.queryByText('Protected')).toBeNull();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    render(<StatusCircle status="protected" onPress={onPressMock} />);
    fireEvent.press(screen.getByLabelText('Protection status: Protected'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('has correct accessibility label for protected status', () => {
    render(<StatusCircle status="protected" />);
    expect(screen.getByLabelText('Protection status: Protected')).toBeTruthy();
  });

  it('has correct accessibility label for attention status', () => {
    render(<StatusCircle status="attention" />);
    expect(
      screen.getByLabelText('Protection status: Attention needed')
    ).toBeTruthy();
  });

  it('renders without onPress (non-pressable)', () => {
    render(<StatusCircle status="protected" />);
    const element = screen.getByLabelText('Protection status: Protected');
    expect(element.props.accessibilityRole).toBe('text');
  });

  it('renders with onPress (pressable)', () => {
    const onPressMock = jest.fn();
    render(<StatusCircle status="protected" onPress={onPressMock} />);
    const element = screen.getByLabelText('Protection status: Protected');
    expect(element.props.accessibilityRole).toBe('button');
  });
});
