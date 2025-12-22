import { cssInterop } from 'nativewind';
import Svg from 'react-native-svg';

// Core UI components
export * from './action-button';
export * from './alert-card';
export * from './bottom-sheet';
export * from './button';
export * from './checkbox';
export { default as colors } from './colors';
export * from './content-blur';
export * from './empty-state';
export * from './focus-aware-status-bar';
export * from './image';
export * from './image-thumbnail';
export * from './input';
export * from './list';
export * from './modal';
export * from './progress-bar';
export * from './progress-ring';
export * from './select';
export * from './severity-badge';
export * from './skeleton';
export * from './social-button';
export * from './status-circle';
export * from './summary-card';
export * from './text';
export * from './utils';

// export base components from react-native
export {
  ActivityIndicator,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
export { SafeAreaView } from 'react-native-safe-area-context';

//Apply cssInterop to Svg to resolve className string into style
cssInterop(Svg, {
  className: {
    target: 'style',
  },
});
