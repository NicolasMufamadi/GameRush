const express = require('express')
const router = express.Router()

const addReview = require('../../components/Reviews/addReview')
const getuserReviews = require('../../components/Reviews/getuserReviews')
const getReviews = require('../../components/Reviews/getReviews')

router.post('/',addReview)
router.get('/',getuserReviews)
router.get('/getall',getReviews)

module.exports = router