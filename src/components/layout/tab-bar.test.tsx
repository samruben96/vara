import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { fireEvent, render, screen } from '@testing-library/react-native';
import * as Haptics from 'expo-haptics';
import * as React from 'react';
import { View } from 'react-native';

import { TabBar } from './tab-bar';

jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  ImpactFeedbackStyle: { Light: 'light' },
}));

jest.mock('nativewind', () => ({
  useColorScheme: () => ({ colorScheme: 'dark' }),
  cssInterop: jest.fn(),
  remapProps: jest.fn(),
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 34, left: 0, right: 0 }),
}));

const routes = [
  { key: 'index-123', name: 'index', params: undefined },
  { key: 'monitor-456', name: 'monitor', params: undefined },
  { key: 'alerts-789', name: 'alerts', params: undefined },
  { key: 'settings-012', name: 'settings', params: undefined },
];

const mockRender = () => <View />;

const createMockProps = (focusedIndex = 0): BottomTabBarProps => ({
  state: {
    index: focusedIndex,
    routes,
    key: 'tab-key',
    routeNames: ['index', 'monitor', 'alerts', 'settings'],
    type: 'tab',
    stale: false,
    history: [],
    preloadedRouteKeys: [],
  },
  descriptors: {
    'index-123': {
      options: { title: 'Home', tabBarButtonTestID: 'home-tab' },
      navigation: {} as never,
      route: routes[0],
      render: mockRender,
    },
    'monitor-456': {
      options: { title: 'Monitor', tabBarButtonTestID: 'monitor-tab' },
      navigation: {} as never,
      route: routes[1],
      render: mockRender,
    },
    'alerts-789': {
      options: { title: 'Alerts', tabBarButtonTestID: 'alerts-tab' },
      navigation: {} as never,
      route: routes[2],
      render: mockRender,
    },
    'settings-012': {
      options: { title: 'Settings', tabBarButtonTestID: 'settings-tab' },
      navigation: {} as never,
      route: routes[3],
      render: mockRender,
    },
  },
  navigation: {
    emit: jest.fn(() => ({ defaultPrevented: false })),
    navigate: jest.fn(),
  } as never,
  insets: { top: 0, bottom: 34, left: 0, right: 0 },
});

describe('TabBar', () => {
  beforeEach(() => jest.clearAllMocks());

  it('renders all 4 tabs', () => {
    render(<TabBar {...createMockProps()} />);
    expect(screen.getByText('Home')).toBeTruthy();
    expect(screen.getByText('Monitor')).toBeTruthy();
    expect(screen.getByText('Alerts')).toBeTruthy();
    expect(screen.getByText('Settings')).toBeTruthy();
  });

  it('highlights active tab with mint color', () => {
    render(<TabBar {...createMockProps(0)} />);
    const homeLabel = screen.getByText('Home');
    expect(homeLabel.props.style).toEqual(
      expect.objectContaining({ color: '#B1EFE3' })
    );
    const monitorLabel = screen.getByText('Monitor');
    expect(monitorLabel.props.style).toEqual(
      expect.objectContaining({ color: '#666666' })
    );
  });

  it('navigates on tab press', () => {
    const props = createMockProps(0);
    render(<TabBar {...props} />);
    fireEvent.press(screen.getByTestId('monitor-tab'));
    expect(props.navigation.navigate).toHaveBeenCalledWith(
      'monitor',
      undefined
    );
  });

  it('applies haptic feedback on press', () => {
    const props = createMockProps(0);
    render(<TabBar {...props} />);
    fireEvent.press(screen.getByTestId('monitor-tab'));
    expect(Haptics.impactAsync).toHaveBeenCalledWith(
      Haptics.ImpactFeedbackStyle.Light
    );
  });

  it('does not navigate when pressing focused tab', () => {
    const props = createMockProps(0);
    render(<TabBar {...props} />);
    fireEvent.press(screen.getByTestId('home-tab'));
    expect(props.navigation.navigate).not.toHaveBeenCalled();
    expect(Haptics.impactAsync).not.toHaveBeenCalled();
  });

  it('has correct test IDs for each tab', () => {
    render(<TabBar {...createMockProps()} />);
    expect(screen.getByTestId('home-tab')).toBeTruthy();
    expect(screen.getByTestId('monitor-tab')).toBeTruthy();
    expect(screen.getByTestId('alerts-tab')).toBeTruthy();
    expect(screen.getByTestId('settings-tab')).toBeTruthy();
  });

  it('renders custom-tab-bar container', () => {
    render(<TabBar {...createMockProps()} />);
    expect(screen.getByTestId('custom-tab-bar')).toBeTruthy();
  });
});
