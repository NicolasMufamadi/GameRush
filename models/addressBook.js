
module.exports =  (sequelize,Sequelize)=>{

    const AdressBook = sequelize.define('AddressBook',{
      
         AdressId: {

            type: Sequelize.INTEGER,
            autoIncrement: true, 
            primaryKey: true 

         },

         UserId: {
              
              type: Sequelize.INTEGER,
              allowNull: false

         },

         AdressType: {
             type: Sequelize.STRING,
             allowNull: false 
         },

         RecipientName: {
             type: Sequelize.STRING,
             allowNull: false 
         },

         RecipientMobile: {
             type: Sequelize.TEXT,
             allowNull: false 
         },

         StreetAdress: {
             type: Sequelize.TEXT,
             allowNull: false 
         },

         GeographicalFeature: {
             type: Sequelize.STRING,
             allowNull: true 
         },

         Suburb: {
             type: Sequelize.STRING,
             allowNull: false
         },

         City: {
             type: Sequelize.STRING,
             allowNull: false 
         },

         Province: {
             type: Sequelize.STRING,
             allowNull: false
         }, 

         PostalCode: {
             type: Sequelize.TEXT,
             allowNull: false
         } 

    })


    return AdressBook 

}