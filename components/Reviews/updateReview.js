const db = require('../../database/database')


module.exports = async(req,res) => {
  
    db.Review.findOne({where: {ReviewId: req.query.ReviewId}})
    .then(data=>{
        data.update({
            Status: req.body.Status
        }).then(response=>res.status(200).send(response))
        .catch(err=>res.status(400).send(err))
    }).catch(err=>res.status(404).send(err))
    
}