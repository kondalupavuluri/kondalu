const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/affordmedDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const studentSchema = new mongoose.Schema({
  name: String,
  marks: {
    Math: Number,
    English: Number,
  },
});

const Student = mongoose.model("Student", studentSchema);

// ✅ routes
app.post("/students", async (req, res) => {
  const { name, marks } = req.body;
  if (!name || typeof marks !== "object")
    return res.status(400).json({ error: "Invalid input" });

  const student = new Student({ name, marks });
  await student.save();
  res.status(201).json({ message: "Student added", student });
});

app.get("/students", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

app.get("/students/:id/average", async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) return res.status(404).json({ error: "Student not found" });

  const values = Object.values(student.marks);
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  res.json({ average: avg });
});

app.get("/students/topper", async (req, res) => {
  const students = await Student.find();
  const topper = students.reduce(
    (top, curr) => {
      const total = Object.values(curr.marks).reduce((a, b) => a + b, 0);
      return total > top.total ? { student: curr, total } : top;
    },
    { student: null, total: 0 }
  );
  res.json(topper.student);
});

module.exports = app;
