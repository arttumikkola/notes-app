const Notes = ({ notes }) => {
  if (notes.length > 0) {
    return notes.map((note) => {
      <div className="notes">{note}</div>;
    });
  } else {
    return <p className="notes">No added notes</p>;
  }
};

export default Notes;
