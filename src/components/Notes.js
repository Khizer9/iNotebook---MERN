import React, {useContext} from 'react'
import noteContext from '../context/noteContext'
import Noteitem from './Noteitem';
import AddNotes from './AddNotes';

const Notes = () => {
    const context = useContext(noteContext);
    const {notes, addNote} = context;
  return (
    <>
    <AddNotes/>
    <div className="row my-3">
      <h1>Your Notes</h1>
        {notes.map((note)=> {
          return <Noteitem key={note._id} note={note}/>
        })}

      </div>
      </>
  )
}

export default Notes
