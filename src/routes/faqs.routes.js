const express = require('express')
const { authTokenMiddleware, deviceAuthMiddleware } = require('../middleware/auth.middleware')

const faqController = require('../controllers/faqs.controllers')

const router = express.Router()

router.post(
    '/faqs',
    authTokenMiddleware,
    deviceAuthMiddleware,
    faqController.getFaqs
)

module.exports = router