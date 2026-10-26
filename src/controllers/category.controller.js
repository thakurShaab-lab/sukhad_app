const categoryPageModel = require('../models/category.model')
const { convertNulls } = require('../utils/convertNulls')
const { validateRequestDevice } = require('./device&app.controller')


const categories = async (req, res) => {
    try {
        if (!(await validateRequestDevice(req, res))) return
        const categories = await categoryPageModel.categories()

        if (!categories) {
            return res.status(200).json({ success: false, message: 'Categories not found' })
        }

        return res.status(200).json(convertNulls({ success: true, categories }))
    } catch (error) {
        console.error(error)
        return res.status(200).json(convertNulls({ success: false, message: error.message }))
    }
}

const subCategory = async (req, res) => {
    try {
        const { categoryId } = req.body

        if (!(await validateRequestDevice(req, res))) return

        if (!categoryId) {
            return res.status(200).json({ success: false, message: 'Category ID is required' })
        }

        const subCategories = await categoryPageModel.subCategory(categoryId)

        if (!subCategories) {
            return res.status(200).json({ success: false, message: 'Sub-categories not found' })
        }

        return res.status(200).json(convertNulls({ success: true, subCategories }))
    } catch (error) {
        console.error(error)
        return res.status(200).json(convertNulls({ success: false, message: error.message }))
    }
}

module.exports = { categories, subCategory }