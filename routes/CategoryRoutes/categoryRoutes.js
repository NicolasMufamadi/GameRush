const express = require('express')
const router = express.Router()


const addCategory = require('../../components/Category/addCategory')
const getCategories = require('../../components/Category/getCategories')
const removeCategory = require('../../components/Category/removeCategory')
const updateCategory = require('../../components/Category/updateCategory')

router.post('/addcategory',addCategory)
router.get('/getcategories',getCategories)
router.put('/updatecategory/:categoryId',updateCategory)
router.delete('/removecategory/:categoryId',removeCategory)


module.exports = router 

