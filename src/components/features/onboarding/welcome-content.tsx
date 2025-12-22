import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from '@/components/ui';
import { brandColors, lightColors, spacing } from '@/lib/design-system';

const VALUE_PROPS = [
  'Discover exposure',
  'Monitor threats',
  'Respond with guidance',
];

export function WelcomeContent() {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <View testID="vara-logo" style={styles.logoContainer}>
        <Text style={styles.logoText}>vara</Text>
      </View>

      {/* Value propositions */}
      <View style={styles.valuePropsContainer}>
        {VALUE_PROPS.map((prop, index) => (
          <View key={index} style={styles.valuePropItem}>
            <View style={styles.valuePropBullet} />
            <Text style={styles.valuePropText}>{prop}</Text>
          </View>
        ))}
      </View>

      {/* Tagline */}
      <Text style={styles.tagline}>vara watches so you don&apos;t have to</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    marginBottom: spacing['2xl'],
  },
  logoText: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 64,
    color: brandColors.mint,
    letterSpacing: -2,
  },
  valuePropsContainer: {
    alignItems: 'flex-start',
    marginBottom: spacing['2xl'],
  },
  valuePropItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.xs,
  },
  valuePropBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: brandColors.lavender,
    marginRight: spacing.sm,
  },
  valuePropText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 18,
    color: lightColors.text.primary,
  },
  tagline: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 15,
    color: lightColors.text.secondary,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
