import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native';

const booksData = [
  { id: '1', title: 'Introduction to Algorithms', author: 'Thomas H. Cormen' },
  { id: '2', title: 'Artificial Intelligence: A Modern Approach', author: 'Stuart Russell' },
  { id: '3', title: 'Machine Learning Yearning', author: 'Andrew Ng' },
  { id: '4', title: 'Deep Learning', author: 'Ian Goodfellow' },
  // Add more books as needed
];

const Book = () => {
  const [books, setBooks] = useState(booksData);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filteredBooks = booksData.filter((book) =>
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase())
      );
      setBooks(filteredBooks);
    } else {
      setBooks(booksData);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Books</Text>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search by title or author..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {/* Books list */}
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.bookContainer}>
            <Text style={styles.bookTitle}>{item.title}</Text>
            <Text style={styles.bookDetails}>Author: {item.author}</Text>
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
  bookContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  bookDetails: {
    fontSize: 14,
    color: '#555',
  },
});

export default Book;
