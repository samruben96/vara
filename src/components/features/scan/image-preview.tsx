/**
 * ImagePreview Component
 *
 * Shows the captured image with options to retake or start scan.
 */
import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { layout, lightColors, spacing } from '@/lib/design-system';
import type { ScanImage } from '@/types/scan.types';

export interface ImagePreviewProps {
  image: ScanImage;
  onRetake: () => void;
  onStartScan: () => void;
  isScanning?: boolean;
  testID?: string;
}

export function ImagePreview({
  image,
  onRetake,
  onStartScan,
  isScanning = false,
  testID,
}: ImagePreviewProps) {
  return (
    <View style={styles.container} testID={testID}>
      {/* Image Preview */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: image.uri }}
          style={styles.image}
          resizeMode="cover"
          testID={testID ? `${testID}-image` : undefined}
        />
      </View>

      {/* Caption */}
      <Text style={styles.caption}>Ready to scan for matching images</Text>

      {/* Actions */}
      <View style={styles.actions}>
        <Pressable
          style={styles.retakeButton}
          onPress={onRetake}
          disabled={isScanning}
          testID={testID ? `${testID}-retake` : undefined}
        >
          <Text style={styles.retakeText}>Retake Photo</Text>
        </Pressable>

        <View style={styles.scanButtonContainer}>
          <Button
            label={isScanning ? 'Scanning...' : 'Start Scan'}
            onPress={onStartScan}
            loading={isScanning}
            disabled={isScanning}
            testID={testID ? `${testID}-scan` : undefined}
            className="bg-cta-coral"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: layout.screenMargin,
    paddingVertical: spacing.lg,
  },
  imageContainer: {
    aspectRatio: 1,
    width: '100%',
    borderRadius: layout.cardRadius,
    overflow: 'hidden',
    backgroundColor: lightColors.background.secondary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  caption: {
    fontSize: 16,
    color: lightColors.text.secondary,
    textAlign: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
  actions: {
    gap: spacing.md,
  },
  retakeButton: {
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  retakeText: {
    fontSize: 16,
    color: lightColors.text.secondary,
    textDecorationLine: 'underline',
  },
  scanButtonContainer: {
    marginTop: spacing.sm,
  },
});
