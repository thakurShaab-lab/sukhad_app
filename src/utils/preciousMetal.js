/**
 * Function 1: Precious Metal Calculator (pure, standalone).
 *
 * Works only on the values passed in: no product records, no market prices, no database.
 *
 *   Metal Quantity (grams) = (Weight in grams x Metal PPM) / 1,000,000
 *
 * Example: 1,000 g with Pt 500 / Pd 300 / Rh 100 PPM
 *   => Pt 0.5 g, Pd 0.3 g, Rh 0.1 g, total 0.9 g
 */

const PPM_DIVISOR = 1000000

const isEmpty = (value) =>
    value === undefined || value === null || String(value).trim() === ''

// string / null / empty / invalid / negative values become 0 (never throws)
const toSafeNumber = (value) => {
    if (isEmpty(value)) return 0
    const number = Number(String(value).trim())
    return Number.isFinite(number) && number >= 0 ? number : 0
}

const round6 = (n) => Math.round(n * 1000000) / 1000000

const metalGrams = (weightGrams, ppm) => (weightGrams * ppm) / PPM_DIVISOR

/**
 * @param {{ weight: number|string, pt: number|string, pd: number|string, rh: number|string }} input
 *        weight in grams, pt / pd / rh in PPM
 * @returns quantities in grams (rounded to 6 decimals) plus the exact values for further calculation
 */
const calculatePreciousMetalContent = ({ weight, pt, pd, rh } = {}) => {
    const weightGrams = toSafeNumber(weight)
    const ppm = {
        platinum: toSafeNumber(pt),
        palladium: toSafeNumber(pd),
        rhodium: toSafeNumber(rh),
    }

    const exact = {
        platinum: metalGrams(weightGrams, ppm.platinum),
        palladium: metalGrams(weightGrams, ppm.palladium),
        rhodium: metalGrams(weightGrams, ppm.rhodium),
    }
    exact.total = exact.platinum + exact.palladium + exact.rhodium

    return {
        weightGrams,
        ppm: { ...ppm, total: ppm.platinum + ppm.palladium + ppm.rhodium },
        grams: {
            platinum: round6(exact.platinum),
            palladium: round6(exact.palladium),
            rhodium: round6(exact.rhodium),
            total: round6(exact.total),
        },
        exactGrams: exact,
    }
}

module.exports = {
    toSafeNumber,
    calculatePreciousMetalContent,
}
