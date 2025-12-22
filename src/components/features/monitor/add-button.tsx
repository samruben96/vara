import * as Haptics from 'expo-haptics';
import React, { useCallback, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ActionButton } from '@/components/ui/action-button';
import { BottomSheet } from '@/components/ui/bottom-sheet';
import { Camera, Gallery, Plus } from '@/components/ui/icons';
import { Text } from '@/components/ui/text';
import { borderRadius, brandColors, spacing } from '@/lib/design-system';

export interface AddButtonProps {
  onAddPhotos?: () => void;
  onLinkAccount?: () => void;
}

const FAB_SIZE = 56;

export function AddButton({ onAddPhotos, onLinkAccount }: AddButtonProps) {
  const [isSheetVisible, setIsSheetVisible] = useState(false);

  const handleFabPress = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsSheetVisible(true);
  }, []);

  const handleDismiss = useCallback(() => {
    setIsSheetVisible(false);
  }, []);

  const handleAddPhotos = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsSheetVisible(false);
    onAddPhotos?.();
  }, [onAddPhotos]);

  const handleLinkAccount = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsSheetVisible(false);
    onLinkAccount?.();
  }, [onLinkAccount]);

  return (
    <>
      <Pressable
        onPress={handleFabPress}
        style={({ pressed }) => [styles.fab, pressed && styles.fabPressed]}
        accessibilityLabel="Add monitored item"
        accessibilityRole="button"
        accessibilityHint="Opens options to add photos or link an account"
      >
        <Plus color={brandColors.charcoal} />
      </Pressable>

      <BottomSheet
        visible={isSheetVisible}
        onDismiss={handleDismiss}
        snapPoints={['35%']}
      >
        <View style={styles.sheetContent}>
          <Text style={styles.sheetTitle}>Add to Monitored Items</Text>

          <View style={styles.optionsContainer}>
            <ActionButton
              label="Add Photos"
              onPress={handleAddPhotos}
              variant="secondary"
              icon={<Gallery color={brandColors.mint} />}
            />
            <ActionButton
              label="Link Account"
              onPress={handleLinkAccount}
              variant="secondary"
              icon={<Camera color={brandColors.mint} />}
            />
          </View>
        </View>
      </BottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: spacing.lg,
    right: spacing.lg,
    width: FAB_SIZE,
    height: FAB_SIZE,
    borderRadius: borderRadius.full,
    backgroundColor: brandColors.mint,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  fabPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
  },
  sheetContent: {
    padding: spacing.md,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: brandColors.charcoal,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  optionsContainer: {
    gap: spacing.md,
  },
});
