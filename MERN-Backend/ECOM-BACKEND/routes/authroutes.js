const {Routes}=require('express');
const{register,login}=require('../controllers/authcontroller')
let router=Router();
router.post('/register',register)
router.post('/login',login)
module.exports=router
