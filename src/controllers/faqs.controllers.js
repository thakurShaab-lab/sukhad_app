const faqModel = require('../models/faqs.model')
const { validateRequestDevice } = require('../controllers/device&app.controller')
const { convertNulls } = require('../utils/convertNulls')

const getFaqs = async (req, res) => {
    try {
        if (!(await validateRequestDevice(req, res))) return

        const faqs = await faqModel.getFaqs()

        return res.status(200).json(convertNulls({
            success: true,
            message: 'FAQs fetched successfully',
            data: faqs
        }))
    } catch (error) {
        console.error('Get FAQs API error:', error)

        return res.status(500).json({
            success: false,
            message: 'Unable to fetch FAQs'
        })
    }
}

module.exports = {
    getFaqs
}