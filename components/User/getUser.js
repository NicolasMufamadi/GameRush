const db = require('../../database/database')

module.exports= (req,res)=>{


  db.User.findOne({ where: {UserId: req.params.UserId}}).then(data=>{

    res.send(data);

  }).catch(err=>{
      res.send(err)
  })


}