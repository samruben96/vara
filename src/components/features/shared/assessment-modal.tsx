/**
 * AssessmentModal Component - Story 2.9
 *
 * AC31: Centered modal with sparkle icon, assessment label,
 * description, "Take Action" coral CTA, and "Dismiss" text link.
 */

import * as Haptics from 'expo-haptics';
import React, { useCallback } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';

import { SparkleIcon } from '@/components/ui/icons';
import { Text } from '@/components/ui/text';
import { TextLink } from '@/components/ui/text-link';
import {
  borderRadius,
  cardShadows,
  ctaColors,
  layout,
  lightColors,
  spacing,
  textColors,
} from '@/lib/design-system';

export interface AssessmentModalProps {
  visible: boolean;
  title: string;
  description: string;
  actionLabel?: string;
  dismissLabel?: string;
  onAction: () => void;
  onDismiss: () => void;
  testID?: string;
}

export function AssessmentModal({
  visible,
  title,
  description,
  actionLabel = 'Take Action',
  dismissLabel = 'Dismiss',
  onAction,
  onDismiss,
  testID,
}: AssessmentModalProps) {
  const handleAction = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onAction();
  }, [onAction]);

  const handleDismiss = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onDismiss();
  }, [onDismiss]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onDismiss}
      statusBarTranslucent
      testID={testID}
    >
      <View style={styles.overlay}>
        <View
          style={styles.modalContent}
          accessibilityRole="alert"
          accessibilityLabel={`Assessment: ${title}. ${description}`}
        >
          {/* Large Gradient Sparkle Icon */}
          <View style={styles.iconContainer}>
            <SparkleIcon size={48} gradient />
          </View>

          {/* Assessment Label */}
          <Text style={styles.assessmentLabel}>Assessment</Text>

          {/* Title */}
          <Text style={styles.title}>{title}</Text>

          {/* Description */}
          <Text style={styles.description}>{description}</Text>

          {/* Action Button */}
          <Pressable
            onPress={handleAction}
            style={({ pressed }) => [
              styles.actionButton,
              pressed && styles.actionButtonPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel={actionLabel}
          >
            <Text style={styles.actionButtonText}>{actionLabel}</Text>
          </Pressable>

          {/* Dismiss Link */}
          <TextLink
            label={dismissLabel}
            onPress={handleDismiss}
            color={textColors.mutedGray}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  modalContent: {
    backgroundColor: lightColors.background.secondary,
    borderRadius: layout.cardRadiusLarge,
    padding: spacing.xl,
    alignItems: 'center',
    width: '100%',
    maxWidth: 320,
    ...cardShadows.lg,
  },
  iconContainer: {
    marginBottom: spacing.md,
  },
  assessmentLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: ctaColors.coral,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: lightColors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  description: {
    fontSize: 15,
    fontWeight: '400',
    color: lightColors.text.tertiary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing.lg,
  },
  actionButton: {
    backgroundColor: ctaColors.coral,
    borderRadius: borderRadius.full,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    width: '100%',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  actionButtonPressed: {
    backgroundColor: ctaColors.coralDark,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: lightColors.cta.primaryText,
  },
});
