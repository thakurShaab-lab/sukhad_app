const { eq, desc } = require('drizzle-orm')
const db = require('../config/drizzle')
const { wlMetalCalculator } = require('../schema/wl-metal-calculator')

const createCalculation = async (data) => {
    const [result] = await db
        .insert(wlMetalCalculator)
        .values(data)

    return { id: result.insertId }
}

const findLatestCalculationId = async (customersId) => {
    const [record] = await db
        .select({ id: wlMetalCalculator.id })
        .from(wlMetalCalculator)
        .where(eq(wlMetalCalculator.customersId, customersId))
        .orderBy(desc(wlMetalCalculator.id))
        .limit(1)

    return record?.id
}

const updateCalculation = async (id, data) => {
    await db
        .update(wlMetalCalculator)
        .set(data)
        .where(eq(wlMetalCalculator.id, id))

    return { id }
}

// one calculator record per customer: update it when it exists, otherwise create it
const saveCalculation = async (data) => {
    const existingId = await findLatestCalculationId(data.customersId)

    if (existingId) {
        const { createdAt, ...changes } = data
        return updateCalculation(existingId, changes)
    }

    return createCalculation(data)
}

// latest saved calculator record (its settings and prices are used for product pricing)
const findLatestCalculation = async () => {
    const [record] = await db
        .select()
        .from(wlMetalCalculator)
        .orderBy(desc(wlMetalCalculator.updatedAt), desc(wlMetalCalculator.id))
        .limit(1)

    return record || null
}

// all saved calculator records, newest first
const getCalculations = async () => {
    return db
        .select()
        .from(wlMetalCalculator)
        .orderBy(desc(wlMetalCalculator.id))
}

module.exports = {
    findLatestCalculation,
    createCalculation,
    updateCalculation,
    saveCalculation,
    getCalculations,
}