const { eq, and, sql } = require('drizzle-orm')
const db = require('../config/drizzle')
const { wlCategories } = require('../schema/wl-categories')

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

module.exports = { categories, subCategory }