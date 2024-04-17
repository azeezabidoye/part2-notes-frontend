import axios from "axios";
import { useState, useEffect } from "react";
// import notesData from "./data/notesData";
import Note from "./components/Note";

const App = (props) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState(" ");
  const [showAll, setShowAll] = useState(true);

  const hook = () => {
    console.log(useEffect);
    axios.get("http://localhost:3001/notes").then((response) => {
      console.log(`promise fulfilled ✅`);
      setNotes(response.data);
    });
    console.log("render", notes.length, notes);
  };

  useEffect(hook, []);

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  // const addNote = (event) => {
  //   event.preventDefault();
  //   const noteObject = {
  //     id: notes.length + 1,
  //     content: newNote,
  //     important: Math.random() < 0.5,
  //   };

  //   setNotes(notes.concat(noteObject));
  //   setNewNote("");
  // };

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };

    axios.post("http://localhost:3001/notes", noteObject).then((response) => {
      console.log(response);
      setNotes(notes.concat(response.data));
      setNewNote("");
    });
  };

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  const toggleImportanceOf = (id) => {
    const url = `http://localhost:3001/notes/${id}`;
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };
    console.log(`Toggle importance if this note with number ${id}`);

    axios.put(url, changedNote).then((response) => {
      setNotes(notes.map((n) => (n.id !== id ? n : response.data)));
    });
  };

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? "important" : "all"}
      </button>
      <ul>
        {notesToShow.map((note) => (
          <Note
            toggleImportance={() => toggleImportanceOf(note.id)}
            key={note.id}
            note={note}
          />
        ))}
      </ul>

      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default App;
