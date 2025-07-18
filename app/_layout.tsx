// app/_layout.tsx
import { Stack } from "expo-router";
import { useAuth } from "../hooks/useAuth";

import { Redirect } from "expo-router";

export default function RootLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return null; // or a splash screen
  }

  if (user) {
    return <Redirect href="/(auth)" />;
  }

  return <Redirect href="/(main)/Login" />;
}
