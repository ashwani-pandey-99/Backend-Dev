const express = require("express");
const app = express();

app.use(express.json());

// In-memory tasks storage
let tasks = [];
let idCounter = 1;

// ✅ GET all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// ✅ GET task by id
app.get("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json(task);
});

// ✅ POST create a new task
app.post("/tasks", (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const newTask = {
    id: idCounter++,
    title: title,
    completed: false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// ✅ PUT update task
app.put("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  const { title, completed } = req.body;

  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;

  res.json(task);
});

// ✅ DELETE task
app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  const deletedTask = tasks.splice(index, 1)[0];
  res.json({ message: "Task deleted", deletedTask });
});

// Start server
app.listen(3000, () => {
  console.log("TODO API running at http://localhost:3000");
});
