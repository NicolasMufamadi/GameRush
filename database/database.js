const { Sequelize } = require('sequelize')
const dotenv = require('dotenv');
dotenv.config();
//connect to database 

const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {

    host: process.env.HOST,
    dialect: 'mysql'

})

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('../models/User')(sequelize, Sequelize);
db.Product = require('../models/product')(sequelize, Sequelize)
db.Banner = require('../models/banner')(sequelize, Sequelize)
db.Category = require('../models/category')(sequelize, Sequelize)
db.Cuopon = require('../models/coupon')(sequelize, Sequelize)
db.Cart = require('../models/cart')(sequelize, Sequelize)
db.AddressBook = require('../models/addressBook')(sequelize, Sequelize)
db.Order = require('../models/order')(sequelize, Sequelize)
db.Review = require('../models/review')(sequelize, Sequelize)

db.sequelize.sync()
//db.sequelize.sync({force:true})

module.exports = db;