import { Tabs } from "expo-router";
import React from "react";
import TabBarIcon from "../../components/TabBarIcon"; // adjust path as needed

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopWidth: 1,
          borderTopColor: "#f0f2f5",
          height: 80,
          paddingTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Tasks",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon icon="list" label="Tasks" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "Calendar",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon icon="calendar" label="Calendar" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon icon="user" label="Profile" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
