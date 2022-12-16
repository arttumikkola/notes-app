import { useState } from "react";
import Button from "rsuite/Button";
import "../App.css";
import "rsuite/dist/rsuite.min.css";

const NoteForm = ({ notes, setNotes }) => {
  const [noteInput, setNoteInput] = useState("");
  const [tagInput, setTagInput] = useState("");

  const getDateAndTime = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // January is 0
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
  };

  const addNote = (e) => {
    e.preventDefault();
    const noteObject = {
      content: noteInput,
      tag: tagInput,
      date: getDateAndTime(),
    };
    setNotes(notes.concat(noteObject));
    setNoteInput("");
    setTagInput("");
    console.log(notes);
  };

  return (
    <div>
      <form onSubmit={addNote} className="form">
        <input
          className="noteInput"
          type="text"
          placeholder="Add note"
          value={noteInput}
          onChange={(e) => setNoteInput(e.target.value)}
        ></input>
        <input
          className="tagInput"
          type="text"
          placeholder="Add tag"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
        ></input>
      </form>
      <div className="btnDiv">
        <Button
          className="btn"
          type="submit"
          appearance="primary"
          color="blue"
          size="sm"
          onClick={addNote}
        >
          Add note
        </Button>
      </div>
    </div>
  );
};

export default NoteForm;
