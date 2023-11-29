import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql
  .createPool({
    // host: "localhost",
    // host: "127.0.0.1",
    // user: "root",
    // database: "fortuno_api",
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export async function getStudents() {
  const [rows] = await pool.query(" SELECT * FROM student");
  return rows;
}

export async function getStudent(id) {
  const [rows] = await pool.query(" SELECT * FROM student WHERE id = ?", [id]);
  return rows;
}

export async function getStudentsByFaculty(facultyId) {
  const [rows] = await pool.query(
    "SELECT * FROM student WHERE fakultet_id = ?",
    [facultyId]
  );
  return rows;
}

export async function deleteStudent(id) {
  try {
    const [result] = await pool.query("DELETE FROM student WHERE id = ?", [id]);
    return result.affectedRows; // Vraća broj izbrisanih redaka
  } catch (error) {
    console.error("Greška prilikom brisanja studenta:", error.message);
    throw error;
  }
}

export async function createStudent(studentData) {
  const {
    ime_prezime,
    adresa,
    mjesto,
    postanski_broj,
    datum_rodenja,
    aktivan,
    fakultet_id,
  } = studentData;

  try {
    const [result] = await pool.query(
      "INSERT INTO student (ime_prezime, adresa, mjesto, postanski_broj, datum_rodenja, aktivan, fakultet_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        ime_prezime,
        adresa,
        mjesto,
        postanski_broj,
        datum_rodenja,
        aktivan,
        fakultet_id,
      ]
    );

    return result.insertId; // Vraća ID novog studenta
  } catch (error) {
    console.error("Greška prilikom umetanja studenta:", error.message);
    throw error;
  }
}
// const students = await getStudents();
// const noviStudent = {
//   ime_prezime: "Novi Student",
//   adresa: "Nova Adresa",
//   mjesto: "Novo Mjesto",
//   postanski_broj: "12345",
//   datum_rodenja: "1998-01-01",
//   aktivan: "da",
//   fakultet_id: 1, // Zamijenite s odgovarajućim ID-om fakulteta
// };

// Dodajte uvoz pool objekta iz vašeg skripta za rad s bazom podataka

export async function getFaculties() {
  const [rows] = await pool.query("SELECT * FROM fakultet");
  return rows;
}

export async function getFaculty(id) {
  const [rows] = await pool.query("SELECT * FROM fakultet WHERE id = ?", [id]);
  return rows;
}

export async function deleteFaculty(id) {
  try {
    const [result] = await pool.query("DELETE FROM fakultet WHERE id = ?", [
      id,
    ]);
    return result.affectedRows; // Vraća broj izbrisanih redaka
  } catch (error) {
    console.error("Greška prilikom brisanja fakulteta:", error.message);
    throw error;
  }
}

export async function createFaculty(facultyData) {
  const { naziv, opis, mjesto, adresa } = facultyData;

  try {
    const [result] = await pool.query(
      "INSERT INTO fakultet (naziv, opis, mjesto, adresa) VALUES (?, ?, ?, ?)",
      [naziv, opis, mjesto, adresa]
    );

    return result.insertId; // Vraća ID novog fakulteta
  } catch (error) {
    console.error("Greška prilikom umetanja fakulteta:", error.message);
    throw error;
  }
}
