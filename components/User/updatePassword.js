const bcrypt = require('bcryptjs')
const db = require('../../database/database')

module.exports = ((req,res)=>{


    db.User.findByPk(req.params.UserId).then(data=>{
        
        const passwordHash =  bcrypt.hashSync(req.body.Password,10)
        data.update({
            Password: passwordHash || data.dataValues.Password
        }).then(response=>{
            res.status(200).send(response)  
        }).catch(err=>{
            res.status(400).send(err)
        })
    }).catch(err=>{
        res.status(401).send(err)
    })


})