const db = require('../../database/database')

module.exports = (req,res)=>{


    db.Product.findByPk(req.params.ProductId)
    .then(data=>{
        data.update({

            ProductName: req.body.ProductName,
            ProductDesc: req.body.ProductDesc,
            ProductPrice: req.body.ProductPrice,
            ProductQuant: req.body.ProductQuant,
            ProductKeywrds: req.body.ProductKeywrds,
            ProductCategory: req.body.ProductCategory,
            ProductSubCategory: req.body.ProductSubCategory,
            ProductStatus: req.body.ProductStatus,
            ProductRatings: req.body.ProductRatings,
            ProductReviewers: req.body.ProductReviewers
            
        }).then(data=>{
            res.status(200).send(data)
        }).catch(err=>{
            res.status(404).send(err)
        })
    }).catch(err=>{
        res.status(404).send(err)
    })

}