import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const upcomingEventsData = [
  { id: '1', event: 'Computer Science Exam', date: 'Feb 10, 2025', description: 'Exam on AI and Machine Learning topics.' },
  { id: '2', event: 'Research Paper Submission', date: 'Feb 12, 2025', description: 'Submit your research papers for review.' },
  { id: '3', event: 'Biotechnology Seminar', date: 'Feb 15, 2025', description: 'Attend the seminar on genetic engineering and biotechnology.' },
  // Add more events as needed
];

const Event = () => {
  const renderEvent = ({ item }) => (
    <View style={styles.eventContainer}>
      <Text style={styles.eventTitle}>{item.event}</Text>
      <Text style={styles.eventDate}>{item.date}</Text>
      <Text style={styles.eventDescription}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upcoming Events</Text>
      
      {/* Event List */}
      <FlatList
        data={upcomingEventsData}
        keyExtractor={(item) => item.id}
        renderItem={renderEvent}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  eventContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  eventDate: {
    fontSize: 14,
    color: '#555',
    marginVertical: 5,
  },
  eventDescription: {
    fontSize: 14,
    color: '#777',
  },
  addButton: {
    backgroundColor: '#456FE8',
    paddingVertical: 15,
    marginVertical: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Event;
