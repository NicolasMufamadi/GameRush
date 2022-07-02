const db = require('../../database/database')

module.exports = (req,res) => {
   
    db.Review.create({
        
        UserId: req.body.UserId,
        ProductId: req.body.ProductId,
        Name: req.body.Name,
        Comment: req.body.Comment,
        Rating: req.body.Rating,
        ProductName: req.body.ProductName,
        Status: 'Pending'

    }).then(response=>{
        res.status(201).send(response)
    }).catch(err=>res.status(400).send(err))

}