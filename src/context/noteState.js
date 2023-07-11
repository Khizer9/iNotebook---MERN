import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
     const initialNote = []
      const [notes, setNote] = useState(initialNote)

      //Get a Note
      const getNotes = async () => {
        //API Calls
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: "GET", 
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
        });
          const json = await response.json();
          setNote(json)
      }


      //Add a Note
      const addNote = async (title, description, tag) => {
        //API Calls
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
          body: JSON.stringify({title, description, tag}), 
        });
       
        //API call
        const note = await response.json()

        setNote(notes.concat(note))
      }

      //Delete a Note
      const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: "DELETE", 
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
        });
          const json = await response.json();
          setNote(json)
      
        const newNote = notes.filter((note)=> note._id !== id)
        setNote(newNote)
}

      //Edit a Note
      const editNote = async (id, title, description, tag) => {
        //API Calls
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: "PUT", 
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
          body: JSON.stringify({title, description, tag}), 
        });
        const json = await response.json()
        //Logic to edit in client

        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
          const element = newNotes[index];
            if(element._id === id) {
              newNotes[index].title = title;
              newNotes[index].description = description;
              newNotes[index].tag = tag;
              break;
        }}
        setNote(newNotes);
      }
    return (
        <noteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;