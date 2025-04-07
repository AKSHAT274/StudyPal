import React, { use } from "react";
import { View, Text, StyleSheet } from "react-native";
import convertLatexToPlainText from "../utilities/latex";
import { useState, useEffect, useRef } from "react";
import {
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  ActivityIndicator
} from "react-native";
import Constants from "expo-constants";
import { useIsFocused } from "@react-navigation/native";

export default function ChatScreen({ route }) {
  const { name, fileId } = route.params;

  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const isFocused = useIsFocused();
  const scrollViewRef = useRef(null);

  const SOURCE_ID = String(fileId);

  const fetchHistory = async () => {
    try {
      const res = await fetch(
        `${process.env.EXPO_PUBLIC_LOCALHOST}/api/get-history?fileId=${SOURCE_ID}`
      );
      const data = await res.json();
      setHistory(data);
    } catch (err) {
      console.error("Error fetching history:", err);
    }
  };

  useEffect(() => {
    if (isFocused) {
      const loadAndScroll = async () => {
        await fetchHistory();
        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 300);
      };

      loadAndScroll();
    }
  }, [isFocused]);

  const askQuestion = async () => {
    if (!question.trim()) {
      alert("Please enter a question.");
      return;
    }

    if (!SOURCE_ID || SOURCE_ID === "undefined") {
      alert("Missing or invalid fileId.");
      return;
    }

    setIsLoading(true);
    setResponse(null);
    Keyboard.dismiss();

    try {
      const res = await fetch("https://api.chatpdf.com/v1/chats/message", {
        method: "POST",
        headers: {
          "x-api-key": process.env.EXPO_PUBLIC_CHATPDF_API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          sourceId: SOURCE_ID,
          messages: [{ role: "user", content: question }],
          referenceSources: true
        })
      });

      const data = await res.json();

      if (!res.ok || !data?.content) {
        throw new Error(
          `ChatPDF error: ${data?.message || "Invalid response"}`
        );
      }

      const plainText = convertLatexToPlainText(data.content);

      setResponse(plainText);
      setQuestion("");

      console.log("Sending history to backend...");

      const currentHistory = await fetch(
        `${process.env.EXPO_PUBLIC_LOCALHOST}/api/add-history`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            fileId: SOURCE_ID,
            question: question,
            answer: plainText
          })
        }
      );
      await fetchHistory();
      scrollViewRef.current?.scrollToEnd({ animated: true });
    } catch (error) {
      console.error("Error:", error);
      setResponse(
        error.response?.data?.message ||
          "Error fetching response. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={Platform.select({
        ios: 0,
        android: 75 // Adjust this value as needed for your device
      })}
    >
      <View style={styles.innerContainer}>
        <ScrollView
          ref={scrollViewRef} // 👈 here
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Chat History */}
          {history.length > 0 && (
            <View style={{ marginBottom: 16 }}>
              <Text style={{ fontWeight: "bold", marginBottom: 8 }}>
                Chat History
              </Text>
              {history.map((entry, index) => (
                <View
                  key={index}
                  style={{
                    marginBottom: 12,
                    backgroundColor: "#fff",
                    padding: 12,
                    borderRadius: 8
                  }}
                >
                  <Text style={{ fontWeight: "bold", color: "#1e293b" }}>
                    Q: {entry.question}
                  </Text>
                  <Text style={{ color: "#475569" }}>A: {entry.answer}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Response Container */}
          {/* {response && (
                <View style={styles.responseContainer}>
                  <Text style={styles.responseText}>{response}</Text>
                </View>
              )} */}

          {/* Loading Indicator */}
          {isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#3b82f6" />
            </View>
          )}
        </ScrollView>

        {/* Input Container with extra bottom padding when keyboard is active */}
        <View style={styles.inputWrapper}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Ask Book "
              placeholderTextColor="#9ca3af"
              value={question}
              onChangeText={setQuestion}
              multiline
              editable={!isLoading}
              onSubmitEditing={askQuestion}
              returnKeyType="send"
              blurOnSubmit={false}
            />
            <TouchableOpacity
              style={[styles.button, isLoading && styles.disabledButton]}
              onPress={askQuestion}
              disabled={isLoading}
            >
              <Text style={styles.buttonText}>{isLoading ? "⏳" : "📤"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc"
  },
  innerContainer: {
    flex: 1,
    justifyContent: "space-between"
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 16 // Reduced from previous value since we're handling padding differently
  },
  inputWrapper: {
    paddingBottom: Platform.select({
      ios: 0,
      android: 20 // This adds padding between input and keyboard on Android
    })
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    marginHorizontal: 16,
    borderRadius: 24,
    marginBottom: Platform.select({
      ios: 0,
      android: 8 // Small margin for Android
    })
  },
  input: {
    flex: 1,
    minHeight: 48,
    maxHeight: 120,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#f1f5f9",
    borderRadius: 24,
    fontSize: 16,
    color: "#1e293b"
  },
  button: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#3b82f6",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8
  },
  disabledButton: {
    backgroundColor: "#9ca3af"
  },
  buttonText: {
    fontSize: 20,
    color: "white"
  },
  responseContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2
  },
  responseText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#334155"
  },
  loadingContainer: {
    padding: 20,
    alignItems: "center"
  }
});
