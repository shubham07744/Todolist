
import NoteContext from "./NoteContext";
import { useState } from "react";
const NoteState =(props)=>{
    const host="http://localhost:5000"
    const noteInitial=[]

    const [notes, setNotes] = useState(noteInitial);
    //get all note
    const getnote= async()=>{
        //API CALL
        const response=await fetch(`${host}/notes/fetchallnotes`  , {
            method:'GET',
            headers:{
                'content-type':'application/json',
                 'auth-token':localStorage.getItem("token")
            }
        })
       const json=await response.json();
       console.log(json)
       setNotes(json)
    }
    //Add note
    const addnote= async(title,description,tag)=>{
        //API CALL
        const response=await fetch(`${host}/notes/addnote`  , {
            method:'POST',
            headers:{
                'content-type':'application/json',
                 'auth-token':localStorage.getItem("token")
            },
            body:JSON.stringify({title,description,tag})
        })
       const note=await response.json()
       setNotes(notes.concat(note))
    }
    
   // delete a note
    const deletenote=async(id)=>{
    //API CALL
    const response=await fetch(`${host}/notes/deletenotes/${id}` , {
        method:'DELETE',
        headers:{
            'content-type':'application/json',
             'auth-token':localStorage.getItem("token")
        },
    })
    const json=response.json();
    console.log(json)
     console.log("deleting node with id" +id)
     const newNote=notes.filter((note)=>{return note._id!==id})
     setNotes(newNote);
    }
    //Edit a note
   const editnote = async(id,title,description,tag)=>{
    const response=await fetch(`${host}/notes/updatenotes/${id}`  , {
        method:'PUT',
        headers:{
            'content-type':'application/json',
             'auth-token':localStorage.getItem("token")
        },
        body:JSON.stringify({title,description,tag})
    })
    const json=await response.json();
    console.log(json)
    let newNotes=JSON.parse(JSON.stringify(notes))
    //logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if(element._id===id){
            newNotes[index].title=title;
            newNotes[index].description=description;
            newNotes[index].tag=tag;
            break;
        }
    }
    setNotes(newNotes);
   }
    return(
        <NoteContext.Provider value={{notes,setNotes,addnote,deletenote,editnote,getnote }}>
                {props.children}
            </NoteContext.Provider>
        )
    }
 export default NoteState;