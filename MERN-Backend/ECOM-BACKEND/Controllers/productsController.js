let products=require('../models/product.model')
exports.createProduct=async (req,res)=>{
 try {
  const {title,price,image}=req.body
 await products.create({title,price,image})
  res.json({"msg":"product saved"})
 } catch (error) {
  res.json({"msg":error.message})
 }
}

exports.getproducts=async (req,res)=>{
 try {
  let maxlimit=req.query.limit
  let shipment=req.query.location
  let allproducts=await products.find().limit(maxlimit)
  if(shipment==="India")
  return res.json({msg:made in`{shipment}`})
 } catch (error) {
  res.json({"msg":error.message})
 }
}
exports.updateproducts= async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ msg: 'product not found' });
    res.status(200).json({ msg: 'product updated', product });
  } catch (error) {
    next(error);
  }
exports.deleteproducts= async (req,res)=>{
 try {
  let productid=req.params.id
await  products.findByIdAndDelete(productid)
 res.json({"msg":"product deleted"})
 } catch (error) {
  res.json({"msg":error.message})
 }
}

