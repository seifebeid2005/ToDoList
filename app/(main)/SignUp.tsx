import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Link, Redirect } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/config";
import { Ionicons } from "@expo/vector-icons";

const genders = ["Male", "Female", "Other"];

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [gender, setGender] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!username || !password || !gender) {
      Alert.alert("Invalid", "Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      const email = `${username}@yourapp.com`;
      // 1. Create Auth user
      if (!auth) {
        Alert.alert("Error", "Authentication service is not available.");
        console.error("Auth service is not initialized");
        return;
      }
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredential.user.uid;
      console.log("User created with UID:", uid);
      // 2. Save additional user data to Firestore
      await setDoc(doc(db, "users", uid), {
        username,
        gender,
        createdAt: new Date().toISOString(),
      });
      setLoading(false);
      Alert.alert("Sign Up Successful!", "Your account was created!");
    } catch (error: any) {
      setLoading(false);
      console.error("Sign up error:", error);
      Alert.alert("Sign Up Failed", error.message);
      console.log("Sign up error:", username, password);
      console.log(auth);
    }
  };
  if (auth?.currentUser) {
    console.log(auth.currentUser);
    console.log("User already logged in, redirecting to login page.");
    return <Redirect href="/(auth)" />;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Sign up to get started</Text>

        {/* Username */}
        <View style={styles.inputWrap}>
          <Ionicons
            name="person-outline"
            size={20}
            color="#888"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            placeholderTextColor="#aaa"
          />
        </View>

        {/* Password */}
        <View style={styles.inputWrap}>
          <Ionicons
            name="lock-closed-outline"
            size={20}
            color="#888"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholderTextColor="#aaa"
          />
          <TouchableOpacity
            onPress={() => setShowPassword((prev) => !prev)}
            style={styles.showIcon}
          >
            <Ionicons
              name={showPassword ? "eye" : "eye-off"}
              size={20}
              color="#888"
            />
          </TouchableOpacity>
        </View>

        {/* Gender */}
        <Text style={styles.label}>Gender</Text>
        <View style={styles.genderContainer}>
          {genders.map((g) => (
            <TouchableOpacity
              key={g}
              style={[
                styles.genderButton,
                gender === g && styles.genderButtonSelected,
              ]}
              onPress={() => setGender(g)}
            >
              <Text
                style={
                  gender === g ? styles.genderTextSelected : styles.genderText
                }
              >
                {g}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleSignUp}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.or}>or</Text>
          <View style={styles.divider} />
        </View>

        {/* Login prompt */}
        <Link href="/(main)/Login" style={styles.link}>
          <Text style={styles.linkText}>
            Already have an account? <Text style={styles.boldLink}>Login</Text>
          </Text>
        </Link>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6fa",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: "#fff",
    padding: 28,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#121416",
    marginBottom: 6,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: "#6a7681",
    marginBottom: 28,
    fontWeight: "500",
    textAlign: "center",
  },
  inputWrap: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f4f6fa",
    borderRadius: 10,
    marginBottom: 18,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#e1e4ea",
  },
  inputIcon: {
    marginRight: 8,
  },
  showIcon: {
    padding: 4,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#222",
    paddingVertical: 10,
    backgroundColor: "transparent",
  },
  label: {
    width: "100%",
    fontSize: 15,
    color: "#6a7681",
    fontWeight: "600",
    marginTop: 8,
    marginBottom: 8,
    textAlign: "left",
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    width: "100%",
  },
  genderButton: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e1e4ea",
    backgroundColor: "#f4f6fa",
    alignItems: "center",
  },
  genderButtonSelected: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  genderText: {
    color: "#222",
    fontWeight: "600",
  },
  genderTextSelected: {
    color: "#fff",
    fontWeight: "700",
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#e1e4ea",
    borderRadius: 8,
    marginBottom: 18,
    backgroundColor: "#f4f6fa",
  },
  dateText: {
    color: "#222",
    fontSize: 16,
  },
  button: {
    width: "100%",
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 22,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 1.1,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 18,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#e1e4ea",
  },
  or: {
    marginHorizontal: 10,
    color: "#888",
    fontSize: 14,
  },
  link: {
    alignSelf: "center",
  },
  linkText: {
    color: "#6a7681",
    fontSize: 15,
    textAlign: "center",
  },
  boldLink: {
    color: "#007AFF",
    fontWeight: "bold",
  },
});
