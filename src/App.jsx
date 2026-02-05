import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes')
    return savedNotes ? JSON.parse(savedNotes) : []
  })
  const [deleted, setDeleted] = useState(false)

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])


  const addNote = () => {
    setNotes([...notes, { id: crypto.randomUUID(), text: "" }])
    // setDeleted(false)
  }


  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id))
    setDeleted(true)
    setTimeout(() => {
      setDeleted(false)
    }, 2500);
  }

  const updateNote = (id, value) => {
    setNotes(
      notes.map(note =>
        note.id === id ? { ...note, text: value } : note
      )
    )
    // setDeleted(false)
  }
  return (
    <>
      <h1>Note App</h1>
      {
        deleted ? <p className='delete-msg'>Note is deleted</p> : null
      }


      <div>
        <button className='add-button' onClick={addNote}>+ Add a new note...</button>
      </div>

      <div className='notes-container'>
        {
          notes.map((note, index) => (
            <div className='note' key={index}>
              <div className='note-headling'>
                <h2>Note {index + 1}</h2>
                <button className='delete-button' onClick={() => deleteNote(note.id)}>🗑️</button>
              </div>
              <input
                className='input-notes'
                value={note.text}
                onChange={(e) => updateNote(note.id, e.target.value)}
                placeholder='Type something...'
              />
            </div>
          ))
        }
      </div>


    </>
  )
}

export default App
