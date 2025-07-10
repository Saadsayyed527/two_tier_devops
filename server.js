require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Todo = require("./models/Todo");

const app = express();
app.use(express.json());

const {
  MONGO_USER,
  MONGO_PASS,
  MONGO_DB,
  MONGO_HOST,
  PORT
} = process.env;

mongoose.connect(
  `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:27017/${MONGO_DB}?authSource=admin`,
  { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post("/todos", async (req, res) => {
  const todo = new Todo(req.body);
  await todo.save();
  res.status(201).json(todo);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
