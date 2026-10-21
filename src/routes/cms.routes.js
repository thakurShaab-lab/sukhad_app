const express = require('express')
const { authTokenMiddleware, deviceAuthMiddleware } = require('../middleware/auth.middleware')
const cmsPageController = require('../controllers/cms.controller')

const router = express.Router()

router.post('/list', authTokenMiddleware, deviceAuthMiddleware, cmsPageController.getCmsPages)
router.post('/detail', authTokenMiddleware, deviceAuthMiddleware, cmsPageController.getCmsPageById)
router.post('/about-us', authTokenMiddleware, deviceAuthMiddleware, cmsPageController.aboutUs)

module.exports = router