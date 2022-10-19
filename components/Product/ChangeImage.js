const db = require('../../database/database')

module.exports = (req,res)=>{

 
    const url = req.protocol + '://' + req.get('host')
    var path = url + '/public/'+ req.file.filename

    db.Product.findByPk(req.params.ProductId).then(data=>{
        data.update({
            ProductImg: path
        }).then(response=>{
             res.send(response)
        }).catch(err=>{
            console.log(err)
        })
    }).catch(err=>{
        console.log(err)
    })

}