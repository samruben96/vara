import React from 'react';
import { Text } from 'react-native';

import { render, screen } from '@/lib/test-utils';

import { SettingsGroup } from './settings-group';

describe('SettingsGroup', () => {
  it('renders children', () => {
    render(
      <SettingsGroup>
        <Text>Child Content</Text>
      </SettingsGroup>
    );
    expect(screen.getByText('Child Content')).toBeTruthy();
  });

  it('renders title when provided', () => {
    render(
      <SettingsGroup title="Group Title">
        <Text>Content</Text>
      </SettingsGroup>
    );
    expect(screen.getByText('Group Title')).toBeTruthy();
  });

  it('does not render title when not provided', () => {
    render(
      <SettingsGroup>
        <Text>Content</Text>
      </SettingsGroup>
    );
    expect(screen.queryByRole('header')).toBeNull();
  });

  it('title has header accessibility role', () => {
    render(
      <SettingsGroup title="Account">
        <Text>Content</Text>
      </SettingsGroup>
    );
    expect(screen.getByRole('header', { name: 'Account' })).toBeTruthy();
  });

  it('renders multiple children', () => {
    render(
      <SettingsGroup title="Settings">
        <Text>First Item</Text>
        <Text>Second Item</Text>
        <Text>Third Item</Text>
      </SettingsGroup>
    );
    expect(screen.getByText('First Item')).toBeTruthy();
    expect(screen.getByText('Second Item')).toBeTruthy();
    expect(screen.getByText('Third Item')).toBeTruthy();
  });
});
