const db = require('../../database/database')


module.exports = (req,res)=>{

    db.Category.findByPk(req.params.categoryId)
    .then(data=>{
         data.destroy({

         }).then(response=>{
             res.status(200).send(response)
         }).catch(err=>{
             res.status(400).send(err)
         })
    }).catch(err=>{
        res.status(404).send(err)
    })

}