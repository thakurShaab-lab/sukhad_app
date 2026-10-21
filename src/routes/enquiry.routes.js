const express = require('express')
const { authTokenMiddleware, deviceAuthMiddleware } = require('../middleware/auth.middleware')
const enquiryPageController = require('../controllers/enquiry.controller')

const router = express.Router()

router.post('/enquiry', authTokenMiddleware, deviceAuthMiddleware, enquiryPageController.postEnquiry)

module.exports = router