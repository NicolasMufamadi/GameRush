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
const CartRoutes = require('./routes/CartRoutes/cartRoutes')
const AddressRoutes = require('./routes/AddressRoutes/addressRoutes')
const OrderRoutes = require('./routes/OrderRoutes/orderRoutes')
const ReviewRoutes = require('./routes/ReviewsRoutes/reviewsRoutes')
const ReportRoutes = require('./routes/ReportRoutes/reportRoutes')

app.use('/users',UserRoutes);
app.use('/products',ProductRoutes)
app.use('/banners',BannerRoutes)
app.use('/categories',CategoryRoutes)
app.use('/cuopons',CuoponRoutes)
app.use('/cart',CartRoutes)
app.use('/address',AddressRoutes)
app.use('/orders',OrderRoutes)
app.use('/reviews',ReviewRoutes)
app.use('/report',ReportRoutes)

app.listen(process.env.PORT,()=>console.log(`Server up and running on http:localhost:${process.env.PORT}`))