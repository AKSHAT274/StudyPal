// LoginScreen.js
import React, { useState } from "react";
import { Alert } from "react-native";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../services/firebase";
import LoginForm from "./LoginForm";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  const handleLogin = () => {
    if (!emailRegex.test(email)) {
      Alert.alert("Invalid email", "Please re-enter email");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        Alert.alert("Login successful!", `Hello, ${user.email}`);
        navigation.navigate("Main"); // Navigate to Dashboard
      })
      .catch((error) => {
        setErrorMessage(error.message);
        Alert.alert("Login failed!", error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSignUp = () => {
    if (!emailRegex.test(email)) {
      Alert.alert("Invalid email", "Please re-enter email");
      return;
    }
    setIsLoading(true);
    setErrorMessage("");
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        Alert.alert("Sign Up successful!", `Welcome, ${user.email}`);
        setIsSignUp(false);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        Alert.alert("Sign Up failed!", error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <LoginForm
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      isPasswordVisible={isPasswordVisible}
      togglePasswordVisibility={togglePasswordVisibility}
      handleLogin={handleLogin}
      handleSignUp={handleSignUp}
      isLoading={isLoading}
      errorMessage={errorMessage}
      isSignUp={isSignUp}
      setIsSignUp={setIsSignUp}
    />
  );
};

export default LoginScreen;
