/**
 * ProtectionScoreCard Component - Story 2.9
 *
 * Displays the protection score in a card with sage tint background.
 * AC18: Protection score card has subtle mint/sage tinted background (#F5FAF7)
 * AC34: Score number displays in sage green color (#A8D5BA)
 * AC9: Large score number (52px)
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from '@/components/ui/text';
import {
  cardShadows,
  layout,
  lightColors,
  statusColors,
  textStyles,
} from '@/lib/design-system';

export interface ProtectionScoreCardProps {
  score: number;
  subtitle?: string;
  secondaryText?: string;
  testID?: string;
}

export function ProtectionScoreCard({
  score,
  subtitle = 'You are protected today',
  secondaryText = 'No active threats detected',
  testID,
}: ProtectionScoreCardProps) {
  return (
    <View style={styles.card} testID={testID} accessibilityRole="text">
      <Text
        style={styles.score}
        accessibilityLabel={`Protection score: ${score}`}
      >
        {score}
      </Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <Text style={styles.secondaryText}>{secondaryText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: lightColors.background.sageTint, // AC18: Sage tinted background
    borderRadius: layout.cardRadiusLarge, // 24px for softer appearance
    padding: layout.cardPadding,
    alignItems: 'center',
    justifyContent: 'center',
    ...cardShadows.subtle, // Very subtle shadow
  },
  score: {
    fontSize: textStyles.scoreDisplay.fontSize, // AC9: 52px
    fontWeight: textStyles.scoreDisplay.fontWeight,
    lineHeight: textStyles.scoreDisplay.fontSize * textStyles.scoreDisplay.lineHeight,
    color: statusColors.protected, // AC34: Sage green color
    fontFamily: textStyles.scoreDisplay.fontFamily,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    color: lightColors.text.primary,
    marginTop: 8,
    textAlign: 'center',
  },
  secondaryText: {
    fontSize: 14,
    fontWeight: '400',
    color: lightColors.text.tertiary,
    marginTop: 4,
    textAlign: 'center',
  },
});
