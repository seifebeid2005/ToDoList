import { db } from "../firebase/config"; // Adjust the path as necessary
import { doc, getDoc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";

export type ProfileType = {
  name: string;
  email: string;
  gender: "male" | "female" | "other";
  birthday: string;
};

export async function createProfile(userId: string, profileData: ProfileType) {
  const docRef = doc(db, "profiles", userId);
  try {
    await setDoc(docRef, profileData);
  } catch (error) {
    throw error;
  }
}

export async function getProfile(userId: string) {
  const docRef = doc(db, "profiles", userId);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as ProfileType;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}

export async function updateProfile(
  userId: string,
  profileData: Partial<ProfileType>
) {
  const docRef = doc(db, "profiles", userId);
  try {
    await updateDoc(docRef, profileData);
  } catch (error) {
    throw error;
  }
}

export async function deleteProfile(userId: string) {
  const docRef = doc(db, "profiles", userId);
  try {
    await deleteDoc(docRef);
  } catch (error) {
    throw error;
  }
}
