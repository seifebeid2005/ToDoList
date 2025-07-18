import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Button,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { fetchTasks, TaskType, deleteTask } from "../../func/task";
import { FontAwesome } from "@expo/vector-icons";

const CalendarScreen = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loadTasks = async () => {
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
    };
    loadTasks();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Tasks</Text>
        <Button
          title="Create Task"
          onPress={() => router.push("/idpages/EditTaskScreen")}
        />
        {tasks.map((task) => (
          <View key={task.id} style={styles.taskContainer}>
            <View style={styles.taskInfo}>
              <Text style={styles.taskTitle}>{task.title}</Text>
              <Text>{task.description}</Text>
              <Text>Due: {task.dueDate}</Text>
            </View>
            <View style={styles.taskActions}>
              <TouchableOpacity
                onPress={() =>
                  router.push(`/idpages/EditTaskScreen?taskId=${task.id}`)
                }
              >
                <FontAwesome name="pencil" size={24} color="blue" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(task.id)}>
                <FontAwesome name="trash" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
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
  taskContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontWeight: "bold",
  },
  taskActions: {
    flexDirection: "row",
    alignItems: "center",
  },
});
