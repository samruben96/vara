import React from 'react';

import { cleanup, render, screen } from '@/lib/test-utils';

import { WelcomeContent } from './welcome-content';

afterEach(cleanup);

describe('WelcomeContent', () => {
  it('renders vara value proposition', () => {
    render(<WelcomeContent />);
    expect(screen.getByText('Discover exposure')).toBeOnTheScreen();
    expect(screen.getByText('Monitor threats')).toBeOnTheScreen();
    expect(screen.getByText('Respond with guidance')).toBeOnTheScreen();
  });

  it('renders tagline', () => {
    render(<WelcomeContent />);
    expect(
      screen.getByText("vara watches so you don't have to")
    ).toBeOnTheScreen();
  });

  it('renders vara logo', () => {
    render(<WelcomeContent />);
    expect(screen.getByTestId('vara-logo')).toBeOnTheScreen();
  });
});
