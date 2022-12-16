import { Panel } from "rsuite";

const Notes = ({ notes }) => {
  if (notes.length < 1) {
    return (
      <div className="notes">
        <p>No added notes</p>
      </div>
    );
  } else {
    return notes.map((note) => (
      <div className="notes">
        <Panel
          className="note"
          header={<b className="noteHeader">{note.tag}</b>}
          bordered
        >
          <p className="noteContent">{note.content}</p>
          <p className="noteDate">{note.date}</p>
        </Panel>
      </div>
    ));
  }
};

export default Notes;
