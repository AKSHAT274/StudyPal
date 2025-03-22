import React, { useState } from "react";
// import axios from "axios";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";

const BookChat = () => {
  // const [file, setFile] = useState(null);
  // const [messages, setMessages] = useState([]);
  // const [input, setInput] = useState("");
  // const [loading, setLoading] = useState(false);

  // const handleFileChange = (event) => {
  //   setFile(event.target.files[0]);
  // };

  // const uploadFile = async () => {
  //   if (!file) return;
  //   setLoading(true);
  //   const formData = new FormData();
  //   formData.append("file", file);
  //   try {
  //     const response = await axios.post("/api/upload", formData);
  //     setMessages([...messages, { role: "user", text: "Uploaded file: " + file.name }]);
  //   } catch (error) {
  //     console.error("Upload error:", error);
  //   }
  //   setLoading(false);
  // };

  // const sendMessage = async () => {
  //   if (!input.trim()) return;
  //   setLoading(true);
  //   const newMessages = [...messages, { role: "user", text: input }];
  //   setMessages(newMessages);
  //   setInput("");
  //   try {
  //     const response = await axios.post("/api/chat", { message: input });
  //     setMessages([...newMessages, { role: "bot", text: response.data.reply }]);
  //   } catch (error) {
  //     console.error("Chat error:", error);
  //   }
  //   setLoading(false);
  // };

  // return (
  //   <div className="max-w-2xl mx-auto p-4">
  //     <Card className="mb-4 p-4">
  //       <input type="file" onChange={handleFileChange} className="mb-2" />
  //       <Button onClick={uploadFile} disabled={!file || loading}>
  //         {loading ? "Uploading..." : "Upload PDF"}
  //       </Button>
  //     </Card>
  //     <Card className="mb-4 p-4 max-h-96 overflow-y-auto">
  //       <CardContent>
  //         {messages.map((msg, index) => (
  //           <div key={index} className={msg.role === "user" ? "text-right" : "text-left"}>
  //             <p className={`p-2 rounded-lg inline-block ${msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>
  //               {msg.text}
  //             </p>
  //           </div>
  //         ))}
  //       </CardContent>
  //     </Card>
  //     <div className="flex gap-2">
  //       <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." />
  //       <Button onClick={sendMessage} disabled={loading}>Send</Button>
  //     </div>
  //   </div>
  // );
};

export default BookChat;