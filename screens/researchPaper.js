import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native';

const researchPapersData = [
  { id: '1', title: 'Quantum Computing in AI', subject: 'Computer Science', topic: 'Quantum Computing' },
  { id: '2', title: 'Advancements in Machine Learning', subject: 'Computer Science', topic: 'Machine Learning' },
  { id: '3', title: 'Climate Change Impact on Agriculture', subject: 'Agriculture', topic: 'Climate Change' },
  { id: '4', title: 'Genetic Engineering for Crop Improvement', subject: 'Biotechnology', topic: 'Genetics' },
];

const ResearchPaper = () => {
  const [papers, setPapers] = useState(researchPapersData);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filteredPapers = researchPapersData.filter((paper) =>
        paper.topic.toLowerCase().includes(query.toLowerCase())
      );
      setPapers(filteredPapers);
    } else {
      setPapers(researchPapersData);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Research Papers</Text>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search by topic..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {/* Research papers list */}
      <FlatList
        data={papers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.paperContainer}>
            <Text style={styles.paperTitle}>{item.title}</Text>
            <Text style={styles.paperDetails}>Subject: {item.subject}</Text>
            <Text style={styles.paperDetails}>Topic: {item.topic}</Text>
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
  paperContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  paperTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  paperDetails: {
    fontSize: 14,
    color: '#555',
  },
});

export default ResearchPaper;
