const db = require('../../database/database')

module.exports = (req,res)=>{

    db.User.findOne({where: {Email: req.query.Email}})
    .then(response=>{
       res.send(response)
    }).catch(err=>{
        res.send(err)
    })

}