import { useRouter } from "expo-router";

const routes = {
  Splash: "/",
  Onboarding: "/onboarding",
  Auth: "/auth",
  Home: "/(tabs)",
  Files: "/(tabs)/files",
  Tasks: "/(tabs)/tasks",
  Schedule: "/(tabs)/schedule",
  Chat: "/(tabs)/chat",
  Upload: "/upload",
  Summary: "/summary",
  Profile: "/profile",
  TaskEditor: "/task-editor",
};

export function useAppNavigation() {
  const router = useRouter();

  return (screen, replace = false) => {
    if (screen === "Back") {
      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace("/(tabs)");
      }
      return;
    }

    const route = routes[screen];
    if (!route) {
      throw new Error(`Unknown StudyHub screen: ${screen}`);
    }

    if (replace) {
      router.replace(route);
    } else {
      router.push(route);
    }
  };
}
