let users=require('../models/usermodel')
let bcrypt= require('bcrypt')
const mail=require('../utils/gmail')
const dotenv=require('dotenv' )
exports.register= async (req,res)=>{
  try {
    const {username,password,email,role}=req.body
    //1)check the fields
    if(!username || !password || !email || !role) 
      return res.json({"msg":"missing fields"})
   //2)check if user already exits or not
   let checkuser=await users.findOne({username})
   if(checkuser) return res.json({msg:"user already exist"})
   //3)store users data in db
   let hashedpassword=await bcrypt.hash(password,10)

  await users.create({username,password:hashedpassword,email,role})

  //generate a token

  let payload={username:username}
  let secretkey='rohan123'
  let token=await jwt.sign(payload,secretkey,{expiresIn:'1hr'})
  res.json({"msg" :"Registraion Sucessfull",token})
mail(email,username);
  } catch (error) {
    res.json({"msg":error.message})
  }
}

exports.login=app.post('/login',async (req,res)=>{
 try {
     const  {username,password}=req.body
     if(!username || !password) 
      return res.json({"msg":"missing fields"})
   
    let userdetails=await users.findOne({username})
    if(!userdetails) return res.json({"msg":"invalid credentials"})
     let checkpassword=await bcrypt.compare(password,userdetails.password)
    if(!checkpassword) return res.json({"msg":"invalid credeentials"})
      //take token from header using req.header.key
      //jwt.verify(token)
      //if not a valid token then send a msg like invalid token if it is proceed
      let token=req.headers.Authorization
      let Isvalid= await jwt.verify(token)
      if(!Isvalid){
        console.log("Invalid Token")
      }
      let currentlocation= req.headers.location
     res.json({"msg":"login successful",currentlocation})
 } catch (error) {
  res.json({"msg":error.message})
 }
})
