import React, { useState } from "react";
import { View, Button, Text, ActivityIndicator } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import Constants from "expo-constants";

const UploadPage = () => {
  const [uploading, setUploading] = useState(false);
  const [sourceId, setSourceId] = useState(null);

  const pickAndUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: false
      });

      if (result.type === "cancel") return;

      const { uri, name } = result.assets[0];

      setUploading(true);

      const formData = new FormData();
      formData.append("file", {
        uri,
        name,
        type: "application/pdf"
      });

      const response = await fetch(
        "https://api.chatpdf.com/v1/sources/add-file",
        {
          method: "POST",
          headers: {
            "x-api-key": process.env.EXPO_PUBLIC_CHATPDF_API_KEY
          },
          body: formData
        }
      );

      const data = await response.json();
      console.log("ChatPDF Response:", data);

      if (data.sourceId) {
        setSourceId(data.sourceId);

        try {
          const cleanName = name.replace(/\.pdf$/i, "");
          const customSourceId = data.sourceId;

          const response = await fetch(
            String(process.env.EXPO_PUBLIC_LOCALHOST) + "/api/upload",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                name: cleanName,
                sourceId: customSourceId
              })
            }
          );

          console.log(await response.json());
        } catch (error) {
          console.log("Upload to backend failed:", error);
        }
      } else {
        console.error("Upload failed:", data);
      }
    } catch (error) {
      console.error("Error uploading PDF:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Upload PDF to ChatPDF" onPress={pickAndUpload} />
      {uploading && <ActivityIndicator size="large" color="blue" />}
      {sourceId && <Text>Uploaded! Source ID: {sourceId}</Text>}
    </View>
  );
};

export default UploadPage;
