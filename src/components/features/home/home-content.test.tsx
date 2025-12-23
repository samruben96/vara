/**
 * HomeContent Tests - Story 2.9
 *
 * AC27: StatusCircle with ample vertical padding
 * AC29: "Your Digital Safety Today" design with protection score, feature list
 * AC34: Protection score card rendering
 * AC35: Run Scan link in feature list
 * AC36: Notification banner with dismiss
 */

import React from 'react';

import { fireEvent, render, screen } from '@/lib/test-utils';

import { HomeContent } from './home-content';

// Mock expo-router
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
  }),
}));

describe('HomeContent', () => {
  it('renders without crashing', () => {
    render(<HomeContent />);
    expect(true).toBe(true);
  });

  it('renders "Your Digital Safety Today" section title (AC29)', () => {
    render(<HomeContent />);
    expect(screen.getByText('Your Digital Safety Today')).toBeTruthy();
  });

  it('renders vara logo with shield icon', () => {
    render(<HomeContent />);
    expect(screen.getByText('vara')).toBeTruthy();
  });

  it('renders StatusCircle in hero section (AC27)', () => {
    render(<HomeContent />);
    expect(screen.getByLabelText('Protection status: Protected')).toBeTruthy();
  });

  it('renders protection score card with score (AC34)', () => {
    render(<HomeContent protectionScore={92} />);
    expect(screen.getByText('92')).toBeTruthy();
  });

  it('renders protection score card subtitle', () => {
    render(<HomeContent />);
    expect(screen.getByText('You are protected today')).toBeTruthy();
  });

  it('renders feature status list items (AC29)', () => {
    render(<HomeContent />);
    expect(screen.getByText('Image Protection')).toBeTruthy();
    expect(screen.getByText('Impersonation Monitoring')).toBeTruthy();
    expect(screen.getByText('Privacy Leaks')).toBeTruthy();
    expect(screen.getByText('Behavioral Patterns')).toBeTruthy();
  });

  it('renders Run Scan link (AC35)', () => {
    render(<HomeContent />);
    expect(screen.getByText('Run Scan')).toBeTruthy();
  });

  it('renders notification banner when hasNotification is true (AC36)', () => {
    render(<HomeContent hasNotification={true} notificationTitle="Test notification" />);
    expect(screen.getByText('Test notification')).toBeTruthy();
  });

  it('hides notification banner when hasNotification is false', () => {
    render(<HomeContent hasNotification={false} />);
    expect(screen.queryByText('We noticed something new')).toBeNull();
  });

  it('accepts custom protection score', () => {
    render(<HomeContent protectionScore={85} />);
    expect(screen.getByText('85')).toBeTruthy();
  });

  it('renders with testID', () => {
    render(<HomeContent testID="home-content" />);
    expect(screen.getByTestId('home-content')).toBeTruthy();
  });
});
