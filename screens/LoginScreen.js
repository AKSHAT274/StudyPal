// LoginScreen.js
import React, { useState } from "react";
import { Alert } from "react-native";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../services/firebase";
import LoginForm from "../components/LoginForm";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]$/;

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

  const handleForgotPassword = () => {
    if (!emailRegex.test(email)) {
      Alert.alert(
        "Invalid email",
        "Please enter a valid email to reset password."
      );
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert(
          "Password Reset",
          "Check your email for password reset instructions."
        );
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
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
      handleForgotPassword={handleForgotPassword}
      isLoading={isLoading}
      errorMessage={errorMessage}
      isSignUp={isSignUp}
      setIsSignUp={setIsSignUp}
    />
  );
};

export default LoginScreen;
