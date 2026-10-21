
const galleryModel = require('../models/gallery.model')
const { convertNulls } = require('../utils/convertNulls')
const { resolveMediaUrl } = require('../utils/mediaUrl')
const env = require('../config/env')
const { validateRequestDevice } = require('./device&app.controller')


const BASE_URL = env.staticFileBaseUrl.replace(/\/+$/, '')
const noImagePath = `${BASE_URL}/no_image.png`

const gallery = async (req, res) => {
    try {
        const type = String(req.query.type || '').trim().toLowerCase()
        const id = req.query.id

        if (!(await validateRequestDevice(req, res))) return

        if (!['images', 'videos'].includes(type)) {
            return res.status(400).json({
                success: false,
                message: 'Type must be either images or videos'
            })
        }

        if (id === undefined) {
            const albums = await galleryModel.getAlbums(type)

            const categories = await Promise.all(
                albums.map(async (album) => ({
                    ...album,
                    albumImage: await resolveMediaUrl(
                        req,
                        'albums',
                        album.albumImage,
                        noImagePath,
                        BASE_URL
                    )
                }))
            )

            return res.status(200).json(
                convertNulls({
                    success: true,
                    type,
                    categories
                })
            )
        }

        const categoryId = Number(id)

        if (
            !Number.isInteger(categoryId) ||
            categoryId <= 0
        ) {
            return res.status(400).json({
                success: false,
                message: 'A valid category ID is required'
            })
        }

        if (type === 'images') {
            const images = await galleryModel.getGalleryImages(categoryId)

            const media = await Promise.all(
                images.map(async (item) => ({
                    ...item,
                    galleryImage: await resolveMediaUrl(
                        req,
                        'gallery',
                        item.galleryImage,
                        noImagePath,
                        BASE_URL
                    )
                }))
            )

            return res.status(200).json(
                convertNulls({
                    success: true,
                    type,
                    categoryId,
                    images: media
                })
            )
        }

        const videos = await galleryModel.getGalleryVideos(categoryId)

        const media = await Promise.all(
            videos.map(async (item) => ({
                ...item,
                videoImage: await resolveMediaUrl(
                    req,
                    'videos',
                    item.videoImage,
                    noImagePath,
                    BASE_URL
                )
            }))
        )

        return res.status(200).json(
            convertNulls({
                success: true,
                type,
                categoryId,
                videos: media
            })
        )
    } catch (error) {
        console.error('Gallery API error:', error)

        return res.status(500).json({
            success: false,
            message: 'Unable to fetch gallery data'
        })
    }
}

module.exports = { gallery }