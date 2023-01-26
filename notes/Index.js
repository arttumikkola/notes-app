const express = require("express");
const mariadb = require("mariadb");
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const getConnection = async () => {
  const pool = mariadb.createPool({
    host: process.env.RDS_HOSTNAME,
    user: process.env.RDS_USERNAME,
    port: process.env.RDS_PORT,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DB_NAME,
    connectionLimit: 5,
  });
  try {
    return await pool.getConnection();
    /* const conn = await pool.getConnection();
    conn.query("ALTER TABLE notes DROP COLUMN date");
    conn.query("ALTER TABLE notes ADD COLUMN date DATETIME"); */
  } catch (err) {
    console.error("Error getting connection from pool: ", err);
    throw err;
  }
};
getConnection();

// Get all notes
app.get("/notes", async (req, res) => {
  try {
    const connection = await getConnection();
    const query = `SELECT id, tag, content, convert_tz(date, '+00:00', '+10:00') As date from notes`;
    const result = await connection.query(query);
    connection.end();
    if (result.length === 0) {
      res.status(404).json({ message: "No notes found" });
    } else {
      res.json(result);
    }
  } catch (err) {
    console.error("Error fetching notes: ", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Add a new note
app.post("/notes", async (req, res) => {
  try {
    const connection = await getConnection();
    const query = `INSERT INTO notes (tag, content, date) VALUES (?, ?, ?)`;
    const params = [req.body.tag, req.body.content, req.body.date];
    const result = await connection.query(query, params);
    connection.end();
    res.status(201).json({ message: "Note added successfully!" });
  } catch (err) {
    console.error("Error adding note: ", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Update an existing note
app.put("/notes/:id", async (req, res) => {
  try {
    const connection = await getConnection();
    const query = `UPDATE notes SET tag = ?, content = ?, date = ? WHERE id = ?`;
    const params = [req.body.tag, req.body.content, req.body.date, req.body.id];
    const result = await connection.query(query, params);
    connection.end();
    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Note not found" });
    } else {
      res.json({ message: "Note updated successfully!" });
    }
  } catch (err) {
    console.error("Error updating note: ", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Delete a note
app.delete("/notes/:id", async (req, res) => {
  try {
    const connection = await getConnection();
    const query = `DELETE FROM notes WHERE id = ?`;
    const params = [req.params.id];
    const result = await connection.query(query, params);
    connection.end();
    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Note not found" });
    } else {
      res.json({ message: "Note deleted successfully!" });
    }
  } catch (err) {
    console.error("Error deleting note", err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.listen(process.env.PORT);
