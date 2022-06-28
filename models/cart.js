
module.exports = (sequelize,Sequelize) =>{


    const Cart =  sequelize.define('Cart',{

        CartId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        UserId:{
            type: Sequelize.INTEGER,
            allowNulls: false
        },

        ProductId: {
            type: Sequelize.INTEGER,
            allowNulls: false
        },

        ProductQuantity:{
            type: Sequelize.INTEGER
        },

    })

    return Cart

}