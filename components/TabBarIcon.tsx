import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import iconSet from "@expo/vector-icons/build/Fontisto";

const TabBarIcon = ({
  icon,
  label,
  focused,
}: {
  icon: keyof typeof FontAwesome.glyphMap;
  label: string;
  focused: boolean;
}) => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <FontAwesome
          name={icon}
          size={22}
          style={styles.icon}
          color={focused ? "#000000ff" : "#60768a"}
        />
        <Text
          style={[styles.label, { color: focused ? "#000000ff" : "#60768a" }]}
        >
          {label}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    marginTop: 0,
  },
  label: {
    fontSize: 12,
    fontWeight: "500",
    letterSpacing: 0.2,
    width: 60,
    textAlign: "center",
  },
  icon: {
    marginBottom: 2,
  },
});

export default TabBarIcon;
