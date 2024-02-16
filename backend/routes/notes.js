const express=require('express');
const router=express.Router();
const fetchuser=require('../middleware/fetchuser');
const Note=require('../module/Note');
const {body ,validationResult}=require('express-validator')

//Route 1 :get all notes ,GET '/notes/fetchallnotes'
router.get('/fetchallnotes' ,fetchuser,async(req,res)=>{
   try {
      const notes = await Note.find({user: req.user.id});
      res.json(notes)
   } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error")
 }
})
//Route 2 :add new notes using post '/notes/addnote'
router.post('/addnote' ,fetchuser,[
   body('title','Enter a valid title').isLength({min:4}),
   body('description','description must be atleast 4 characters').isLength({min:4})
], async(req,res)=>{
   try {
   const {title,description,tag}=req.body;
   //if there are errors return bad request
   const errors=validationResult(req);
   if(!errors.isEmpty()){
      return res.status(401).json({errors:errors.array()});
   }
   const note=new Note({
      title,description,tag,user:req.user.id
   })
   const savedNotes=await note.save()
   res.json(savedNotes)
} catch (error) {
      console.error(error.message)
      res.status(500).send("Internal server error")
}
})

//update existing note using put '/notes/updatenote  login required
router.put('/updatenotes/:id',fetchuser,async(req,res)=>{
   try {
   const{title,description,tag}=req.body;
   //create a newNote object
   const newNote={}
   if (title){newNote.title=title};
   if (description){newNote.description=description};
   if (tag){newNote.tag=tag};

   //find note to updated and update it
   let note= await Note.findById(req.params.id);
if (!note){return res.status(401).send('Not found')}

if(note.user.toString() !== req.user.id){
      return res.status(401).send('Not Allowed')
}
   note=await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
   res.json({note});
     
} catch (error) {
   console.error(error.message)
   res.status(500).send("Internal server error")
}   
}
)

//delete existing note using delete '/notes/deletenote  login required
router.delete('/deletenotes/:id',fetchuser,async(req,res)=>{
   try {
   //find note to deleted and delete it
   let note= await Note.findById(req.params.id);
if (!note){return res.status(401).send('Not found')}

if(note.user.toString() !== req.user.id){
      return res.status(401).send('Not Allowed')
}
   note=await Note.findByIdAndDelete(req.params.id)
   res.json({"Success":"Note has been deleted" ,note:note});
   }
catch (error) {
  console.error(error.message)
  res.status(500).send("Internal server error")
}
}
)
module.exports=router