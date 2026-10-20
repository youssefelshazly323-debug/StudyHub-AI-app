import { Tabs } from "expo-router";
import { Text } from "react-native";

function tabIcon(glyph) {
  function TabBarIcon({ color, focused }) {
    return (
      <Text
        style={{ color, fontSize: 23, fontWeight: focused ? "800" : "400" }}
      >
        {glyph}
      </Text>
    );
  }

  return TabBarIcon;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#3263AF",
        tabBarInactiveTintColor: "#8A96A5",
        tabBarLabelStyle: { fontSize: 11, fontWeight: "700", marginBottom: 3 },
        tabBarStyle: {
          height: 84,
          paddingTop: 7,
          paddingBottom: 20,
          backgroundColor: "#FFFFFF",
          borderTopColor: "#E2E6EE",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: "Home", tabBarIcon: tabIcon("⌂") }}
      />
      <Tabs.Screen
        name="files"
        options={{ title: "Files", tabBarIcon: tabIcon("▱") }}
      />
      <Tabs.Screen
        name="tasks"
        options={{ title: "Tasks", tabBarIcon: tabIcon("☷") }}
      />
      <Tabs.Screen
        name="schedule"
        options={{ title: "Schedule", tabBarIcon: tabIcon("▦") }}
      />
      <Tabs.Screen
        name="chat"
        options={{ title: "Chat", tabBarIcon: tabIcon("◯") }}
      />
    </Tabs>
  );
}
