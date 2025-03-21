// screens/Dashboard.js
import React from "react";
import {
  View,
  Text, 
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import { CommonActions } from "@react-navigation/native";
import Background from '../components/Background';

const Dashboard = ({ navigation }) => {
  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert("Logged out successfully!");

      // Reset navigation stack and navigate to Login
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Login" }], // Makes Login the only available screen
        })
      );
    } catch (error) {
      Alert.alert("Logout failed!", error.message);
    }
  };

  return (
    <Background>
      <Image
        source={require('../assets/profilepicDefault.jpg')} // Adjust the path as necessary
        style={styles.profileImage}
      />
      <Text style={styles.welcomeText}>Welcome, {user?.email}!</Text>
      <Text style={styles.profileText}>Profile Details:</Text>
      <Text style={styles.detail}>Email: {user?.email}</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </Background>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0f7fa",
    padding: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#00796b",
  },
  profileText: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 10,
    color: "#004d40",
  },
  detail: {
    fontSize: 18,
    color: "#555",
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: "#d32f2f",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
});

export default Dashboard;
