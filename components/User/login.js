const db = require('../../database/database')
const bcrypt = require('bcryptjs')

module.exports = (req,res)=>{

    db.User.findAll({
  //check if the email entered is in the database 
        where: {
            Email: req.body.Email,
        }
        
    }).then(data=>{
        console.log(data);
    })

}
