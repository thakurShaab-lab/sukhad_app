const { eq, and, sql, or, like, asc, desc, inArray } = require('drizzle-orm')
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

        // category_links holds the product's full chain (e.g. "2,1" = sub category 2 of category 1)
        const linkedToAny = (ids) => or(
            inArray(wlProducts.categoryId, ids),
            ...ids.map((id) =>
                sql`FIND_IN_SET(${String(id)}, ${wlProducts.categoryLinks}) > 0`
            )
        )

        // cat_id / sub_cat_id are id lists: any of the categories AND any of the sub categories
        if (cat_id?.length) {
            conditions.push(linkedToAny(cat_id))
        }

        if (sub_cat_id?.length) {
            conditions.push(linkedToAny(sub_cat_id))
        }

        // prod_make / car_model are product id lists from the carMakes / carModels arrays
        if (prod_make?.length) {
            conditions.push(
                inArray(wlProducts.productId, prod_make)
            )
        }

        if (car_model?.length) {
            conditions.push(
                inArray(wlProducts.productId, car_model)
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

        return query
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