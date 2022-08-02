const db = require('../../database/database')

module.exports = (req,res)=>{

   

    const url = req.protocol + '://' + req.get('host')
    var path = url + '/public/'+ req.file.filename
    let rating = 0

   db.Product.create({

       ProductName:    req.body.ProductName,
       ProductDesc:    req.body.ProductDesc,
       ProductKeywrds: req.body.ProductKeywrds,
       ProductPrice:   req.body.ProductPrice,
       ProductQuant:   req.body.ProductQuant,
       ProductCategory: req.body.ProductCategory,
       ProductSubCategory: req.body.ProductSubCategory,
       ProductRatings: rating,
       ProductStatus: 'In-Stock',
       ProductImg:     path,

   }).then(data=>{
     // console.log(req.files)        
      res.status(200).send(data)
   }).catch(err=>{
       res.status(404).send(err)
   })

}
