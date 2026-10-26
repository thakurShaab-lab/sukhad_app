const fs = require('fs/promises')
const path = require('path')
const crypto = require('crypto')
const testimonialsModel = require('../models/testimonials.model')
const { convertNulls } = require('../utils/convertNulls')
const { resolveMediaUrl } = require('../utils/mediaUrl')
const env = require('../config/env')
const { validateRequestDevice } = require('./device&app.controller')

const BASE_URL = env.staticFileBaseUrl.replace(/\/+$/, '')
const noImagePath = `${BASE_URL}/no_image.png`

const testimonialUploadDir = path.join(env.uploadDir, 'testimonials')

const listTestimonials = async (req, res) => {
    try {
        if (!(await validateRequestDevice(req, res))) return

        const testimonials = await testimonialsModel.getTestimonials()

        const data = await Promise.all(
            testimonials.map(async (item) => ({
                ...item,
                photo: item.photo
                    ? await resolveMediaUrl(
                        req,
                        'testimonials',
                        item.photo,
                        noImagePath,
                        BASE_URL
                    )
                    : ''
            }))
        )

        return res.status(200).json(
            convertNulls({
                success: true,
                message: 'Testimonials fetched successfully',
                data
            })
        )
    } catch (error) {
        console.error('List testimonials API error:', error)

        return res.status(500).json({
            success: false,
            message: 'Unable to fetch testimonials'
        })
    }
}

const createTestimonial = async (req, res) => {
    let savedFilePath

    try {
        const {
            testimonial_title,
            poster_name,
            friendly_url,
            email,
            company,
            testimonial_description
        } = req.body || {}


        if (!(await validateRequestDevice(req, res))) return

        if (
            friendly_url !== undefined &&
            friendly_url !== null &&
            (
                typeof friendly_url !== 'string' ||
                friendly_url.trim().length > 100
            )
        ) {
            return res.status(400).json({
                success: false,
                message: 'friendly_url must not exceed 100 characters'
            })
        }

        const optionalFields = [
            {
                value: testimonial_title,
                name: 'testimonial_title',
                max: 150
            },
            {
                value: poster_name,
                name: 'poster_name',
                max: 50
            },
            {
                value: email,
                name: 'email',
                max: 80
            },
            {
                value: company,
                name: 'company',
                max: 200
            }
        ]

        for (const field of optionalFields) {
            if (field.value !== undefined && field.value !== null) {
                if (
                    typeof field.value !== 'string' ||
                    field.value.length > field.max
                ) {
                    return res.status(400).json({
                        success: false,
                        message: `${field.name} must not exceed ${field.max} characters`
                    })
                }
            }
        }

        if (
            email &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
        ) {
            return res.status(400).json({
                success: false,
                message: 'Enter a valid email address'
            })
        }

        if (
            testimonial_description !== undefined &&
            testimonial_description !== null &&
            typeof testimonial_description !== 'string'
        ) {
            return res.status(400).json({
                success: false,
                message: 'testimonial_description must be a string'
            })
        }

        let photo = null

        if (req.file) {
            await fs.mkdir(testimonialUploadDir, {
                recursive: true
            })

            const extensionByMime = {
                'image/jpeg': '.jpg',
                'image/png': '.png',
                'image/webp': '.webp'
            }

            const extension = extensionByMime[req.file.mimetype]

            if (!extension) {
                return res.status(400).json({
                    success: false,
                    message: 'Unsupported image format'
                })
            }

            photo = `${crypto.randomUUID()}${extension}`
            savedFilePath = path.join(testimonialUploadDir, photo)

            await fs.writeFile(savedFilePath, req.file.buffer)
        }

        const testimonialData = {
            friendlyUrl: friendly_url,
            status: 1,
            postedDate: new Date()
                .toISOString()
                .slice(0, 19)
                .replace('T', ' '),

            ...(testimonial_title !== undefined &&
                testimonial_title !== null && {
                testimonialTitle: testimonial_title.trim()
            }),

            ...(poster_name !== undefined &&
                poster_name !== null && {
                posterName: poster_name.trim()
            }),

            ...(email !== undefined &&
                email !== null && {
                email: email.trim()
            }),

            ...(company !== undefined &&
                company !== null && {
                company: company.trim()
            }),

            ...(testimonial_description !== undefined &&
                testimonial_description !== null && {
                testimonialDescription: testimonial_description
            }),

            ...(photo && { photo })
        }

        const testimonialId =
            await testimonialsModel.createTestimonial(testimonialData)

        return res.status(201).json(
            convertNulls({
                success: true,
                message: 'Testimonial created successfully',
                data: {
                    testimonialId,
                    ...testimonialData,
                    photo: photo
                        ? await resolveMediaUrl(
                            req,
                            'testimonials',
                            photo,
                            noImagePath,
                            BASE_URL
                        )
                        : ''
                }
            })
        )
    } catch (error) {
        if (savedFilePath) {
            await fs.unlink(savedFilePath).catch(() => { })
        }

        console.error('Create testimonial API error:', error)

        return res.status(500).json({
            success: false,
            message: 'Unable to create testimonial'
        })
    }
}

module.exports = {
    listTestimonials,
    createTestimonial
}