module.exports = (sequelize,Sequelize) =>{

    const User = sequelize.define("User",{

        UserId:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
    
        Email: {
     
            type: Sequelize.STRING,
            allowNull: false,
            unique: true 
            
        },
    
        Password: {
    
            type: Sequelize.STRING,
            allowNull: false
    
        },

        Phone: {

            type:Sequelize.TEXT,
            allowNull: true

        },

        UserType: {
            type: Sequelize.INTEGER,
            default: 4,
            allowNull:false
        }

    })

    return User
}