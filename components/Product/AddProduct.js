const db = require('../../database/database')

module.exports = (req,res)=>{

    const reqFiles = []

    const url = req.protocol + '://' + req.get('host')

    for(var i =0; i < req.files.length; i++){

        reqFiles.push(url+'/public/'+ req.files[i].filename)
       
    }

   db.Product.create({

       ProductName:    req.body.ProductName,
       ProductDesc:    req.body.ProductDesc,
       ProductKeywrds: req.body.ProductKeywrds,
       ProductPrice:   req.body.ProductPrice,
       ProductQuant:   req.body.ProductQuant,
       ProductImg:     reqFiles

   }).then(data=>{
     // console.log(req.files)        
      res.status(200).send(data)
   }).catch(err=>{
       res.status(404).send(err)
   })

}
