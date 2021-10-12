const db = require('../../database/database')

module.exports = (req,res)=>{

    db.Product.findByPk(req.params.ProductId)
    .then(data=>{
        data.update({
            ProductName: req.body.ProductName,
            productDesc: req.body.productDesc,
            ProductPrice: req.body.ProductPrice,
            ProductQuant: req.body.ProductQuant,
            ProductImg:  req.body.ProductImg
        }).then(data=>{
            res.status(200).send(data)
        }).catch(err=>{
            res.status(404).send(err)
        })
    }).catch(err=>{
        res.status(404).send(err)
    })

}