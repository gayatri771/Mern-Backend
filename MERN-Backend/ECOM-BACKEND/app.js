
const express=require('express');
const dotenv=require('dotenv').config();
const cors=require('cors');
let connection=require('./config/db')
const limiter=require('./middlewares/ratelimit')
const app=express();
const port=process.env.PORT;
let productroutes = require('./routes/productsroutes')
const app=express();
const port=process.env.PORT
let authroutes=require('./routes/authroutes')

//middleware
app.use(express.json())
app.use(cors())
app.use(limiter)

app.use('/products,productsroutes')
app.use('/auth',authroutes)


app.listen(port,()=>{
  console.log(`the server is running on ${port} `)
  connection();
  
})
exports.login =