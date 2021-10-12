const db = require('../../database/database')

module.exports = (req,res)=>{

   db.Product.create({
       ProductName:   req.body.ProductName,
       ProductDesc:   req.body.ProductDesc,
       ProductPrice:  req.body.ProductPrice,
       ProductQuant:  req.body.ProductQuant,
       ProductImg:    req.body.ProductImg       
   }).then(data=>{

      res.status(200).send(data)
   }).catch(err=>{
       res.status(404).send(data)
   })

}
