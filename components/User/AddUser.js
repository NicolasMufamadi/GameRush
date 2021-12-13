const db = require('../../database/database')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config();

module.exports = ( async (req,res)=>{

    var salt = await bcrypt.genSalt(10)
    var hashpassword = bcrypt.hashSync(req.body.Password,salt)

   db.User.create({
     FirstName: req.body.FirstName,
     LastName: req.body.LastName,
     Email:    req.body.Email,
     Password: hashpassword,
     Phone:    req.body.Phone,
     UserType: req.body.UserType

   }).then((data)=>{

     const token = jwt.sign({...data},process.env.SECRET,{
         expiresIn:86400
     })
       res.status(200).send({auth: true, data: data, token: token})
     
   }).catch((err)=>{

     res.status(400).send(err)
            
   })
   
})