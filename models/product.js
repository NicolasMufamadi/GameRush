
module.exports = (sequelize,Sequelize)=>{


    var Product = sequelize.define("Product",{


        ProductId: {

            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true  

        },

        ProductName:{
            type: Sequelize.STRING,
            allowNull: false
        },

        ProductKeywrds: {
            type: Sequelize.TEXT,
            allowNull: true
        },

        ProductDesc: {
            type:Sequelize.TEXT,
            allowNull:false
        },

        ProductPrice: {
            type: Sequelize.DECIMAL(10,2),
            allowNull: false
        },

        ProductQuant: {
            type: Sequelize.INTEGER,
            allowNull: false
        },

        ProductSold: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },

        ProductRatings: {
            type: Sequelize.TEXT,
            defaultValue: 'None'
        },


        ProductStatus: {
            type: Sequelize.TEXT,
            allowNull: false
        },

        ProductSubCategory: {
            type: Sequelize.TEXT
        },
        
        ProductCategory: {
            type: Sequelize.TEXT
        },


        ProductImg: {
            type: Sequelize.TEXT,
            allowNull: false
        }

    })

   return Product
   
}