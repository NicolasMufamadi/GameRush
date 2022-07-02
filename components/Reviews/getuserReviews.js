const db = require('../../database/database')

module.exports = (req,res) => {

    db.Review.findOne({where: {UserId: req.query.UserId, ProductId: req.query.ProductId}})
    .then(response=>{
        res.status(200).send(response)
    }).catch(err=>{
        res.status(404).send(err)
    })

}