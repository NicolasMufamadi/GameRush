const db = require('../../database/database')

module.exports = (req,res)=>{

    db.AddressBook.findByPk(req.params.AddressId)
    .then(data=>{
        data.destroy().then(response=>{
            res.status(200).send(response)
        }).catch(err=>{
            res.status(400).send(err)
        })
    }).catch(err=>{
        res.status(404).send(err)
    })

}