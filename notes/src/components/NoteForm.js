import { useState } from "react";
import Button from "rsuite/Button";
import "../App.css";
import "rsuite/dist/rsuite.min.css";

const NoteForm = ({ setNotes }) => {
  const [noteInput, setNoteInput] = useState("");

  const addNote = (e) => {
    e.preventDefault();
    setNotes(noteInput);
    setNoteInput("");
  };

  return (
    <div>
      <form onSubmit={addNote} className="form">
        <input
          className="input"
          type="text"
          placeholder="Add note"
          value={noteInput}
          onChange={(e) => setNoteInput(e.target.value)}
        ></input>
      </form>
      <div className="btnDiv">
        <Button
          className="btn"
          type="submit"
          appearance="primary"
          color="blue"
          size="sm"
        >
          Add note
        </Button>
      </div>
    </div>
  );
};

export default NoteForm;
