import GorhomBottomSheet, {
  BottomSheetBackdrop,
  type BottomSheetBackdropProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import { StyleSheet } from 'react-native';

import { borderRadius, lightColors, spacing } from '@/lib/design-system';

export interface BottomSheetProps {
  visible: boolean;
  onDismiss: () => void;
  snapPoints?: string[];
  children: React.ReactNode;
}

export interface BottomSheetRef {
  expand: () => void;
  close: () => void;
}

const DEFAULT_SNAP_POINTS = ['50%', '90%'];

export const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(
  function BottomSheet({ visible, onDismiss, snapPoints, children }, ref) {
    const bottomSheetRef = useRef<GorhomBottomSheet>(null);

    const resolvedSnapPoints = useMemo(
      () => snapPoints ?? DEFAULT_SNAP_POINTS,
      [snapPoints]
    );

    useImperativeHandle(ref, () => ({
      expand: () => bottomSheetRef.current?.expand(),
      close: () => bottomSheetRef.current?.close(),
    }));

    const handleSheetChanges = useCallback(
      (index: number) => {
        if (index === -1) {
          onDismiss();
        }
      },
      [onDismiss]
    );

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.5}
          pressBehavior="close"
        />
      ),
      []
    );

    if (!visible) {
      return null;
    }

    return (
      <GorhomBottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={resolvedSnapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        backgroundStyle={styles.background}
        handleIndicatorStyle={styles.handleIndicator}
        style={styles.sheet}
        accessibilityLabel="Bottom sheet"
        accessibilityRole="none"
      >
        <BottomSheetView style={styles.contentContainer}>
          {children}
        </BottomSheetView>
      </GorhomBottomSheet>
    );
  }
);

const styles = StyleSheet.create({
  sheet: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  background: {
    backgroundColor: lightColors.background.secondary,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
  },
  handleIndicator: {
    backgroundColor: lightColors.text.tertiary,
    width: 40,
    height: 4,
    borderRadius: 2,
  },
  contentContainer: {
    flex: 1,
    padding: spacing.md,
  },
});
