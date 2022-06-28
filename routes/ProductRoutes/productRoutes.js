const express = require('express')
const router = express.Router()
const multer = require('multer')


const multerStorage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null,'public')
    },
    filename: function(req,file,cb){
         cb(null,new Date().toISOString().replace(/:/g,'-') + file.originalname)
    },
    
    
})



const upload = multer({
    storage: multerStorage,
    limits: {
        fileSize: 1024 * 1024 * 5 
    },
    fileFilter: (req,file,cb)=>{
        if(file.mimetype.split('/')[0] == 'image'){
            cb(null,true)
        }else{
            cb(new multer.MulterError('Please upload an image file'),false)
        }
    }
})


const addproduct = require('../../components/Product/AddProduct')
const getproduct = require('../../components/Product/GetProduct')
const getproducts = require('../../components/Product/GetProducts')
const updateproduct = require('../../components/Product/UpdateProduct')
const deleteproduct = require('../../components/Product/DeleteProduct')
const changeimage = require('../../components/Product/ChangeImage')
const updatequant = require('../../components/Product/updateQuantity')

router.post('/addproduct',upload.single('ProductImg'),addproduct)
router.get('/getproduct/:ProductId',getproduct)
router.get('/getproducts',getproducts)
router.delete('/removeproduct/:ProductId',deleteproduct)
router.put('/updateproduct/:ProductId',updateproduct)
router.put('/updatequantity',updatequant)
router.put('/changeImage/:ProductId',upload.single('ProductImg'),changeimage)
module.exports = router