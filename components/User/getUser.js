const db = require('../../database/database')

module.exports= (req,res)=>{


  db.User.findOne({ where: {UserId: req.params.UserId}}).then(data=>{

    res.status(200).send(data);

  }).catch(err=>{
      res.send(err)
  })


}