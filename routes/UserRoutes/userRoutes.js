const express = require('express')
const router = express.Router();
const auth = require('../../components/Middleware/auth')


const registerUser = require('../../components/User/AddUser')
const getUsers = require('../../components/User/getUsers')
const getUser  = require('../../components/User/getUser')
const deleteUser = require('../../components/User/RemoveUser')
const login   = require('../../components/User/login')
const logout = require('../../components/User/logout')
const updateName = require('../../components/User/updateName')
const updateEmail = require('../../components/User/updateEmail');
const updatePhone = require('../../components/User/updatePhone');
const updatePassword = require('../../components/User/updatePassword')

router.post("/register",registerUser)
router.post("/login",login)
router.post('/logout',logout)
router.post('/checkauth',auth)
router.get('/getusers',getUsers)
router.get('/getuser/:UserId',auth,getUser)
router.put('/updateuser/name/:UserId',auth,updateName)
router.put('/updateuser/email/:UserId',updateEmail)
router.put('/updateuser/phone/:UserId',updatePhone)
router.put('/updateuser/password/:UserId',updatePassword)
router.delete('/deleteuser/:UserId',deleteUser)


module.exports = router