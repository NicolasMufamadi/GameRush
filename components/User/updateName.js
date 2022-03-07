const db = require('../../database/database')

module.exports = ((req,res)=>{

    db.User.findByPk(req.params.UserId).then(data=>{
        data.update({
            FirstName: req.FirstName || data.dataValues.FirstName,
            LastName: req.LastName || data.dataValues.LastName
        }).then(response=>{
            res.status(200).send(response)
        }).catch(err=>{
            res.status(400).send(err)
        })
    }).catch(err=>{
        res.status(400).send(err)
    })

})