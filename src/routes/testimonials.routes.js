const express = require('express')
const { authTokenMiddleware, deviceAuthMiddleware } = require('../middleware/auth.middleware')
const testimonials = require('../controllers/testimonials.controller')
const upload = require('../utils/imageUpload')

const router = express.Router()

router.post('/list', authTokenMiddleware, deviceAuthMiddleware, testimonials.listTestimonials)
router.post('/create', authTokenMiddleware, deviceAuthMiddleware, upload.single('photo'), testimonials.createTestimonial)

module.exports = router