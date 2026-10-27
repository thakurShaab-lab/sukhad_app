const express = require('express')
const { authTokenMiddleware, deviceAuthMiddleware } = require('../middleware/auth.middleware')
const metalDataPageController = require('../controllers/metalsData.controller')

const router = express.Router()

router.post('/metals-stats', authTokenMiddleware, deviceAuthMiddleware, metalDataPageController.metalData)
router.post('/metals-value', authTokenMiddleware, deviceAuthMiddleware, metalDataPageController.calculateMetalVlue)

module.exports = router