/**
 * FeatureStatusList Component - Story 2.9
 *
 * Displays protection features with sparkle icons.
 * AC22: Sparkle icon prefix for feature list items
 * AC29: Feature list in home screen design
 * AC35: "Run Scan" link initiates comprehensive scan
 */

import * as Haptics from 'expo-haptics';
import React, { useCallback } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { SparkleIcon } from '@/components/ui/icons';
import { Text } from '@/components/ui/text';
import {
  brandColors,
  ctaColors,
  layout,
  lightColors,
  spacing,
} from '@/lib/design-system';

export interface FeatureStatus {
  id: string;
  name: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export interface FeatureStatusListProps {
  features?: FeatureStatus[];
  onRunScan?: () => void; // AC35: Initiates comprehensive scan
  testID?: string;
}

const DEFAULT_FEATURES: FeatureStatus[] = [
  {
    id: 'image-protection',
    name: 'Image Protection',
    description: '0 unauthorized photo uses found',
    actionLabel: 'Run Scan',
  },
  {
    id: 'impersonation',
    name: 'Impersonation Monitoring',
    description: 'No fake profiles detected',
  },
  {
    id: 'privacy-leaks',
    name: 'Privacy Leaks',
    description: 'Your info is safe',
  },
  {
    id: 'behavioral',
    name: 'Behavioral Patterns',
    description: 'No suspicious activity',
  },
];

interface FeatureItemProps {
  feature: FeatureStatus;
  onRunScan?: () => void;
}

function FeatureItem({ feature, onRunScan }: FeatureItemProps) {
  const handleAction = useCallback(() => {
    if (feature.onAction) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      feature.onAction();
    } else if (feature.actionLabel === 'Run Scan' && onRunScan) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onRunScan();
    }
  }, [feature, onRunScan]);

  return (
    <View style={styles.featureItem}>
      <SparkleIcon size={20} color={brandColors.darkTeal} />
      <View style={styles.featureContent}>
        <View style={styles.featureHeader}>
          <Text style={styles.featureName}>{feature.name}</Text>
          {feature.actionLabel && (
            <Pressable onPress={handleAction}>
              <Text style={styles.actionLink}>{feature.actionLabel}</Text>
            </Pressable>
          )}
        </View>
        <Text style={styles.featureDescription}>{feature.description}</Text>
      </View>
    </View>
  );
}

export function FeatureStatusList({
  features = DEFAULT_FEATURES,
  onRunScan,
  testID,
}: FeatureStatusListProps) {
  return (
    <View style={styles.container} testID={testID}>
      {features.map((feature) => (
        <FeatureItem key={feature.id} feature={feature} onRunScan={onRunScan} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: layout.itemSpacing,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  featureContent: {
    flex: 1,
  },
  featureHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  featureName: {
    fontSize: 15,
    fontWeight: '500',
    color: lightColors.text.primary,
  },
  featureDescription: {
    fontSize: 14,
    fontWeight: '400',
    color: lightColors.text.tertiary,
  },
  actionLink: {
    fontSize: 14,
    fontWeight: '500',
    color: ctaColors.coral,
  },
});
