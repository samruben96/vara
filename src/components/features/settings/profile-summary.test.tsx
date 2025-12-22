import { render, screen } from '@/lib/test-utils';

import { type ProfileData, ProfileSummary } from './profile-summary';

const mockProfile: ProfileData = {
  name: 'Test User',
  email: 'test@example.com',
  subscriptionTier: 'premium',
};

describe('ProfileSummary', () => {
  it('renders profile name', () => {
    render(<ProfileSummary profile={mockProfile} />);
    expect(screen.getByText('Test User')).toBeTruthy();
  });

  it('renders profile email', () => {
    render(<ProfileSummary profile={mockProfile} />);
    expect(screen.getByText('test@example.com')).toBeTruthy();
  });

  it('renders subscription tier badge', () => {
    render(<ProfileSummary profile={mockProfile} />);
    expect(screen.getByText('Premium')).toBeTruthy();
  });

  it('renders initials from name', () => {
    render(<ProfileSummary profile={mockProfile} />);
    expect(screen.getByText('TU')).toBeTruthy();
  });

  it('renders custom avatar initials if provided', () => {
    const profileWithInitials = {
      ...mockProfile,
      avatarInitials: 'XY',
    };
    render(<ProfileSummary profile={profileWithInitials} />);
    expect(screen.getByText('XY')).toBeTruthy();
  });

  it('renders free tier correctly', () => {
    const freeProfile: ProfileData = {
      ...mockProfile,
      subscriptionTier: 'free',
    };
    render(<ProfileSummary profile={freeProfile} />);
    expect(screen.getByText('Free')).toBeTruthy();
  });

  it('renders pro tier correctly', () => {
    const proProfile: ProfileData = {
      ...mockProfile,
      subscriptionTier: 'pro',
    };
    render(<ProfileSummary profile={proProfile} />);
    expect(screen.getByText('Pro')).toBeTruthy();
  });

  it('has correct accessibility label', () => {
    render(<ProfileSummary profile={mockProfile} />);
    expect(
      screen.getByLabelText(
        /Profile: Test User, test@example.com, Premium subscription/
      )
    ).toBeTruthy();
  });
});
