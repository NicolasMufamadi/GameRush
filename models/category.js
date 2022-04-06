
module.exports = (sequelize,Sequelize)=>{

    var category = sequelize.define('Category',{
        
        categoryId:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        categoryName:{
            type: Sequelize.STRING,
            allowNull: false
        },

        subCategory: {
            type: Sequelize.STRING,
            allowNull: true
        },

        categoryDesc: {
            type: Sequelize.TEXT,
            allowNull: false
        },



    })

    return category

}