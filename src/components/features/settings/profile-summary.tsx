import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from '@/components/ui/text';
import {
  borderRadius,
  brandColors,
  lightColors,
  spacing,
} from '@/lib/design-system';

export interface ProfileData {
  name: string;
  email: string;
  subscriptionTier: 'free' | 'premium' | 'pro';
  avatarInitials?: string;
}

export interface ProfileSummaryProps {
  profile: ProfileData;
}

const TIER_LABELS: Record<ProfileData['subscriptionTier'], string> = {
  free: 'Free',
  premium: 'Premium',
  pro: 'Pro',
};

const TIER_COLORS: Record<ProfileData['subscriptionTier'], string> = {
  free: lightColors.text.tertiary,
  premium: brandColors.lavender,
  pro: brandColors.mint,
};

export function ProfileSummary({ profile }: ProfileSummaryProps) {
  const tierLabel = TIER_LABELS[profile.subscriptionTier];
  const tierColor = TIER_COLORS[profile.subscriptionTier];
  const initials =
    profile.avatarInitials ||
    profile.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

  return (
    <View
      style={styles.container}
      accessibilityLabel={`Profile: ${profile.name}, ${profile.email}, ${tierLabel} subscription`}
      accessibilityRole="text"
    >
      {/* Avatar with initials */}
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{initials}</Text>
      </View>

      {/* Profile Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.email}>{profile.email}</Text>
      </View>

      {/* Subscription Badge */}
      <View style={[styles.tierBadge, { backgroundColor: tierColor }]}>
        <Text style={styles.tierText}>{tierLabel}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: lightColors.background.secondary,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: brandColors.lavender,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '600',
    color: brandColors.charcoal,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: lightColors.text.primary,
  },
  email: {
    fontSize: 14,
    color: lightColors.text.secondary,
    marginTop: 2,
  },
  tierBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  tierText: {
    fontSize: 12,
    fontWeight: '600',
    color: brandColors.charcoal,
  },
});
