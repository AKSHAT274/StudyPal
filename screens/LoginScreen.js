// LoginScreen.js
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../services/firebase";
import LoginForm from "../components/LoginForm";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // useEffect(() => {
  //   AsyncStorage.getItem("twoStepEnabled").then((value) => {
  //     setTwoStepEnabled(value === "true");
  //   });
  // }, []);     Its paid

  const handleLogin = async () => {
    if (!emailRegex.test(email)) {
      Alert.alert("Invalid email", "Please re-enter email");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Check if the email is verified
      if (!user.emailVerified) {
        Alert.alert(
          "Email not verified",
          "Please check your inbox for verification."
        );
        return;
      }

      Alert.alert("Login successful!", `Hello, ${user.email}`);
      navigation.navigate("Main");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        Alert.alert("User not found", "The email is not registered.");
      } else if (error.code === "auth/wrong-password") {
        Alert.alert(
          "Incorrect password",
          "Please check your password and try again."
        );
      } else {
        Alert.alert("Login failed"+error.code, error.message);
      }
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false); 
    }
  };

  const handleSignUp = async () => {
    if (!emailRegex.test(email)) {
      Alert.alert("Invalid email", "Please re-enter email");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await sendEmailVerification(userCredential.user);
      Alert.alert(
        "Verification Email Sent",
        "Please verify your email before logging in."
      );
      setIsSignUp(false);
    } catch (error) {
      setErrorMessage(error.message);
      Alert.alert("Sign Up failed!", error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleForgotPassword = async () => {
    // Validate email format
    if (!emailRegex.test(email)) {
      Alert.alert(
        "Invalid email",
        "Please enter a valid email to reset password."
      );
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        "Password Reset",
        "Check your email for password reset instructions."
      );
    } catch (error) {
      console.error("Error sending password reset email:", error.message);
      Alert.alert("Error", error.message);
    }
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
      handleGoogleSignIn={handleGoogleSignIn}
      handleForgotPassword={handleForgotPassword}
      isLoading={isLoading}
      errorMessage={errorMessage}
      isSignUp={isSignUp}
      setIsSignUp={setIsSignUp}
    />
  );
};

export default LoginScreen;
