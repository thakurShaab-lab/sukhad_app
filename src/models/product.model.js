const { eq, and, sql, or, like, asc, desc } = require('drizzle-orm')
const { alias } = require('drizzle-orm/mysql-core')
const db = require('../config/drizzle')
const { wlProducts } = require('../schema/wl-products')
const { wlProductsMedia } = require('../schema/wl-products-media')
const { wlCategories } = require('../schema/wl-categories')


const category = alias(wlCategories, 'category') 
const subCategory = alias(wlCategories, 'subcategory')

const products = async ({
    cat_id,
    sub_cat_id,
    prod_make,
    car_model,
    ref_id,
    sort,
} = {}) => {
    try {
        const conditions = [
            eq(wlProducts.status, '1'),
        ]

        if (cat_id !== undefined && cat_id !== null) {
            conditions.push(
                eq(wlProducts.categoryId, cat_id)
            )
        }

        if (sub_cat_id !== undefined && sub_cat_id !== null) {
            conditions.push(
                sql`FIND_IN_SET(
                    ${String(sub_cat_id)},
                    ${wlProducts.categoryLinks}
                ) > 0`
            )
        }

        if (prod_make !== undefined && prod_make !== null) {
            conditions.push(
                eq(wlProducts.productMake, prod_make)
            )
        }

        if (car_model !== undefined && car_model !== null) {
            conditions.push(
                eq(wlProducts.productModel, car_model)
            )
        }

        if (ref_id !== undefined && ref_id !== null) {
            conditions.push(
                eq(wlProducts.referenceId, ref_id)
            )
        }

        let orderBy = []

        if (sort === 'az') {
            orderBy = [
                asc(wlProducts.productTitle),
                asc(wlProducts.productId),
            ]
        } else if (sort === 'za') {
            orderBy = [
                desc(wlProducts.productTitle),
                asc(wlProducts.productId),
            ]
        }

        let query = db
            .select({
                productId: wlProducts.productId,
                categoryId: wlProducts.categoryId,
                categoryLinks: wlProducts.categoryLinks,
                productTitle: wlProducts.productTitle,
                productCode: wlProducts.productCode,
                referenceId: wlProducts.referenceId,
                productMake: wlProducts.productMake,
                productModel: wlProducts.productModel,
                year: wlProducts.year,
                friendlyUrl: wlProducts.friendlyUrl,
                productAlt: wlProducts.productAlt,
                productDescription: wlProducts.productDescription,
                productVideo: wlProducts.productVideo,
                isBest: wlProducts.isBest,
                isHot: wlProducts.isHot,
                isNew: wlProducts.isNew,
                isFeatured: wlProducts.isFeatured,
                isRecent: wlProducts.isRecent,
                productType: wlProducts.productType,
                productImage: wlProductsMedia.media,
            })
            .from(wlProducts)
            .leftJoin(
                wlProductsMedia,
                and(
                    eq(
                        wlProducts.productId,
                        wlProductsMedia.productId
                    ),
                    eq(wlProductsMedia.mediaType, 'photo'),
                    eq(wlProductsMedia.isDefault, 'Y')
                )
            )
            .where(and(...conditions))

        if (orderBy.length > 0) {
            query = query.orderBy(...orderBy)
        }

        return await query
    } catch (error) {
        console.error('Error fetching products:', error)
        throw error
    }
}

const product = async (productId) => {
    const result = await db
        .select({
            productId: wlProducts.productId,
            categoryId: wlProducts.categoryId,
            categoryLinks: wlProducts.categoryLinks,
            categoryName: category.categoryName,
            subCategoryName: subCategory.categoryName,
            productTitle: wlProducts.productTitle,
            productCode: wlProducts.productCode,
            referenceId: wlProducts.referenceId,
            productMake: wlProducts.productMake,
            productModel: wlProducts.productModel,
            year: wlProducts.year,
            friendlyUrl: wlProducts.friendlyUrl,
            productAlt: wlProducts.productAlt,
            productDescription: wlProducts.productDescription,
            productVideo: wlProducts.productVideo,
            isBest: wlProducts.isBest,
            isHot: wlProducts.isHot,
            isNew: wlProducts.isNew,
            isFeatured: wlProducts.isFeatured,
            isRecent: wlProducts.isRecent,
            productType: wlProducts.productType,
            productImage: wlProductsMedia.media
        })
        .from(wlProducts)
        .leftJoin(
            category,
            eq(category.categoryId, wlProducts.categoryId)
        )
        .leftJoin(
            subCategory,
            and(
                sql`FIND_IN_SET(
                    CAST(${subCategory.categoryId} AS CHAR),
                    ${wlProducts.categoryLinks}
                ) > 0`,
                eq(subCategory.parentId, category.categoryId)
            )
        )
        .leftJoin(
            wlProductsMedia,
            and(
                eq(wlProductsMedia.productId, wlProducts.productId),
                eq(wlProductsMedia.mediaType, 'photo')
            )
        )
        .where(
            and(
                eq(wlProducts.productId, Number(productId)),
                eq(wlProducts.status, '1')
            )
        )

    if (!result.length) return null

    const first = result[0]

    return {
        ...first,
        productImage: [
            ...new Set(
                result
                    .map(row => row.productImage)
                    .filter(Boolean)
            )
        ]
    }
}

const searchProduct = async ({
    ref_id,
    prod_code,
    car_model,
    cat_id,
    sub_cat_id
}) => {
    const conditions = [
        eq(wlProducts.status, 1)
    ]

    if (ref_id?.trim()) {
        conditions.push(
            like(wlProducts.referenceId, `%${ref_id.trim()}%`)
        )
    }

    if (prod_code?.trim()) {
        conditions.push(
            like(wlProducts.productCode, `%${prod_code.trim()}%`)
        )
    }

    if (car_model?.trim()) {
        conditions.push(
            like(wlProducts.productModel, `%${car_model.trim()}%`)
        )
    }

    if (cat_id !== undefined && cat_id !== null && String(cat_id).trim() !== '') {
        conditions.push(
            eq(wlProducts.categoryId, Number(cat_id))
        )
    }

    if (
        sub_cat_id !== undefined &&
        sub_cat_id !== null &&
        String(sub_cat_id).trim() !== ''
    ) {
        conditions.push(
            like(wlProducts.categoryLinks, `%${sub_cat_id}%`)
        )
    }

    const result = await db
        .select({
            productId: wlProducts.productId,
            categoryId: wlProducts.categoryId,
            categoryLinks: wlProducts.categoryLinks,
            productTitle: wlProducts.productTitle,
            productCode: wlProducts.productCode,
            referenceId: wlProducts.referenceId,
            productMake: wlProducts.productMake,
            productModel: wlProducts.productModel,
            year: wlProducts.year,
            friendlyUrl: wlProducts.friendlyUrl,
            productAlt: wlProducts.productAlt,
            productDescription: wlProducts.productDescription,
            productVideo: wlProducts.productVideo,
            isBest: wlProducts.isBest,
            isHot: wlProducts.isHot,
            isNew: wlProducts.isNew,
            isFeatured: wlProducts.isFeatured,
            isRecent: wlProducts.isRecent,
            productType: wlProducts.productType,
            productImage: wlProductsMedia.media,
        })
        .from(wlProducts)
        .leftJoin(
            wlProductsMedia,
            and(
                eq(wlProducts.productId, wlProductsMedia.productId),
                eq(wlProductsMedia.mediaType, 'photo'),
                eq(wlProductsMedia.isDefault, 'Y')
            )
        )
        .where(and(...conditions))

    return result
}


module.exports = { products, product, searchProduct }