const {Router} = require('express')
const {getproducts, createproducts, updateproducts, deleteproducts} = require('../Controllers/productsController')

let router = Router();

router.post('/', createproducts)
router.get('/', getproducts)
router.put('/:id', updateproducts)
router.delete('/:id', deleteproducts)

module.exports = router



