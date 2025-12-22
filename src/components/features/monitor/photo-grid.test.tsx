import { fireEvent, render, screen } from '@/lib/test-utils';

import { PhotoGrid, type PhotoItem } from './photo-grid';

const mockPhotos: PhotoItem[] = [
  { id: '1', uri: 'https://example.com/photo1.jpg', status: 'protected' },
  { id: '2', uri: 'https://example.com/photo2.jpg', status: 'attention' },
  { id: '3', uri: 'https://example.com/photo3.jpg', status: 'critical' },
];

describe('PhotoGrid', () => {
  it('renders with default props', () => {
    render(<PhotoGrid photos={mockPhotos} />);
    expect(
      screen.getByLabelText(/Photo grid with 3 monitored photos/)
    ).toBeTruthy();
  });

  it('renders all photos', () => {
    render(<PhotoGrid photos={mockPhotos} />);
    // Each photo should be rendered as an image thumbnail
    const thumbnails = screen.getAllByRole('button');
    expect(thumbnails).toHaveLength(3);
  });

  it('fires onPhotoPress callback when photo is pressed', () => {
    const onPhotoPress = jest.fn();
    render(<PhotoGrid photos={mockPhotos} onPhotoPress={onPhotoPress} />);

    const firstPhoto = screen.getAllByRole('button')[0];
    fireEvent.press(firstPhoto);

    expect(onPhotoPress).toHaveBeenCalledWith('1');
  });

  it('renders empty grid when no photos provided', () => {
    render(<PhotoGrid photos={[]} />);
    expect(
      screen.getByLabelText(/Photo grid with 0 monitored photos/)
    ).toBeTruthy();
  });

  it('renders photos with correct status indicators', () => {
    render(<PhotoGrid photos={mockPhotos} />);
    // Check that accessibility labels include status information
    expect(screen.getByLabelText(/Status: Protected/)).toBeTruthy();
    expect(screen.getByLabelText(/Status: Needs attention/)).toBeTruthy();
    expect(screen.getByLabelText(/Status: Critical/)).toBeTruthy();
  });
});
