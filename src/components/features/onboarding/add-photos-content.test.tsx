import React from 'react';

import { cleanup, render, screen, setup } from '@/lib/test-utils';

import { AddPhotosContent } from './add-photos-content';

afterEach(cleanup);

describe('AddPhotosContent', () => {
  it('renders upload and capture buttons', () => {
    render(<AddPhotosContent />);
    expect(screen.getByText('Upload Photos')).toBeOnTheScreen();
    expect(screen.getByText('Take Photo')).toBeOnTheScreen();
  });

  it('renders photo explanation text', () => {
    render(<AddPhotosContent />);
    expect(
      screen.getByText(/photos help us monitor for unauthorized use/i)
    ).toBeOnTheScreen();
  });

  it('renders photo count guidance', () => {
    render(<AddPhotosContent />);
    expect(screen.getByText(/1-10 photos/i)).toBeOnTheScreen();
  });

  it('calls onUpload when upload button pressed', async () => {
    const onUpload = jest.fn();
    const { user } = setup(<AddPhotosContent onUpload={onUpload} />);
    await user.press(screen.getByTestId('upload-photos-button'));
    expect(onUpload).toHaveBeenCalledTimes(1);
  });

  it('calls onCapture when capture button pressed', async () => {
    const onCapture = jest.fn();
    const { user } = setup(<AddPhotosContent onCapture={onCapture} />);
    await user.press(screen.getByTestId('capture-photo-button'));
    expect(onCapture).toHaveBeenCalledTimes(1);
  });

  it('renders photo grid placeholder', () => {
    render(<AddPhotosContent />);
    expect(screen.getByTestId('photo-grid-placeholder')).toBeOnTheScreen();
  });
});
