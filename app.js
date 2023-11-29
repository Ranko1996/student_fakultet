import express from "express";
import {
  getStudents,
  getStudent,
  deleteStudent,
  createStudent,
} from "./database.js";
const app = express();
app.use(express.json());

app.get("/students", async (req, res) => {
  try {
    const students = await getStudents();
    res.json(students);
  } catch (error) {
    console.error("Greška prilikom dohvaćanja studenata:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// app.get("/students/:id", async (req, res) => {
//   const student = await getStudent(req.params.id);
//   res.send(student);
// });

app.get("/students/:id", async (req, res) => {
  try {
    const student = await getStudent(req.params.id);

    if (!student) {
      res.status(404).json({ error: "Student not found" });
      return;
    }

    res.json(student);
  } catch (error) {
    console.error(
      "Greška prilikom dohvaćanja informacija o studentu:",
      error.message
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/students/:id", async (req, res) => {
  try {
    const affectedRows = await deleteStudent(req.params.id);
    if (affectedRows > 0) {
      res.json({ success: true, message: "Student uspješno izbrisan." });
    } else {
      res.status(404).json({
        success: false,
        message: "Student s navedenim ID-om nije pronađen.",
      });
    }
  } catch (error) {
    console.error("Greška prilikom brisanja studenta:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/students", async (req, res) => {
  console.log(req.body);
  const {
    ime_prezime,
    adresa,
    mjesto,
    postanski_broj,
    datum_rodenja,
    aktivan,
    fakultet_id,
  } = req.body;

  try {
    const id = await createStudent({
      ime_prezime,
      adresa,
      mjesto,
      postanski_broj,
      datum_rodenja,
      aktivan,
      fakultet_id,
    });
    res.status(201).json({ id, message: "Student uspješno stvoren." });
  } catch (error) {
    console.error("Greška prilikom stvaranja studenta:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/students/by-faculty/:facultyId", async (req, res) => {
  const facultyId = req.params.facultyId;

  try {
    const students = await getStudentsByFaculty(facultyId);
    res.json(students);
  } catch (error) {
    console.error(
      "Greška prilikom dohvaćanja studenata po fakultetu:",
      error.message
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// FAKULTETI FUNKCIJE
app.get("/faculties", async (req, res) => {
  try {
    const faculties = await getFaculties();
    res.json(faculties);
  } catch (error) {
    console.error("Greška prilikom dohvaćanja fakulteta:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/faculties/:id", async (req, res) => {
  const facultyId = req.params.id;

  try {
    const faculty = await getFaculty(facultyId);

    if (!faculty) {
      res.status(404).json({ error: "Faculty not found" });
      return;
    }

    res.json(faculty);
  } catch (error) {
    console.error(
      "Greška prilikom dohvaćanja informacija o fakultetu:",
      error.message
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/faculties/:id", async (req, res) => {
  const facultyId = req.params.id;

  try {
    const affectedRows = await deleteFaculty(facultyId);
    res.json({ affectedRows });
  } catch (error) {
    console.error("Greška prilikom brisanja fakulteta:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/faculties", async (req, res) => {
  const facultyId = await createFaculty(req.body);

  res
    .status(201)
    .json({ id: facultyId, message: "Faculty successfully created." });
});
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
