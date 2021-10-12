const express = require('express')
const router = express.Router();


const registerUser = require('../../components/User/AddUser')
const getUsers = require('../../components/User/getUsers')
const updateUser = require('../../components/User/updateUser')
const getUser  = require('../../components/User/getUser')
const deleteUser = require('../../components/User/RemoveUser')
const login   = require('../../components/User/login')


router.post("/register",registerUser)
router.post("/login",login)
router.get('/getusers',getUsers)
router.get('/getuser/:UserId',getUser)
router.put('/updateuser/:UserId',updateUser)
router.delete('/deleteuser/:UserId',deleteUser)

module.exports = router