const { eq, and, sql } = require('drizzle-orm')
const db = require('../config/drizzle')
const { wlCategories } = require('../schema/wl-categories')
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

module.exports = { categories, subCategory, categoryById }