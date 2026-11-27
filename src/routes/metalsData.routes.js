const express = require('express')
const { authTokenMiddleware, deviceAuthMiddleware } = require('../middleware/auth.middleware')
const metalDataPageController = require('../controllers/metalsData.controller')
const metalCalculatorController = require('../controllers/metalCalculator.controller')

const router = express.Router()

router.post('/metals-stats', authTokenMiddleware, deviceAuthMiddleware, metalDataPageController.metalData)
router.post('/metals-value', authTokenMiddleware, deviceAuthMiddleware, metalDataPageController.calculateMetalVlue)
router.post('/metal-price-calculator', authTokenMiddleware, deviceAuthMiddleware, metalCalculatorController.calculateMetalPrice)
router.post('/metal-price-setting', authTokenMiddleware, deviceAuthMiddleware, metalCalculatorController.saveMetalPriceSetting)
router.post('/metal-specifications', authTokenMiddleware, deviceAuthMiddleware, metalCalculatorController.getMetalPriceCalculations)

module.exports = router