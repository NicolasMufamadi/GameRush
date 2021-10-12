const db = require('../../database/database')

module.exports = (req,res)=>{

     db.Product.findByPk(req.params.ProductId)
      .then(data=>{
        
              res.status(200).send(data)
          }).catch(err=>{
               res.status(404).send(err)
          })

}