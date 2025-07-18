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
import { useRoute, useNavigation, useRouter } from "@react-navigation/native";
import { addTask, getTask, updateTask, TaskType } from "../../func/task";

const EditTaskScreen = () => {
  const route = useRoute();
  const router = useRouter();
  const navigation = useNavigation();
  const { taskId } = (route.params as { taskId?: string }) || {};
  const [task, setTask] = useState<Omit<TaskType, "id"> | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      if (taskId) {
        const fetchedTask = await getTask(taskId);
        if (fetchedTask) {
          setTask(fetchedTask);
        }
      } else {
        setTask({
          title: "",
          description: "",
          dueDate: "",
          status: "Not Started",
          icon: "pencil",
        });
      }
    };

    fetchTask();
  }, [taskId]);

  const handleSave = async () => {
    if (task) {
      try {
        if (taskId) {
          await updateTask(taskId, task);
          Alert.alert("Task updated!");
        } else {
          await addTask(task);
          Alert.alert("Task created!");
        }
        router.back();
      } catch (error) {
        Alert.alert("Error saving task");
      }
    }
  };

  if (!task) return <Text>Loading...</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📋 Create Or Update Tasks </Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>
          {taskId ? `Task #${taskId}` : "Create new Task"}
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
          value={task.status}
          onChangeText={(text) => setTask({ ...task, status: text })}
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
