const db = require('../../database/database')

module.exports = (req,res)=>{

    db.Banner.findByPk(req.params.bannerId).then(data=>{

         data.destroy().then(response=>{
             res.status(200).send(response)
         }).catch(err=>{
            res.status(400).send(err) 
         })

    }).catch(err=>{
        res.status(404).send(err)
    })

}