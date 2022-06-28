const db = require('../../database/database')

module.exports = (req,res) =>{

    db.Product.findOne({where: {ProductId: req.query.ProductId}})
    .then(data=>{
        data.update({
            ProductQuant: req.body.ProductQuant,
            ProductSold: req.body.ProductSold
        }).then(response=>{res.status(200).send(response)
        
        }).catch(err=>res.status(400).send(err))
    
    }).catch(err=> res.status(404).send(err))

}