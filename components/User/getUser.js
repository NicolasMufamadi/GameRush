const db = require('../../database/database')

module.exports= (req,res)=>{


  db.User.findOne({ where: {UserId: req.params.UserId}}).then(()=>{

   res.status(200);

  }).catch(()=>{
      res.status(403)
  })


}