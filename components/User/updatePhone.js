const db = require('../../database/database')

module.exports = ((req,res)=>{

    db.User.findByPk(req.params.UserId).then(data=>{
        data.update({
            Phone: req.body.Phone || data.dataValues.Phone
        }).then(response=>{
            res.status(200).send(response)
        }).catch(err=>{
            res.status(400).send(err)
        })
    }).catch(err=>{
        res.status(401).send(err)
    })

})