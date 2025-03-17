// Notes.js
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  TextInput,
  Alert,
} from "react-native";

const Notes = () => {
  const [subjects, setSubjects] = useState({
    Math: [],
    Science: [],
    History: [],
  });
  const [currentSubject, setCurrentSubject] = useState("Math");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [editNoteId, setEditNoteId] = useState(null);

  const handleAddNote = () => {
    if (noteTitle.trim() && noteContent.trim()) {
      const newNote = {
        id: Date.now(),
        title: noteTitle,
        content: noteContent,
      };
      setSubjects({
        ...subjects,
        [currentSubject]: [...subjects[currentSubject], newNote],
      });
      setIsModalVisible(false);
      setNoteTitle("");
      setNoteContent("");
    }
  };

  const handleEditNote = (note) => {
    setEditNoteId(note.id);
    setNoteTitle(note.title);
    setNoteContent(note.content);
    setIsModalVisible(true);
  };

  const handleUpdateNote = () => {
    if (noteTitle.trim() && noteContent.trim()) {
      const updatedNotes = subjects[currentSubject].map((note) =>
        note.id === editNoteId
          ? { ...note, title: noteTitle, content: noteContent }
          : note
      );
      setSubjects({
        ...subjects,
        [currentSubject]: updatedNotes,
      });
      setIsModalVisible(false);
      setNoteTitle("");
      setNoteContent("");
      setEditNoteId(null);
    }
  };

  const handleDeleteNote = (noteId) => {
    const updatedNotes = subjects[currentSubject].filter(
      (note) => note.id !== noteId
    );
    setSubjects({
      ...subjects,
      [currentSubject]: updatedNotes,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.subjectContainer}>
        {Object.keys(subjects).map((subject) => (
          <TouchableOpacity
            key={subject}
            style={[
              styles.subjectButton,
              currentSubject === subject && styles.activeSubjectButton,
            ]}
            onPress={() => setCurrentSubject(subject)}
          >
            <Text style={styles.subjectButtonText}>{subject}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView style={styles.notesContainer}>
        {subjects[currentSubject].map((note) => (
          <TouchableOpacity
            key={note.id}
            style={styles.noteItem}
            onPress={() => handleEditNote(note)}
          >
            <Text style={styles.noteTitle}>{note.title}</Text>
            <Text style={styles.noteContent}>{note.content}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteNote(note.id)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setNoteTitle("");
          setNoteContent("");
          setIsModalVisible(true);
        }}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editNoteId ? "Edit Note" : "Add Note"}
            </Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Title"
              value={noteTitle}
              onChangeText={setNoteTitle}
            />
            <TextInput
              style={[styles.modalInput, { height: 100 }]}
              placeholder="Content"
              multiline
              value={noteContent}
              onChangeText={setNoteContent}
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={editNoteId ? handleUpdateNote : handleAddNote}
            >
              <Text style={styles.modalButtonText}>
                {editNoteId ? "Update" : "Add"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  subjectContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  subjectButton: {
    padding: 8,
    borderRadius: 8,
  },
  activeSubjectButton: {
    backgroundColor: "#456FE8",
  },
  subjectButtonText: {
    fontSize: 16,
    color: "#333",
  },
  notesContainer: {
    flex: 1,
    padding: 16,
  },
  noteItem: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  noteContent: {
    fontSize: 14,
    color: "#666",
  },
  deleteButton: {
    marginTop: 8,
    alignSelf: "flex-end",
  },
  deleteButtonText: {
    color: "#ff4444",
    fontSize: 14,
  },
  addButton: {
    position: "absolute",
    bottom: 24,
    right: 24,
    backgroundColor: "#456FE8",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  modalInput: {
    width: "100%",
    padding: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginBottom: 16,
  },
  modalButton: {
    backgroundColor: "#456FE8",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 8,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Notes;
