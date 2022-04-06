const db = require('../../database/database')
const fs = require('fs')
const { promisify } = require('util')

const unlinkAsync = promisify(fs.unlink)

module.exports = async (req,res)=>{


    db.Product.findByPk(
        req.params.ProductId
    ).then(data=>{

        data.destroy().then(data=>{
                         
            res.status(200).send(data)
        }).catch(err=>{
            res.status(404).send(err)
        })

    }).catch(err=>{
        res.status(404).send(err)
    })


}