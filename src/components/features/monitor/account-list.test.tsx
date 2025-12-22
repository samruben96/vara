import { fireEvent, render, screen } from '@/lib/test-utils';

import { type AccountItem, AccountList } from './account-list';

const mockAccounts: AccountItem[] = [
  { id: '1', platform: 'instagram', handle: '@testuser', status: 'connected' },
  { id: '2', platform: 'twitter', handle: '@testuser', status: 'pending' },
  { id: '3', platform: 'tiktok', handle: '@testuser', status: 'connected' },
];

describe('AccountList', () => {
  it('renders with default props', () => {
    render(<AccountList accounts={mockAccounts} />);
    expect(
      screen.getByLabelText(/Linked accounts list with 3 accounts/)
    ).toBeTruthy();
  });

  it('renders all accounts', () => {
    render(<AccountList accounts={mockAccounts} />);
    expect(screen.getByText('Instagram')).toBeTruthy();
    expect(screen.getByText('Twitter/X')).toBeTruthy();
    expect(screen.getByText('TikTok')).toBeTruthy();
  });

  it('displays account handles', () => {
    render(<AccountList accounts={mockAccounts} />);
    // All accounts have the same handle in mock data
    const handles = screen.getAllByText('@testuser');
    expect(handles).toHaveLength(3);
  });

  it('displays status badges correctly', () => {
    render(<AccountList accounts={mockAccounts} />);
    expect(screen.getAllByText('Connected')).toHaveLength(2);
    expect(screen.getByText('Pending')).toBeTruthy();
  });

  it('fires onAccountPress callback when account is pressed', () => {
    const onAccountPress = jest.fn();
    render(
      <AccountList accounts={mockAccounts} onAccountPress={onAccountPress} />
    );

    const firstAccount = screen.getByLabelText(/Instagram account @testuser/);
    fireEvent.press(firstAccount);

    expect(onAccountPress).toHaveBeenCalledWith('1');
  });

  it('returns null when no accounts provided', () => {
    render(<AccountList accounts={[]} />);
    expect(screen.queryByLabelText(/Linked accounts list/)).toBeNull();
  });

  it('has proper accessibility labels for each account', () => {
    render(<AccountList accounts={mockAccounts} />);
    expect(
      screen.getByLabelText(/Instagram account @testuser. Status: Connected/)
    ).toBeTruthy();
    expect(
      screen.getByLabelText(/Twitter\/X account @testuser. Status: Pending/)
    ).toBeTruthy();
    expect(
      screen.getByLabelText(/TikTok account @testuser. Status: Connected/)
    ).toBeTruthy();
  });
});
