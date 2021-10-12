const db = require('../../database/database')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config();

module.exports = ((req,res)=>{

    var hashpassword = bcrypt.hashSync(req.body.Password,10)

   db.User.create({

     Email: req.body.Email,
     Password: hashpassword,
     Phone: req.body.Phone,
     UserType: req.body.UserType

   }).then((data)=>{

     const token = jwt.sign({...data},process.env.SECRET,{
         expiresIn:86400
     })
       res.status(200).send({auth: true, data: data, token: token})
     
   }).catch((err)=>{

     res.status(400).send({error: err})
            
   })
   
})