// SplashScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase";

const SplashScreenComponent = ({ navigation }) => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    // Prevent the splash screen from auto-hiding
    SplashScreen.preventAutoHideAsync();

    // Check authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setTimeout(() => {
        if (user) {
          // User is logged in, navigate to Dashboard
          navigation.replace("Main");
        } else {
          // User is not logged in, navigate to Login
          navigation.replace("Login");
        }
        setAppIsReady(true);
      }, 3000); // 4 seconds delay
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (appIsReady) {
      // Hide the splash screen
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/studypal-logo.jpeg")}
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