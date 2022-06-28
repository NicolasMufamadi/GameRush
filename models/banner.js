module.exports = (sequelize,Sequelize)=>{


    const banner = sequelize.define("Banner",{

        bannerId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        bannerName: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        bannerLink: {
            type: Sequelize.STRING,
            allowNull: true
        },

        expDate: {
            type: Sequelize.STRING,
            allowNull: false
        },

        bannerImg: {
            type: Sequelize.TEXT,
            allowNull: false

        }


    })

    return banner

}