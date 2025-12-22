import React from 'react';

import { Notifications, Settings, Support, User } from '@/components/ui/icons';
import { lightColors } from '@/lib/design-system';

import { SettingsGroup } from './settings-group';
import { SettingsRow } from './settings-row';

interface SettingsGroupsProps {
  onNavigate: (destination: string) => void;
  onSignOut: () => void;
}

export function AccountSettingsGroup({
  onNavigate,
}: {
  onNavigate: (d: string) => void;
}) {
  return (
    <SettingsGroup title="Account">
      <SettingsRow
        icon={<User color={lightColors.text.secondary} />}
        label="Profile"
        onPress={() => onNavigate('Profile')}
      />
      <SettingsRow
        icon={<Settings color={lightColors.text.secondary} />}
        label="Security"
        onPress={() => onNavigate('Security')}
      />
    </SettingsGroup>
  );
}

export function NotificationsSettingsGroup({
  onNavigate,
}: {
  onNavigate: (d: string) => void;
}) {
  return (
    <SettingsGroup title="Notifications">
      <SettingsRow
        icon={<Notifications color={lightColors.text.secondary} />}
        label="Push Notifications"
        onPress={() => onNavigate('Push Notifications')}
      />
      <SettingsRow
        label="Email Notifications"
        onPress={() => onNavigate('Email Notifications')}
      />
    </SettingsGroup>
  );
}

export function PrivacySettingsGroup({
  onNavigate,
}: {
  onNavigate: (d: string) => void;
}) {
  return (
    <SettingsGroup title="Privacy">
      <SettingsRow
        label="Privacy Settings"
        onPress={() => onNavigate('Privacy Settings')}
      />
      <SettingsRow
        label="Data Export"
        onPress={() => onNavigate('Data Export')}
      />
    </SettingsGroup>
  );
}

export function SubscriptionSettingsGroup({
  onNavigate,
}: {
  onNavigate: (d: string) => void;
}) {
  return (
    <SettingsGroup title="Subscription">
      <SettingsRow
        label="Manage Subscription"
        value="Premium"
        onPress={() => onNavigate('Manage Subscription')}
      />
      <SettingsRow
        label="Billing History"
        onPress={() => onNavigate('Billing History')}
      />
    </SettingsGroup>
  );
}

export function SupportSettingsGroup({
  onNavigate,
}: {
  onNavigate: (d: string) => void;
}) {
  return (
    <SettingsGroup title="Support">
      <SettingsRow
        icon={<Support color={lightColors.text.secondary} />}
        label="Help Center"
        onPress={() => onNavigate('Help Center')}
      />
      <SettingsRow
        label="Contact Support"
        onPress={() => onNavigate('Contact Support')}
      />
      <SettingsRow
        label="About"
        value="v1.0.0"
        onPress={() => onNavigate('About')}
      />
    </SettingsGroup>
  );
}

export function SignOutGroup({ onSignOut }: { onSignOut: () => void }) {
  return (
    <SettingsGroup>
      <SettingsRow
        label="Sign Out"
        onPress={onSignOut}
        danger
        showChevron={false}
      />
    </SettingsGroup>
  );
}

export function SettingsGroups({ onNavigate, onSignOut }: SettingsGroupsProps) {
  return (
    <>
      <AccountSettingsGroup onNavigate={onNavigate} />
      <NotificationsSettingsGroup onNavigate={onNavigate} />
      <PrivacySettingsGroup onNavigate={onNavigate} />
      <SubscriptionSettingsGroup onNavigate={onNavigate} />
      <SupportSettingsGroup onNavigate={onNavigate} />
      <SignOutGroup onSignOut={onSignOut} />
    </>
  );
}
