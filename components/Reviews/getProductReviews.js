const db = require('../../database/database') 

module.exports = (req,res) =>{

    db.Review.findAll({where: {ProductId: req.query.ProductId}})
    .then(response=> res.send(response))
    .catch(err=>res.status(401).send(err))

}