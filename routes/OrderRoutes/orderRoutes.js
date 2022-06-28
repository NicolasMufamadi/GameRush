const express = require('express')
const router = express.Router()

const addOrder  = require('../../components/Order/addOrder')
const getUserOrders = require('../../components/Order/getUserOders')
const getOrders = require('../../components/Order/getOrders')
const updateOrder = require('../../components/Order/editOrder')

router.post('/',addOrder)
router.get('/',getUserOrders)
router.get('/getorders',getOrders)
router.put('/:OrderId',updateOrder)

module.exports = router