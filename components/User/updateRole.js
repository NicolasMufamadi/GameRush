
const db = require('../../database/database')
module.exports = (req,res)=>{


db.User.findByPk(req.params.UserId).then(data=>{
    data.update({
        UserType: req.body.UserType || data.dataValues.UseType
    }).then(response=>{
        res.status(200).send(response)
    }).catch(err=>{
        res.status(400).send(err)
    })
}).catch(err=>{
    res.status(401).send(err)
})

}