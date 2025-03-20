import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // Store securely in an env file

const BookChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  const handleSend = async () => {
    if (inputText.trim()) {
      const newMessage = { id: Date.now(), text: inputText, sender: "user" };
      setMessages([...messages, newMessage]);
      setInputText("");

      const botResponse = await fetchGeminiResponse(inputText);
      if (botResponse) {
        const botMessage = { id: Date.now() + 1, text: botResponse, sender: "bot" };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }
    }
  };

  const fetchGeminiResponse = async (query) => {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateText?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: { text: query } }),
        }
      );

      const data = await response.json();
      return data?.candidates?.[0]?.output || "Sorry, I couldn't understand.";
    } catch (error) {
      console.error("Gemini API error:", error);
      return "Error fetching response.";
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.chatContainer}>
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageBubble,
              message.sender === "user" ? styles.userMessage : styles.botMessage,
            ]}
          >
            <Text style={styles.messageText}>{message.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  chatContainer: { padding: 16 },
  messageBubble: { maxWidth: "80%", padding: 12, borderRadius: 12, marginBottom: 8 },
  userMessage: { alignSelf: "flex-end", backgroundColor: "#456FE8" },
  botMessage: { alignSelf: "flex-start", backgroundColor: "#e0e0e0" },
  messageText: { fontSize: 16, color: "#fff" },
  inputContainer: {
    flexDirection: "row",
    padding: 8,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  input: { flex: 1, padding: 12, backgroundColor: "#f0f0f0", borderRadius: 24, marginRight: 8 },
  sendButton: { justifyContent: "center", alignItems: "center", paddingHorizontal: 16, backgroundColor: "#456FE8", borderRadius: 24 },
  sendButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default BookChat;
