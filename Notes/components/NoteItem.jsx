import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function NoteItem({ note, onDelete, onTogglePin }) {
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => onTogglePin(note.id)} style={styles.pinBtn}>
        <Text style={styles.pin}>{note.pinned ? '📌' : '📍'}</Text>
      </TouchableOpacity>

      <Text style={styles.text}>{note.text}</Text>

      <TouchableOpacity onPress={() => onDelete(note.id)} style={styles.deleteButton}>
        <Text style={styles.deleteText}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 15,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    marginHorizontal: 5,
    minHeight: 100,
    justifyContent: 'space-between',
  },
  minHeight: Math.floor(Math.random() * 100) + 80,
  text: {
    fontSize: 15,
    color: '#333',
    marginVertical: 6,
  },
  pinBtn: {
    alignSelf: 'flex-end',
  },
  pin: {
    fontSize: 18,
    color: '#f1c40f',
  },
  deleteButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#ffe5e5',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  deleteText: {
    color: '#d11a2a',
    fontSize: 14,
  },
});
