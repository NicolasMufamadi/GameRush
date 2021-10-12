
module.exports = (sequelize,Sequelize)=>{


    const Product = sequelize.define("Product",{


        ProductId: {

            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true  

        },

        ProductName:{
            type: Sequelize.STRING,
            allowNull: true
        },

        ProductDesc: {
            type:Sequelize.TEXT,
            allowNull:true
        },

        ProductPrice: {
            type: Sequelize.TEXT,
            allowNull: true
        },

        ProductQuant: {
            type: Sequelize.INTEGER,
            allowNull: false
        },

        ProductImg: {

            type: Sequelize.STRING,
            allowNull: true

        }


    })

   return Product
   
}