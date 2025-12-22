import React from 'react';

import { cleanup, render, screen, setup } from '@/lib/test-utils';

import { PermissionsContent } from './permissions-content';

afterEach(cleanup);

describe('PermissionsContent', () => {
  it('renders camera permission card', () => {
    render(<PermissionsContent />);
    expect(screen.getByText('Camera Access')).toBeOnTheScreen();
    expect(
      screen.getByText(/capture photos for facial recognition/i)
    ).toBeOnTheScreen();
  });

  it('renders notification permission card', () => {
    render(<PermissionsContent />);
    expect(screen.getByText('Notifications')).toBeOnTheScreen();
    expect(
      screen.getByText(/alerts about potential threats/i)
    ).toBeOnTheScreen();
  });

  it('calls onAllowCamera when camera button pressed', async () => {
    const onAllowCamera = jest.fn();
    const { user } = setup(
      <PermissionsContent onAllowCamera={onAllowCamera} />
    );
    await user.press(screen.getByTestId('allow-camera-button'));
    expect(onAllowCamera).toHaveBeenCalledTimes(1);
  });

  it('calls onAllowNotifications when notification button pressed', async () => {
    const onAllowNotifications = jest.fn();
    const { user } = setup(
      <PermissionsContent onAllowNotifications={onAllowNotifications} />
    );
    await user.press(screen.getByTestId('allow-notifications-button'));
    expect(onAllowNotifications).toHaveBeenCalledTimes(1);
  });

  it('shows visual state for pending permissions', () => {
    render(
      <PermissionsContent cameraStatus="pending" notificationStatus="pending" />
    );
    // Both should show "Allow" button text
    expect(screen.getAllByText('Allow').length).toBe(2);
  });

  it('shows visual state for granted permissions', () => {
    render(
      <PermissionsContent cameraStatus="granted" notificationStatus="granted" />
    );
    // Both should show "Allowed" button text
    expect(screen.getAllByText('Allowed').length).toBe(2);
  });
});
