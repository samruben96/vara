import React from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';

import { Alerts, Gallery, Monitor, User } from '@/components/ui/icons';
import { darkColors, layout, spacing } from '@/lib/design-system';

import { StatusCircle } from './status-circle';
import { SummaryCard } from './summary-card';

const HERO_HEIGHT_RATIO = 0.4;

export function HomeContent() {
  const { height } = useWindowDimensions();
  const heroHeight = height * HERO_HEIGHT_RATIO;
  return (
    <View style={styles.container}>
      {/* Hero Section - Top 40% */}
      <View style={[styles.heroSection, { height: heroHeight }]}>
        <StatusCircle status="protected" size="lg" showLabel />
      </View>

      {/* Summary Cards Section */}
      <View style={styles.cardsSection}>
        <View style={styles.cardsGrid}>
          <View style={styles.cardRow}>
            <SummaryCard
              value="0"
              label="Images Monitored"
              icon={<Gallery color={darkColors.text.secondary} />}
            />
            <SummaryCard
              value="0"
              label="Alerts"
              icon={<Alerts color={darkColors.text.secondary} />}
            />
          </View>
          <View style={styles.cardRow}>
            <SummaryCard
              value="--"
              label="Last Scan"
              icon={<Monitor color={darkColors.text.secondary} />}
            />
            <SummaryCard
              value="0"
              label="Accounts"
              icon={<User color={darkColors.text.secondary} />}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkColors.background.primary,
  },
  heroSection: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: layout.screenMargin,
  },
  cardsSection: {
    flex: 1,
    paddingHorizontal: layout.screenMargin,
  },
  cardsGrid: {
    gap: spacing.md,
  },
  cardRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
});
