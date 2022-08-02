const db = require('../../database/database')

module.exports = async(req,res) =>{

   let products =  await db.Product.findAll()
   //price [0-500], [500-1000],[1500-2000],[2000-2500]
   //rating [0-1],[2-3],[4-5]
   //Category
   

}