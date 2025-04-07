import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "./uploads";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null,file.originalname);
  },
});

const upload = multer({ storage });

mongoose.connect("mongodb+srv://adityanayak:Adi123@books.4s4bw4x.mongodb.net/?retryWrites=true&w=majority&appName=books");

const bookSchema = new mongoose.Schema({
  name: String,
  fileId: String
});

const historySchema = new mongoose.Schema({
  fileId: {
    type: String,
    required: true
  },
  question:String,
  answer:String
});

const Book = mongoose.model("Book", bookSchema);
const History =mongoose.model("History", historySchema);

app.get("/api/books", async (req, res) => {
  try {
    const users = await Book.find({}, "name fileId"); 
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

app.post("/api/upload", async (req, res) => {
  console.log("Upload route hit");
  try {
    const {name , sourceId}=req.body;
    const book = new Book({ name, fileId: sourceId });
    await book.save();
    res.json({ message: "Book uploaded successfully" });
  } catch(err){
    res.status(500).json({ error: "Failed to upload book" });
  }
  }
);

app.get("/api/get-history", async (req, res) => {
  try {
    console.log("Get History route hit");
    const { fileId } = req.query;
    const history = await History.find({ fileId: fileId });
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

app.post("/api/add-history", async (req, res) => {
  try {
    console.log("Add-History route hit");
    const { fileId, question, answer } = req.body;
    const history = new History({ fileId, question, answer });
    await history.save();
    res.json({ message: "History added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add history" });
  }
})


app.listen(5000,'0.0.0.0', () => console.log("Server running on port 5000"));
