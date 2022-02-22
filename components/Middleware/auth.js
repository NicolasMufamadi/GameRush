const jwt = require('jsonwebtoken')


function auth(req,res,next) {

 
        const token = req.headers.authorization.split(" ")[1]
        if(token == null || token == undefined) return res.status(401).send('No token found')
        
        jwt.verify(token,process.env.SECRET,((err,user)=>{
             console.log(user)
               if(err){
                  return res.status(401).send('Invalid Token')
               }
                 req.user = user 
                 next()
             }
         ))
        


}
/*

function auth(req,res,next) {

    try{
           const token = req.headers.authorization.split(' ')[1]
          if(token == null || token == undefined) return res.status(401)
 
          const decodedToken = jwt.verify(token,process.env.SECRET)
             console.log(decodedToken)
          const userid = decodedToken.dataValues.UserId
              console.log( userid +' : ' +req.params.UserId)
          if( req.body.UserId && req.body.UserId !== userid){
             throw 'Invalid User ID'
          }else{
                 next()
               // return res.status(200).send('Authorized')
          }

    }catch(err){
         return res.status(403).send(err)
    }

}

*/
module.exports = auth