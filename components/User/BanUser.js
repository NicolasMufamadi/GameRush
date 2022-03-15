const { response } = require('express')
const db = require('../../database/database')

module.exports = ((req,res)=>{

    db.User.findOne({where: {Email: req.body.Email}}).then(data=>{
        data.update({
            IsBanned: req.body.IsBanned
        }).then(response=>{
            res.status(200).send(response)
        }).catch(err=>{
            res.status(400).send(err)
        })
    }).catch(err=>{
        res.status(401).send(err)
    })

})