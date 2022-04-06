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

const addBanner = require('../../components/Banner/addBanner')
const getBanners = require('../../components/Banner/getBanners')
const removeBanner = require('../../components/Banner/removeBanner')
const editBanner = require('../../components/Banner/editBanner')
const changebannerImage = require('../../components/Banner/changeBannerImage')

router.post('/addbanner',upload.single('bannerImg'),addBanner)
router.get('/getbanners',getBanners)
router.put('/updatebanner/:bannerId',editBanner)
router.put('/updatebannerimage/:bannerId',upload.single('bannerImg'),changebannerImage)
router.delete('/removebanner/:bannerId',removeBanner)

module.exports = router 