const db = require('../../database/database')

module.exports = (req,res)=>{

    const reqFiles = []

    const url = req.protocol + '://' + req.get('host')

    for(var i =0; i < req.files.length; i++){

        reqFiles.push(url + '/public/'+ req.files[i].filename)

    }

    db.Product.findByPk(req.params.ProductId).then(data=>{
        data.update({
            ProductImg: reqFiles
        }).then(response=>{
             res.send(response)
        }).catch(err=>{
            console.log(err)
        })
    }).catch(err=>{
        console.log(err)
    })

}