/**
 * Function 2: Product Price Calculator.
 *
 * Independent of the metal price calculator API (/metal_stats_pages/metal-price-calculator):
 * it never reads wl_metal_calculator, so calculator changes do not affect product prices.
 *
 * For each product (wl_products):
 *   prod_weight = total weight in grams, prod_pt / prod_pd / prod_ph = Pt / Pd / Rh in PPM
 *
 *   Metal Quantity (g) = weight (g) x PPM / 1,000,000            (Function 1)
 *   Metal Value        = Metal Quantity (g) x live market price per gram (INR)
 *   originalPrice      = Platinum Value + Palladium Value + Rhodium Value
 *   productPrice       = originalPrice x admin_cent % (tbl_admin)
 */
const { getLatestMetalPrices } = require('./metalData')
const { calculatePreciousMetalContent, toSafeNumber } = require('./preciousMetal')
const adminModel = require('../models/admin.model')
const { currencyFields } = require('./currencySymbol')

const CURRENCY = 'INR'
const GRAMS_PER_TROY_OZ = 31.1034768
const SYMBOLS = { platinum: 'XPT', palladium: 'XPD', rhodium: 'XRH' }

const round2 = (n) => Math.round(n * 100) / 100

/**
 * Live market price per gram in INR, e.g. { platinum: 4201.55, palladium: 2805.10, rhodium: 26850.40 }.
 * Loaded once per request (rates are cached for 60 seconds). Returns null when rates are unavailable; never throws.
 */
const getMarketPricesPerGram = async () => {
    try {
        const perOunce = await getLatestMetalPrices(Object.values(SYMBOLS), CURRENCY)

        return Object.fromEntries(
            Object.entries(SYMBOLS).map(([metal, symbol]) => [metal, perOunce[symbol] / GRAMS_PER_TROY_OZ])
        )
    } catch (error) {
        console.error('Product pricing market rate error:', error.message)
        return null
    }
}

/**
 * Percentage (tbl_admin.admin_cent) of the product value to display, e.g. 50 => 50%.
 * Returns null when it cannot be read; never throws.
 */
const getProductPricePercent = async () => {
    try {
        const value = await adminModel.getAdminCent()
        const percent = Number(value)
        return value === null || value === undefined || !Number.isFinite(percent) || percent < 0
            ? null
            : Math.min(percent, 100)
    } catch (error) {
        console.error('Product price percentage error:', error.message)
        return null
    }
}

/**
 * Function 2: price of one product from its database values.
 * @param product          row with prodWeight, prodPt, prodPd, prodPh (strings from the database)
 * @param pricesPerGram    result of getMarketPricesPerGram() (null when rates are unavailable)
 * @param pricePercent     result of getProductPricePercent() (null when unavailable)
 * @returns { productPrice, originalPrice, priceDetails }
 */
const calculateProductPrice = (product, pricesPerGram, pricePercent) => {
    const content = calculatePreciousMetalContent({
        weight: product?.prodWeight,
        pt: product?.prodPt,
        pd: product?.prodPd,
        rh: product?.prodPh,
    })

    const hasPrices = Boolean(pricesPerGram)
    const value = (metal) => hasPrices ? content.exactGrams[metal] * pricesPerGram[metal] : null

    const fullValues = {
        platinum: value('platinum'),
        palladium: value('palladium'),
        rhodium: value('rhodium'),
    }
    const originalPrice = hasPrices
        ? round2(fullValues.platinum + fullValues.palladium + fullValues.rhodium)
        : null

    // shown amounts = admin_cent % of the full values (not shown when the percentage is unavailable)
    const shown = (amount) =>
        amount === null || pricePercent === null ? null : round2((amount * pricePercent) / 100)

    const pricePerGram = (metal) => hasPrices ? round2(pricesPerGram[metal]) : null

    return {
        productPrice: shown(originalPrice),
        originalPrice,
        ...currencyFields(CURRENCY),
        priceDetails: {
            ...currencyFields(CURRENCY),
            weightGrams: content.weightGrams,
            platinumPpm: content.ppm.platinum,
            palladiumPpm: content.ppm.palladium,
            rhodiumPpm: content.ppm.rhodium,
            platinumGrams: content.grams.platinum,
            palladiumGrams: content.grams.palladium,
            rhodiumGrams: content.grams.rhodium,
            totalMetalGrams: content.grams.total,
            platinumPricePerGram: pricePerGram('platinum'),
            palladiumPricePerGram: pricePerGram('palladium'),
            rhodiumPricePerGram: pricePerGram('rhodium'),
            platinum: shown(fullValues.platinum),
            palladium: shown(fullValues.palladium),
            rhodium: shown(fullValues.rhodium),
            grandTotal: shown(originalPrice),
        },
    }
}

module.exports = {
    getMarketPricesPerGram,
    getProductPricePercent,
    calculateProductPrice,
}
