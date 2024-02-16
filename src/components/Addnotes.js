
import React,{ useContext,useState } from 'react'
import noteContext from '../Context/Notes/NoteContext'

export default function Addnotes(props) {
const context=useContext(noteContext);
  const {addnote}=context;

  const [note, setNote] = useState({title: "", description: "", tag: ""});
  const handleClick=()=>{
    addnote(note.title, note.description, note.tag)
    setNote({title: "", description: "", tag: ""})
    props.showAlert("Added successfully","success");
  }
  const onChange=(e)=>{
    e.preventDefault();
    setNote({...note,[e.target.name]:e.target.value})
  }
  
  return (
    
    <form  className="container my-3">
      <h2>Add a Note</h2>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange}/>
      </div>
      <label htmlFor="description" className="form-label">Description</label>
      <input type="text" id="description" name='description' className="form-control" aria-describedby="passwordHelpBlock" value={note.description} onChange={onChange} />
      <div id="passwordHelpBlock" className="form-text"></div>
      <div className="mb-3">
        <label htmlFor="tag" className="form-label">Tag</label>
        <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange}/>
      </div>
    
      <button type="button" className="btn btn-primary my-2" onClick={handleClick}>AddNote</button>
    </form>
  )
}
