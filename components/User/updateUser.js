const db = require('../../database/database')
const bcrypt = require('bcryptjs')

module.exports =  (async(req,res)=>{


    const passwordHash = await bcrypt.hash(req.body.Password,10)

  db.User.findByPk(req.params.UserId).then((data)=>{
         console.log(data)
       data.update({
            FirstName: req.body.FirstName || data.dataValues.FirstName,
            LastName: req.body.LastName || data.dataValues.LastName,
            Email: req.body.Email || data.dataValues.Email,
            Password: passwordHash || data.dataValues.Password,
            Phone: req.body.Phone || data.dataValues.Password, 
            UserType: req.body.UserType  || data.dataValues.UserType

        }).then((data)=>{
            res.status(200).send(data)
        }).catch((err)=>{
            res.status(500).send(err)
        })
       
    }).catch(err=>{
        res.status(500).send(err)
    })

})