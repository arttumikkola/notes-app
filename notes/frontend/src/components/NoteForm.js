import { useState } from "react";
import Button from "rsuite/Button";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { IconButton } from "rsuite";
import DragableIcon from "@rsuite/icons/Dragable";
import axios from "axios";
import "../App.css";
import "rsuite/dist/rsuite.min.css";

const NoteForm = ({ notes, setNotes, selectedTag, setSelectedTag }) => {
  const [noteInput, setNoteInput] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [sort, setSort] = useState(false);

  const addNote = async (e) => {
    e.preventDefault();
    try {
      if (noteInput === "" && tagInput === "") {
        alert("Don't insert empty values");
        return;
      }
      const result = await axios.post("/notes", {
        tag: tagInput,
        content: noteInput,
        date: new Date(),
      });
      const id = result.data.insertId;
      const noteObject = {
        id: id,
        tag: tagInput,
        content: noteInput,
        date: new Date(),
      };
      setNotes(notes.concat(noteObject));
      setNoteInput("");
      setTagInput("");
      setSelectedTag("All");
    } catch (err) {
      console.error(err);
      alert("Error adding the note");
    }
  };

  const sortNotesByDate = () => {
    if (sort === false) {
      const sortedNotes = notes
        .slice()
        .sort((a, b) => new Date(b.date) - new Date(a.date));
      setNotes(sortedNotes);
      setSort(true);
    } else {
      const sortedNotes2 = notes
        .slice()
        .sort((a, b) => new Date(a.date) - new Date(b.date));
      setNotes(sortedNotes2);
      setSort(false);
    }
  };

  const addedItems = new Set();

  const DropdownItems = notes.map((note) => {
    if (!addedItems.has(note.tag)) {
      addedItems.add(note.tag);
      return (
        <MenuItem value={note.tag} key={note.id}>
          {note.tag}
        </MenuItem>
      );
    }
    return null;
  });

  const allItem = (
    <MenuItem value="All" key="all">
      All
    </MenuItem>
  );
  DropdownItems.unshift(allItem);

  const TagDropdown = () => {
    return (
      <FormControl
        sx={{ m: 1, minWidth: 120, height: 2, marginBottom: 4.7 }}
        size="small"
      >
        <InputLabel id="demo-simple-select-label">Tag</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedTag}
          label="Tag"
          onChange={(e) => setSelectedTag(e.target.value)}
        >
          {DropdownItems}
        </Select>
      </FormControl>
    );
  };

  if (notes.length > 0) {
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
          <TagDropdown className="btn" />
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
          <IconButton
            onClick={sortNotesByDate}
            icon={<DragableIcon />}
            className="btn"
          ></IconButton>
        </div>
      </div>
    );
  } else {
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
  }
};

export default NoteForm;
