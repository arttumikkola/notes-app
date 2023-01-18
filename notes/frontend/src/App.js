import "./App.css";
import NoteForm from "./components/NoteForm";
import { useEffect, useState } from "react";
import Notes from "./components/Notes";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [selectedTag, setSelectedTag] = useState("All");

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get(
          "https://notes-env.eba-gusmwfme.eu-north-1.elasticbeanstalk.com/notes"
        );
        setNotes(data);
      } catch (e) {
        console.log(e);
      }
    };
    fetch();
  }, []);

  return (
    <div className="main">
      <p className="header">Notes</p>
      <NoteForm
        notes={notes}
        setNotes={setNotes}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
      />
      <Notes
        notes={notes}
        setNotes={setNotes}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
      />
    </div>
  );
};

export default App;
