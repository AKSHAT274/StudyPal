import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Profile = ({ route }) => {
  const user = route.params?.user; // Get user data from navigation params

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Profile Details</Text>
        <Text style={styles.detail}>User data not available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Details</Text>
      <Text style={styles.detail}>Email: {user?.email}</Text>
      {/* Add more user details here if available */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  detail: {
    fontSize: 18,
    color: "#555",
  },
});

export default Profile;
