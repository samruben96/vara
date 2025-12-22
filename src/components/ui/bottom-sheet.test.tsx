import React from 'react';
import { Text } from 'react-native';

import { render, screen } from '@/lib/test-utils';

import { BottomSheet } from './bottom-sheet';

// Mock @gorhom/bottom-sheet since it requires native modules
jest.mock('@gorhom/bottom-sheet', () => {
  const React = require('react');
  const { View } = require('react-native');

  const MockBottomSheet = React.forwardRef(
    ({ children, accessibilityLabel }: any, ref: any) => {
      React.useImperativeHandle(ref, () => ({
        expand: jest.fn(),
        close: jest.fn(),
      }));
      return <View accessibilityLabel={accessibilityLabel}>{children}</View>;
    }
  );

  const MockBottomSheetView = ({ children }: any) => (
    <View testID="bottom-sheet-content">{children}</View>
  );

  const MockBottomSheetBackdrop = () => <View testID="backdrop" />;

  const MockBottomSheetModalProvider = ({ children }: any) => (
    <View>{children}</View>
  );

  return {
    __esModule: true,
    default: MockBottomSheet,
    BottomSheetView: MockBottomSheetView,
    BottomSheetBackdrop: MockBottomSheetBackdrop,
    BottomSheetModalProvider: MockBottomSheetModalProvider,
  };
});

describe('BottomSheet', () => {
  const mockOnDismiss = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders children when visible', () => {
    render(
      <BottomSheet visible={true} onDismiss={mockOnDismiss}>
        <Text>Sheet Content</Text>
      </BottomSheet>
    );
    expect(screen.getByText('Sheet Content')).toBeTruthy();
  });

  it('does not render when not visible', () => {
    render(
      <BottomSheet visible={false} onDismiss={mockOnDismiss}>
        <Text>Sheet Content</Text>
      </BottomSheet>
    );
    expect(screen.queryByText('Sheet Content')).toBeNull();
  });

  it('renders with custom snap points', () => {
    render(
      <BottomSheet
        visible={true}
        onDismiss={mockOnDismiss}
        snapPoints={['25%', '75%']}
      >
        <Text>Custom Snap</Text>
      </BottomSheet>
    );
    expect(screen.getByText('Custom Snap')).toBeTruthy();
  });

  it('renders content container', () => {
    render(
      <BottomSheet visible={true} onDismiss={mockOnDismiss}>
        <Text>Content</Text>
      </BottomSheet>
    );
    expect(screen.getByTestId('bottom-sheet-content')).toBeTruthy();
  });

  it('has correct accessibility label', () => {
    render(
      <BottomSheet visible={true} onDismiss={mockOnDismiss}>
        <Text>Accessible</Text>
      </BottomSheet>
    );
    expect(screen.getByLabelText('Bottom sheet')).toBeTruthy();
  });

  it('renders multiple children', () => {
    render(
      <BottomSheet visible={true} onDismiss={mockOnDismiss}>
        <Text>First Item</Text>
        <Text>Second Item</Text>
      </BottomSheet>
    );
    expect(screen.getByText('First Item')).toBeTruthy();
    expect(screen.getByText('Second Item')).toBeTruthy();
  });
});
