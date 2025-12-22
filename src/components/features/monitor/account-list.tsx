import * as Haptics from 'expo-haptics';
import React, { useCallback } from 'react';
import { Alert, Pressable, StyleSheet, View } from 'react-native';

import { Instagram, TikTok, Twitter } from '@/components/ui/icons';
import { Text } from '@/components/ui/text';
import {
  borderRadius,
  brandColors,
  lightColors,
  spacing,
} from '@/lib/design-system';

export type Platform = 'instagram' | 'tiktok' | 'twitter';
export type AccountStatus = 'connected' | 'pending';

export interface AccountItem {
  id: string;
  platform: Platform;
  handle: string;
  status: AccountStatus;
}

export interface AccountListProps {
  accounts: AccountItem[];
  onAccountPress?: (id: string) => void;
}

const PLATFORM_ICONS: Record<
  Platform,
  React.ComponentType<{ color?: string; size?: number }>
> = {
  instagram: Instagram,
  tiktok: TikTok,
  twitter: Twitter,
};

const PLATFORM_LABELS: Record<Platform, string> = {
  instagram: 'Instagram',
  tiktok: 'TikTok',
  twitter: 'Twitter/X',
};

const STATUS_COLORS: Record<AccountStatus, string> = {
  connected: brandColors.mint,
  pending: brandColors.coral,
};

const STATUS_LABELS: Record<AccountStatus, string> = {
  connected: 'Connected',
  pending: 'Pending',
};

function AccountRow({
  account,
  onPress,
}: {
  account: AccountItem;
  onPress: (id: string) => void;
}) {
  const Icon = PLATFORM_ICONS[account.platform];
  const platformLabel = PLATFORM_LABELS[account.platform];
  const statusColor = STATUS_COLORS[account.status];
  const statusLabel = STATUS_LABELS[account.status];

  const handlePress = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress(account.id);
  }, [account.id, onPress]);

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [styles.accountRow, pressed && styles.pressed]}
      accessibilityLabel={`${platformLabel} account ${account.handle}. Status: ${statusLabel}`}
      accessibilityRole="button"
      accessibilityHint="Opens account settings"
    >
      <View style={styles.iconContainer}>
        <Icon color={lightColors.text.primary} />
      </View>
      <View style={styles.accountInfo}>
        <Text style={styles.platformText}>{platformLabel}</Text>
        <Text style={styles.handleText}>{account.handle}</Text>
      </View>
      <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
        <Text style={styles.statusText}>{statusLabel}</Text>
      </View>
    </Pressable>
  );
}

export function AccountList({ accounts, onAccountPress }: AccountListProps) {
  const handleAccountPress = useCallback(
    (id: string) => {
      if (onAccountPress) {
        onAccountPress(id);
      } else {
        Alert.alert('Coming Soon', 'Account settings are under development');
      }
    },
    [onAccountPress]
  );

  if (accounts.length === 0) {
    return null;
  }

  return (
    <View
      style={styles.container}
      accessibilityLabel={`Linked accounts list with ${accounts.length} accounts`}
      accessibilityRole="list"
    >
      {accounts.map((account) => (
        <AccountRow
          key={account.id}
          account={account}
          onPress={handleAccountPress}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  accountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: lightColors.background.secondary,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    minHeight: 64,
  },
  pressed: {
    opacity: 0.8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: lightColors.background.primary,
    borderRadius: borderRadius.md,
    marginRight: spacing.sm,
  },
  accountInfo: {
    flex: 1,
  },
  platformText: {
    fontSize: 14,
    fontWeight: '600',
    color: lightColors.text.primary,
  },
  handleText: {
    fontSize: 12,
    color: lightColors.text.secondary,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    color: brandColors.charcoal,
  },
});
