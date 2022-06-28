const jwt = require('jsonwebtoken')


function auth(req,res,next) {

         const auth = req.headers.authorization
        if(auth){
          
         const token = req.headers.authorization.split(' ')[1]
     //    const token = localStorage.getItem('token')
          
          if(token == null || token == undefined){
            res.status(404).send("Token not found")
          }else{
               jwt.verify(token,process.env.SECRET,(err,user)=>{
            
                 if(user){
                      res.status(200).send({Authorization: 'LoggedIn'})
                      next()
                 }else if(err){
                     res.send({Authorization: 'LoggedOut'})
                 }
               })
          }
          
        }else{
          res.status(401).send("Unauthorized")
        }
        

}


module.exports = auth