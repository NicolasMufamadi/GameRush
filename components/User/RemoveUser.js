const db = require('../../database/database')

module.exports = ((req,res)=>{


    db.User.findByPk(req.params.userId)
    .then(data=>{
      
        data.destroy().then((data)=>{
            res.status(200).send(data)
        }).catch(err=>{

            res.status(400).send(err)
        })
    }).catch(err=>{
        res.status(400).send(err)
        })
})