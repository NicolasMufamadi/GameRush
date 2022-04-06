const db = require('../../database/database')

module.exports= (req,res)=>{

    var url = req.protocol + '://'+ req.get('host')
    var path = url + '/public/'+ req.file.filename

    db.Banner.create({
        bannerName: req.body.bannerName,
        bannerLink: req.body.bannerLink,
        expDate: req.body.expDate,
        bannerImg: path
    }).then(response=>{
        res.status(200).send(response)
    }).catch(err=>{
        res.status(400).send(err)
    })


}