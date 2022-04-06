const db = require('../../database/database')

module.exports = ((req,res)=>{

    db.User.findByPk(req.params.UserId).then(data=>{
        data.update({
            Email: req.body.Email || data.dataValues.Email
        }).then(response=>{
            res.status(200).send(response)
        }).catch(err=>{
            res.status(400).send(err)
        })
    }).catch(err=>{
        res.status(401).send(err)
    })

})