const express = require('express')
const { authTokenMiddleware, deviceAuthMiddleware } = require('../middleware/auth.middleware')
const productPageController = require('../controllers/product.controller')

const router = express.Router()

router.post('/list', authTokenMiddleware, deviceAuthMiddleware, productPageController.products)
router.post('/detail', authTokenMiddleware, deviceAuthMiddleware, productPageController.product)
// router.post('/category', authTokenMiddleware, deviceAuthMiddleware, productPageController.productByCategory)
router.post('/search', authTokenMiddleware, deviceAuthMiddleware, productPageController.searchProduct)

module.exports = router