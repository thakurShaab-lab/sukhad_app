const categoryPageModel = require('../models/category.model')
const { convertNulls } = require('../utils/convertNulls')
const { validateRequestDevice } = require('./device&app.controller')
const { resolveMediaUrl } = require('../utils/mediaUrl')
const env = require('../config/env')

const BASE_URL = env.staticFileBaseUrl.replace(/\/+$/, '')
const noImagePath = `${BASE_URL}/no_image.png`


const categories = async (req, res) => {
    try {
        if (!(await validateRequestDevice(req, res))) return
        
        const categories = await categoryPageModel.categories()

        if (!categories) {
            return res.status(200).json({ success: false, message: 'Categories not found' })
        }

        // resolve each image once; nested subCategories are the same rows
        const imageUrls = new Map(await Promise.all(
            categories.map(async (category) => [
                category.categoryId,
                await resolveMediaUrl(req, 'product_category', category.categoryImage, noImagePath, BASE_URL),
            ])
        ))

        const withImageUrl = (category) => ({
            ...category,
            categoryImage: imageUrls.get(category.categoryId) ?? noImagePath,
        })

        const categoriesWithImages = categories.map((category) => ({
            ...withImageUrl(category),
            subCategories: category.subCategories.map(withImageUrl),
        }))

        return res.status(200).json(convertNulls({ success: true, categories: categoriesWithImages }))
    } catch (error) {
        console.error(error)
        return res.status(200).json(convertNulls({ success: false, message: error.message }))
    }
}

const subCategory = async (req, res) => {
    try {
        if (!(await validateRequestDevice(req, res))) return

        const { categoryId } = req.body

        if (!categoryId) {
            return res.status(200).json({ success: false, message: 'Category ID is required' })
        }

        const [parentCategory, subCategories] = await Promise.all([
            categoryPageModel.categoryById(categoryId),
            categoryPageModel.subCategory(categoryId),
        ])

        if (!parentCategory) {
            return res.status(200).json({ success: false, message: 'Category not found' })
        }

        if (!subCategories) {
            return res.status(200).json({ success: false, message: 'Sub-categories not found' })
        }

        const parentWithImage = {
            ...parentCategory,
            categoryImage: await resolveMediaUrl(req, 'product_category', parentCategory.categoryImage, noImagePath, BASE_URL),
        }

        const subCategoriesWithImages = await Promise.all(
            subCategories.map(async (subCategory) => ({
                ...subCategory,
                categoryImage: await resolveMediaUrl(req, 'product_category', subCategory.categoryImage, noImagePath, BASE_URL),
                parentCategory: parentWithImage,
            }))
        )

        return res.status(200).json(convertNulls({
            success: true,
            subCategories: subCategoriesWithImages,
        }))
    } catch (error) {
        console.error(error)
        return res.status(200).json(convertNulls({ success: false, message: error.message }))
    }
}

module.exports = { categories, subCategory }