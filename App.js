import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig'; // Only import auth, assuming 'firebase' handles the initialization
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSignUp, setIsSignUp] = useState(false); // Toggle for SignUp/Login form

  const handleLogin = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid email', 'Please re-enter email');
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        Alert.alert('Login successful!', `Hello, ${user.email}`);
      })
      .catch((error) => {
        Alert.alert('Login failed!');
      });
  };

  const handleSignUp = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid email', 'Please re-enter email');
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        Alert.alert('Sign Up successful!', `Welcome, ${user.email}`);
        setIsSignUp(false); // Switch back to login after successful sign up
      })
      .catch((error) => {
        Alert.alert('Sign Up failed!', error.message);
      });
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{isSignUp ? "Sign Up" : "Login"}</Text>
      </View>
      <View>
        <Text style={styles.titleLogin}>
          {isSignUp ? "Please sign up to continue." : "Please login to continue."}
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <MaterialIcons
            name="mail"
            size={20}
            color="#9d9d9d"
            style={styles.icon}
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.textInput}
          />
        </View>
        <View style={styles.inputWrapper}>
          <MaterialIcons
            name="lock"
            size={20}
            color="#9d9d9d"
            style={styles.icon}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            onSubmitEditing={isSignUp ? handleSignUp : handleLogin}
            secureTextEntry={!isPasswordVisible}
            style={styles.textInput}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <MaterialIcons
              name={isPasswordVisible ? "visibility" : "visibility-off"}
              size={20}
              color="#9d9d9d"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.registerContainer}>
          <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
            <Text style={styles.registerText}>
              {isSignUp ? "Already have an account?" : "Don’t have an account?"}
              <Text style={styles.registerLink}>{isSignUp ? " Login" : " Sign Up"}</Text>
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={isSignUp ? handleSignUp : handleLogin}>
          <View style={styles.loginButton}>
            <Text style={styles.loginButtonText}>
              {isLoading ? "Processing..." : isSignUp ? "Sign Up" : "Login"}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.errorMessageContainer}>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#5F5F5F",
    fontSize: 25,
    fontWeight: "600",
  },
  titleLogin: {
    color: "#5F5F5F",
    fontSize: 15,
    marginTop: 10,
  },
  inputContainer: {
    width: "80%",
    marginTop: 20,
    gap: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    borderWidth: 0.2,
    borderRadius: 5,
  },
  textInput: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  registerContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  registerText: {
    color: "#5F5F5F",
  },
  registerLink: {
    color: "#456FE8",
    fontWeight: "600",
  },
  loginButton: {
    backgroundColor: "#456FE8",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 15,
  },
  errorMessageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  errorMessage: {
    color: "red",
  },
});
