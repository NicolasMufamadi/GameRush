const db = require('../../database/database')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const User = require('../../models/User');

module.exports = (req,res)=>{

     //check if the email entered is in the database 
    db.User.findOne({where: {Email: req.body.Email}})
    .then(data=>{
        if(data){
            //compare input password with the password in the database 
          bcrypt.compare(req.body.Password,data.dataValues.Password,(err,response)=>{
             if(err){
                 res.status(400).send(err)
             }
             if(response){
                const token = jwt.sign({...data},process.env.SECRET,{
                    expiresIn: "1h"
                })

                res.status(200).send({message:'Logged In', token: token, data: data.dataValues})
             }else {
                 res.status(400).send({error:{message: 'Incorrect password'}})
             }
          })
       } else res.status(400).send({error:{message:'Email does not exist'}})

    }).catch(err=>{
        console.log(err);
    })

}
