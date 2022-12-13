import "./App.css";
import NoteForm from "./components/NoteForm";
import { useState } from "react";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [noteInput, setNoteInput] = useState("");

  return (
    <>
      <NoteForm value={noteInput} onChange={setNoteInput} />
      {notes.map((note) => {
        <p>{note}</p>;
      })}
    </>
  );
};

export default App;
