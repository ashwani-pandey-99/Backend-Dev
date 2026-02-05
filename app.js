const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

/* =========================
   MIDDLEWARE
========================= */
app.use(express.json());

/* =========================
   FILE PATH
========================= */
const filePath = path.join(__dirname, "students.json");

/* =========================
   HELPER FUNCTIONS
========================= */
function readStudents() {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

function writeStudents(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

/* =========================
   ROUTES
========================= */

// Home
app.get("/", (req, res) => {
  res.send("Welcome to Student API 🚀");
});

// GET all students
app.get("/students", (req, res) => {
  const students = readStudents();
  res.json(students);
});

// GET student by ID
app.get("/student/:id", (req, res) => {
  const id = Number(req.params.id);
  const students = readStudents();

  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.json(student);
});

// GET students by branch
app.get("/search/student", (req, res) => {
  const branch = req.query.branch;
  if (!branch) {
    return res.status(400).json({ message: "Please provide branch query" });
  }

  const students = readStudents();
  const result = students.filter(
    s => s.branch.toLowerCase() === branch.toLowerCase()
  );

  if (result.length === 0) {
    return res.json({ message: "No students found for this branch" });
  }

  res.json(result);
});

// POST add new student
app.post("/student", (req, res) => {
  const { id, name, branch, address } = req.body;

  if (!id || !name || !branch || !address) {
    return res.status(400).json({
      message: "id, name, branch and address are required"
    });
  }

  const students = readStudents();

  const exists = students.find(s => s.id === id);
  if (exists) {
    return res.status(409).json({ message: "Student ID already exists" });
  }

  students.push({ id, name, branch, address });
  writeStudents(students);

  res.status(201).json({
    message: "Student added successfully",
    students
  });
});

/* =========================
   SERVER
========================= */
app.listen(8000, () => {
  console.log("Server running on http://localhost:8000");
});
