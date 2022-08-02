const db = require('../../database/database')
let categories = []

module.exports= async (req,res)=>{

   await db.Category.create({
        categoryName: req.body.categoryName,
        categoryDesc: req.body.categoryDesc,
        subCategory: req.body.subCategory,

    }).then(response=>{
        res.status(200).send(response)
    }).catch((err)=>{
        res.send(err)
    })

}

