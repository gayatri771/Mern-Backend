const mongoose=require('mongoose')
let productschema=new mongoose.Schema({
    title:{type:String,required:true},
    price:{type:Number,required:true},
    image:{type:String,required:true},
    description: { type: String },
    category:    { type: String },
    rating: {
    rate:  { type: Number },
    count: { type: Number }
  }
})
let products=mongoose.model('products',productschema)

module.exports=products;
