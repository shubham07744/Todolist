const express=require('express');
const router=express.Router();
const User=require('../module/User');
const {body,validationResult}=require('express-validator');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')
const fetchuser=require('../middleware/fetchuser');
const jwtsecret="vishalisgoodboy";

//Route 1 :create the user POST "/auth/createuser"
router.post('/createuser',[
    body('name','Enter a valid name').isLength({min:4}),
    body('email','Enter a valid email').isEmail(),
    body('password','password atleast 4 characters').isLength({min:4})
],async(req,res)=>{
    let success=false;
   const error=validationResult(req);
   if(!error.isEmpty()){
    return res.status(404).json({success,error:error.array()})
   }
   try{
    //check wheather email is already exist or not
   let user = await User.findOne({success,email:req.body.email});
    if(user){
          return res.status(404).json({error:"already user email exist"})
           };
    const salt= await bcrypt.genSalt(10);
    const secpass= await bcrypt.hash(req.body.password, salt);
   
    //create a new user
    user=await User.create({
    name:req.body.name,
    email:req.body.email,
    password:secpass,
   });
   const data={
    user:{
        id:user.id
    }
   }
  const authtoken=jwt.sign(data,jwtsecret);
  success=true;
  res.json({success,authtoken})
//    res.json(user)
}catch(error){
    console.error(error.message);
    res.status(500).send("Internal server error")
}
   
    // console.log(req.body);
    const user=User(req.body)
    user.save()
    // res.send(req.body)
})
    //Route 2 : authenticate  user using POST "/auth/login"
    router.post('/login',[
        body('email','Enter a valid email').isEmail(),
        body('password','password cannot be blank').exists(),
    ],async(req,res)=>{
        let success=false;
        //if there are errors retrun bad request
       const error=validationResult(req);
       if(!error.isEmpty()){
        return res.status(404).json({error:error.array()});
       }

   const {email,password}=req.body;
   try {
    let user= await User.findOne({email});
    if(!user){
        success=false;
        return res.status(404).json({error:"please try login to with correct credintials"});
    }
    const passwordcompare= await bcrypt.compare(password,user.password);
    if(!passwordcompare){
        success=false;
        return res.status(404).json({error:"please try login to with correct credintials"})
    }
    const data={
        user:{
            id:user.id
        }
    }
    const authtoken=jwt.sign(data,jwtsecret);
    success=true;
    res.json({success,authtoken})
   } catch(error){
    console.error(error.message);
    res.status(500).send("Internal server error")
}

    })

    //Route 3 : getuser logged datails, POST "/auth/getuser" login is required
    router.post('/getuser',fetchuser, async(req,res)=>{
    try {
        userId=req.user.id;
        const user=await User.findById(userId).select("-password")
        res.send(user)
    } catch(error){
    console.error(error.message);
    res.status(500).send("Internal server error")
}
    })
module.exports=router