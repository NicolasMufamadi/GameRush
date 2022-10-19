const db = require('../../database/database')

module.exports = (req,res) => {

    db.Order.findAll()
    .then(response=>{
        res.send(response)
    }).catch(err=>{
        res.status(404).send(err)
    })

}