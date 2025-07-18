import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { Link, Redirect } from "expo-router";
import MenIcon from "../../assets/images/man.png";
import WomanIcon from "../../assets/images/woman.png";
import { auth } from "../../firebase/config";
// Valid FontAwesome icon names only
type FontAwesomeIconName = NonNullable<
  ComponentProps<typeof FontAwesome>["name"]
>;

type ProfileItemProps = {
  name: FontAwesomeIconName;
  label: string;
  onPress?: () => void;
};

const ProfileItem = ({ name, label, onPress }: ProfileItemProps) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <View style={styles.iconWrap}>
      <FontAwesome name={name} size={20} color="#121416" />
    </View>
    <Text style={styles.label}>{label}</Text>
  </TouchableOpacity>
);

const ProfileScreen = () => {
  const [loggedOut, setLoggedOut] = useState(false);
  const [user, setUser] = useState({
    name: "Seif Ebeid",
    email: "seif.amr.ebeid@email.com",
    gender: "male",
    birthday: "2005-06-02",
  });

  const avatar = user.gender === "male" ? MenIcon : WomanIcon;

  useEffect(() => {
    const fetchUserData = async () => {};
    fetchUserData();
  }, []);

  const Logout = async () => {
    try {
      await auth.signOut();
      console.log("User signed out");
      setLoggedOut(true);
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  if (loggedOut) {
    return <Redirect href="/(main)/Login" />;
  }
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scroll}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Profile</Text>
          </View>
          {/* Avatar & Info */}
          <View style={styles.profileSection}>
            <Image source={avatar} style={styles.avatar} />
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
            <Text style={styles.birthday}>{user.birthday}</Text>
          </View>
          {/* Section: Account */}
          <Text style={styles.sectionTitle}>Account</Text>
          <ProfileItem name="user" label="View Profile" />
          <ProfileItem name="pencil" label="Edit Profile" />
          {/* Section: Settings */}
          <Text style={styles.sectionTitle}>Settings</Text>
          <ProfileItem name="bell" label="Notifications" />
          <ProfileItem name="lightbulb-o" label="Theme" />
          {/* "language" is a valid icon in FontAwesome so keep it */}
          <ProfileItem name="language" label="Language" />
          {/* Section: Preferences */}
          <Text style={styles.sectionTitle}>App Preferences</Text>
          {/* "commenting" is NOT a valid FontAwesome icon; replace with "comments-o" which is */}
          <ProfileItem name="comments-o" label="Feedback" />
          <ProfileItem name="question-circle" label="Help" />
          <ProfileItem name="info-circle" label="About" />
        </ScrollView>
        {/* Logout Button */}
        <TouchableOpacity style={styles.item} onPress={Logout}>
          <View style={styles.iconWrap}>
            <FontAwesome name="sign-out" size={20} color="#121416" />
          </View>
          <Text style={styles.label}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scroll: {
    paddingBottom: 80,
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
  profileSection: {
    alignItems: "center",
    padding: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 999,
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#121416",
  },
  email: {
    fontSize: 14,
    color: "#6a7681",
  },
  birthday: {
    fontSize: 14,
    color: "#6a7681",
    marginBottom: 10,
  },
  sectionTitle: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 8,
    fontSize: 16,
    fontWeight: "700",
    color: "#121416",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
  },
  iconWrap: {
    width: 40,
    height: 40,
    backgroundColor: "#f1f2f4",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  label: {
    fontSize: 16,
    color: "#121416",
  },
});
