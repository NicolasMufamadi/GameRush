const db = require('../../database/database')
const filter = require('./filterProducts')

module.exports = async(req,res)=>{
/*
   try{
         
        let limit = req.query.limit || 8
        let offset = req.query.offset || 0 

        let products = await db.Product.findAll({offset: offset, limit: limit, subQuery:false})
        console.log(products)
        res.send(products)


   }catch(err){
      console.log(err)
   }
*/

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
}else {
    let products = await db.Product.findAll()
    res.send(products)
}

}