const db = require('../../database/database')

module.exports = (req,res) => {
   
    let months = ['January','February','March','April','May','June','July','August','September','October','November','December']
    let date = new Date()
    let reviewedOn = date.getDate() +' '+ months[date.getMonth()] +' '+ date.getFullYear() 

    db.Review.create({
        
        UserId: req.body.UserId,
        ProductId: req.body.ProductId,
        Name: req.body.Name,
        ReviewedOn: reviewedOn,
        Comment: req.body.Comment,
        Rating: req.body.Rating,
        ProductName: req.body.ProductName,
        Status: 'Pending'

    }).then(response=>{
        res.status(201).send(response)
    }).catch(err=>res.status(400).send(err))

}