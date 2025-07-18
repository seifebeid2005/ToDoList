import React from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";

const CalendarScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Calendar</Text>
        {/* Add your calendar component or events here */}
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>
            Your calendar will appear here.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffffff",
  },
  content: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
  },
  placeholder: {
    width: "100%",
    height: 200,
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderText: {
    color: "#888",
    fontSize: 16,
  },
});
