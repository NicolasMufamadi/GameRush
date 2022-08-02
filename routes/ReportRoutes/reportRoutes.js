const express = require('express')
const router = express.Router()

const getReport = require('../../components/Reports/report')

router.get('/',getReport)

module.exports = router 