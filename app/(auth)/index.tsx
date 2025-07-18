import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Pressable,
  Animated,
  StyleSheet,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Link, useNavigation } from "expo-router";
import { useAuth } from "../../hooks/useAuth";
import { Redirect } from "expo-router";
import { auth } from "../../firebase/config";
import { fetchTasks, addTask, deleteTask } from "@/func/task";
type FontAwesomeIconName = React.ComponentProps<typeof FontAwesome>["name"];

type TaskType = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: string;
  // icon: FontAwesomeIconName;
};
const [Task, setTask] = React.useState<TaskType[]>([]);

const TaskItem = ({ task }: { task: TaskType }) => {
  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  if (!auth.currentUser)
    return <Redirect href={{ pathname: "/(main)/SignUp" }} />;

  const fetchData = async () => {
    try {
      const tasks = await fetchTasks();
      console.log("Fetched tasks:", tasks);
      setTask(
        tasks.map((task) => ({
          ...task,
          id: Number(task.id),
        }))
      );
      console.log("Fetched tasks:", tasks);
      console.log("Fetched tasks:", tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handleFinishTask = () => {
    console.log(`Task ${task.id} finished`);
    putAnimated();
  };

  const putAnimated = () => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: 300,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      console.log("Task animation complete");
    });
  };

  return (
    <Link
      href={{
        pathname: "/idpages/EditTaskScreen",
        params: { taskId: task.id },
      }}
      asChild
    >
      <Pressable
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={() => console.log("Task pressed")}
        onLongPress={handleFinishTask}
      >
        <Animated.View
          style={[
            styles.taskItem,
            {
              transform: [{ scale }, { translateX }],
              opacity,
            },
          ]}
        >
          {/* <FontAwesome
              name={task.icon}
              size={26}
              color="#4a4a4a"
              style={styles.icon}
            /> */}
          <View>
            <Text style={styles.taskTitle}>{task.title}</Text>
            <Text style={styles.taskDesc}>{task.description}</Text>
            <Text style={styles.taskMeta}>Due: {task.dueDate}</Text>
            <Text style={styles.taskMeta}>Status: {task.status}</Text>
          </View>
        </Animated.View>
      </Pressable>
    </Link>
  );
};

const Index = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>📋 Task List</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {Task.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ScrollView>
      <Link
        href={{
          pathname: "/idpages/EditTaskScreen",
          params: { taskId: 0 },
        }}
        asChild
      >
        <Pressable style={styles.addButton}>
          <FontAwesome
            name="plus"
            size={20}
            color="#fff"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.addButtonText}>Add Task</Text>
        </Pressable>
      </Link>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  taskItem: {
    backgroundColor: "#f0f0f0",
    padding: 14,
    marginVertical: 8,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    marginRight: 12,
  },
  taskTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  taskDesc: {
    color: "#555",
    marginTop: 2,
  },
  taskMeta: {
    fontSize: 12,
    color: "#777",
    marginTop: 2,
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007bff",
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
