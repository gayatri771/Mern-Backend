const {Router} = require('express');
const {register, login} = require('../Controllers/authcontroller')
let router = Router();
router.post('/register', register)
router.post('/login', login)
module.exports = router
