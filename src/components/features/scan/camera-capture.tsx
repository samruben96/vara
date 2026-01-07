/**
 * CameraCapture Component
 *
 * Handles camera access and photo capture for reverse image search.
 * Uses expo-image-picker for camera functionality.
 */
import * as ImagePicker from 'expo-image-picker';
import React, { useCallback, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Camera } from '@/components/ui/icons';
import { Text } from '@/components/ui/text';
import { ctaColors, layout, lightColors, spacing } from '@/lib/design-system';
import type { ScanImage } from '@/types/scan.types';

export interface CameraCaptureProps {
  onCapture: (image: ScanImage) => void;
  onError: (error: string) => void;
  testID?: string;
}

export function CameraCapture({
  onCapture,
  onError,
  testID,
}: CameraCaptureProps) {
  const [isCapturing, setIsCapturing] = useState(false);

  const handleCapture = useCallback(async () => {
    try {
      setIsCapturing(true);

      // Request camera permission
      const { status } = await ImagePicker.requestCameraPermissionsAsync();

      if (status !== 'granted') {
        onError(
          'Camera permission is required to take photos. Please enable it in Settings.'
        );
        return;
      }

      // Launch camera
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        onCapture({
          uri: asset.uri,
          width: asset.width,
          height: asset.height,
        });
      }
    } catch (error) {
      onError('Failed to capture photo. Please try again.');
    } finally {
      setIsCapturing(false);
    }
  }, [onCapture, onError]);

  return (
    <View style={styles.container} testID={testID}>
      <Pressable
        style={({ pressed }) => [
          styles.captureButton,
          pressed && styles.captureButtonPressed,
        ]}
        onPress={handleCapture}
        disabled={isCapturing}
        testID={testID ? `${testID}-button` : undefined}
      >
        <View style={styles.iconContainer}>
          <Camera color={lightColors.text.primary} width={48} height={48} />
        </View>

        <Text style={styles.buttonText}>
          {isCapturing ? 'Opening camera...' : 'Take a Photo'}
        </Text>

        <Text style={styles.hintText}>
          Position your face clearly in the frame
        </Text>
      </Pressable>

      <Text style={styles.privacyText}>
        Your photo is used only for this scan and is not stored permanently.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: layout.screenMargin,
  },
  captureButton: {
    alignItems: 'center',
    padding: spacing.xl,
    backgroundColor: lightColors.background.secondary,
    borderRadius: layout.cardRadius,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  captureButtonPressed: {
    backgroundColor: lightColors.background.sageTint,
    transform: [{ scale: 0.98 }],
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: ctaColors.coralLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '600',
    color: lightColors.text.primary,
    marginBottom: spacing.xs,
  },
  hintText: {
    fontSize: 14,
    color: lightColors.text.secondary,
    textAlign: 'center',
  },
  privacyText: {
    fontSize: 12,
    color: lightColors.text.tertiary,
    textAlign: 'center',
    marginTop: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
});
