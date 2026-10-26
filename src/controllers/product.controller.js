const productModel = require('../models/product.model')
const { resolveMediaUrl } = require('../utils/mediaUrl')
const env = require('../config/env')
const { convertNulls } = require('../utils/convertNulls')
const { validateRequestDevice } = require('./device&app.controller')

const BASE_URL = env.staticFileBaseUrl.replace(/\/+$/, '')
const noImagePath = `${BASE_URL}/no_image.png`


const products = async (req, res) => {
    try {
        const {
            cat_id,
            sub_cat_id,
            prod_make,
            car_model,
            ref_id,
            sort,
        } = req.body

        if (!(await validateRequestDevice(req, res))) return

        const parseId = (value, field) => {
            if (value === undefined) return undefined

            if (
                typeof value !== 'string' ||
                !/^[1-9]\d*$/.test(value) ||
                !Number.isSafeInteger(Number(value))
            ) {
                throw new Error(`Invalid ${field}`)
            }

            return Number(value)
        }

        const categoryId = parseId(cat_id, 'cat_id')
        const subCategoryId = parseId(
            sub_cat_id,
            'sub_cat_id'
        )

        const parseText = (value, field) => {
            if (value === undefined) return undefined

            if (
                typeof value !== 'string' ||
                !value.trim() ||
                value.trim().length > 100
            ) {
                throw new Error(`Invalid ${field}`)
            }

            return value.trim()
        }

        const productMake = parseText(
            prod_make,
            'prod_make'
        )

        const carModel = parseText(
            car_model,
            'car_model'
        )

        const carRefId = parseText(
            ref_id,
            'ref_id'
        )

        if (
            sort !== undefined &&
            !['az', 'za'].includes(sort)
        ) {
            return res.status(400).json({
                success: false,
                message: 'Invalid sort. Use az or za',
            })
        }

        const productList = await productModel.products({
            cat_id: categoryId,
            sub_cat_id: subCategoryId,
            prod_make: productMake,
            car_model: carModel,
            ref_id: carRefId,
            sort,
        })

        if (!productList.length) {
            return res.status(200).json({
                success: false,
                message: 'Products not found',
            })
        }

        const updatedProducts = await Promise.all(
            productList.map(async (product) => ({
                ...product,
                productImage: await resolveMediaUrl(
                    req,
                    'products',
                    product.productImage,
                    noImagePath,
                    BASE_URL
                ),
            }))
        )

        return res.status(200).json(
            convertNulls({
                success: true,
                products: updatedProducts,
            })
        )
    } catch (error) {
        if (error.message.startsWith('Invalid ')) {
            return res.status(400).json(convertNulls({
                success: false,
                message: error.message,
            }))
        }

        console.error('Products API error:', error)

        return res.status(500).json(convertNulls({
            success: false,
            message: 'Unable to fetch products',
        }))
    }
}

const product = async (req, res) => {
    try {
        const { productId } = req.body

        if (!(await validateRequestDevice(req, res))) return

        if (!productId || !Number.isInteger(Number(productId)) || Number(productId) <= 0) {
            return res.status(200).json(convertNulls({
                success: false,
                message: 'Product ID is required'
            }))
        }

        const productData = await productModel.product(Number(productId))

        if (!productData) {
            return res.status(200).json(convertNulls({
                success: false,
                message: 'Product not found'
            }))
        }


        const productImages = await Promise.all(
            (productData.productImage || []).map(media =>
                resolveMediaUrl(
                    req,
                    'products',
                    media,
                    noImagePath,
                    BASE_URL
                )
            )
        )

        if (productImages.length === 0) {
            productImages.push(
                await resolveMediaUrl(
                    req,
                    'products',
                    null,
                    noImagePath,
                    BASE_URL
                )
            )
        }

        const updatedProduct = {
            ...productData,
            productImage: productImages
        }

        return res.status(200).json(convertNulls({
            success: true,
            product: updatedProduct
        }))
    } catch (error) {
        console.error('Product detail API error:', error)

        return res.status(200).json(convertNulls({
            success: false,
            message: error.message
        }))
    }
}

const searchProduct = async (req, res) => {
    try {
        const {
            ref_id,
            prod_code,
            car_model,
            cat_id,
            sub_cat_id
        } = req.body

        if (!(await validateRequestDevice(req, res))) return

        for (const [key, value] of [
            ['cat_id', cat_id],
            ['sub_cat_id', sub_cat_id]
        ]) {
            if (
                value !== undefined &&
                (String(value).trim() === '' ||
                    !Number.isInteger(Number(value)) ||
                    Number(value) <= 0)
            ) {
                return res.status(200).json({
                    success: false,
                    message: `${key} must be a positive integer`
                })
            }
        }

        const products = await productModel.searchProduct({
            ref_id,
            prod_code,
            car_model,
            cat_id,
            sub_cat_id
        })

        if (!products.length) {
            return res.status(200).json({
                success: false,
                message: 'Products not found'
            })
        }

        return res.status(200).json(convertNulls({
            success: true,
            count: products.length,
            products
        }))
    } catch (error) {
        console.error('Product search error:', error)

        return res.status(200).json(convertNulls({
            success: false,
            message: error.message
        }))
    }
}

module.exports = { products, product, searchProduct }