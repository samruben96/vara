import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Button, Text } from '@/components/ui';
import { Camera, Gallery } from '@/components/ui/icons';
import { brandColors, spacing } from '@/lib/design-system';

interface AddPhotosContentProps {
  onUpload?: () => void;
  onCapture?: () => void;
}

export function AddPhotosContent({
  onUpload = () => {},
  onCapture = () => {},
}: AddPhotosContentProps) {
  return (
    <View style={styles.container}>
      {/* Explanation */}
      <Text style={styles.explanation}>
        Your photos help us monitor for unauthorized use of your image across
        the web. We scan for facial matches to detect potential threats.
      </Text>

      {/* Photo count guidance */}
      <View style={styles.guidanceContainer}>
        <Text style={styles.guidance}>
          Add <Text style={styles.guidanceHighlight}>1-10 photos</Text> for best
          results
        </Text>
      </View>

      {/* Action buttons */}
      <View style={styles.actionsContainer}>
        <Button
          testID="upload-photos-button"
          onPress={onUpload}
          style={styles.actionButton}
        >
          <View style={styles.buttonContent}>
            <Gallery color={brandColors.charcoal} />
            <Text style={styles.buttonText}>Upload Photos</Text>
          </View>
        </Button>
        <Button
          testID="capture-photo-button"
          onPress={onCapture}
          style={styles.actionButton}
        >
          <View style={styles.buttonContent}>
            <Camera color={brandColors.charcoal} />
            <Text style={styles.buttonText}>Take Photo</Text>
          </View>
        </Button>
      </View>

      {/* Photo grid placeholder */}
      <View testID="photo-grid-placeholder" style={styles.photoGrid}>
        {Array.from({ length: 6 }).map((_, index) => (
          <View key={index} style={styles.photoPlaceholder}>
            <Gallery color="#555555" />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  explanation: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 15,
    color: '#AAAAAA',
    lineHeight: 22.5,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  guidanceContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  guidance: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#AAAAAA',
  },
  guidanceHighlight: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    color: brandColors.mint,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  actionButton: {
    flex: 1,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  buttonText: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 14,
    color: brandColors.charcoal,
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    justifyContent: 'center',
  },
  photoPlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#3A3A3A',
    borderStyle: 'dashed',
  },
});
