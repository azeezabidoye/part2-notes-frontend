import axios from "axios";
import { useState, useEffect } from "react";
// import notesData from "./data/notesData";
import Note from "./components/Note";
import Notification from "./components/Notification";
import noteService from "./services/notes";

const App = (props) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState(" ");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const hook = () => {
    console.log(useEffect);
    noteService.getAll().then((initialNote) => setNotes(initialNote));
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

    noteService.create(noteObject).then((returnedNote) => {
      console.log(returnedNote);
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    });
  };

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };
    console.log(`Toggle importance if this note with number ${id}`);

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((n) => (n.id !== id ? n : returnedNote)));
      })
      .catch((error) => {
        setErrorMessage(
          `the note '${note.content}' was already deleted from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
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
