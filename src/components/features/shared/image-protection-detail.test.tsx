import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ImageProtectionDetail } from './image-protection-detail';

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: jest.fn(() => ({ top: 0, bottom: 0, left: 0, right: 0 })),
}));

// Mock expo-haptics
jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  ImpactFeedbackStyle: { Medium: 'medium' },
}));

describe('ImageProtectionDetail', () => {
  beforeEach(() => {
    (useSafeAreaInsets as jest.Mock).mockReturnValue({
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    });
  });

  it('renders the header', () => {
    render(<ImageProtectionDetail />);
    expect(screen.getByText('Image Protection')).toBeTruthy();
  });

  it('renders last scan time', () => {
    render(<ImageProtectionDetail lastScanTime="Yesterday at 10:00 AM" />);
    expect(screen.getByText('Last Scan')).toBeTruthy();
    expect(screen.getByText('Yesterday at 10:00 AM')).toBeTruthy();
  });

  it('renders default threat message when no threats', () => {
    render(<ImageProtectionDetail hasThreats={false} />);
    expect(screen.getByText('No new threats detected')).toBeTruthy();
  });

  it('renders custom threat message', () => {
    render(
      <ImageProtectionDetail
        threatMessage="3 potential matches found"
        hasThreats
      />
    );
    expect(screen.getByText('3 potential matches found')).toBeTruthy();
  });

  it('renders results list with title', () => {
    render(<ImageProtectionDetail />);
    expect(screen.getByText('Reverse Image Results')).toBeTruthy();
  });

  it('renders Review Matches button', () => {
    render(<ImageProtectionDetail />);
    expect(screen.getByText('Review Matches')).toBeTruthy();
  });

  it('calls onReviewMatches when button is pressed', () => {
    const onReviewMatches = jest.fn();
    render(<ImageProtectionDetail onReviewMatches={onReviewMatches} />);
    fireEvent.press(screen.getByText('Review Matches'));
    expect(onReviewMatches).toHaveBeenCalled();
  });

  it('renders with testID', () => {
    render(<ImageProtectionDetail testID="image-protection-detail" />);
    expect(screen.getByTestId('image-protection-detail')).toBeTruthy();
  });

  it('renders custom results', () => {
    const customResults = [
      {
        id: '1',
        label: 'Custom result 1',
        count: 5,
        type: 'suspicious' as const,
      },
      {
        id: '2',
        label: 'Custom result 2',
        count: 3,
        type: 'harmless' as const,
      },
    ];
    render(<ImageProtectionDetail results={customResults} />);
    // Text is rendered with counts in nested Text components
    expect(screen.getByText(/Custom result 1/)).toBeTruthy();
    expect(screen.getByText(/Custom result 2/)).toBeTruthy();
  });
});
