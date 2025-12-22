/* eslint-disable testing-library/no-node-access */
import { fireEvent, waitFor } from '@testing-library/react-native';
import React, { createRef } from 'react';

import { cleanup, render, screen } from '@/lib/test-utils';

import { AddInfoContent, type AddInfoContentRef } from './add-info-content';

afterEach(cleanup);

describe('AddInfoContent', () => {
  it('renders first name field as required', () => {
    render(<AddInfoContent />);
    expect(screen.getByTestId('first-name-input')).toBeOnTheScreen();
    expect(screen.getByText('First Name *')).toBeOnTheScreen();
  });

  it('renders last name field', () => {
    render(<AddInfoContent />);
    expect(screen.getByTestId('last-name-input')).toBeOnTheScreen();
  });

  it('renders social media handle fields', () => {
    render(<AddInfoContent />);
    expect(screen.getByTestId('instagram-input')).toBeOnTheScreen();
    expect(screen.getByTestId('tiktok-input')).toBeOnTheScreen();
    expect(screen.getByTestId('twitter-input')).toBeOnTheScreen();
  });

  it('renders explanation text', () => {
    render(<AddInfoContent />);
    expect(
      screen.getByText(/helps us monitor for impersonation/i)
    ).toBeOnTheScreen();
  });

  it('validates first name is required on submit', async () => {
    const ref = createRef<AddInfoContentRef>();
    const onSubmit = jest.fn();
    render(<AddInfoContent ref={ref} onSubmit={onSubmit} />);

    // Submit with empty first name
    const isValid = await ref.current?.submit();

    expect(isValid).toBe(false);
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('calls onSubmit with valid data', async () => {
    const ref = createRef<AddInfoContentRef>();
    const onSubmit = jest.fn();
    render(<AddInfoContent ref={ref} onSubmit={onSubmit} />);

    // Fill in required field
    fireEvent.changeText(screen.getByTestId('first-name-input'), 'John');

    // Submit form
    await ref.current?.submit();

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({ firstName: 'John' })
      );
    });
  });

  it('allows input in all fields', async () => {
    const ref = createRef<AddInfoContentRef>();
    const onSubmit = jest.fn();
    render(<AddInfoContent ref={ref} onSubmit={onSubmit} />);

    // Fill in all fields
    fireEvent.changeText(screen.getByTestId('first-name-input'), 'John');
    fireEvent.changeText(screen.getByTestId('last-name-input'), 'Doe');
    fireEvent.changeText(screen.getByTestId('instagram-input'), '@johndoe');
    fireEvent.changeText(screen.getByTestId('tiktok-input'), '@johndoe');
    fireEvent.changeText(screen.getByTestId('twitter-input'), '@johndoe');

    // Verify values by submitting and checking onSubmit was called with correct data
    await ref.current?.submit();

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        instagram: '@johndoe',
        tiktok: '@johndoe',
        twitter: '@johndoe',
      });
    });
  });
});
