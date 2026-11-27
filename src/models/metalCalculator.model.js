const { eq, ne, desc } = require('drizzle-orm')
const db = require('../config/drizzle')
const { wlMetalCalculator } = require('../schema/wl-metal-calculator')

const createCalculation = async (data) => {
    const [result] = await db
        .insert(wlMetalCalculator)
        .values(data)

    return { id: result.insertId }
}

const updateCalculation = async (id, data) => {
    await db
        .update(wlMetalCalculator)
        .set(data)
        .where(eq(wlMetalCalculator.id, id))

    return { id }
}

// The id the single calculator record gets when the table is empty
const SINGLE_RECORD_ID = 1

// wl_metal_calculator holds exactly one record, whoever calls the calculator:
//   - a record exists: it is updated with every field of this calculation (customers_id, app_id, device_id, the
//     inputs, prices and results, updated_at). created_at keeps when the record was first made.
//   - the table is empty: the record is created with id 1. INSERT ... ON DUPLICATE KEY UPDATE makes two first
//     calculations at the same moment end up as one record (the second updates it) instead of two.
//   - more than one record (only possible from data saved before this rule): the newest is kept and updated, the
//     others are removed, so one record remains.
// Returns { id } of the record.
const saveCalculation = async (data) =>
    db.transaction(async (tx) => {
        const { createdAt, ...changes } = data

        const records = await tx
            .select({ id: wlMetalCalculator.id })
            .from(wlMetalCalculator)
            .orderBy(desc(wlMetalCalculator.id))
            .for('update')

        if (!records.length) {
            await tx
                .insert(wlMetalCalculator)
                .values({ ...data, id: SINGLE_RECORD_ID })
                .onDuplicateKeyUpdate({ set: changes })

            return { id: SINGLE_RECORD_ID }
        }

        const [kept, ...extra] = records
        await tx.update(wlMetalCalculator).set(changes).where(eq(wlMetalCalculator.id, kept.id))
        if (extra.length) {
            await tx.delete(wlMetalCalculator).where(ne(wlMetalCalculator.id, kept.id))
        }

        return { id: kept.id }
    })

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