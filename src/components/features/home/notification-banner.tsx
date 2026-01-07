/**
 * NotificationBanner Component - Story 2.9
 *
 * "We noticed something new" style banner.
 * AC36: Tappable (navigates to finding) and dismissible (X or swipe)
 */

import * as Haptics from 'expo-haptics';
import React, { useCallback, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  FadeOut,
  runOnJS,
  SlideOutRight,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { ChevronRight } from '@/components/ui/icons';
import { Text } from '@/components/ui/text';
import {
  cardShadows,
  ctaColors,
  layout,
  lightColors,
  spacing,
} from '@/lib/design-system';

const SWIPE_THRESHOLD = 100;

export interface NotificationBannerProps {
  title: string;
  description?: string;
  onPress: () => void;
  onDismiss: () => void;
  testID?: string;
}

export function NotificationBanner({
  title,
  description,
  onPress,
  onDismiss,
  testID,
}: NotificationBannerProps) {
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const translateX = useSharedValue(0);

  const handlePress = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  }, [onPress]);

  const handleDismiss = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setVisible(false);
    // Small delay to allow animation
    setTimeout(
      () => {
        onDismiss();
      },
      reducedMotion ? 0 : 300
    );
  }, [onDismiss, reducedMotion]);

  // AC36: Swipe gesture for dismissal
  const panGesture = Gesture.Pan()
    .activeOffsetX(10) // Start recognizing after 10px horizontal movement
    .onUpdate((event) => {
      // Only allow right swipe (positive translateX)
      if (event.translationX > 0) {
        translateX.value = event.translationX;
      }
    })
    .onEnd((event) => {
      if (event.translationX > SWIPE_THRESHOLD) {
        // Swipe past threshold - dismiss
        translateX.value = withSpring(400, { damping: 20 });
        runOnJS(handleDismiss)();
      } else {
        // Snap back
        translateX.value = withSpring(0, { damping: 20 });
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: 1 - translateX.value / 400,
  }));

  if (!visible) {
    return null;
  }

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        exiting={reducedMotion ? FadeOut : SlideOutRight.duration(300)}
        style={animatedStyle}
        testID={testID}
      >
        <Pressable
          onPress={handlePress}
          accessibilityLabel={`${title}. ${description || ''} Tap to view details. Swipe right to dismiss.`}
          accessibilityRole="button"
          accessibilityHint="Double tap to view notification details, or swipe right to dismiss"
          style={({ pressed }) => [styles.container, pressed && styles.pressed]}
        >
          <View style={styles.content}>
            <View style={styles.indicator} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{title}</Text>
              {description && (
                <Text style={styles.description}>{description}</Text>
              )}
            </View>
            <ChevronRight
              width={20}
              height={20}
              color={lightColors.text.tertiary}
            />
          </View>
          <Pressable
            onPress={handleDismiss}
            accessibilityLabel="Dismiss notification"
            accessibilityRole="button"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={styles.dismissButton}
          >
            <Text style={styles.dismissText}>×</Text>
          </Pressable>
        </Pressable>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: lightColors.background.secondary,
    borderRadius: layout.cardRadius,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    ...cardShadows.subtle,
  },
  pressed: {
    opacity: 0.8,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: ctaColors.coral,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
    color: lightColors.text.primary,
  },
  description: {
    fontSize: 13,
    fontWeight: '400',
    color: lightColors.text.tertiary,
    marginTop: 2,
  },
  dismissButton: {
    padding: spacing.xs,
    marginLeft: spacing.sm,
  },
  dismissText: {
    fontSize: 20,
    fontWeight: '400',
    color: lightColors.text.tertiary,
    lineHeight: 20,
  },
});
