const express = require('express')
const { authTokenMiddleware, deviceAuthMiddleware } = require('../middleware/auth.middleware')
const categoryPageController = require('../controllers/category.controller')

const router = express.Router()

router.post('/list', authTokenMiddleware, deviceAuthMiddleware, categoryPageController.categories)
router.post('/sub-cat-details', authTokenMiddleware, deviceAuthMiddleware, categoryPageController.subCategory)

module.exports = router