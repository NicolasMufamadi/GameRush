const express = require('express')
const router = express.Router()


const addproduct = require('../../components/Product/AddProduct')
const getproduct = require('../../components/Product/GetProduct')
const getproducts = require('../../components/Product/GetProducts')
const updateproduct = require('../../components/Product/UpdateProduct')
const deleteproduct = require('../../components/Product/DeleteProduct')

router.post('/addproduct',addproduct)
router.get('/getproduct/:ProductId',getproduct)
router.get('/getproducts',getproducts)
router.delete('/deleteproduct/:ProductId',deleteproduct)
router.put('/updateproduct/:ProductId',updateproduct)

module.exports = router