const express = require('express')
const router = express.Router();
const auth = require('../../components/Middleware/auth')


const registerUser = require('../../components/User/AddUser')
const getUsers = require('../../components/User/getUsers')
const updateUser = require('../../components/User/updateUser')
const getUser  = require('../../components/User/getUser')
const deleteUser = require('../../components/User/RemoveUser')
const login   = require('../../components/User/login')
const logout = require('../../components/User/logout')

router.post("/register",registerUser)
router.post("/login",login)
router.post('/logout',logout)
router.get('/getusers',getUsers)
router.get('/getuser/:UserId',auth,getUser)
router.put('/updateuser/:UserId',auth,updateUser)
router.delete('/deleteuser/:UserId',deleteUser)


module.exports = router