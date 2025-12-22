import * as Haptics from 'expo-haptics';
import React from 'react';

import { fireEvent, render, screen } from '@/lib/test-utils';

import { ImageThumbnail } from './image-thumbnail';

jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  ImpactFeedbackStyle: {
    Light: 'Light',
    Medium: 'Medium',
    Heavy: 'Heavy',
  },
}));

describe('ImageThumbnail', () => {
  const testSource = { uri: 'https://example.com/image.jpg' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default props', () => {
    render(<ImageThumbnail source={testSource} />);
    expect(screen.getByLabelText('Image thumbnail')).toBeTruthy();
  });

  it('renders with protected status', () => {
    render(<ImageThumbnail source={testSource} status="protected" />);
    expect(
      screen.getByLabelText('Image thumbnail. Status: Protected')
    ).toBeTruthy();
  });

  it('renders with attention status', () => {
    render(<ImageThumbnail source={testSource} status="attention" />);
    expect(
      screen.getByLabelText('Image thumbnail. Status: Needs attention')
    ).toBeTruthy();
  });

  it('renders with critical status', () => {
    render(<ImageThumbnail source={testSource} status="critical" />);
    expect(
      screen.getByLabelText('Image thumbnail. Status: Critical')
    ).toBeTruthy();
  });

  it('renders with custom size', () => {
    render(<ImageThumbnail source={testSource} size={120} />);
    expect(screen.getByLabelText('Image thumbnail')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    render(<ImageThumbnail source={testSource} onPress={onPressMock} />);
    fireEvent.press(screen.getByRole('button'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('triggers haptic feedback on press', () => {
    const onPressMock = jest.fn();
    render(<ImageThumbnail source={testSource} onPress={onPressMock} />);
    fireEvent.press(screen.getByRole('button'));
    expect(Haptics.impactAsync).toHaveBeenCalledWith(
      Haptics.ImpactFeedbackStyle.Light
    );
  });

  it('has button role when pressable', () => {
    const onPressMock = jest.fn();
    render(<ImageThumbnail source={testSource} onPress={onPressMock} />);
    expect(screen.getByRole('button')).toBeTruthy();
  });

  it('has image role when not pressable', () => {
    render(<ImageThumbnail source={testSource} />);
    const element = screen.getByLabelText('Image thumbnail');
    expect(element.props.accessibilityRole).toBe('image');
  });

  it('does not trigger haptic when no onPress provided', () => {
    render(<ImageThumbnail source={testSource} />);
    expect(Haptics.impactAsync).not.toHaveBeenCalled();
  });

  it('renders all status types', () => {
    const statuses = ['protected', 'attention', 'critical'] as const;

    statuses.forEach((status) => {
      const { unmount } = render(
        <ImageThumbnail source={testSource} status={status} />
      );
      expect(screen.getByLabelText(/Image thumbnail/)).toBeTruthy();
      unmount();
    });
  });

  it('renders without status indicator when no status provided', () => {
    render(<ImageThumbnail source={testSource} />);
    expect(screen.getByLabelText('Image thumbnail')).toBeTruthy();
  });
});
