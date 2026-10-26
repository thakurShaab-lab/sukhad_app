const express = require('express')
const { authTokenMiddleware, deviceAuthMiddleware } = require('../middleware/auth.middleware')
const homePageController = require('../controllers/home.controller')

const router = express.Router()

router.post('/home', authTokenMiddleware, homePageController.getHomePage)

module.exports = router