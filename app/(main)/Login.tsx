import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { Redirect, Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password.");
      return;
    }
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setLoading(false);
      Alert.alert("Login Successful", `Welcome, ${user.email}`);
      setRedirect(true);
    } catch (error: any) {
      setLoading(false);
      console.error("Login Error:", error);
      Alert.alert("Login Failed", error.message);
    }
  };

  if (redirect) return <Redirect href="/(auth)" />;
  if (auth.currentUser) return <Link href="/(auth)" />;
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Login to your account</Text>
        <View style={styles.inputWrap}>
          <Ionicons
            name="mail-outline"
            size={20}
            color="#888"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>
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
            placeholderTextColor="#aaa"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.showIcon}
          >
            <Ionicons
              name={showPassword ? "eye" : "eye-off"}
              size={20}
              color="#888"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.forgotWrap}>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.or}>or</Text>
          <View style={styles.divider} />
        </View>
        <Link href="/(main)/SignUp" style={styles.link}>
          <Text style={styles.linkText}>
            Don&apos;t have an account?{" "}
            <Text style={styles.boldLink}>Sign Up</Text>
          </Text>
        </Link>
      </View>
    </KeyboardAvoidingView>
  );
};

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
    marginBottom: 8,
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
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#222",
    paddingVertical: 10,
    backgroundColor: "transparent",
  },
  showIcon: {
    padding: 4,
  },
  forgotWrap: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 18,
  },
  forgot: {
    color: "#007AFF",
    fontSize: 14,
    fontWeight: "500",
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

export default Login;
