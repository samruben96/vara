import React, { useCallback, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { EmptyState } from '@/components/ui/empty-state';
import { CheckmarkCircle } from '@/components/ui/icons';
import { Text } from '@/components/ui/text';
import { brandColors, layout, lightColors, spacing } from '@/lib/design-system';

import { AlertList } from './alert-list';
import { type AlertData, mockAlerts } from './mock-data';

export function AlertsContent() {
  const insets = useSafeAreaInsets();
  // In a real app, this would come from React Query
  const [alerts] = useState<AlertData[]>(mockAlerts);

  const handleAlertPress = useCallback((id: string) => {
    Alert.alert('Coming Soon', `Threat detail view for alert ${id}`);
  }, []);

  const handleStartScan = useCallback(() => {
    Alert.alert('Coming Soon', 'Scan feature is under development');
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + spacing.md },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Text style={styles.sectionTitle} accessibilityRole="header">
          Recent Alerts
        </Text>

        {/* Content */}
        {alerts.length > 0 ? (
          <AlertList alerts={alerts} onAlertPress={handleAlertPress} />
        ) : (
          <EmptyState
            icon={<CheckmarkCircle color={brandColors.mint} />}
            title="All Clear!"
            description="No findings yet - you're all clear!"
            action={{ label: 'Start Scan', onPress: handleStartScan }}
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightColors.background.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: layout.screenMargin,
    paddingBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: lightColors.text.primary,
    marginBottom: spacing.md,
  },
});
