// LoginScreen.js
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithCredential,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../services/firebase";
import LoginForm from "../components/LoginForm";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { makeRedirectUri } from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

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
        Alert.alert("Login failed" + error.code, error.message);
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

  // const [request, response, promptAsync] = Google.useAuthRequest({
  // clientId: process.env.EXPO_PUBLIC_FIREBASE_GOOGLE_CLIENT_ID,
  //   // iosClientId: "YOUR_IOS_CLIENT_ID",
  // androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
  //   redirectUri: makeRedirectUri({ useProxy: true }),
  //   scopes: ["profile", "email"],
  // });

  // const handleGoogleSignIn = async () => {
  //   try {
  //     const result = await promptAsync();
  //     if (result.type === "success") {
  //       const { id_token } = result.params;
  //       const credential = GoogleAuthProvider.credential(id_token);
  //       await signInWithCredential(auth, credential);
  //       navigation.navigate("Main");
  //     }
  //   } catch (error) {
  //     console.error("Google signin error:", error.message);
  //     Alert.alert("Google Sign-In Failed", error.message);
  //   }
  // };

  const [userInfo, setUserInfo] = useState(null);

  // Configuration for Google Auth
  const config = {
    // If you're building standalone apps, you can add the following:
    clientId: process.env.EXPO_PUBLIC_FIREBASE_GOOGLE_CLIENT_ID,

    // androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
    // iosClientId: IOS_CLIENT_ID,
    // redirectUri: makeRedirectUri({scheme: "studypal", useProxy: true }),
    scopes: ["profile", "email"],
  };

  const [request, response, promptAsync] = Google.useAuthRequest({
    scopes: ["profile", "email"],
    clientId: process.env.EXPO_PUBLIC_FIREBASE_GOOGLE_CLIENT_ID,
    clientSecret: process.env.EXPO_PUBLIC_GOOGLE_SECRET,
    androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
    webClientId: process.env.EXPO_PUBLIC_FIREBASE_GOOGLE_CLIENT_ID,
    // redirectUri: process.env.EXPO_PUBLIC_REDIRECT_URI,
    redirectUri: makeRedirectUri({scheme: "studypal", path: "studypal://screens/Dashboard" }),
    // redirectUri: "https://auth.expo.io/@akshat274/studypal",
    // redirectUri: "https://studypal-22dd0.firebaseapp.com/__/auth/handler",
  });

  // // Function to fetch user info from Google API
  // const getUserInfo = async (token) => {
  //   if (!token) return;
  //   try {
  //     const res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     const user = await res.json();
  //     console.log(user);
  //     // Store user information in AsyncStorage
  //     await AsyncStorage.setItem("user", JSON.stringify(user));
  //     setUserInfo(user);
  //   } catch (error) {
  //     console.error("Failed to fetch user data:", error);
  //   }
  // };

  // // Function to handle Google Sign-In when user clicks the button
  // const handleGoogleSignIn = async () => {
  //   try {
  //     const result = await promptAsync();
  //     console.log(result)
  //     if (result.type === "success") {
  //       const token = result.authentication.accessToken;
  //       await getUserInfo(token);
  //       navigation.navigate("Main");
  //     } else {
  //       Alert.alert(
  //         "Google Sign-In Cancelled",
  //         "Authentication was cancelled."
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Google Sign-In error:", error.message);
  //     Alert.alert("Google Sign-In Failed", error.message);
  //   }
  // };

  // // Optional: Listen for changes in the auth response and update user info.
  // useEffect(() => {
  //   if (response?.type === "success") {
  //     const token = response.authentication.accessToken;
  //     getUserInfo(token);
  //   }
  // }, [response]);

  useEffect( () => {
    if (response?.type === "success") {
      const { id_token } = result.params;
      const credential = GoogleAuthProvider.credential(id_token);
     signInWithCredential(auth, credential);
      console.log("Google Sign-In successful!");
      navigation.navigate("Main");
    }
  }, [response]);

  const handleGoogleSignIn = async () => {
    try {
      const result = await promptAsync();
      if (result?.type === "success") {
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
    }
  };

  // GoogleSignin.configure({
  //   webClientId: process.env.EXPO_PUBLIC_FIREBASE_GOOGLE_CLIENT_ID,
  // });

  // const handleGoogleSignIn = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices({
  //       showPlayServicesUpdateDialog: true,
  //     });
  //     const signInResult = await GoogleSignin.signIn();
  //     idToken = signInResult.data?.idToken;
  //     const googleCredential = GoogleAuthProvider.credential(id_token);
  //     await signInWithCredential(auth, googleCredential);
  //     console.log("Google Sign-In successful!");
  //   } catch (error) {
  //     setErrorMessage(error.message);
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       console.log("Sign in cancelled");
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       console.log("Sign in in progress");
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       console.log("Play services not available");
  //     } else {
  //       console.error("Sign-in error:", error);
  //     }
  //   } finally {
  //     navigation.navigate("Main");
  //   }
  // };

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
      promptAsync={promptAsync}
      handleForgotPassword={handleForgotPassword}
      isLoading={isLoading}
      errorMessage={errorMessage}
      isSignUp={isSignUp}
      setIsSignUp={setIsSignUp}
    />
  );
};

export default LoginScreen;
