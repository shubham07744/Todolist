import React,{ useContext,useEffect,useRef,useState} from 'react'
import noteContext from '../Context/Notes/NoteContext'
import Noteitem from './Noteitem';
import Addnotes from './Addnotes';
import { useNavigate } from 'react-router-dom';
function Notes(props) {
  const context=useContext(noteContext);
  const {notes,getnote,editnote}=context;
  let navigate=useNavigate();
  useEffect(() => {
    if (localStorage.getItem('token')){
      getnote()
    }
    else{
      navigate('/login')
    }
  }, []);
  const updateNote=(currentnote)=>{                            
     ref.current.click();
     setNote({id:currentnote._id, etitle:currentnote.title , edescription:currentnote.description , etag:currentnote.tag})
  }
 const ref = useRef(null);
 const refclose = useRef(null);
 const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""});

 const handleClick=()=>{
   console.log("Updating Notes...",note)
   editnote(note.id, note.etitle, note.edescription, note.etag)
   refclose.current.click();
   props.showAlert("updated successfully","success");
  }
  const onChange=(e)=>{
  e.preventDefault();
setNote({...note,[e.target.name]:e.target.value})
}

  return (   
    <>
    <div className='row my-3'>
    <Addnotes showAlert={props.showAlert}/>
    <div className="buttonw">
    <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  EditNote
</button></div>
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"  aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edited notes</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
    <form  className="container my-3">
        <h2>Add a Note</h2>
        <div className="mb-3">
          <label htmlFor="etitle" className="form-label">Title</label>
          <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange}/>
        </div>
        <label htmlFor="edescription" className="form-label">Description</label>
        <input type="text" id="edescription" name='edescription' className="form-control" value={note.edescription} aria-describedby="passwordHelpBlock" onChange={onChange} />
        <div id="passwordHelpBlock" className="form-text"></div>
        <div className="mb-3">
          <label htmlFor="etag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange}/>
        </div>
    </form>
      </div>
      <div className="modal-footer">
        <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={handleClick}>Save changes</button>
      </div>
    </div>
  </div>
</div>
      <h2>Your Notes</h2>
      <div className="container">
        {notes.length===0 && 'No notes to display'}
        </div>
        {notes.map((note)=>{ 
            return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note}/>
              })}
    </div>
    </>
  )
}
   
export default Notes