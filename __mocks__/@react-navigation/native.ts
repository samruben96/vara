import * as React from 'react';

export const useNavigation = () => ({
  navigate: jest.fn(),
  goBack: jest.fn(),
  setOptions: jest.fn(),
  addListener: jest.fn(),
  dispatch: jest.fn(),
});

export const useRoute = () => ({
  params: {},
  name: '',
});

export const useIsFocused = () => true;
export const useFocusEffect = (callback: () => void) => {
  React.useEffect(callback, [callback]);
};

export const NavigationContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => React.createElement(React.Fragment, null, children);

export const createNavigationContainerRef = () => ({
  current: null,
});

export const DefaultTheme = {
  dark: false,
  colors: {
    primary: '#007AFF',
    background: '#FFFFFF',
    card: '#FFFFFF',
    text: '#000000',
    border: '#CCCCCC',
    notification: '#FF3B30',
  },
};

export const DarkTheme = {
  dark: true,
  colors: {
    primary: '#0A84FF',
    background: '#000000',
    card: '#1C1C1E',
    text: '#FFFFFF',
    border: '#272729',
    notification: '#FF453A',
  },
};

export const ThemeProvider = NavigationContainer;
export const useTheme = () => DefaultTheme;
