import * as Haptics from 'expo-haptics';
import React, { useCallback } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { AlertCard } from '@/components/ui/alert-card';
import { spacing } from '@/lib/design-system';

import type { AlertData } from './mock-data';

export interface AlertListProps {
  alerts: AlertData[];
  onAlertPress?: (id: string) => void;
}

export function AlertList({ alerts, onAlertPress }: AlertListProps) {
  const handleAlertPress = useCallback(
    (id: string) => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      if (onAlertPress) {
        onAlertPress(id);
      } else {
        Alert.alert('Coming Soon', `Threat detail view for alert ${id}`);
      }
    },
    [onAlertPress]
  );

  return (
    <View
      style={styles.container}
      accessibilityLabel={`Alerts list with ${alerts.length} alerts`}
      accessibilityRole="list"
    >
      {alerts.map((alert) => (
        <AlertCard
          key={alert.id}
          title={alert.title}
          description={alert.description}
          severity={alert.severity}
          timestamp={alert.timestamp}
          status={alert.status}
          onPress={() => handleAlertPress(alert.id)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
});
