import * as Haptics from 'expo-haptics';
import type { GestureResponderEvent, PressableProps } from 'react-native';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { Text } from './text';

type SocialProvider = 'google' | 'apple';

interface SocialButtonProps extends Omit<PressableProps, 'children'> {
  provider: SocialProvider;
  loading?: boolean;
}

// Google "G" logo - matches official Google branding
function GoogleIcon({ size = 20 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <Path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <Path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <Path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </Svg>
  );
}

// Apple logo - white version for dark button background
function AppleIcon({
  size = 20,
  color = '#FFFFFF',
}: {
  size?: number;
  color?: string;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <Path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
    </Svg>
  );
}

export function SocialButton({
  provider,
  loading = false,
  disabled,
  ...props
}: SocialButtonProps) {
  const isGoogle = provider === 'google';
  const isApple = provider === 'apple';

  const handlePress = (event: GestureResponderEvent) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    props.onPress?.(event);
  };

  const accessibilityLabel = isGoogle
    ? 'Continue with Google'
    : 'Sign in with Apple';

  return (
    <Pressable
      {...props}
      onPress={handlePress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        isGoogle && styles.googleButton,
        isApple && styles.appleButton,
        pressed && styles.pressed,
        (disabled || loading) && styles.disabled,
      ]}
      testID={`social-button-${provider}`}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
    >
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator
            size="small"
            color={isApple ? '#FFFFFF' : '#1E1E1E'}
            style={styles.loader}
          />
        ) : (
          <>
            <View style={styles.iconContainer}>
              {isGoogle && <GoogleIcon />}
              {isApple && <AppleIcon />}
            </View>
            <Text
              style={[
                styles.text,
                isGoogle && styles.googleText,
                isApple && styles.appleText,
              ]}
            >
              {isGoogle ? 'Continue with Google' : 'Sign in with Apple'}
            </Text>
          </>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    minHeight: 48,
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginVertical: 6,
  },
  googleButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  appleButton: {
    backgroundColor: '#000000',
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: 12,
  },
  loader: {
    marginVertical: 2,
  },
  text: {
    fontSize: 15,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  googleText: {
    color: '#1E1E1E',
  },
  appleText: {
    color: '#FFFFFF',
  },
});
