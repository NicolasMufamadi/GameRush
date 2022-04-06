const db = require('../../database/database')


module.exports = (req,res)=>{

    db.Cuopon.create({
        cuoponName: req.body.cuoponName,
        cuoponOff: req.body.cuoponOff,
        cuoponMinAmount: req.body.cuoponMinAmount,
        cuoponExpDate: req.body.cuoponExpDate
    }).then(response=>{
        res.status(200).send(response)
    }).catch(err=>{
        res.status(400).send(err)
    })

}