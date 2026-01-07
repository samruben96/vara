/**
 * Start Scan Screen
 *
 * Entry point for reverse image search.
 * Allows user to capture a photo for scanning.
 */
import { useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CameraCapture, ImagePreview } from '@/components/features/scan';
import { FocusAwareStatusBar, Text } from '@/components/ui';
import { layout, lightColors, spacing, textStyles } from '@/lib/design-system';
import { useCapturedImage, useScanActions } from '@/store/scan-store';
import type { ScanImage } from '@/types/scan.types';

export default function StartScanScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const capturedImage = useCapturedImage();
  const { setCapturedImage, reset } = useScanActions();

  const handleCapture = useCallback(
    (image: ScanImage) => {
      setCapturedImage(image);
    },
    [setCapturedImage]
  );

  const handleError = useCallback((error: string) => {
    showMessage({
      message: 'Error',
      description: error,
      type: 'danger',
    });
  }, []);

  const handleRetake = useCallback(() => {
    setCapturedImage(null);
  }, [setCapturedImage]);

  const handleStartScan = useCallback(() => {
    router.push('/(app)/scan/progress');
  }, [router]);

  const handleClose = useCallback(() => {
    reset();
    router.back();
  }, [reset, router]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <FocusAwareStatusBar />

      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={handleClose} style={styles.closeButton}>
          <Text style={styles.closeText}>Cancel</Text>
        </Pressable>

        <Text style={styles.title}>Scan Your Image</Text>

        <View style={styles.closeButton} />
      </View>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        Take a photo to search for your image across the web
      </Text>

      {/* Content */}
      <View style={styles.content}>
        {capturedImage ? (
          <ImagePreview
            image={capturedImage}
            onRetake={handleRetake}
            onStartScan={handleStartScan}
            testID="image-preview"
          />
        ) : (
          <CameraCapture
            onCapture={handleCapture}
            onError={handleError}
            testID="camera-capture"
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightColors.background.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: layout.screenMargin,
    paddingVertical: spacing.md,
  },
  closeButton: {
    width: 60,
  },
  closeText: {
    fontSize: 16,
    color: lightColors.text.secondary,
  },
  title: {
    fontSize: textStyles.sectionHeader.fontSize,
    fontWeight: '600',
    color: lightColors.text.primary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: lightColors.text.secondary,
    textAlign: 'center',
    paddingHorizontal: layout.screenMargin,
    marginBottom: spacing.lg,
  },
  content: {
    flex: 1,
  },
});
