const db = require('../../database/database')

module.exports= (req,res)=>{

    db.Category.create({
        categoryName: req.body.categoryName,
        categoryDesc: req.body.categoryDesc,
        subCategory: req.body.subCategory,

    }).then(response=>{
        res.status(200).send(response)
    }).catch(err=>{
        res.status(400).send(err)
    })

}