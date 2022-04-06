require('dotenv').config()
const express = require('express');
const cors = require('cors')
const app = express();

//middleware
app.use(express.json())
app.use(cors())
app.use('/public',express.static('public'))

//routes
const UserRoutes = require('./Routes/UserRoutes/userRoutes') 
const ProductRoutes = require('./Routes/ProductRoutes/productRoutes')
const BannerRoutes = require('./routes/BannerRoutes/bannerRoutes')
const CategoryRoutes = require('./routes/CategoryRoutes/categoryRoutes')
const CuoponRoutes = require('./routes/CuoponRoutes/CuoponRoutes')

app.use('/users',UserRoutes);
app.use('/products',ProductRoutes)
app.use('/banners',BannerRoutes)
app.use('/categories',CategoryRoutes)
app.use('/cuopons',CuoponRoutes)

app.listen(process.env.PORT,()=>console.log(`Server up and running on http:localhost:${process.env.PORT}`))