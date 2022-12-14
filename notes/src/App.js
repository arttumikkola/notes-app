import "./App.css";
import NoteForm from "./components/NoteForm";
import { useState } from "react";
import Notes from "./components/Notes";

const App = () => {
  const [notes, setNotes] = useState([]);

  return (
    <>
      <div className="header">
        <p>Notes</p>
      </div>
      <Notes notes={notes} />
      <NoteForm setNotes={setNotes} notes={notes} />
    </>
  );
};

export default App;
