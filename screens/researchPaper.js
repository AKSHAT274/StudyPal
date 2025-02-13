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
  const [bookmarks, setBookmarks] = useState([]);
  const [sortBy, setSortBy] = useState('title');
  const [currentPage, setCurrentPage] = useState(1);
  const papersPerPage = 2;

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

  const toggleBookmark = (id) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((bookmark) => bookmark !== id) : [...prev, id]
    );
  };

  const handleSort = (criterion) => {
    setSortBy(criterion);
    const sortedPapers = [...papers].sort((a, b) => a[criterion].localeCompare(b[criterion]));
    setPapers(sortedPapers);
  };

  const indexOfLastPaper = currentPage * papersPerPage;
  const indexOfFirstPaper = indexOfLastPaper - papersPerPage;
  const currentPapers = papers.slice(indexOfFirstPaper, indexOfLastPaper);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Research Papers</Text>
      
      <TextInput
        style={styles.searchBar}
        placeholder="Search by topic..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <View style={styles.sortContainer}>
        <Text>Sort By:</Text>
        <TouchableOpacity onPress={() => handleSort('title')}><Text style={styles.sortButton}>Title</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => handleSort('subject')}><Text style={styles.sortButton}>Subject</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => handleSort('topic')}><Text style={styles.sortButton}>Topic</Text></TouchableOpacity>
      </View>

      <FlatList
        data={currentPapers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.paperContainer}>
            <Text style={styles.paperTitle}>{item.title}</Text>
            <Text style={styles.paperDetails}>Subject: {item.subject}</Text>
            <Text style={styles.paperDetails}>Topic: {item.topic}</Text>
            <TouchableOpacity onPress={() => toggleBookmark(item.id)}>
              <Text style={styles.bookmarkButton}>{bookmarks.includes(item.id) ? '★ Bookmarked' : '☆ Bookmark'}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      
      <View style={styles.paginationContainer}>
        <TouchableOpacity disabled={currentPage === 1} onPress={() => setCurrentPage(currentPage - 1)}>
          <Text style={styles.pageButton}>Previous</Text>
        </TouchableOpacity>
        <Text> Page {currentPage} </Text>
        <TouchableOpacity disabled={indexOfLastPaper >= papers.length} onPress={() => setCurrentPage(currentPage + 1)}>
          <Text style={styles.pageButton}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#faf3e0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'serif',
    marginBottom: 20,
  },
  searchBar: {
    height: 40,
    borderColor: '#c4a484',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  paperContainer: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  paperTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  paperDetails: {
    fontSize: 16,
    color: '#555',
    fontFamily: 'serif',
  },
  bookmarkButton: {
    fontSize: 16,
    color: '#d2691e',
    textAlign: 'right',
    marginTop: 5,
  },
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sortButton: {
    color: '#8b4513',
    fontWeight: 'bold',
    paddingHorizontal: 5,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  pageButton: {
    fontSize: 16,
    color: '#8b4513',
    paddingHorizontal: 10,
  },
});

export default ResearchPaper;