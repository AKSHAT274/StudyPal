import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';

const Attendance = () => {
  // Sample attendance data (for demo purposes)
  const [attendance, setAttendance] = useState({
    Math: { totalClasses: 30, present: 25 },
    Science: { totalClasses: 30, present: 20 },
    History: { totalClasses: 25, present: 22 },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attendance Tracker</Text>
      
      {Object.keys(attendance).map((subject, index) => (
        <View key={index} style={styles.subjectContainer}>
          <Text style={styles.subjectTitle}>{subject}</Text>
          <Text style={styles.attendanceDetails}>Total Classes: {attendance[subject].totalClasses}</Text>
          <Text style={styles.attendanceDetails}>Present: {attendance[subject].present}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subjectContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  subjectTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  attendanceDetails: {
    fontSize: 14,
    color: '#555',
    marginVertical: 5,
  },
});

export default Attendance;
