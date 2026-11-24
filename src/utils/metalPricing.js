const { getLatestMetalPrices } = require('./metalData')
const metalCalculatorModel = require('../models/metalCalculator.model')

const CURRENCY = 'INR'
const PPM_DIVISOR = 1000000
const GRAMS_PER_KG = 1000
const KG_PER_LB = 0.45359237
const GRAMS_PER_TROY_OZ = 31.1034768
const TROY_OZ_PER_KG = GRAMS_PER_KG / GRAMS_PER_TROY_OZ
const DAYS_PER_YEAR = 365

// defaults shown in the calculator settings screen
const DEFAULT_RETURN_RATE = 85
const DEFAULT_DAYS_OUT = 120

const METALS = [
    { key: 'platinum', symbol: 'XPT', name: 'Platinum', productField: 'prodPt', suffix: 'Pt' },
    { key: 'palladium', symbol: 'XPD', name: 'Palladium', productField: 'prodPd', suffix: 'Pd' },
    { key: 'rhodium', symbol: 'XRH', name: 'Rhodium', productField: 'prodPh', suffix: 'Rh' },
]

const round2 = (n) => Math.round(n * 100) / 100
const round4 = (n) => Math.round(n * 10000) / 10000

const isEmpty = (value) =>
    value === undefined || value === null || String(value).trim() === ''

// null / empty / invalid / negative values become the fallback (never throws)
const toSafeNumber = (value, fallback = 0) => {
    if (isEmpty(value)) return fallback
    const number = Number(String(value).trim())
    return Number.isFinite(number) && number >= 0 ? number : fallback
}

// live market price per kg in INR, e.g. { XPT: 4422345.12, ... }
const getMarketPricesPerKg = async (symbols = METALS.map((metal) => metal.symbol)) => {
    const perOunce = await getLatestMetalPrices(symbols, CURRENCY)

    return Object.fromEntries(
        Object.entries(perOunce).map(([symbol, price]) => [symbol, price * TROY_OZ_PER_KG])
    )
}

/**
 * metals: [{ symbol, name, ppm, pricePerKg, priceSource, returnRate, minimumDeduction, refiningChargePerKg }]
 * (in METALS order: platinum, palladium, rhodium)
 */
const calculateMetalValues = ({
    weight,
    weightUnit = 'kg',
    metals,
    treatmentFee = 0,
    daysOut = DEFAULT_DAYS_OUT,
    interestRate = 0,
}) => {
    const weightKg = weightUnit === 'lb' ? weight * KG_PER_LB : weight

    const breakdown = metals.map((metal) => {
        const metalKg = (weightKg * metal.ppm) / PPM_DIVISOR
        const payablePpm = Math.max(metal.ppm - metal.minimumDeduction, 0)
        const payableKg = ((weightKg * payablePpm) / PPM_DIVISOR) * (metal.returnRate / 100)
        const grossValue = payableKg * metal.pricePerKg
        const refiningCharge = payableKg * metal.refiningChargePerKg

        return {
            symbol: metal.symbol,
            name: metal.name,
            ppm: metal.ppm,
            minimumDeduction: metal.minimumDeduction,
            payablePpm: round4(payablePpm),
            returnRate: metal.returnRate,
            pricePerKg: round2(metal.pricePerKg),
            priceSource: metal.priceSource,
            refiningChargePerKg: metal.refiningChargePerKg,
            metalWeightKg: round4(metalKg),
            metalWeightGrams: round4(metalKg * GRAMS_PER_KG),
            payableWeightKg: round4(payableKg),
            payableWeightGrams: round4(payableKg * GRAMS_PER_KG),
            grossValue: round2(grossValue),
            refiningCharge: round2(refiningCharge),
            value: round2(grossValue - refiningCharge),
        }
    })

    const grossValue = breakdown.reduce((sum, item) => sum + item.grossValue, 0)
    const totalRefiningCharge = breakdown.reduce((sum, item) => sum + item.refiningCharge, 0)
    // treatment fee is charged per unit of the selected weight unit (kg or lb)
    const totalTreatmentFee = weight * treatmentFee
    const financeCharge = grossValue * (interestRate / 100) * (daysOut / DAYS_PER_YEAR)
    const totalValue = grossValue - totalRefiningCharge - totalTreatmentFee - financeCharge

    // individual price of each metal (net metal value) and their grand total
    const [platinum, palladium, rhodium] = breakdown
    const prices = {
        platinum: platinum.value,
        palladium: palladium.value,
        rhodium: rhodium.value,
        grandTotal: round2(platinum.value + palladium.value + rhodium.value),
    }

    return {
        weightKg,
        grossValue,
        totalRefiningCharge,
        totalTreatmentFee,
        financeCharge,
        totalValue,
        prices,
        breakdown,
    }
}

/**
 * Pricing settings for products, loaded once per request:
 * the saved calculator settings (wl_metal_calculator), or the calculator defaults when none are saved.
 * Metal prices saved as "market" (or not saved) use the live market price per kg.
 * Never throws: when market rates are unavailable, `available` is false.
 */
const getProductPricingSettings = async () => {
    let record = null

    try {
        record = await metalCalculatorModel.findLatestCalculation()
    } catch (error) {
        console.error('Product pricing settings error:', error.message)
    }

    const metals = METALS.map((metal) => {
        const savedPrice = record ? toSafeNumber(record[`${metal.key}PricePerKg`], null) : null
        const useSavedPrice = record?.[`${metal.key}PriceSource`] === 'user' && savedPrice !== null

        return {
            ...metal,
            pricePerKg: useSavedPrice ? savedPrice : null,
            priceSource: useSavedPrice ? 'user' : 'market',
            returnRate: Math.min(toSafeNumber(record?.[`returnRate${metal.suffix}`], DEFAULT_RETURN_RATE), 100),
            minimumDeduction: toSafeNumber(record?.[`minimumDeduction${metal.suffix}`]),
            refiningChargePerKg: toSafeNumber(record?.[`refiningCharge${metal.suffix}`]),
        }
    })

    let available = true
    const marketSymbols = metals.filter((metal) => metal.pricePerKg === null).map((metal) => metal.symbol)

    if (marketSymbols.length) {
        try {
            const marketPrices = await getMarketPricesPerKg(marketSymbols)
            metals.forEach((metal) => {
                if (metal.pricePerKg === null) metal.pricePerKg = marketPrices[metal.symbol]
            })
        } catch (error) {
            console.error('Product pricing market rate error:', error.message)
            available = false
        }
    }

    return {
        available,
        weightUnit: record?.weightUnit === 'lb' ? 'lb' : 'kg',
        treatmentFee: toSafeNumber(record?.treatmentFee),
        daysOut: toSafeNumber(record?.daysOut, DEFAULT_DAYS_OUT),
        interestRate: toSafeNumber(record?.interestRate),
        metals,
    }
}

/**
 * Price of one product from its prod_weight (kg) and prod_pt / prod_pd / prod_ph (PPM).
 * Returns { productPrice, priceDetails }; productPrice is null when market rates are unavailable.
 */
const calculateProductPrice = (product, settings) => {
    const weightKg = toSafeNumber(product?.prodWeight)

    const base = {
        currency: CURRENCY,
        weightKg,
        platinumPpm: toSafeNumber(product?.prodPt),
        palladiumPpm: toSafeNumber(product?.prodPd),
        rhodiumPpm: toSafeNumber(product?.prodPh),
    }

    if (!settings?.available) {
        return {
            productPrice: null,
            priceDetails: { ...base, platinum: null, palladium: null, rhodium: null, grandTotal: null },
        }
    }

    const result = calculateMetalValues({
        // treatment fee is per settings weight unit; product weight is stored in kg
        weight: settings.weightUnit === 'lb' ? weightKg / KG_PER_LB : weightKg,
        weightUnit: settings.weightUnit,
        treatmentFee: settings.treatmentFee,
        daysOut: settings.daysOut,
        interestRate: settings.interestRate,
        metals: settings.metals.map((metal) => ({
            ...metal,
            ppm: toSafeNumber(product?.[metal.productField]),
        })),
    })

    return {
        productPrice: round2(result.totalValue),
        priceDetails: {
            ...base,
            ...result.prices,
        },
    }
}

module.exports = {
    CURRENCY,
    DEFAULT_RETURN_RATE,
    DEFAULT_DAYS_OUT,
    round2,
    round4,
    getMarketPricesPerKg,
    calculateMetalValues,
    getProductPricingSettings,
    calculateProductPrice,
}
