module.exports = (sequelize,Sequelize)=>{

    var cuopon = sequelize.define('Cuopon',{
        cuoponId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true 
        },

        cuoponName: {
            type: Sequelize.STRING,
            allowNull: false
        },

        cuoponOff: {
            type: Sequelize.INTEGER,
            allowNull: false
        },

        cuoponMinAmount: {
            type: Sequelize.INTEGER,
            allowNull: false
        },

        cuoponExpDate: {
            type: Sequelize.TEXT,
            allowNull: false
        }

    })
    
    return cuopon 
}