const db = require('../../database/database')
module.exports = ((req,res)=>{

    db.User.findOne({where:{ Email: req.body.Email}})
    .then(data=>{
        console.log(data)
        if(localStorage.getItem('token') !=null){
            res.send(localStorage.getItem('token'))
            localStorage.setItem('token',null)
            res.status(200).send('Successfully loggedOut')
        }
    })
    .catch(error=>{
        res.send(error)
    })

})