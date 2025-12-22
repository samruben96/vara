import { zodResolver } from '@hookform/resolvers/zod';
import React, { forwardRef, useImperativeHandle } from 'react';
import type { Control } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import type { SvgProps } from 'react-native-svg';
import * as z from 'zod';

import { ControlledInput, Text } from '@/components/ui';
import { Instagram, TikTok, Twitter } from '@/components/ui/icons';
import { brandColors, spacing } from '@/lib/design-system';

const addInfoSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().optional(),
  instagram: z.string().optional(),
  tiktok: z.string().optional(),
  twitter: z.string().optional(),
});

export type AddInfoFormType = z.infer<typeof addInfoSchema>;

export interface AddInfoContentRef {
  submit: () => Promise<boolean>;
}

interface SocialFieldConfig {
  name: keyof AddInfoFormType;
  testID: string;
  Icon: React.ComponentType<SvgProps>;
}

const SOCIAL_FIELDS: SocialFieldConfig[] = [
  { name: 'instagram', testID: 'instagram-input', Icon: Instagram },
  { name: 'tiktok', testID: 'tiktok-input', Icon: TikTok },
  { name: 'twitter', testID: 'twitter-input', Icon: Twitter },
];

interface SocialFieldProps {
  config: SocialFieldConfig;
  control: Control<AddInfoFormType>;
}

function SocialField({ config, control }: SocialFieldProps) {
  const { name, testID, Icon } = config;
  return (
    <View style={styles.socialField}>
      <View style={styles.socialIcon}>
        <Icon color={brandColors.lavender} />
      </View>
      <View style={styles.socialInput}>
        <ControlledInput
          testID={testID}
          control={control}
          name={name}
          placeholder="@username"
          autoCapitalize="none"
          style={styles.input}
        />
      </View>
    </View>
  );
}

interface AddInfoContentProps {
  onSubmit?: (data: AddInfoFormType) => void;
}

export const AddInfoContent = forwardRef<
  AddInfoContentRef,
  AddInfoContentProps
>(function AddInfoContent({ onSubmit = () => {} }, ref) {
  const { control, handleSubmit } = useForm<AddInfoFormType>({
    resolver: zodResolver(addInfoSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      instagram: '',
      tiktok: '',
      twitter: '',
    },
  });

  useImperativeHandle(ref, () => ({
    submit: async () => {
      let isValid = false;
      await handleSubmit(
        (data) => {
          onSubmit(data);
          isValid = true;
        },
        () => {
          isValid = false;
        }
      )();
      return isValid;
    },
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.explanation}>
        Your information helps us monitor for impersonation and identity threats
        across social platforms.
      </Text>

      <View style={styles.nameRow}>
        <View style={styles.nameField}>
          <ControlledInput
            testID="first-name-input"
            control={control}
            name="firstName"
            label="First Name *"
            placeholder="John"
            autoCapitalize="words"
            style={styles.input}
          />
        </View>
        <View style={styles.nameField}>
          <ControlledInput
            testID="last-name-input"
            control={control}
            name="lastName"
            label="Last Name"
            placeholder="Doe"
            autoCapitalize="words"
            style={styles.input}
          />
        </View>
      </View>

      <Text style={styles.sectionTitle}>Social Media Handles (optional)</Text>

      {SOCIAL_FIELDS.map((config) => (
        <SocialField key={config.name} config={config} control={control} />
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  explanation: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#AAAAAA',
    lineHeight: 21,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  nameRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  nameField: {
    flex: 1,
  },
  sectionTitle: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 14,
    color: brandColors.cream,
    marginBottom: spacing.md,
    marginTop: spacing.sm,
  },
  socialField: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  socialIcon: {
    width: 40,
    alignItems: 'center',
  },
  socialInput: {
    flex: 1,
  },
  input: {
    backgroundColor: '#2A2A2A',
  },
});
