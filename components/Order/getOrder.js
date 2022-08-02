let db = require('../../database/database')

module.exports = async (req,res) =>{
   
    let order = await db.Order.findOne({where: {OrderId: req.query.OrderId}})
    let data = order.dataValues
    let status = {OrderStatus: data.OrderStatus}
    res.send(status)

}