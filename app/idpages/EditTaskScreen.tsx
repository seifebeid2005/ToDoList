import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  SafeAreaView,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { addTask } from "@/func/task";
// Dummy data source (can be replaced with Firebase or Context)
const dummyTasks = [
  {
    id: 1,
    title: "Complete React Native Project",
    description: "Finish the project by the end of the week.",
    dueDate: "2023-10-15",
    status: "In Progress",
    icon: "list",
  },
  {
    id: 2,
    title: "Attend Team Meeting",
    description: "Discuss project updates with the team.",
    icon: "calendar",
    dueDate: "2023-10-16",
    status: "Pending",
  },
  {
    id: 3,
    title: "Submit Project Report",
    description: "Prepare and submit the final report.",
    dueDate: "2023-10-20",
    status: "Not Started",
    icon: "pencil",
  },
  {
    id: 4,
    title: "Review Code Changes",
    description: "Review the latest code changes from the team.",
    dueDate: "2023-10-18",
    status: "In Progress",
    icon: "list",
  },
  {
    id: 5,
    title: "Plan Next Sprint",
    description: "Prepare for the next sprint planning meeting.",
    dueDate: "2023-10-22",
    status: "Pending",
    icon: "calendar",
  },
  {
    id: 6,
    title: "Update Documentation",
    description: "Ensure all documentation is up to date.",
    dueDate: "2023-10-25",
    status: "Not Started",
    icon: "pencil",
  },
  {
    id: 7,
    title: "Fix Bugs",
    description: "Address any bugs reported by users.",
    dueDate: "2023-10-30",
    status: "In Progress",
    icon: "bug",
  },
];

const EditTaskScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { taskId } = (route.params as { taskId: string }) || null;
  const [task, setTask] = useState<any>(null);
  console.log("Editing Task ID:", taskId);

  useEffect(() => {
    if (taskId) {
      const foundTask = dummyTasks.find((t) => t.id === parseInt(taskId));
      if (foundTask) {
        setTask(foundTask);
      } else {
        setTask({
          id: parseInt(taskId),
          title: "",
          description: "",
          dueDate: "",
          status: "Not Started",
          icon: "pencil",
        });
      }
    }
  }, []);

  const handleSave = async () => {
    Alert.alert("Task updated!");
    try {
      const data = await addTask(task);
      console.log("Task saved:", data);
    } catch (error) {
      Alert.alert("Error updating task");
    }
    navigation.goBack();
  };

  if (!task && taskId) return <Text>Loading...</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📋 Create Or Update Tasks </Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>
          {taskId != "0" ? `Task #${taskId}` : "Create new Task"}
        </Text>
        <TextInput
          style={styles.input}
          value={task.title}
          onChangeText={(text) => setTask({ ...task, title: text })}
          placeholder="Title"
        />
        <TextInput
          style={styles.input}
          value={task.description}
          onChangeText={(text) => setTask({ ...task, description: text })}
          placeholder="Description"
        />
        <TextInput
          style={styles.input}
          value={task.dueDate}
          onChangeText={(text) => setTask({ ...task, dueDate: text })}
          placeholder="Due Date"
        />
        <TextInput
          style={styles.input}
          value={"pending"}
          editable={false}
          placeholder="Status"
        />
        <Button title="Save" onPress={handleSave} />
      </View>
    </SafeAreaView>
  );
};

export default EditTaskScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 0,
    textAlign: "center",
    paddingBottom: 10,
    borderBottomColor: "gray",
    borderBottomWidth: 2,
    flex: 1,
  },
  label: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
    borderRadius: 6,
  },
});
