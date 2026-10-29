const categoryPageModel = require('../models/category.model')
const { convertNulls } = require('../utils/convertNulls')
const { validateRequestDevice } = require('./device&app.controller')
const { resolveMediaUrl } = require('../utils/mediaUrl')
const env = require('../config/env')

const BASE_URL = env.staticFileBaseUrl.replace(/\/+$/, '')
const noImagePath = `${BASE_URL}/no_image.png`

// optional "1,5,3,6" style id list; empty/missing means no filter
const parseIdList = (value, field) => {
    if (value === undefined || value === null || String(value).trim() === '') {
        return []
    }

    const ids = String(value).split(',').map((id) => id.trim()).filter(Boolean)

    if (!ids.every((id) => /^[1-9]\d*$/.test(id))) {
        throw new Error(`Invalid ${field}. Send comma separated ids like "1,5,3"`)
    }

    return [...new Set(ids.map(Number))]
}


const categories = async (req, res) => {
    try {
        if (!(await validateRequestDevice(req, res))) return

        const { cat_id, sub_cat_id, prod_make, car_model } = req.body

        let filters
        try {
            filters = {
                categoryIds: parseIdList(cat_id, 'cat_id'),
                subCategoryIds: parseIdList(sub_cat_id, 'sub_cat_id'),
                carMakeIds: parseIdList(prod_make, 'prod_make'),
                carModelIds: parseIdList(car_model, 'car_model'),
            }
        } catch (error) {
            return res.status(200).json({ success: false, message: error.message })
        }

        const categories = await categoryPageModel.categories()

        if (!categories) {
            return res.status(200).json({ success: false, message: 'Categories not found' })
        }

        const [carModels, carMakes] = await Promise.all([
            categoryPageModel.carModels(filters),
            categoryPageModel.carMakes(filters),
        ])

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

        return res.status(200).json(convertNulls({
            success: true,
            categories: categoriesWithImages,
            carModels,
            carMakes,
        }))
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

        const [parentCategory, subCategories, carModels, carMakes] = await Promise.all([
            categoryPageModel.categoryById(categoryId),
            categoryPageModel.subCategory(categoryId),
            categoryPageModel.carModels(),
            categoryPageModel.carMakes(),
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
            carModels,
            carMakes,
        }))
    } catch (error) {
        console.error(error)
        return res.status(200).json(convertNulls({ success: false, message: error.message }))
    }
}

module.exports = { categories, subCategory }