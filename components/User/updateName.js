const db = require('../../database/database')

module.exports = ((req,res)=>{


  db.User.findByPk(req.params.UserId)
  .then(data=>{
      data.update({
          FirstName: req.body.FirstName || data.dataValues.FirstName,
          LastName: req.body.LastName || data.dataValues.LastName
      }).then(response=>{

        res.status(200).send(response)

      }).catch(err=>{
          res.status(400).send(err)
      })
  }).catch(err=>{
      res.status(401).send(err)
  })


})