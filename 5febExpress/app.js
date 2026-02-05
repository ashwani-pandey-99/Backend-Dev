// Import required modules
const express = require("express");
const fs = require("fs");

const app = express();

// Middleware to parse JSON request body
app.use(express.json());

// JSON file used as database
const file = "students.json";

// Read data from JSON file
const read = () =>
  fs.existsSync(file) ? JSON.parse(fs.readFileSync(file)) : [];

// Write entire array back to JSON file
const write = data =>
  fs.writeFileSync(file, JSON.stringify(data, null, 2));

// GET all students
app.get("/students", (req, res) => {
  res.json(read());
});

// GET student by ID
app.get("/student/:id", (req, res) => {
  const student = read().find(s => s.id == req.params.id);
  student
    ? res.json(student)
    : res.status(404).json({ message: "Student not found" });
});

// POST - create new student
app.post("/student", (req, res) => {
  const students = read();        // read existing students
  students.push(req.body);        // push new student
  write(students);                // write full array back
  res.status(201).json(req.body); // send response
});

// PUT - update student
app.put("/student/:id", (req, res) => { 
  const students = read();
  const index = students.findIndex(s => s.id == req.params.id);

  if (index < 0)
    return res.status(404).json({ message: "Student not found" });

  // update only provided fields
  students[index] = { ...students[index], ...req.body };
  write(students);
  res.json(students[index]);
});

// DELETE - remove student
app.delete("/student/:id", (req, res) => {
  const students = read().filter(s => s.id != req.params.id);
  write(students);
  res.json({ message: "Student deleted" });
});

// Start server
app.listen(8000, () => {
  console.log("Server running on http://localhost:8000");
});
