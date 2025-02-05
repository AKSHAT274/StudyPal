import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native';

const syllabusData = [
  { id: '1', semester: 'I', topic: 'Calculus' },
  { id: '2', semester: 'II', topic: 'Mechanics' },
  { id: '3', semester: 'I', topic: 'Data Structures' },
  { id: '4', semester: 'III', topic: 'Genetics' },
  // Add more syllabus items as needed
];

const Syllabus = () => {
  const [syllabus, setSyllabus] = useState(syllabusData);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filteredSyllabus = syllabusData.filter((item) =>
        item.semester.toLowerCase().includes(query.toLowerCase()) ||
        item.topic.toLowerCase().includes(query.toLowerCase())
      );
      setSyllabus(filteredSyllabus);
    } else {
      setSyllabus(syllabusData);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Syllabus</Text>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search by subject or topic..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {/* Syllabus list */}
      <FlatList
        data={syllabus}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.syllabusContainer}>
            <Text style={styles.syllabusTitle}>{item.semester}</Text>
            <Text style={styles.syllabusDetails}>Topic: {item.topic}</Text>
          </View>
        )}
      />
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
  searchBar: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  syllabusContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  syllabusTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  syllabusDetails: {
    fontSize: 14,
    color: '#555',
  },
});

export default Syllabus;
