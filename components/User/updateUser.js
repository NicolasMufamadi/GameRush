const db = require('../../database/database')
const bcrypt = require('bcryptjs')

module.exports =  (async(req,res)=>{


    const passwordHash = await bcrypt.hash(req.body.Password,10)

  db.User.findByPk(req.params.UserId).then((data)=>{
       
       data.update({
            Email: req.body.Email || data.Email,
            Password: passwordHash || data.Password,
            Phone: req.body.Phone || data.Password, 
            UserType: req.body.UserType  || data.UserType

        }).then((data)=>{
            res.status(200).send(data)
        }).catch((err)=>{
            res.status(500).send(err)
        })
       
    }).catch(err=>{
        res.status(500).send(err)
    })

})