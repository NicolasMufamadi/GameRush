const db = require('../../database/database')

module.exports = (req,res)=>{

    db.Banner.findAll().then(response=>{
        res.status(200).send(response)
    }).catch(err=>{
        res.status(400).send(err)
    })

}