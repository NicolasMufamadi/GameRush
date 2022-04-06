const db = require('../../database/database')

module.exports = (req,res)=>{


    var url = req.protocol +'://'+ req.get('host')
    var path = url + '/public/'+ req.file.filename
       console.log(path)
    db.Banner.findByPk(req.params.bannerId).then(data=>{
        data.update({
            bannerImg: path
        }).then(response=>{
            res.status(200).send(response)
        }).catch(err=>{
            res.status(400).send(response)
        })
    }).catch(err=>{
        res.status(404).send(err)
    })


}