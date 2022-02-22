require('dotenv').config()
const express = require('express');
const cors = require('cors')
const app = express();

//middleware
app.use(express.json())
app.use(cors())

//routes
const UserRoutes = require('./Routes/UserRoutes/userRoutes') 
const ProductRoutes = require('./Routes/ProductRoutes/productRoutes')

app.use('/users',UserRoutes);
app.use('/products',ProductRoutes)


app.listen(process.env.PORT,()=>console.log(`Server up and running on http:localhost:${process.env.PORT}`))