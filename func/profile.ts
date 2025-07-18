import { db } from "../firebase/config"; // Adjust the path as necessary
import { doc, getDoc } from "firebase/firestore";

// Initialize your Firebase app before this (not shown here)

export async function getProfile(userId: string) {
  const docRef = doc(db, "profiles", userId);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}
