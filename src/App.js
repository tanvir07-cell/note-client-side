import logo from "./logo.svg";
import "./App.css";
import Header from "./components/header/Header";
import InputForm from "./components/inputForm/InputForm";
import NoteCard from "./components/noteCard/NoteCard";
import { useEffect, useState } from "react";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data));
  }, []);
  console.log(notes);
  /*
1. here there will be a function named handleSearch
to handle search by query, and it will be passed as props to header
  */

  const handleSearch = (event) => {
    event.preventDefault();
    const queryText = event.target.searchText.value;

    if (queryText) {
      fetch(`http://localhost:5000/notes?name=${queryText}`)
        .then((res) => res.json())
        .then((data) => setNotes(data));
    }
  };

  /*2. here there will be a function named handleDelete
to delete a note, and it will be passed as props to NoteCard that will be triggered using delete button.
 */
  const handleDelete = (id, name) => {
    const proceed = window.confirm(
      `Are you sure you want to delete this ${name}?`
    );

    if (proceed) {
      console.log("laa", id);
      fetch(`http://localhost:5000/note/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            const restNotes = notes.filter((note) => note._id !== id);
            setNotes(restNotes);
          }
          console.log(data);
        });
    }
  };
  /*
3. there will be a function named handleUpdate
    to update data, and it will be passed as props to NoteCard and 
   later it will be passed to Update modal using props.
 */

  /*
4.  there will be a function named handlePost
to post data to backend, and it will be passed as props to InputFrom.
 */

  const handlePostUser = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const price = event.target.price.value;

    const user = { name, price };

    fetch("http://localhost:5000/note", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        const allNotes = [...notes, data];
        setNotes(allNotes);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="App">
      <Header handleSearch={handleSearch} />
      <InputForm handlePostUser={handlePostUser} />
      <div className="row row-cols-1 row-cols-md-3 g-4 m-2">
        {notes.map((note) => (
          <NoteCard note={note} handleDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}

export default App;
