import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get('/api/notes')
    .then((res) => {
      setNotes(res.data);
    })
    .catch((error) => console.log(error))
  }, []);

  function addNote(newNote) { 
    axios.post('/api/notes', newNote)
    .then((res) => {
      setNotes(prevNotes => {
        return [...prevNotes, res.data];
      });
    })
    .catch((error) => console.log(error));
  }

  function deleteNote(id) {
    axios.delete('/api/notes/' + id)
    .then((res) => {
      setNotes(prevNotes => {
        return prevNotes.filter((noteItem) => {
          return noteItem._id !== res.data._id;
        });
      });
    })
    .catch((error) => console.log(error));
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      
      <Footer />
    </div>
  );
}

export default App;
