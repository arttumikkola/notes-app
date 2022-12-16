import "./App.css";
import NoteForm from "./components/NoteForm";
import { useState } from "react";
import Notes from "./components/Notes";

const App = () => {
  const [notes, setNotes] = useState([]);

  return (
    <div className="main">
      <p className="header">Notes</p>
      <NoteForm notes={notes} setNotes={setNotes} />
      <Notes notes={notes} />
    </div>
  );
};

export default App;
