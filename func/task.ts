import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase/config";

// TypeScript type for a task
export type TaskType = {
  id: string; // Firestore doc id (string)
  title: string;
  description: string;
  dueDate: string;
  status: string;
  icon: string;
};

// Fetch all tasks, ordered by dueDate
export const fetchTasks = async (): Promise<TaskType[]> => {
  try {
    const q = query(collection(db, "tasks"), orderBy("dueDate"));
    const querySnapshot = await getDocs(q);
    const tasks: TaskType[] = [];
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      tasks.push({
        id: docSnap.id,
        title: data.title,
        description: data.description,
        dueDate: data.dueDate,
        status: data.status,
        icon: data.icon,
      });
    });
    return tasks;
  } catch (error) {
    console.error("Error fetching tasks: ", error);
    throw error;
  }
};

// Fetch a single task by id
export const getTask = async (id: string): Promise<TaskType | null> => {
  try {
    const taskRef = doc(db, "tasks", id);
    const taskSnap = await getDoc(taskRef);
    if (taskSnap.exists()) {
      return { id: taskSnap.id, ...taskSnap.data() } as TaskType;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching task: ", error);
    throw error;
  }
};

// Add a new task
export const addTask = async (task: Omit<TaskType, "id">) => {
  try {
    const docRef = await addDoc(collection(db, "tasks"), {
      ...task,
      dueDate: task.dueDate, // store as string or Timestamp
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding task: ", error);
    throw error;
  }
};

// Update an existing task
export const updateTask = async (
  id: string,
  task: Partial<Omit<TaskType, "id">>
) => {
  try {
    const taskRef = doc(db, "tasks", id);
    await updateDoc(taskRef, task);
  } catch (error) {
    console.error("Error updating task: ", error);
    throw error;
  }
};

// Delete a task
export const deleteTask = async (id: string) => {
  try {
    await deleteDoc(doc(db, "tasks", id));
  } catch (error) {
    console.error("Error deleting task: ", error);
    throw error;
  }
};
