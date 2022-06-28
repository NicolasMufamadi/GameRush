const db = require('../../database/database')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


//const User = require('../../models/User');

module.exports = (req,res)=>{

     //check if the email entered is in the database 
    db.User.findOne({where: {Email: req.body.Email}})
    .then(data=>{
        if(data){
            //compare input password with the password in the database 
        
              bcrypt.compare(req.body.Password,data.dataValues.Password,(err,response)=>{

             if(response){
                const token = jwt.sign({UserId:data.dataValues.UserId,Role:data.dataValues.UserType},process.env.SECRET,{
                    expiresIn: "30m"
                })
                res.status(200).send({message:'Logged In', token: token, data: data.dataValues})
            }else {
            
                 res.status(400).send({error:{message: 'Incorrect Password'}})
             }
          })
        }else{
            
            res.status(404).send({error:{message:'Email does not exist'}})
        }
    
    }).catch(err=>{
        
    })

  


}

