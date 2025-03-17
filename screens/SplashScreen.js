// SplashScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";

const SplashScreenComponent = ({ navigation }) => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    // Prevent the splash screen from auto-hiding
    SplashScreen.preventAutoHideAsync();

    // Simulate app loading (e.g., fetching data, initializing Firebase, etc.)
    setTimeout(() => {
      setAppIsReady(true);
    }, 4000); // 4 seconds delay
  }, []);

  useEffect(() => {
    if (appIsReady) {
      // Hide the splash screen and navigate to the main screen
      SplashScreen.hideAsync();
      navigation.replace("Login"); // Replace 'Login' with your main screen
    }
  }, [appIsReady]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/studypal-logo.jpeg")} // Replace with your app logo
        style={styles.logo}
      />
      <Text style={styles.title}>StudyPal</Text>
      <Text style={styles.subtitle}>Your College Study Companion</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0f7fa",
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#00796b",
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    color: "#00796b",
    marginTop: 8,
  },
});

export default SplashScreenComponent;
