
module.exports = (sequelize,Sequelize) =>{

    var review = sequelize.define('Review',{
        
        ReviewId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true   
        },

        UserId: {
            type: Sequelize.INTEGER
        },

        ProductId: {
            type: Sequelize.INTEGER
        },

        ProductName: {
           type: Sequelize.STRING
        },

        Name: {
            type: Sequelize.STRING
        },

        ReviewedOn: {
           type: Sequelize.TEXT 
        },

        Comment:{
           type: Sequelize.STRING      
        },

        Rating: {
           type: Sequelize.INTEGER 
        },

        Status: {
            type: Sequelize.STRING
        }
        

    })

  return review

}