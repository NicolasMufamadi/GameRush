const db = require('../../database/database')

module.exports = (req,res)=>{

    db.Cart.create({
        UserId: req.body.UserId,
        ProductId: req.body.ProductId,
        ProductQuantity: 1,
    }).then(response=>{
        
        res.status(200).send(response)

    }).catch(err=>{
        res.status(400).send(err)
    })

}