const {Sequelize} = require('sequelize')
const dotenv = require('dotenv');
dotenv.config();
//connect to database 

const sequelize = new Sequelize( process.env.DATABASE , process.env.USER , process.env.PASSWORD ,{

    host: process.env.HOST, 
    dialect: process.env.DIALECT

})

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('../models/User')(sequelize,Sequelize);
db.Product = require('../models/product')(sequelize,Sequelize)
//db.sequelize.sync({force:true});

module.exports = db;