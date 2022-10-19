const db = require('../../database/database')

module.exports = (req,res)=>{

   db.AddressBook.findAll({where: {UserId: req.query.UserId}}).then(data=>{
       res.status(200).send(data)
   }).catch(err=>{
       res.status(404).send(err)
   })


}