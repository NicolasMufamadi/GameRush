const express = require('express')
const router = express.Router()

const addToCart = require('../../components/Cart/addToCart')
const clearcart = require('../../components/Cart/clearcart')
const getCartToUpdate = require('../../components/Cart/getCartToUpdate')
const getUserCart = require('../../components/Cart/getUserCart')
const updateCart = require('../../components/Cart/updateUserCart')
const removeItem = require('../../components/Cart/removeItem')

router.post('/',addToCart)
router.delete('/clearcart',clearcart)
router.get('/getcart',getUserCart)
router.get('/getcarttoupdate',getCartToUpdate)
router.put('/',updateCart)
router.delete('/',removeItem)

module.exports = router