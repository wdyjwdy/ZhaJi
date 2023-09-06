import { Note, NoteProviderProps, Notes } from '../types'
import { NoteContext } from '.';
import { MessageContext } from '../contexts';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NoteProvider = ({ children }: NoteProviderProps) => {
  const [notes, setNotes] = useState<Notes>([])
  const { success } = useContext(MessageContext)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchNotes = async () => {
      const res = await fetch('http://127.0.0.1:5000/notes', )
      const json = await res.json()
      const out: Notes = JSON.parse(JSON.stringify(json))
      setNotes(out)
    }
    fetchNotes()
  }, [])

  const addNote = (note: Note) => {
    const token = localStorage.getItem('note-jwt') as string
    if (token !== null) {
      fetch('http://127.0.0.1:5000/notes',{
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(note)
      })
        .then(res => res.text())
        .then(json => console.log(json))
        .catch(e => console.log(e))
    }


    setNotes([...notes, note])
    success('保存成功')
    navigate('/')
  }

  const deleteNote = (id: string) => {
    const token = localStorage.getItem('note-jwt') as string
    if (token !== null) {
      fetch('http://127.0.0.1:5000/notes/' + id,{
        method: 'DELETE',
        headers: { 'Authorization': token }
      })
      .then(res => res.text())
      .then(json => console.log(json))
      .catch(e => console.log(e))
    }


    setNotes(notes.filter(n => n.id !== id))
    navigate('/')
  }

  const changeNote = (note: Note) => {
    const data = {
      title: note.title,
      tags: note.tags,
      text: note.text
    }
    const token = localStorage.getItem('note-jwt') as string
    if (token !== null) {
      fetch('http://127.0.0.1:5000/notes/' + note.id,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(data)
      })
        .then(res => res.text())
        .then(json => console.log(json))
        .catch(e => console.log(e))  
    }

    setNotes(notes.map(n => {
      if (n.id === note.id) {
        return note
      } else {
        return n
      }
    }))
    navigate('/profile')
  }

  const value = { notes, addNote, deleteNote, changeNote }

  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>
}

export default NoteProvider