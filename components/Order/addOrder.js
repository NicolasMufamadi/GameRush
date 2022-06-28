const db = require('../../database/database')

module.exports = (req,res)=>{

   let randomNumber = Date.now() + Math.floor(Math.random() * 100 + 1)
   let orderNumber = '#'+randomNumber

   let orderStatus = 'Awaiting Delivery'
   
   let months = ['January','February','March','April','May','June','July','August','September','October','November','December']
   let date = new Date()
   let createdOn = date.getDate() +'-'+ months[date.getMonth()] +'-'+ date.getFullYear() 

   db.Order.create({

      UserId: req.body.UserId,
      OrderNumber: orderNumber,
      Products: req.body.Products,
      OrderStatus: orderStatus,
      RecipientName: req.body.RecipientName,
      PhoneNumber: req.body.PhoneNumber,
      StreetAddress: req.body.StreetAddress,
      PostalCode: req.body.PostalCode,
      City: req.body.City,
      Suburb: req.body.Suburb,
      TotalItems: req.body.TotalItems,
      OrderTotal: req.body.OrderTotal,
      DeliveryDate: req.body.DeliveryDate,  
      DeliveryFee: req.body.DeliveryFee,
      CreatedOn: createdOn

   }).then(response=>{
      res.status(201).send(response)
   }).catch(err=>{
      res.status(400).send(err)
   })

}
