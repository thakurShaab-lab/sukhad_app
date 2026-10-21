
const { eq, and, asc } = require('drizzle-orm')
const db = require('../config/drizzle')
const { wlGallery } = require('../schema/wl-gallery')
const { wlAlbums } = require('../schema/wl-albums')
const { wlVideos } = require('../schema/wl-videos')

const getAlbums = async (type) => {
    const albumType = type === 'images' ? 0 : 1

    return await db
        .select()
        .from(wlAlbums)
        .where(
            and(
                eq(wlAlbums.status, '1'),
                eq(wlAlbums.albumType, albumType),
                eq(wlAlbums.parentId, 0)
            )
        )
        .orderBy(asc(wlAlbums.sortOrder))
}

const getGalleryImages = async (categoryId) => {
    return await db
        .select()
        .from(wlGallery)
        .where(
            and(
                eq(wlGallery.status, '1'),
                eq(wlGallery.categoryId, categoryId)
            )
        )
        .orderBy(asc(wlGallery.sortOrder))
}

const getGalleryVideos = async (categoryId) => {
    return await db
        .select()
        .from(wlVideos)
        .where(
            and(
                eq(wlVideos.status, 1),
                eq(wlVideos.categoryId, categoryId)
            )
        )
        .orderBy(asc(wlVideos.sortOrder))
}

module.exports = {
    getAlbums,
    getGalleryImages,
    getGalleryVideos
}