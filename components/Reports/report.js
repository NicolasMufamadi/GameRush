
const db = require('../../database/database')

module.exports = async (req,res)=>{

    let reports = {}
   
   const nUsers = await db.User.count()
   const nProducts = await db.Product.count()
   const nCategories = await db.Category.count()
   const nOrders = await db.Order.count({where: {OrderStatus: 'Delivered'}})
   const nReviews = await db.Review.count({where: {Status: 'Approved'}})
   const nBannedUsers = await db.User.count({where:{IsBanned: true}})
   const outOfStockProducts = await db.Product.count({where: {ProductStatus: 'Out-Of-Stock'}})
   const categories = await db.Category.findAll()

   let catgrs = [] 
  
   for(let i = 0; i < categories.length; i++){
        let products = await db.Product.count({where: {ProductSubCategory: categories[i].subCategory}})
        let obj = {categoryName: categories[i].categoryName, subCategory: categories[i].subCategory, noGames: products}    
        catgrs.push(obj)
     }

    const products = await db.Product.findAll()
    let totalItemsInStock = 0 
    for(let i = 0; i < products.length; i++){
     totalItemsInStock += products[i].ProductQuant
    }

    reports = {nUsers, nProducts, nCategories, nOrders, nReviews,nBannedUsers,outOfStockProducts,totalItemsInStock,categories,catgrs}
    res.send(reports)

}

