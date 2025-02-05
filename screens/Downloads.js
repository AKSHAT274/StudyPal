// screens/Downloads.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Downloads = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Downloads</Text>
      <Text style={styles.text}>This is the Downloads page.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  text: {
    fontSize: 16,
    color: '#555',
  },
});

export default Downloads;