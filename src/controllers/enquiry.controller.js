const enquiryModel = require('../models/enquiry.model')
const { convertNulls } = require('../utils/convertNulls')
const { validateRequestDevice } = require('./device&app.controller')

const postEnquiry = async (req, res) => {
    try {
        if (!(await validateRequestDevice(req, res))) return

        const {
            type,
            product_id,
            entity_title,
            full_name,
            mobile_number,
            enquiry,
            email
        } = req.body || {}

        let enquiryType

        if (type !== undefined && type !== null && type !== '') {
            enquiryType = Number(type)

            if (![1, 2].includes(enquiryType)) {
                return res.status(200).json({
                    success: false,
                    message: 'Invalid enquiry type'
                })
            }
        }

        const hasProductId =
            product_id !== undefined && product_id !== null && product_id !== ''

        if (enquiryType === 1 && !hasProductId) {
            return res.status(200).json({
                success: false,
                message: 'Product ID is required'
            })
        }

        let productId
        let product_name

        if (hasProductId) {
            if (!/^[1-9]\d*$/.test(String(product_id))) {
                return res.status(200).json({
                    success: false,
                    message: 'A valid product ID is required'
                })
            }

            productId = Number(product_id)

            if (!Number.isSafeInteger(productId)) {
                return res.status(200).json({
                    success: false,
                    message: 'Invalid product ID'
                })
            }

            const exists = await enquiryModel.productExists(productId)

            if (!exists) {
                return res.status(200).json({
                    success: false,
                    message: 'Product not found'
                })
            } else {
                product_name = exists.productTitle
            }
        }

        let entityTitle

        if (entity_title !== undefined && entity_title !== null && entity_title !== '') {
            if (
                typeof entity_title !== 'string' ||
                !entity_title.trim() ||
                entity_title.trim().length > 80 ||
                !/^[\p{L}\p{M}][\p{L}\p{M}\s.'’-]*$/u.test(entity_title.trim())
            ) {
                return res.status(200).json({
                    success: false,
                    message: 'Enter a valid Enquiry Title (maximum 80 characters)'
                })
            }

            entityTitle = entity_title.trim()
        }

        let firstName
        let lastName

        if (full_name !== undefined && full_name !== null && full_name !== '') {
            if (
                typeof full_name !== 'string' ||
                !full_name.trim() ||
                full_name.trim().length > 80 ||
                !/^[\p{L}\p{M}][\p{L}\p{M}\s.'’-]*$/u.test(full_name.trim())
            ) {
                return res.status(200).json({
                    success: false,
                    message: 'Enter a valid Full Name (maximum 80 characters)'
                })
            }

            const nameParts = full_name.trim().split(/\s+/)
            firstName = nameParts.shift()
            lastName = nameParts.join(' ')

            if (firstName.length > 30 || lastName.length > 50) {
                return res.status(200).json({
                    success: false,
                    message: 'First name must be at most 30 characters and last name at most 50 characters'
                })
            }
        }

        let mobile

        if (mobile_number !== undefined && mobile_number !== null && mobile_number !== '') {
            if (
                typeof mobile_number !== 'string' &&
                typeof mobile_number !== 'number'
            ) {
                return res.status(200).json({
                    success: false,
                    message: 'A valid mobile number is required'
                })
            }

            mobile = String(mobile_number).trim()

            if (
                mobile.length > 20 ||
                !/^\+?[0-9()\s-]+$/.test(mobile) ||
                mobile.replace(/\D/g, '').length < 7 ||
                mobile.replace(/\D/g, '').length > 15
            ) {
                return res.status(200).json({
                    success: false,
                    message: 'Enter a valid mobile number'
                })
            }
        }

        let emailAddress

        if (email !== undefined && email !== null && email !== '') {
            if (
                typeof email !== 'string' ||
                email.trim().length > 150 ||
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
            ) {
                return res.status(200).json({
                    success: false,
                    message: 'A valid email address is required'
                })
            }

            emailAddress = email.trim()
        }

        let message

        if (enquiry !== undefined && enquiry !== null && enquiry !== '') {
            if (
                typeof enquiry !== 'string' ||
                !enquiry.trim() ||
                enquiry.trim().length > 5000
            ) {
                return res.status(200).json({
                    success: false,
                    message: 'Enquiry must not exceed 5000 characters'
                })
            }

            message = enquiry.trim()
        }

        const enquiryData = {
            ...(productId !== undefined && { entityId: productId }),
            ...(enquiryType !== undefined && { type: enquiryType }),
            ...(entityTitle !== undefined && { entityTitle }),
            ...(firstName !== undefined && { firstName }),
            ...(lastName !== undefined && { lastName }),
            ...(emailAddress !== undefined && { email: emailAddress }),
            ...(mobile !== undefined && { mobileNumber: mobile }),
            ...(message !== undefined && { message }),
            status: '1',
            receiveDate: new Date()
                .toISOString()
                .slice(0, 19)
                .replace('T', ' ')
        }

        const result = await enquiryModel.createEnquiry(enquiryData)

        if (type === 2) {
            return res.status(200).json(
                convertNulls({
                    success: true,
                    message: 'Enquiry Sent',
                    productName: product_name,
                    enquiryId: result[0].insertId
                })
            )
        }
        if (type === 1) {
            return res.status(200).json(
                convertNulls({
                    success: true,
                    message: 'Enquiry Submitted',
                    enquiryId: result[0].insertId
                })
            )
        }

    } catch (error) {
        console.error('Post enquiry API error:', error)

        return res.status(200).json(
            convertNulls({
                success: false,
                message: 'Unable to submit enquiry'
            })
        )
    }
}


module.exports = { postEnquiry }