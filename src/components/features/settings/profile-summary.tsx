/**
 * ProfileSummary Component - Story 2.9 Updated
 *
 * Displays user profile with avatar, name, email, and subscription tier badge.
 * Uses updated design tokens: sage green avatar, coral premium badge, teal pro badge.
 */
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from '@/components/ui/text';
import {
  borderRadius,
  brandColors,
  cardShadows,
  layout,
  lightColors,
  spacing,
  statusColors,
  textStyles,
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

// Story 2.9: Updated tier colors - coral for premium, teal for pro
const TIER_COLORS: Record<ProfileData['subscriptionTier'], string> = {
  free: lightColors.text.tertiary,
  premium: brandColors.coral, // Coral CTA color for premium
  pro: brandColors.darkTeal, // Dark teal for pro
};

// Story 2.9: Updated tier text colors for better contrast
const TIER_TEXT_COLORS: Record<ProfileData['subscriptionTier'], string> = {
  free: lightColors.text.primary,
  premium: '#FFFFFF', // White text on coral
  pro: '#FFFFFF', // White text on dark teal
};

export function ProfileSummary({ profile }: ProfileSummaryProps) {
  const tierLabel = TIER_LABELS[profile.subscriptionTier];
  const tierColor = TIER_COLORS[profile.subscriptionTier];
  const tierTextColor = TIER_TEXT_COLORS[profile.subscriptionTier];
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
        <Text style={[styles.tierText, { color: tierTextColor }]}>
          {tierLabel}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: lightColors.background.secondary,
    borderRadius: layout.cardRadius, // Story 2.9: AC16 20px radius
    padding: spacing.md,
    ...cardShadows.soft, // Story 2.9: AC15 soft shadows
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: statusColors.protected, // Story 2.9: Sage green avatar
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF', // White text on sage green
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: textStyles.bodyText.fontSize, // Story 2.9: Body text (15px)
    fontWeight: '600',
    color: lightColors.text.primary,
  },
  email: {
    fontSize: textStyles.caption.fontSize, // Story 2.9: Caption (13px)
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
  },
});
