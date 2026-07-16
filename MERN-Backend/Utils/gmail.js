const dotenv=require('dotenv').config();
const nodemailer=require('nodemailer') 
 async function mail(email,username){
      const transporter= await nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.GMAILUSER,
        pass:process.env.GMAILPASS
    }
  })

  const message={
    from: process.env.GMAILUSER, // sender address
    to: email,
    subject: "Account creation", // subject line
    text: `Hi,${username} your account is created succesfully`, // plain text body
    html: "registration</b>", // HTML body
  }

     await transporter.sendMail(message)
     console.log("email sent")
  }
  
  module.exports=mail;
