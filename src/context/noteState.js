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
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4YWJmNTI3ZTZiY2VlYmRmOWJjY2FjIn0sImlhdCI6MTY4NzE2MDIxN30.QHHxWZrV9OHiKOGqoMsVwcqFEaOYS0cVdHyy1k2YUOM"
          },
        });
          const json = await response.json();
          console.log(json)
          setNote(json)
      }


      //Add a Note
      const addNote = async (title, description, tag) => {
        //API Calls
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4YWJmNTI3ZTZiY2VlYmRmOWJjY2FjIn0sImlhdCI6MTY4NzE2MDIxN30.QHHxWZrV9OHiKOGqoMsVwcqFEaOYS0cVdHyy1k2YUOM"
          },
          body: JSON.stringify({title, description, tag}), 
        });
       
        //API call
        const note = {
          "_id": "6492a58065b0c26f53baed0114",
          "user": "648abf527e6bceebdf9bccac",
          "title": title,
          "description":description,
          "tag": tag,
          "date": "2023-06-21T07:23:44.833Z",
          "__v": 0
        }

        setNote(notes.concat(note))
      }

      //Delete a Note
      const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: "DELETE", 
          headers: {
            "Content-Type": "application/json",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4YWJmNTI3ZTZiY2VlYmRmOWJjY2FjIn0sImlhdCI6MTY4NzE2MDIxN30.QHHxWZrV9OHiKOGqoMsVwcqFEaOYS0cVdHyy1k2YUOM"
          },
        });
          const json = await response.json();
          console.log(json, "delete")
          setNote(json)
      
        const newNote = notes.filter((note)=> note._id !== id)
        console.log(newNote)
        setNote(newNote)
        console.log("Delete a Note", id)
}

      //Edit a Note
      const editNote = async (id, title, description, tag) => {
        //API Calls
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4YWJmNTI3ZTZiY2VlYmRmOWJjY2FjIn0sImlhdCI6MTY4NzE2MDIxN30.QHHxWZrV9OHiKOGqoMsVwcqFEaOYS0cVdHyy1k2YUOM"
          },
          body: JSON.stringify({title, description, tag}), 
        });
        const json = response.json()
        //Logic to edit in client
        for (let index = 0; index < notes.length; index++) {
          const element = notes[index];
            if(element._id === id) {
              element.title = title;
              element.description = description;
              element.tag = tag;

        }}
      }
    return (
        <noteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;