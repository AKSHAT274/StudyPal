// Dashboard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { auth } from './firebaseConfig';

const Dashboard = ({ navigation, route }) => {
  const user = route.params?.user; // Get user data from navigation params

  const handleLogout = () => {
    const authInstance = getAuth();
    signOut(authInstance)
      .then(() => {
        Alert.alert('Logged out successfully!');
        navigation.navigate('Login'); // Navigate back to the Login screen
      })
      .catch((error) => {
        Alert.alert('Logout failed!', error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome, {user?.email}!</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Profile', { user })}
      >
        <Text style={styles.buttonText}>View Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  button: {
    backgroundColor: '#456FE8',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#ff4444',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Dashboard;