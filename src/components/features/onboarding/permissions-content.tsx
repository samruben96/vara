import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Button, Text } from '@/components/ui';
import { Camera, Notifications } from '@/components/ui/icons';
import { brandColors, spacing } from '@/lib/design-system';

type PermissionStatus = 'pending' | 'granted';

interface PermissionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  status: PermissionStatus;
  onAllow: () => void;
  testID: string;
}

function PermissionCard({
  icon,
  title,
  description,
  status,
  onAllow,
  testID,
}: PermissionCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        {icon}
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
      <Text style={styles.cardDescription}>{description}</Text>
      <Button
        testID={testID}
        label={status === 'granted' ? 'Allowed' : 'Allow'}
        onPress={onAllow}
        disabled={status === 'granted'}
        style={styles.allowButton}
      />
    </View>
  );
}

interface PermissionsContentProps {
  cameraStatus?: PermissionStatus;
  notificationStatus?: PermissionStatus;
  onAllowCamera?: () => void;
  onAllowNotifications?: () => void;
}

export function PermissionsContent({
  cameraStatus = 'pending',
  notificationStatus = 'pending',
  onAllowCamera = () => {},
  onAllowNotifications = () => {},
}: PermissionsContentProps) {
  return (
    <View style={styles.container}>
      <PermissionCard
        icon={<Camera color={brandColors.mint} />}
        title="Camera Access"
        description="Required to capture photos for facial recognition and identity monitoring."
        status={cameraStatus}
        onAllow={onAllowCamera}
        testID="allow-camera-button"
      />
      <PermissionCard
        icon={<Notifications color={brandColors.mint} />}
        title="Notifications"
        description="Stay informed with alerts about potential threats and scan results."
        status={notificationStatus}
        onAllow={onAllowNotifications}
        testID="allow-notifications-button"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacing.lg,
  },
  card: {
    backgroundColor: '#2A2A2A',
    borderRadius: 16,
    padding: spacing.lg,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  cardTitle: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 18,
    color: brandColors.cream,
    marginLeft: spacing.sm,
  },
  cardDescription: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#AAAAAA',
    lineHeight: 21,
    marginBottom: spacing.md,
  },
  allowButton: {
    marginTop: spacing.xs,
  },
});
