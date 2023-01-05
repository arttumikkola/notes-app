import "./App.css";
import NoteForm from "./components/NoteForm";
import { useState } from "react";
import Notes from "./components/Notes";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [selectedTag, setSelectedTag] = useState("All");

  return (
    <div className="main">
      <p className="header">Notes</p>
      <NoteForm
        notes={notes}
        setNotes={setNotes}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
      />
      <Notes notes={notes} setNotes={setNotes} selectedTag={selectedTag} />
    </div>
  );
};

export default App;
