const NoteForm = ({ value, onChange }) => {
  return (
    <>
      <form onSubmit={setNotes(value)}>
        <input
          type="text"
          placeholder="Add note"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        ></input>
      </form>
      <button type="submit">Add note</button>
    </>
  );
};

export default NoteForm;
