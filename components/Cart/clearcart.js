const db = require('../../database/database')


module.exports = (req,res)=>{

    db.Cart.destroy({where: {UserId: req.query.UserId}})
    .then(response=>{
        res.sendStatus(200)
    }).catch(err=>res.status(404).send(err))
  
}