const express = require('express')
const router = express.Router()

const addAddress = require('../../components/AddressBook/addAddress')
const getAddresses = require('../../components/AddressBook/getAddresses')
const editAddress = require('../../components/AddressBook/editAddress')
const removeAddress = require('../../components/AddressBook/removeAddress')


router.post('/add/address',addAddress)
router.get('/getaddresses',getAddresses)
router.put('/editaddress/:AddressId',editAddress)
router.delete('/removeaddress/:AddressId',removeAddress)

module.exports = router 