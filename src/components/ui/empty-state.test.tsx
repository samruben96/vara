import * as Haptics from 'expo-haptics';
import React from 'react';
import { View } from 'react-native';

import { fireEvent, render, screen } from '@/lib/test-utils';

import { EmptyState } from './empty-state';

jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  ImpactFeedbackStyle: {
    Light: 'Light',
    Medium: 'Medium',
    Heavy: 'Heavy',
  },
}));

describe('EmptyState', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders title', () => {
    render(<EmptyState title="No items found" />);
    expect(screen.getByText('No items found')).toBeTruthy();
  });

  it('renders description', () => {
    render(
      <EmptyState
        title="No items"
        description="Try adding some items to get started"
      />
    );
    expect(
      screen.getByText('Try adding some items to get started')
    ).toBeTruthy();
  });

  it('renders without description', () => {
    render(<EmptyState title="No items" />);
    expect(screen.getByText('No items')).toBeTruthy();
  });

  it('renders icon when provided', () => {
    const TestIcon = () => <View testID="test-icon" />;
    render(<EmptyState title="No items" icon={<TestIcon />} />);
    expect(screen.getByTestId('test-icon')).toBeTruthy();
  });

  it('renders without icon', () => {
    render(<EmptyState title="No items" />);
    expect(screen.getByText('No items')).toBeTruthy();
  });

  it('renders action button when provided', () => {
    const onPressMock = jest.fn();
    render(
      <EmptyState
        title="No items"
        action={{ label: 'Add Item', onPress: onPressMock }}
      />
    );
    expect(screen.getByText('Add Item')).toBeTruthy();
  });

  it('calls action onPress when button pressed', () => {
    const onPressMock = jest.fn();
    render(
      <EmptyState
        title="No items"
        action={{ label: 'Add Item', onPress: onPressMock }}
      />
    );
    fireEvent.press(screen.getByText('Add Item'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('triggers haptic feedback on action button press', () => {
    const onPressMock = jest.fn();
    render(
      <EmptyState
        title="No items"
        action={{ label: 'Add Item', onPress: onPressMock }}
      />
    );
    fireEvent.press(screen.getByText('Add Item'));
    expect(Haptics.impactAsync).toHaveBeenCalledWith(
      Haptics.ImpactFeedbackStyle.Light
    );
  });

  it('renders without action button', () => {
    render(<EmptyState title="No items" />);
    expect(screen.getByText('No items')).toBeTruthy();
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('has correct accessibility label with title only', () => {
    render(<EmptyState title="No items found" />);
    expect(screen.getByLabelText('No items found')).toBeTruthy();
  });

  it('has correct accessibility label with title and description', () => {
    render(<EmptyState title="No items" description="Try adding some items" />);
    expect(
      screen.getByLabelText('No items. Try adding some items')
    ).toBeTruthy();
  });

  it('renders complete empty state with all props', () => {
    const TestIcon = () => <View testID="test-icon" />;
    const onPressMock = jest.fn();

    render(
      <EmptyState
        icon={<TestIcon />}
        title="No alerts"
        description="You're all caught up!"
        action={{ label: 'Refresh', onPress: onPressMock }}
      />
    );

    expect(screen.getByTestId('test-icon')).toBeTruthy();
    expect(screen.getByText('No alerts')).toBeTruthy();
    expect(screen.getByText("You're all caught up!")).toBeTruthy();
    expect(screen.getByText('Refresh')).toBeTruthy();
  });
});
