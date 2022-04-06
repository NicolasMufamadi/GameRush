const db = require('../../database/database')

module.exports = (req,res)=>{

    db.Category.findAll().then(response=>{
        res.status(200).send(response)
    }).catch(err=>{
        res.status(404).send(err)
    })

}