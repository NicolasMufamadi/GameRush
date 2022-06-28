
module.exports = (sequelize,Sequelize)=>{

  const Order = sequelize.define('Order',{
     
     OrderId: {
         type: Sequelize.INTEGER,
         autoIncrement: true,
         primaryKey: true 
     },

     OrderNumber: {
        type: Sequelize.STRING,
        allowNulls: false 
     },

     OrderStatus: {
        type: Sequelize.STRING,
     },

     UserId: {
         type: Sequelize.INTEGER,
         allowNulls: false 
     },

    Products: {
        type: Sequelize.JSON,
        allowNulls: false
    },

    RecipientName: {
       type: Sequelize.STRING,
    }, 

    PhoneNumber: {
       type: Sequelize.TEXT
    },

     StreetAddress: {
         type: Sequelize.STRING,
     },

     PostalCode: {
        type: Sequelize.INTEGER,
     },

     City: {
        type: Sequelize.STRING
     },

     Suburb: {
        type: Sequelize.STRING
     },

     TotalItems: {
        type: Sequelize.INTEGER,
        allowNulls: false 
     },

     OrderTotal: {
         type: Sequelize.DECIMAL(10,2),
         allowNulls: false 
     },

     DeliveryDate: {
        type: Sequelize.TEXT,
        allowNulls: false
     },

     DeliveryFee: {
      type: Sequelize.STRING
     },

     CreatedOn: {
        type:Sequelize.TEXT
     }


  })

  return Order

}