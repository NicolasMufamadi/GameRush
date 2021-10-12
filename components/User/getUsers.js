const db = require('../../database/database')


module.exports = ((req,res)=>{

    db.User.findAll().then((data)=>{
        res.status(200).send(data)
    }).catch((err)=>{

        res.status(400).send(err)

    })

})