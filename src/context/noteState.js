import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
     const initialNote = [
        {
          "_id": "64901060070576200def4e83",
          "user": "648abf527e6bceebdf9bccac",
          "title": "My Title",
          "description": "This asddasis my first Note",
          "tag": "personal",
          "date": "2023-06-19T08:22:56.551Z",
          "__v": 0
        },
        {
          "_id": "64901061070576200def4e85",
          "user": "648abf527e6bceebdf9bccac",
          "title": "My Title",
          "description": "This asddasis my first Note",
          "tag": "personal",
          "date": "2023-06-19T08:22:57.721Z",
          "__v": 0
        },
        {
          "_id": "6492a58065b0c61f53baed014",
          "user": "648abf527e6bceebdf9bccac",
          "title": "New Note",
          "description": "Kindly add this note.",
          "tag": "personal",
          "date": "2023-06-21T07:23:44.833Z",
          "__v": 0
        },
        {
            "_id": "649010610705762030def4e85",
            "user": "648abf527e6bceebdf9bccac",
            "title": "My Title",
            "description": "This asddasis my first Note",
            "tag": "personal",
            "date": "2023-06-19T08:22:57.721Z",
            "__v": 0
          },
          {
            "_id": "6492a58065b0c36f53baed014",
            "user": "648abf527e6bceebdf9bccac",
            "title": "New Note",
            "description": "Kindly add this note.",
            "tag": "personal",
            "date": "2023-06-21T07:23:44.833Z",
            "__v": 0
          },
          {
            "_id": "649010610705476200def4e85",
            "user": "648abf527e6bceebdf9bccac",
            "title": "My Title",
            "description": "This asddasis my first Note",
            "tag": "personal",
            "date": "2023-06-19T08:22:57.721Z",
            "__v": 0
          },
          {
            "_id": "6492a58065b0c26f53baed014",
            "user": "648abf527e6bceebdf9bccac",
            "title": "New Note",
            "description": "Kindly add this note.",
            "tag": "personal",
            "date": "2023-06-21T07:23:44.833Z",
            "__v": 0
          },
      ]
      const [notes, setNote] = useState(initialNote)

      //Add a Note
      const addNote = (title, description, tag) => {
        console.log("Adding note")
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
      const deleteNote = () => {
        
      }

      //Edit a Note
      const editNote = () => {
        
      }
    return (
        <noteContext.Provider value={{notes, addNote, deleteNote, editNote}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;