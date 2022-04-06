const express = require('express')
const router = express.Router()

const addCuopon = require('../../components/Cuopon/addCuopon')
const getCuopons = require('../../components/Cuopon/getCuopons')
const updateCuopon = require('../../components/Cuopon/updateCuopon')
const removeCuopon = require('../../components/Cuopon/removeCuopon')

router.post('/addcuopon',addCuopon)
router.get('/getcuopons',getCuopons)
router.put('/updatecuopon/:cuoponId',updateCuopon)
router.delete('/removecuopon/:cuoponId',removeCuopon)

module.exports = router 