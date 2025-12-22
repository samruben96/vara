import { render, screen } from '@/lib/test-utils';

import { AccountList } from './account-list';
import { PhotoGrid } from './photo-grid';

// Test individual components since MonitorContent has known css-interop conflicts
// with SafeAreaInsets in the test environment

describe('MonitorContent (via components)', () => {
  const mockPhotos = [
    { id: '1', uri: 'https://example.com/1.jpg', status: 'protected' as const },
    { id: '2', uri: 'https://example.com/2.jpg', status: 'attention' as const },
    { id: '3', uri: 'https://example.com/3.jpg', status: 'critical' as const },
  ];

  const mockAccounts = [
    {
      id: '1',
      platform: 'instagram' as const,
      handle: '@test',
      status: 'connected' as const,
    },
    {
      id: '2',
      platform: 'twitter' as const,
      handle: '@test',
      status: 'pending' as const,
    },
    {
      id: '3',
      platform: 'tiktok' as const,
      handle: '@test',
      status: 'connected' as const,
    },
  ];

  it('PhotoGrid renders all photos', () => {
    render(<PhotoGrid photos={mockPhotos} />);
    expect(
      screen.getByLabelText(/Photo grid with 3 monitored photos/)
    ).toBeTruthy();
  });

  it('PhotoGrid fires onPhotoPress callback', () => {
    const onPhotoPress = jest.fn();
    render(<PhotoGrid photos={mockPhotos} onPhotoPress={onPhotoPress} />);
    const firstPhoto = screen.getAllByRole('button')[0];
    const { fireEvent } = require('@testing-library/react-native');
    fireEvent.press(firstPhoto);
    expect(onPhotoPress).toHaveBeenCalledWith('1');
  });

  it('AccountList renders all accounts', () => {
    render(<AccountList accounts={mockAccounts} />);
    expect(
      screen.getByLabelText(/Linked accounts list with 3 accounts/)
    ).toBeTruthy();
  });

  it('AccountList displays platform names', () => {
    render(<AccountList accounts={mockAccounts} />);
    expect(screen.getByText('Instagram')).toBeTruthy();
    expect(screen.getByText('Twitter/X')).toBeTruthy();
    expect(screen.getByText('TikTok')).toBeTruthy();
  });

  it('AccountList fires onAccountPress callback', () => {
    const onAccountPress = jest.fn();
    render(
      <AccountList accounts={mockAccounts} onAccountPress={onAccountPress} />
    );
    const { fireEvent } = require('@testing-library/react-native');
    const firstAccount = screen.getByLabelText(/Instagram account @test/);
    fireEvent.press(firstAccount);
    expect(onAccountPress).toHaveBeenCalledWith('1');
  });
});
