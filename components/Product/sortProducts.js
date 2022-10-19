//const { sequelize } = require('../../database/database')
let db = require('../../database/database')

module.exports = async(req,res) => {
    
    let sort = req.query.sort
    
    if(sort == '-name'){
        let orderProductsName = await db.Product.findAll({order:[["ProductName", "DESC"]]})
        res.send(orderProductsName)
    }else if(sort == 'name'){
        let orderProductsName = await db.Product.findAll({order:[["ProductName", "ASC"]]})
        res.send(orderProductsName)
    }else if(sort == '-price'){
        let orderProductsName = await db.Product.findAll({order:[["ProductPrice", "DESC"]]})
        res.send(orderProductsName)
    }else if(sort == 'price'){
        let orderProductsName = await db.Product.findAll({order:[["ProductPrice", "ASC"]]})
        res.send(orderProductsName) 
    }else if(sort == '-rating'){
        let orderProductsName = await db.Product.findAll({order:[["ProductRatings", "DESC"]]})
        res.send(orderProductsName) 
    }else if(sort == 'rating'){
        let orderProductsName = await db.Product.findAll({order:[["ProductRatings", "ASC"]]})
        res.send(orderProductsName) 
    }else if(sort == '-created_at'){
        let orderProductsName = await db.Product.findAll({order:[["createdAt", "DESC"]]})
        res.send(orderProductsName) 
    }else if(sort == 'created_at'){
        let orderProductsName = await db.Product.findAll({order:[["createdAt", "ASC"]]})
        res.send(orderProductsName) 
    }else{
        let orderProductsName = await db.Product.findAll({order:[["createdAt", "ASC"]]})
        res.send(orderProductsName) 
    }
 
}

