import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="welcome" />
      <Stack.Screen name="permissions" />
      <Stack.Screen name="add-photos" />
      <Stack.Screen name="add-info" />
      <Stack.Screen name="first-scan" />
    </Stack>
  );
}
