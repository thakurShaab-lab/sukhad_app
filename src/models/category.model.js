const { eq, and, or, sql, asc, inArray } = require('drizzle-orm')
const db = require('../config/drizzle')
const { wlCategories } = require('../schema/wl-categories')
const { wlProducts } = require('../schema/wl-products')
const { formatHtml } = require('../utils/formatHtml')

const categories = async () => {
    const categories = await db.select()
        .from(wlCategories)
        .where(eq(wlCategories.status, '1'))
        .orderBy(wlCategories.sortOrder)

    const result = categories.map((category) => ({
        ...category,
        
        subCategories: categories.filter(
            (subCategory) =>
                Number(subCategory.parentId) ===
                Number(category.categoryId)
        ),
    }))

    return result
}

const subCategory = async (categoryId) => {
    const categories = await db.select()
        .from(wlCategories)
        .where(and(
            eq(wlCategories.parentId, categoryId),
            eq(wlCategories.status, '1')
        ))
        .orderBy(wlCategories.sortOrder)

    return categories
}

const categoryById = async (categoryId) => {
    const [category] = await db.select()
        .from(wlCategories)
        .where(and(
            eq(wlCategories.categoryId, categoryId),
            eq(wlCategories.status, '1')
        ))
        .limit(1)

    return category
}

// a product's category_links holds its full chain (e.g. "2,1" = sub category 2 of category 1)
const linkedToAny = (ids) => or(
    inArray(wlProducts.categoryId, ids),
    ...ids.map((id) =>
        sql`FIND_IN_SET(${String(id)}, ${wlProducts.categoryLinks}) > 0`
    )
)

// optional product filters: any of the categories AND any of the sub categories
// AND (car make / car model ids are product ids from the carMakes / carModels lists)
const productFilterConditions = ({
    categoryIds = [],
    subCategoryIds = [],
    carMakeIds = [],
    carModelIds = [],
} = {}) => {
    const conditions = []

    if (carMakeIds.length) {
        conditions.push(inArray(wlProducts.productId, carMakeIds))
    }

    if (carModelIds.length) {
        conditions.push(inArray(wlProducts.productId, carModelIds))
    }

    if (categoryIds.length) {
        conditions.push(linkedToAny(categoryIds))
    }

    if (subCategoryIds.length) {
        conditions.push(linkedToAny(subCategoryIds))
    }

    return conditions
}

const carModels = async (filters) => {
    return db
        .select({
            productId: wlProducts.productId,
            carModel: wlProducts.productModel,
        })
        .from(wlProducts)
        .where(and(
            eq(wlProducts.status, '1'),
            sql`TRIM(COALESCE(${wlProducts.productModel}, '')) <> ''`,
            ...productFilterConditions(filters)
        ))
        .orderBy(asc(wlProducts.productModel), asc(wlProducts.productId))
}

const carMakes = async (filters) => {
    return db
        .select({
            productId: wlProducts.productId,
            carMake: wlProducts.productMake,
        })
        .from(wlProducts)
        .where(and(
            eq(wlProducts.status, '1'),
            sql`TRIM(COALESCE(${wlProducts.productMake}, '')) <> ''`,
            ...productFilterConditions(filters)
        ))
        .orderBy(asc(wlProducts.productMake), asc(wlProducts.productId))
}

module.exports = { categories, subCategory, categoryById, carModels, carMakes }