
const { eq, desc } = require('drizzle-orm')
const db = require('../config/drizzle')
const { wlTestimonials } = require('../schema/wl-testimonials')

const getTestimonials = async () => {
    return await db
        .select()
        .from(wlTestimonials)
        .where(eq(wlTestimonials.status, 1))
        .orderBy(desc(wlTestimonials.postedDate))
}

const createTestimonial = async (data) => {
    const result = await db
        .insert(wlTestimonials)
        .values(data)

    return result.insertId
}

module.exports = {
    getTestimonials,
    createTestimonial
}
