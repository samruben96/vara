/**
 * Scan Stack Layout
 *
 * Nested stack navigator for the scan flow.
 * Screens: Start Scan → Progress → Results
 */
import { Stack } from 'expo-router';

export default function ScanLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="progress" />
      <Stack.Screen name="results" />
    </Stack>
  );
}
