import { fireEvent, render, screen, waitFor } from '@/lib/test-utils';

import { AddButton } from './add-button';

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

describe('AddButton', () => {
  it('renders the FAB button', () => {
    render(<AddButton />);
    expect(screen.getByLabelText('Add monitored item')).toBeTruthy();
  });

  it('has correct accessibility role', () => {
    render(<AddButton />);
    expect(
      screen.getByRole('button', { name: /Add monitored item/ })
    ).toBeTruthy();
  });

  it('opens bottom sheet when FAB is pressed', async () => {
    render(<AddButton />);

    const fab = screen.getByLabelText('Add monitored item');
    fireEvent.press(fab);

    await waitFor(() => {
      expect(screen.getByText('Add to Monitored Items')).toBeTruthy();
    });
  });

  it('shows Add Photos and Link Account options in bottom sheet', async () => {
    render(<AddButton />);

    const fab = screen.getByLabelText('Add monitored item');
    fireEvent.press(fab);

    await waitFor(() => {
      expect(screen.getByText('Add Photos')).toBeTruthy();
    });
    expect(screen.getByText('Link Account')).toBeTruthy();
  });

  it('calls onAddPhotos when Add Photos is pressed', async () => {
    const onAddPhotos = jest.fn();
    render(<AddButton onAddPhotos={onAddPhotos} />);

    const fab = screen.getByLabelText('Add monitored item');
    fireEvent.press(fab);

    await waitFor(() => {
      expect(screen.getByText('Add Photos')).toBeTruthy();
    });

    const addPhotosButton = screen.getByText('Add Photos');
    fireEvent.press(addPhotosButton);

    expect(onAddPhotos).toHaveBeenCalled();
  });

  it('calls onLinkAccount when Link Account is pressed', async () => {
    const onLinkAccount = jest.fn();
    render(<AddButton onLinkAccount={onLinkAccount} />);

    const fab = screen.getByLabelText('Add monitored item');
    fireEvent.press(fab);

    await waitFor(() => {
      expect(screen.getByText('Link Account')).toBeTruthy();
    });

    const linkAccountButton = screen.getByText('Link Account');
    fireEvent.press(linkAccountButton);

    expect(onLinkAccount).toHaveBeenCalled();
  });
});
