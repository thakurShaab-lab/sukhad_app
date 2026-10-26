
const { eq, and } = require('drizzle-orm')
const db = require('../config/drizzle')
const { wlEnquiry } = require('../schema/wl-enquiry')
const { wlProducts } = require('../schema/wl-products')

const productExists = async (productId) => {
    const [result] = await db
        .select({ productId: wlProducts.productId, productTitle: wlProducts.productTitle })
        .from(wlProducts)
        .where(
            and(
                eq(wlProducts.productId, productId),
                eq(wlProducts.status, '1')
            )
        )
        .limit(1)

    return result
}

const createEnquiry = async (data) => {
    const result = await db
        .insert(wlEnquiry)
        .values(data)

    return result
}

module.exports = {
    productExists,
    createEnquiry
}