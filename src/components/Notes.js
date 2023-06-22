import React, {useContext} from 'react'
import noteContext from '../context/noteContext'
import Noteitem from './Noteitem';

const Notes = () => {
    const context = useContext(noteContext);
    const {note, setNote} = context;
  return (
    <div className="row my-3">
      <h1>Your Notes</h1>
        {note.map((note)=> {
          return <Noteitem note={note}/>
        })}

      </div>
  )
}

export default Notes
