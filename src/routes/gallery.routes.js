const express = require('express')
const { authTokenMiddleware, deviceAuthMiddleware } = require('../middleware/auth.middleware')
const gallery = require('../controllers/gallery.controller')

const router = express.Router()

router.post('/gallery', authTokenMiddleware, deviceAuthMiddleware, gallery.gallery)

module.exports = router