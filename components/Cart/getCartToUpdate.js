const db = require('../../database/database')

module.exports = (req,res)=>{
    db.Cart.findOne({where: {UserId: req.query.UserId, ProductId: req.query.ProductId}})
    .then(response=>{
        res.status(200).send(response)
    }).catch(err=>{
        res.status(200).send(err)
    })
}