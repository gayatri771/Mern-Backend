const {Routes}=require('express');              // ❌ should be {Router}
const{register,login}=require('../controllers/authcontroller')  // ❌ should be '../Controllers/authcontroller' (capital C)
let router=Router(); 
