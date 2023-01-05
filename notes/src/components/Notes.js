import Note from "./Note";

const Notes = ({ notes, setNotes, selectedTag }) => {
  if (notes.length < 1) {
    return (
      <div className="notes">
        <p>No added notes</p>
      </div>
    );
  } else if (notes.length > 0 && selectedTag === "All") {
    return notes.map((note) => (
      <div className="notes" key={note.id}>
        <Note note={note} notes={notes} setNotes={setNotes} />
      </div>
    ));
  } else {
    return notes
      .filter((note) => note.tag === selectedTag && selectedTag !== "All")
      .map((note) => (
        <div className="notes" key={note.id}>
          <Note note={note} notes={notes} setNotes={setNotes} />
        </div>
      ));
  }
};

export default Notes;
