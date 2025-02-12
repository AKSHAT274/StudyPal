// UploadAndChat.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';

const UploadAndChat = () => {
  const [fileSource, setFileSource] = useState(null);
  const [googleDriveLink, setGoogleDriveLink] = useState('');

  const handleUploadFromDevice = () => {
    Alert.alert('Upload from Device', 'File picker will open here.');
  };

  const handleUploadFromGoogleDrive = () => {
    if (googleDriveLink.trim()) {
      setFileSource(googleDriveLink);
      Alert.alert('Upload Successful', 'PDF uploaded from Google Drive.');
    } else {
      Alert.alert('Error', 'Please enter a valid Google Drive link.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload and Chat</Text>
      <Text style={styles.subtitle}>Upload a PDF to start chatting with it.</Text>

      <TouchableOpacity style={styles.uploadButton} onPress={handleUploadFromDevice}>
        <Text style={styles.uploadButtonText}>Upload from Device</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>OR</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Google Drive link"
        value={googleDriveLink}
        onChangeText={setGoogleDriveLink}
      />
      <TouchableOpacity style={styles.uploadButton} onPress={handleUploadFromGoogleDrive}>
        <Text style={styles.uploadButtonText}>Upload from Google Drive</Text>
      </TouchableOpacity>

      {fileSource && (
        <Text style={styles.successText}>PDF uploaded successfully!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  uploadButton: {
    backgroundColor: '#456FE8',
    padding: 16,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    fontSize: 16,
    color: '#666',
    marginVertical: 16,
  },
  input: {
    width: '100%',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 16,
  },
  successText: {
    fontSize: 16,
    color: '#4CAF50',
    marginTop: 16,
  },
});

export default UploadAndChat;