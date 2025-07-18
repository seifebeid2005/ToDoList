// app/_layout.tsx
import { Stack } from "expo-router";
import { useAuth } from "../hooks/useAuth";

export default function RootLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return null; // or a splash screen
  }

  return (
    <Stack
      screenOptions={{ headerShown: false }}
      initialRouteName={user ? "(auth)" : "(main)"}
    >
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(main)" />
    </Stack>
  );
}
