import * as Haptics from 'expo-haptics';
import React from 'react';
import { Text, View } from 'react-native';

import { fireEvent, render, screen } from '@/lib/test-utils';

import { ContentBlur } from './content-blur';

jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  ImpactFeedbackStyle: {
    Light: 'Light',
    Medium: 'Medium',
    Heavy: 'Heavy',
  },
}));

describe('ContentBlur', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const TestContent = () => (
    <View>
      <Text>Secret Content</Text>
    </View>
  );

  it('renders children content', () => {
    render(
      <ContentBlur>
        <TestContent />
      </ContentBlur>
    );
    expect(screen.getByText('Secret Content')).toBeTruthy();
  });

  it('shows tap to reveal message when not revealed', () => {
    render(
      <ContentBlur>
        <TestContent />
      </ContentBlur>
    );
    expect(screen.getByText('Tap to reveal')).toBeTruthy();
    expect(screen.getByText('Sensitive content hidden')).toBeTruthy();
  });

  it('hides overlay when revealed prop is true', () => {
    render(
      <ContentBlur revealed={true}>
        <TestContent />
      </ContentBlur>
    );
    expect(screen.queryByText('Tap to reveal')).toBeNull();
    expect(screen.queryByText('Sensitive content hidden')).toBeNull();
  });

  it('calls onReveal callback when tapped', () => {
    const onRevealMock = jest.fn();
    render(
      <ContentBlur onReveal={onRevealMock}>
        <TestContent />
      </ContentBlur>
    );
    fireEvent.press(screen.getByLabelText('Tap to reveal sensitive content'));
    expect(onRevealMock).toHaveBeenCalledTimes(1);
  });

  it('triggers haptic feedback on reveal', () => {
    const onRevealMock = jest.fn();
    render(
      <ContentBlur onReveal={onRevealMock}>
        <TestContent />
      </ContentBlur>
    );
    fireEvent.press(screen.getByLabelText('Tap to reveal sensitive content'));
    expect(Haptics.impactAsync).toHaveBeenCalledWith(
      Haptics.ImpactFeedbackStyle.Light
    );
  });

  it('has button role when not revealed', () => {
    render(
      <ContentBlur>
        <TestContent />
      </ContentBlur>
    );
    expect(screen.getByRole('button')).toBeTruthy();
  });

  it('has text role when revealed', () => {
    render(
      <ContentBlur revealed={true}>
        <TestContent />
      </ContentBlur>
    );
    const element = screen.getByLabelText('Content revealed');
    expect(element.props.accessibilityRole).toBe('text');
  });

  it('renders with custom blur amount', () => {
    render(
      <ContentBlur blurAmount={30}>
        <TestContent />
      </ContentBlur>
    );
    expect(screen.getByText('Tap to reveal')).toBeTruthy();
  });

  it('has correct accessibility label when hidden', () => {
    render(
      <ContentBlur>
        <TestContent />
      </ContentBlur>
    );
    expect(
      screen.getByLabelText('Tap to reveal sensitive content')
    ).toBeTruthy();
  });

  it('has correct accessibility label when revealed', () => {
    render(
      <ContentBlur revealed={true}>
        <TestContent />
      </ContentBlur>
    );
    expect(screen.getByLabelText('Content revealed')).toBeTruthy();
  });

  it('does not call onReveal when already revealed', () => {
    const onRevealMock = jest.fn();
    render(
      <ContentBlur revealed={true} onReveal={onRevealMock}>
        <TestContent />
      </ContentBlur>
    );
    fireEvent.press(screen.getByLabelText('Content revealed'));
    expect(onRevealMock).not.toHaveBeenCalled();
  });

  it('reveals content on tap when uncontrolled', () => {
    const onRevealMock = jest.fn();
    render(
      <ContentBlur onReveal={onRevealMock}>
        <TestContent />
      </ContentBlur>
    );

    // Initially shows overlay
    expect(screen.getByText('Tap to reveal')).toBeTruthy();

    // Tap to reveal
    fireEvent.press(screen.getByLabelText('Tap to reveal sensitive content'));

    // Callback should have been called
    expect(onRevealMock).toHaveBeenCalledTimes(1);
  });

  it('maintains controlled state when revealed prop changes', () => {
    const { rerender } = render(
      <ContentBlur revealed={false}>
        <TestContent />
      </ContentBlur>
    );

    expect(screen.getByText('Tap to reveal')).toBeTruthy();

    rerender(
      <ContentBlur revealed={true}>
        <TestContent />
      </ContentBlur>
    );

    expect(screen.queryByText('Tap to reveal')).toBeNull();
  });
});
