import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";

const syllabusData = [
  { id: "1", semester: "I", topic: "Calculus" },
  { id: "2", semester: "II", topic: "Mechanics" },
  { id: "3", semester: "I", topic: "Data Structures" },
  { id: "4", semester: "III", topic: "Genetics" },
  // Add more syllabus items as needed
];

const Syllabus = () => {
  const [syllabus, setSyllabus] = useState(syllabusData);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSemester, setSelectedSemester] = useState(null);

  const handleSearch = (query) => {
    setSearchQuery(query);
    filterSyllabus(query, selectedSemester);
  };

  const filterSyllabus = (query, semester) => {
    let filteredSyllabus = syllabusData;
    if (query) {
      filteredSyllabus = filteredSyllabus.filter(
        (item) =>
          item.semester.toLowerCase().includes(query.toLowerCase()) ||
          item.topic.toLowerCase().includes(query.toLowerCase())
      );
    }
    if (semester) {
      filteredSyllabus = filteredSyllabus.filter(
        (item) => item.semester === semester
      );
    }
    setSyllabus(filteredSyllabus);
  };

  const handleSemesterFilter = (semester) => {
    setSelectedSemester(semester);
    filterSyllabus(searchQuery, semester);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Syllabus</Text>

      <TextInput
        style={styles.searchBar}
        placeholder="Search by semester or topic..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <View style={styles.filterContainer}>
        {["I", "II", "III"].map((sem) => (
          <TouchableOpacity
            key={sem}
            style={[
              styles.filterButton,
              selectedSemester === sem && styles.selectedFilter,
            ]}
            onPress={() => handleSemesterFilter(sem)}
          >
            <Text style={styles.filterText}>{sem}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={syllabus}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.syllabusContainer}>
            <Text style={styles.syllabusTitle}>Semester: {item.semester}</Text>
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
    backgroundColor: "#faf3e0",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "serif",
    marginBottom: 20,
  },
  searchBar: {
    height: 40,
    borderColor: "#c4a484",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  syllabusContainer: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  syllabusTitle: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "serif",
  },
  syllabusDetails: {
    fontSize: 16,
    color: "#555",
    fontFamily: "serif",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  filterButton: {
    marginHorizontal: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    backgroundColor: "#d2691e",
  },
  selectedFilter: {
    backgroundColor: "#8b4513",
  },
  filterText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Syllabus;
