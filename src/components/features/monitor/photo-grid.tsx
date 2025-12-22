import * as Haptics from 'expo-haptics';
import React, { useCallback } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import {
  ImageThumbnail,
  type ThumbnailStatus,
} from '@/components/ui/image-thumbnail';
import { spacing } from '@/lib/design-system';

export interface PhotoItem {
  id: string;
  uri: string;
  status: ThumbnailStatus;
}

export interface PhotoGridProps {
  photos: PhotoItem[];
  onPhotoPress?: (id: string) => void;
}

const COLUMNS = 3;
const THUMBNAIL_SIZE = 100;

export function PhotoGrid({ photos, onPhotoPress }: PhotoGridProps) {
  const handlePhotoPress = useCallback(
    (id: string) => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      if (onPhotoPress) {
        onPhotoPress(id);
      } else {
        Alert.alert('Coming Soon', 'Image detail view is under development');
      }
    },
    [onPhotoPress]
  );

  return (
    <View
      style={styles.grid}
      accessibilityLabel={`Photo grid with ${photos.length} monitored photos`}
      accessibilityRole="list"
    >
      {photos.map((photo) => (
        <View key={photo.id} style={styles.gridItem}>
          <ImageThumbnail
            source={{ uri: photo.uri }}
            status={photo.status}
            size={THUMBNAIL_SIZE}
            onPress={() => handlePhotoPress(photo.id)}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  gridItem: {
    width: `${100 / COLUMNS}%`,
    aspectRatio: 1,
    maxWidth: THUMBNAIL_SIZE,
  },
});
