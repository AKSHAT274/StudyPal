import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import NoteItem from '../components/NoteItem';
import NoteInput from '../components/NoteInput';
import { loadNotes, saveNotes } from '../utils/storage';

export default function HomeScreen() {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadNotes().then(setNotes);
  }, []);

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const addNote = (text) => {
    setNotes([...notes, { id: Date.now().toString(), text, pinned: false }]);
  };
  
  const togglePin = (id) => {
    setNotes(notes.map(note =>
      note.id === id ? { ...note, pinned: !note.pinned } : note
    ));
  };
  
  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const filteredNotes = notes.filter(note =>
    note.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedNotes = [...filteredNotes].sort((a, b) => b.pinned - a.pinned);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.heading}>📝 My Notes</Text>

      <TextInput
        placeholder="Search notes..."
        style={styles.search}
        placeholderTextColor="#aaa"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <NoteInput onAddNote={addNote} />

      {filteredNotes.length === 0 ? (
        <Text style={styles.empty}>No notes found.</Text>
      ) : (
        <FlatList
        data={sortedNotes}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item }) => (
            <NoteItem note={item} onDelete={deleteNote} onTogglePin={togglePin} />
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
/>

      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f8fc',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1e1e2d',
  },
  search: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  empty: {
    textAlign: 'center',
    color: '#888',
    marginTop: 50,
    fontSize: 16,
  },
});
