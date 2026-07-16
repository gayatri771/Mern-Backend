const mongoose=require('mongoose');

let userschema=new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    role:{type:String,enum:["seller","buyer"],required:true}
},{timestamps:true})

let users=mongoose.model('users',userschema);

module.exports=users;
