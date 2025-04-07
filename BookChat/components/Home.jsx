import React, { useEffect, useState } from "react";
import { View, Button, ScrollView, StyleSheet } from "react-native";
import Constants from "expo-constants";
import { useIsFocused } from "@react-navigation/native";

export default function NameButtons({ navigation }) {
  const [names, setNames] = useState([]);
  const isFocused = useIsFocused();

  const fetchBooks = () => {
    fetch(String(process.env.EXPO_PUBLIC_LOCALHOST) + "/api/books")
      .then((res) => res.json())
      .then((data) => setNames(data))
      .catch((err) => console.error("Error fetching books:", err));
  };

  useEffect(() => {
    if (isFocused) {
      fetchBooks();
    }
  }, [isFocused]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {names.map((book, index) => (
        <View key={index} style={styles.buttonContainer}>
          <Button
            title={book.name}
            onPress={() =>
              navigation.navigate("Chat", {
                fileId: book.fileId,
                name: book.name
              })
            }
          />
        </View>
      ))}
      <Button title="Upload" onPress={() => navigation.navigate("Upload")} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: "center"
  },
  buttonContainer: {
    marginVertical: 5,
    width: "90%"
  }
});
