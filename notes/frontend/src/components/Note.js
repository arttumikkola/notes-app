import { Panel, IconButton } from "rsuite";
import EditIcon from "@rsuite/icons/Edit";
import TrashIcon from "@rsuite/icons/Trash";
import { useState } from "react";
import axios from "axios";
import moment from "moment";

const Note = ({ note, notes, setNotes, selectedTag, setSelectedTag }) => {
  const [edit, setEdit] = useState(false);
  const [tagInput, setTagInput] = useState(note.tag);
  const [noteInput, setNoteInput] = useState(note.content);

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

  const formatDate = (date) => {
    return moment(date).format("YYYY/MM/DD HH:mm:ss");
  };

  const editNote = (note) => {
    if (noteInput === "" && tagInput === "") {
      alert("Don't insert empty values");
      return;
    }
    const index = notes.findIndex((editable) => {
      return note.id === editable.id;
    });
    try {
      axios.put(
        `notes-db.co8qqnhkzpn5.eu-north-1.rds.amazonaws.com/notes/${index}`,
        {
          tag: tagInput,
          content: noteInput,
          date: getDateAndTime(),
          id: note.id,
        }
      );
      const notes2 = [...notes];
      notes2[index] = {
        id: note.id,
        content: noteInput,
        tag: tagInput,
        date: getDateAndTime(),
      };
      setNotes(notes2);
      setEdit(false);
    } catch (err) {
      console.error(err);
      alert("Error updating the note");
    }
  };

  const deleteNote = async (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        setNotes(
          notes.filter((note) => {
            return note.id !== id;
          })
        );
        await axios
          .delete(
            `notes-db.co8qqnhkzpn5.eu-north-1.rds.amazonaws.com/notes/${id}`
          )
          .then(() => {
            if (selectedTag !== "All") {
              setSelectedTag("All");
            }
          });
      } catch (err) {
        console.error(err);
        /* alert("Error deleting the note"); */
      }
    }
  };

  if (edit === false) {
    return (
      <Panel
        className="note"
        header={<b className="noteHeader">{note.tag}</b>}
        bordered
      >
        <p className="noteContent">{note.content}</p>
        <div className="date">
          <p className="noteDate">{formatDate(note.date)}</p>
          <div>
            <IconButton
              onClick={() => setEdit(true)}
              icon={<EditIcon />}
              className="icon"
            ></IconButton>
            <IconButton
              onClick={() => deleteNote(note.id)}
              icon={<TrashIcon />}
              className="icon"
            ></IconButton>
          </div>
        </div>
      </Panel>
    );
  } else if (edit === true) {
    return (
      <Panel
        className="note"
        header={
          <input
            className="noteHeader"
            type="text"
            placeholder="Add tag"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
          />
        }
        bordered
      >
        <input
          className="noteContent"
          type="text"
          placeholder="Add note"
          value={noteInput}
          onChange={(e) => setNoteInput(e.target.value)}
        />
        <div className="date">
          <p className="noteDate">{formatDate(note.date)}</p>
          <div>
            <IconButton
              onClick={() => editNote(note)}
              icon={<EditIcon />}
              className="icon"
            ></IconButton>
          </div>
        </div>
      </Panel>
    );
  }
};

export default Note;
