const db = require('../../database/database')

module.exports = (req,res) =>{

    db.Order.findByPk(req.params.OrderId)
    .then(data=>{
        data.update({
            OrderStatus: req.body.OrderStatus,
            DeliveryDate: req.body.DeliveryDate
        }).then(response=>
            {
                res.status(200).send(response)
            
            }).catch(err=>res.status(400).send(err))
    }).catch(err=>res.send(404).send(err))

}