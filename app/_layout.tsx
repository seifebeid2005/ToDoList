// app/_layout.tsx
import { Stack } from "expo-router";
import { useAuth } from "../hooks/useAuth";

export default function RootLayout() {
  const { user, loading } = useAuth();

  if (loading) return null; // or splash

  const initialRoute = user ? "(main)" : "(auth)";

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(main)" options={{ headerShown: false }} />
    </Stack>
  );
}
