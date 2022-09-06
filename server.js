const express = require("express");
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");

// INITIATES EXPRESS
const app = express();
const PORT = process.env.PORT || 3001;

// MIDDLEWARE
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// GET database
app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./db/db.json"));
});

// ADD NEW NOTES
app.post("/api/notes", (req, res) => {
  const notes = JSON.parse(fs.readFileSync("./db/db.json"));
  const newNotes = req.body;
  newNotes.id = uuid.v4();
  notes.push(newNotes);
  fs.writeFileSync("./db/db.json", JSON.stringify(notes));
  res.json(notes);
});

// DELETE NOTES
app.delete("/api/notes/:id", (req, res) => {
  const notes = JSON.parse(fs.readFileSync("./db/db.json"));
  const deleteNoteEl = notes.filter(
    (removeNote) => removeNote.id !== req.params.id
  );
  fs.writeFileSync("./db/db.json", JSON.stringify(deleteNoteEl));
  res.json(deleteNoteEl);
});

// GET landing page (index.html)
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

//GET notes page (notes.html)
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/notes.html"))
);

// Listen for Express PORT
app.listen(PORT, () =>
  console.log(`app listening at http://localhost:${PORT}`)
);
