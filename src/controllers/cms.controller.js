const cmsPageModel = require('../models/cms.model')
const { resolveMediaUrl } = require('../utils/mediaUrl')
const env = require('../config/env')
const { convertNulls } = require('../utils/convertNulls')
const { validateRequestDevice } = require('./device&app.controller')
const {formatHtml} = require('../utils/formatHtml')

const normalizePageName = (value) => {
    return value
        .normalize('NFKC')
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '')
}

const BASE_URL = env.staticFileBaseUrl.replace(/\/+$/, '')

const noImagePath = `${BASE_URL}/no_image.png`

const getCmsPages = async (req, res) => {
    try {
        if (!(await validateRequestDevice(req, res))) return

        const { page } = req.body

        if (
            typeof page !== 'string' ||
            page.trim().length === 0
        ) {
            return res.status(200).json({
                success: false,
                message: 'The search query parameter is required.',
            })
        }

        const search = page.trim()

        if (search.length > 100) {
            return res.status(200).json({
                success: false,
                message: 'Search must not exceed 100 characters.',
            })
        }

        const normalizedSearch = normalizePageName(search)

        if (!normalizedSearch) {
            return res.status(200).json({
                success: false,
                message: 'Search must contain at least one letter or digit.',
            })
        }

        const pages =
            await cmsPageModel.findActivePagesByName(normalizedSearch)

        const updatePages = {
            ...pages,
            pageDescription: pages.pageDescription
                ? pages.pageDescription.replace(
                    /https?:\/\/localhost/gi,
                    BASE_URL
                )
                : pages.pageDescription,
            pageImage: await resolveMediaUrl(
                req,
                'cms',
                pages.pageImage,
                noImagePath,
                BASE_URL
            )
        }

        return res.status(200).json(convertNulls({
            success: true,
            message: 'CMS pages retrieved successfully',
            data: updatePages,
        }))
    } catch (error) {
        console.error('Failed to retrieve CMS pages:', error)

        return res.status(200).json(convertNulls({
            success: false,
            message: 'An internal server error occurred.',
        }))
    }
}

const getCmsPageById = async (req, res) => {
    try {
        if (!(await validateRequestDevice(req, res))) return

        const { id } = req.body

        if (
            !/^[1-9]\d*$/.test(id) ||
            !Number.isSafeInteger(Number(id))
        ) {
            return res.status(200).json({
                success: false,
                message: 'A valid numeric CMS page ID is required.',
            })
        }

        const pageId = Number(id)
        const page = await cmsPageModel.findActivePageById(pageId)

        if (!page) {
            return res.status(200).json({
                success: false,
                message: 'CMS page not found',
            })
        }

        const updatedPage = {
            ...page,
            ...(page.pageDescription && {
                pageDescription: page.pageDescription.replace(
                    /https?:\/\/localhost/gi,
                    BASE_URL
                ),
            }),
            ...(page.pageImage && {
                pageImage: await resolveMediaUrl(
                    req,
                    'cms',
                    page.pageImage,
                    noImagePath,
                    BASE_URL
                )
            }),
        }

        return res.status(200).json(convertNulls({
            success: true,
            message: 'CMS page retrieved successfully',
            data: updatedPage,
        }))
    } catch (error) {
        console.error('Failed to retrieve CMS page:', error)

        return res.status(200).json(convertNulls({
            success: false,
            message: 'An internal server error occurred.',
        }))
    }
}

const aboutUs = async (req, res) => {
    try {
        if (!(await validateRequestDevice(req, res))) return

        const { page } = req.body || 'aboutus'

        if (
            typeof page !== 'string' ||
            !page.trim() ||
            page.length > 50
        ) {
            return res.status(400).json({
                success: false,
                message: 'A valid page name is required'
            })
        }

        const normalizedSearch = normalizePageName(page.trim())
        const result = await cmsPageModel.aboutUs(normalizedSearch)

        if (!result.aboutUs) {
            return res.status(200).json(
                convertNulls({
                    success: false,
                    message: 'About Us page not found'
                })
            )
        }

        const response = {
            success: true,
            data: {
                ...result.aboutUs,
                pageDescription: formatHtml(result.aboutUs.pageDescription),
                pageImage: await resolveMediaUrl(
                    req,
                    'cms',
                    result.aboutUs.pageImage,
                    noImagePath,
                    BASE_URL
                )
            },
            aboutChoose: result.aboutChoose,
            expertise: await Promise.all(
                result.expertise.map(async (item) => {
                    const imageUrl = await resolveMediaUrl(
                        req,
                        'expertise',
                        item.expertiseImage,
                        noImagePath,
                        BASE_URL
                    )

                    return {
                        ...item,
                        expertiseImage: imageUrl
                    }
                })
            ),
            convertreData: 'Catalytic converters contain a precious metal catalyst that converts harmful gases from the engine into less harmful emissions.'
        }

        return res.status(200).json(convertNulls(response))
    } catch (error) {
        console.error('About Us API error:', error)

        return res.status(500).json({
            success: false,
            message: 'Unable to fetch About Us information'
        })
    }
}

module.exports = {
    getCmsPages,
    getCmsPageById,
    aboutUs
}