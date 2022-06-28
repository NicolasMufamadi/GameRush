const db = require('../../database/database')

module.exports = (req,res)=>{

    db.Order.findAll({where : {UserId: req.query.UserId}})
    .then(response=>{
         res.status(200).send(response)
    }).catch(err=>console.log(err))

}