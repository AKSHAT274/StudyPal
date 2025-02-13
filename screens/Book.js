import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const booksData = [
  { id: '1', title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', category: 'Algorithms' },
  { id: '2', title: 'Artificial Intelligence: A Modern Approach', author: 'Stuart Russell', category: 'AI' },
  { id: '3', title: 'Machine Learning Yearning', author: 'Andrew Ng', category: 'ML' },
  { id: '4', title: 'Deep Learning', author: 'Ian Goodfellow', category: 'ML' },
];

const Book = () => {
  const [books, setBooks] = useState(booksData);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleSearch = (query) => {
    setSearchQuery(query);
    filterBooks(query, selectedCategory);
  };

  const filterBooks = (query, category) => {
    let filteredBooks = booksData.filter(
      (book) =>
        (book.title.toLowerCase().includes(query.toLowerCase()) ||
          book.author.toLowerCase().includes(query.toLowerCase())) &&
        (category === 'All' || book.category === category)
    );
    setBooks(filteredBooks);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterBooks(searchQuery, category);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📚 Book List</Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search by title or author..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => handleSearch('')}>
            <Ionicons name="close-circle" size={24} color="gray" style={styles.clearIcon} />
          </TouchableOpacity>
        )}
      </View>

      {/* Category Filter */}
      <View style={styles.categoryContainer}>
        {['All', 'Algorithms', 'AI', 'ML'].map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategoryButton,
            ]}
            onPress={() => handleCategoryChange(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Books List */}
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.bookContainer}>
            <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.bookImage} />
            <View>
              <Text style={styles.bookTitle}>{item.title}</Text>
              <Text style={styles.bookDetails}>Author: {item.author}</Text>
            </View>
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
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  searchBar: {
    flex: 1,
    height: 40,
  },
  clearIcon: {
    marginLeft: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: '#e0e0e0',
  },
  selectedCategoryButton: {
    backgroundColor: '#007bff',
  },
  categoryText: {
    fontSize: 14,
    color: '#555',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  bookContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  bookImage: {
    width: 50,
    height: 50,
    marginRight: 10,
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
