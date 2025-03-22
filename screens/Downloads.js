// screens/Downloads.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Background from '../components/Background';

const Downloads = () => {
  return (
    <Background>
      <Text style={styles.title}>Downloads</Text>
      <Text style={styles.text}>This is the Downloads page.</Text>
    </Background>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  text: {
    fontSize: 16,
    color: "#555",
  },
});

export default Downloads;
