import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StudyHubProvider } from "../context/StudyHubContext";

export default function RootLayout() {
  return (
    <StudyHubProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#F5F7FB" },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="auth" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="upload" />
        <Stack.Screen name="summary" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="task-editor" />
      </Stack>
    </StudyHubProvider>
  );
}
