import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import * as Haptics from 'expo-haptics';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text } from '@/components/ui';
import { Alerts, Home, Monitor, Settings } from '@/components/ui/icons';
import {
  brandColors,
  fontFamilies,
  fontSizes,
  getSemanticColors,
  layout,
  spacing,
} from '@/lib/design-system';

const TAB_ICONS = {
  index: Home,
  monitor: Monitor,
  alerts: Alerts,
  settings: Settings,
} as const;

type TabName = keyof typeof TAB_ICONS;

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const { colorScheme } = useColorScheme();

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: Math.max(insets.bottom, spacing.sm) },
      ]}
      testID="custom-tab-bar"
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title ?? route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const Icon = TAB_ICONS[route.name as TabName];
        const iconColor = isFocused
          ? brandColors.mint
          : getSemanticColors(colorScheme ?? 'dark').text.secondary;

        return (
          <Pressable
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabButton}
          >
            {Icon && <Icon color={iconColor} />}
            <Text style={[styles.label, { color: iconColor }]}>{label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: brandColors.charcoal,
    paddingTop: spacing.sm,
    height: layout.tabBarHeight,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 44,
    minHeight: 44,
    gap: spacing.xs,
  },
  label: {
    fontSize: fontSizes.bodySmall,
    fontWeight: '500',
    fontFamily: fontFamilies.jakarta.medium,
  },
});
