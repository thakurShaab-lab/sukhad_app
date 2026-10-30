const homeModel = require('../models/home.model')
const { resolveMediaUrl } = require('../utils/mediaUrl')
const env = require('../config/env')
const { convertNulls } = require('../utils/convertNulls')
const { getMetalRates } = require('../utils/metalData')

const getHomePage = async (req, res) => {
    try {
        const { app_id, device_id, app_type } = req.body

        if (app_id || device_id || app_type) {
            if (!app_id || !device_id) {
                return res.status(400).json({
                    success: false,
                    message: 'app_id, and device_id are required.',
                })
            }
        }

        const BASE_URL = env.staticFileBaseUrl.replace(/\/+$/, '')

        const noImagePath = `${BASE_URL}/no_image.png`

        const homePageData = await homeModel.getHomePageData()

        homePageData.banners = await Promise.all(
            homePageData.banners.map(async (banner) => ({
                ...banner,
                buttonType: {
                    1: 'Enquire now',
                    2: 'Our services',
                    3: 'Check rates',
                }[banner.buttonType] || '',
                image_url: await resolveMediaUrl(
                    req,
                    'header_images',
                    banner.bannerImage,
                    noImagePath,
                    BASE_URL
                ),
            }))
        )

        homePageData.featuredProducts = await Promise.all(
            homePageData.featuredProducts.map(async (product) => ({
                ...product,
                image_url: await resolveMediaUrl(
                    req,
                    'products',
                    product.productImage,
                    noImagePath,
                    BASE_URL
                ),
            }))
        )

        homePageData.partners = await Promise.all(
            homePageData.partners.map(async (partner) => ({
                ...partner,
                image_url: await resolveMediaUrl(
                    req,
                    'partners',
                    partner.partnerImage,
                    noImagePath,
                    BASE_URL
                ),
            }))
        )

        homePageData.testimonials = await Promise.all(
            homePageData.testimonials.map(async (testimonial) => ({
                ...testimonial,
                image_url: await resolveMediaUrl(
                    req,
                    'testimonials',
                    testimonial.photo,
                    noImagePath,
                    BASE_URL
                ),
            }))
        )

        await homeModel.saveCustomerDeviceDetails({
            app_id: String(app_id).trim(),
            device_id: String(device_id).trim(),
            app_type: String(app_type).trim(),
        })

        const metalRates = await getMetalRates()

        return res.status(200).json(convertNulls({
            success: true,
            message: 'Home page data retrieved successfully.',
            data: {
                metalRates,
                ...homePageData,
            }
        }))
    } catch (error) {
        res.status(200).json({ message: error.message, success: false })
    }
}

module.exports = { getHomePage }