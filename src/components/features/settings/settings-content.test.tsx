import { render, screen } from '@/lib/test-utils';

import { SettingsContent } from './settings-content';

// Mock useAuth
jest.mock('@/lib', () => ({
  ...jest.requireActual('@/lib'),
  useAuth: {
    use: {
      signOut: jest.fn(() => jest.fn()),
    },
  },
}));

describe('SettingsContent', () => {
  it('renders without crashing', () => {
    render(<SettingsContent />);
    expect(screen.getByText('Vara User')).toBeTruthy();
  });

  it('displays the profile summary', () => {
    render(<SettingsContent />);
    expect(screen.getByText('user@example.com')).toBeTruthy();
    // Premium appears both in profile summary badge and subscription row
    expect(screen.getAllByText('Premium').length).toBeGreaterThan(0);
  });

  it('displays Account settings group', () => {
    render(<SettingsContent />);
    expect(screen.getByRole('header', { name: 'Account' })).toBeTruthy();
    expect(screen.getByText('Profile')).toBeTruthy();
    expect(screen.getByText('Security')).toBeTruthy();
  });

  it('displays Notifications settings group', () => {
    render(<SettingsContent />);
    expect(screen.getByRole('header', { name: 'Notifications' })).toBeTruthy();
    expect(screen.getByText('Push Notifications')).toBeTruthy();
    expect(screen.getByText('Email Notifications')).toBeTruthy();
  });

  it('displays Privacy settings group', () => {
    render(<SettingsContent />);
    expect(screen.getByRole('header', { name: 'Privacy' })).toBeTruthy();
    expect(screen.getByText('Privacy Settings')).toBeTruthy();
    expect(screen.getByText('Data Export')).toBeTruthy();
  });

  it('displays Subscription settings group', () => {
    render(<SettingsContent />);
    expect(screen.getByRole('header', { name: 'Subscription' })).toBeTruthy();
    expect(screen.getByText('Manage Subscription')).toBeTruthy();
    expect(screen.getByText('Billing History')).toBeTruthy();
  });

  it('displays Support settings group', () => {
    render(<SettingsContent />);
    expect(screen.getByRole('header', { name: 'Support' })).toBeTruthy();
    expect(screen.getByText('Help Center')).toBeTruthy();
    expect(screen.getByText('Contact Support')).toBeTruthy();
    expect(screen.getByText('About')).toBeTruthy();
  });

  it('displays Sign Out option', () => {
    render(<SettingsContent />);
    expect(screen.getByText('Sign Out')).toBeTruthy();
  });

  it('displays version in About row', () => {
    render(<SettingsContent />);
    expect(screen.getByText('v1.0.0')).toBeTruthy();
  });
});
