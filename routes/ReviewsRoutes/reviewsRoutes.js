const express = require('express')
const router = express.Router()

const addReview = require('../../components/Reviews/addReview')
const getuserReviews = require('../../components/Reviews/getuserReviews')
const getReviews = require('../../components/Reviews/getReviews')
const getproductReviews = require('../../components/Reviews/getProductReviews')
const updateReview = require('../../components/Reviews/updateReview')

router.post('/',addReview)
router.get('/',getuserReviews)
router.get('/getall',getReviews)
router.get('/productreviews',getproductReviews)
router.put('/',updateReview)

module.exports = router