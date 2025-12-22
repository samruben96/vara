import * as Haptics from 'expo-haptics';
import type { ImageSource } from 'expo-image';
import { Image as ExpoImage } from 'expo-image';
import React, { useCallback } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import {
  borderRadius,
  brandColors,
  darkColors,
  statusColors,
} from '@/lib/design-system';

export type ThumbnailStatus = 'protected' | 'attention' | 'critical';

export interface ImageThumbnailProps {
  source: ImageSource;
  status?: ThumbnailStatus;
  size?: number;
  onPress?: () => void;
}

const DEFAULT_SIZE = 80;

const STATUS_COLORS: Record<ThumbnailStatus, string> = {
  protected: statusColors.protected,
  attention: statusColors.attention,
  critical: statusColors.critical,
};

const STATUS_LABELS: Record<ThumbnailStatus, string> = {
  protected: 'Protected',
  attention: 'Needs attention',
  critical: 'Critical',
};

export function ImageThumbnail({
  source,
  status,
  size = DEFAULT_SIZE,
  onPress,
}: ImageThumbnailProps) {
  const statusColor = status ? STATUS_COLORS[status] : undefined;
  const statusLabel = status ? STATUS_LABELS[status] : undefined;
  const accessibilityLabel = statusLabel
    ? `Image thumbnail. Status: ${statusLabel}`
    : 'Image thumbnail';

  const handlePress = useCallback(() => {
    if (onPress) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onPress();
    }
  }, [onPress]);

  const content = (
    <View style={[styles.container, { width: size, height: size }]}>
      <ExpoImage
        source={source}
        style={[styles.image, { width: size, height: size }]}
        contentFit="cover"
        transition={200}
      />
      {status && statusColor && (
        <View
          style={[styles.statusIndicator, { backgroundColor: statusColor }]}
          accessibilityElementsHidden={true}
        />
      )}
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={handlePress}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        style={({ pressed }) => [pressed && styles.pressed]}
      >
        {content}
      </Pressable>
    );
  }

  return (
    <View accessibilityLabel={accessibilityLabel} accessibilityRole="image">
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    backgroundColor: darkColors.background.secondary,
  },
  pressed: {
    opacity: 0.8,
  },
  image: {
    borderRadius: borderRadius.lg,
  },
  statusIndicator: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: brandColors.charcoal,
  },
});
