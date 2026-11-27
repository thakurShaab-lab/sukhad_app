const { convertNulls } = require('../utils/convertNulls')
const metalCalculatorModel = require('../models/metalCalculator.model')
const {
    CURRENCY,
    DEFAULT_RETURN_RATE,
    DEFAULT_DAYS_OUT,
    VALUATION_STATUS,
    round2,
    round4,
    calculateMetalValues,
} = require('../utils/metalPricing')
const { getMarketPricesPerKg } = require('../utils/metalMarketPrice')
const { getExchangeRate } = require('../utils/metalData')
const { getProductPricePercent } = require('../utils/productPricing')
const { getTableColumns } = require('drizzle-orm')
const { wlMetalCalculator } = require('../schema/wl-metal-calculator')
const { currencyFields } = require('../utils/currencySymbol')

/**
 * Calculator settings vs calculator input:
 *   POST /metal-price-setting    saves the settings (return rates, deductions, charges, fees, lease, prices per kg)
 *                                in the single wl_metal_calculator record.
 *   POST /metal-price-calculator takes weight + PPM from req.body (never stored) and calculates with:
 *     - the saved settings when the record exists (a price of 0 / source "market" = live market price), or
 *     - 100% of the live market value (100% return, no deductions / charges / fees / lease) when it does not.
 */

const VALUATION_MESSAGES = {
    [VALUATION_STATUS.CALCULATED]: 'Scrap value calculated successfully.',
    [VALUATION_STATUS.PENDING]: 'Enter a valid scrap weight and metal PPM (greater than 0) to calculate the scrap value. Current metal prices are shown.',
}
const ALL_ZERO_MESSAGE = 'All values are 0. Enter a valid scrap weight and metal PPM (greater than 0) to calculate the scrap value.'

// the calculator weight is always in KG
const WEIGHT_UNIT = 'kg'

// return rate when no settings are saved: the full live market value of the metal content
const FULL_RETURN_RATE = 100

const METALS = [
    {
        symbol: 'XPT',
        name: 'Platinum',
        ppmKey: 'platinum_ppm',
        priceKey: 'platinum_price_per_kg',
        returnRateKey: 'return_rate_pt',
        minimumDeductionKey: 'minimum_deduction_pt',
        refiningChargeKey: 'refining_charge_pt',
        // wl_metal_calculator columns
        column: {
            pricePerKg: 'platinumPricePerKg',
            priceSource: 'platinumPriceSource',
            returnRate: 'returnRatePt',
            minimumDeduction: 'minimumDeductionPt',
            refiningCharge: 'refiningChargePt',
            value: 'platinumPrice',
        },
    },
    {
        symbol: 'XPD',
        name: 'Palladium',
        ppmKey: 'palladium_ppm',
        priceKey: 'palladium_price_per_kg',
        returnRateKey: 'return_rate_pd',
        minimumDeductionKey: 'minimum_deduction_pd',
        refiningChargeKey: 'refining_charge_pd',
        column: {
            pricePerKg: 'palladiumPricePerKg',
            priceSource: 'palladiumPriceSource',
            returnRate: 'returnRatePd',
            minimumDeduction: 'minimumDeductionPd',
            refiningCharge: 'refiningChargePd',
            value: 'palladiumPrice',
        },
    },
    {
        symbol: 'XRH',
        name: 'Rhodium',
        ppmKey: 'rhodium_ppm',
        priceKey: 'rhodium_price_per_kg',
        returnRateKey: 'return_rate_rh',
        minimumDeductionKey: 'minimum_deduction_rh',
        refiningChargeKey: 'refining_charge_rh',
        column: {
            pricePerKg: 'rhodiumPricePerKg',
            priceSource: 'rhodiumPriceSource',
            returnRate: 'returnRateRh',
            minimumDeduction: 'minimumDeductionRh',
            refiningCharge: 'refiningChargeRh',
            value: 'rhodiumPrice',
        },
    },
]

const isEmpty = (value) =>
    value === undefined || value === null || String(value).trim() === ''

// missing / null / empty values fall back to the default (all fields are optional)
const toNumber = (value, fallback = 0) => (isEmpty(value) ? fallback : Number(value))

const isZeroOrEmpty = (value) => isEmpty(value) || Number(value) === 0

// local server time as "YYYY-MM-DD HH:mm:ss" for MySQL DATETIME columns
const toMysqlDateTime = (date) => {
    const pad = (n) => String(n).padStart(2, '0')

    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
        `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
}

const badRequest = (res, message) =>
    res.status(400).json({ success: false, message })

// first invalid [key, value] => message, or null when all are valid
const findInvalidNumber = (checks) => {
    for (const [key, value, max] of checks) {
        if (!Number.isFinite(value) || value < 0 || (max !== undefined && value > max)) {
            return max === undefined
                ? `${key} must be a number of 0 or more.`
                : `${key} must be a number between 0 and ${max}.`
        }
    }
    return null
}

// money columns of wl_metal_calculator (amounts and per-kg prices / charges / fees)
const MONEY_FIELDS = [
    'treatmentFee',
    'refiningChargePt', 'refiningChargePd', 'refiningChargeRh',
    'platinumPricePerKg', 'palladiumPricePerKg', 'rhodiumPricePerKg',
    'platinumPrice', 'palladiumPrice', 'rhodiumPrice', 'grandTotal',
    'grossValue', 'totalRefiningCharge', 'totalTreatmentFee', 'financeCharge', 'totalValue',
]

// records saved in another currency (older INR records) are converted to USD at the live exchange rate
const toCalculatorCurrency = async (records) => {
    const currencies = [...new Set(
        records.map((record) => String(record.currency || CURRENCY).toUpperCase())
    )].filter((code) => code !== CURRENCY)

    const rates = Object.fromEntries(
        await Promise.all(currencies.map(async (code) => [code, await getExchangeRate(code, CURRENCY)]))
    )

    return records.map((record) => {
        const code = String(record.currency || CURRENCY).toUpperCase()
        if (code === CURRENCY) return record

        const converted = { ...record, currency: CURRENCY }
        for (const field of MONEY_FIELDS) {
            converted[field] = round2(Number(record[field] || 0) * rates[code])
        }
        return converted
    })
}

const exchangeRateUnavailable = (res) =>
    res.status(503).json({
        success: false,
        message: `Exchange rate to ${CURRENCY} is currently unavailable. Please try again shortly.`,
    })

/**
 * POST /metal_stats_pages/metal-price-setting
 * Saves the calculator settings in the single wl_metal_calculator record (created once, then updated).
 * Weight / PPM are not part of the settings and are never stored.
 */
const saveMetalPriceSetting = async (req, res) => {
    try {
        const body = req.body || {}

        const treatmentFee = toNumber(body.treatment_fee)
        const daysOut = toNumber(body.days_out, DEFAULT_DAYS_OUT)
        const interestRate = toNumber(body.interest_rate)

        const metals = METALS.map((metal) => ({
            ...metal,
            returnRate: toNumber(body[metal.returnRateKey], DEFAULT_RETURN_RATE),
            minimumDeduction: toNumber(body[metal.minimumDeductionKey]),
            refiningCharge: toNumber(body[metal.refiningChargeKey]),
            pricePerKg: toNumber(body[metal.priceKey]),
        }))

        const invalid = findInvalidNumber([
            ['treatment_fee', treatmentFee],
            ['days_out', daysOut],
            ['interest_rate', interestRate],
            ...metals.flatMap((metal) => [
                [metal.returnRateKey, metal.returnRate, 100],
                [metal.minimumDeductionKey, metal.minimumDeduction],
                [metal.refiningChargeKey, metal.refiningCharge],
                [metal.priceKey, metal.pricePerKg],
            ]),
        ])

        if (invalid) return badRequest(res, invalid)

        if (!Number.isInteger(daysOut)) {
            return badRequest(res, 'days_out must be a whole number of days.')
        }

        const now = toMysqlDateTime(new Date())
        const settings = {
            customersId: req.user?.id ?? 0,
            appId: req.user?.app_id ?? null,
            deviceId: req.user?.device_id ?? null,
            currency: CURRENCY,
            treatmentFee,
            daysOut,
            interestRate,
            // calculated values depend on the weight / PPM of each calculation, so they are not stored
            platinumPrice: 0,
            palladiumPrice: 0,
            rhodiumPrice: 0,
            grandTotal: 0,
            grossValue: 0,
            totalRefiningCharge: 0,
            totalTreatmentFee: 0,
            financeCharge: 0,
            totalValue: 0,
            createdAt: now,
            updatedAt: now,
        }

        for (const metal of metals) {
            settings[metal.column.returnRate] = metal.returnRate
            settings[metal.column.minimumDeduction] = metal.minimumDeduction
            settings[metal.column.refiningCharge] = metal.refiningCharge
            settings[metal.column.pricePerKg] = metal.pricePerKg
            // price 0 / not sent => the calculator uses the live market price
            settings[metal.column.priceSource] = metal.pricePerKg > 0 ? 'user' : 'market'
        }

        // one record only: updated when it exists, created otherwise (transaction + row lock in the model)
        const { id } = await metalCalculatorModel.saveCalculation(settings)
        const saved = await metalCalculatorModel.findLatestCalculation()

        return res.status(200).json(convertNulls({
            success: true,
            message: 'Metal price settings saved successfully.',
            data: formatSettings({ ...saved, id }),
        }))
    } catch (error) {
        console.error('Metal price setting error:', error.message)

        return res.status(500).json({
            success: false,
            message: 'Unable to save metal price settings.',
        })
    }
}

/**
 * POST /metal_stats_pages/metal-price-calculator
 * weight (always KG) / PPM come from req.body (used for this calculation only, never stored);
 * everything else comes from the saved settings (or 100% live market value when no settings are saved).
 * Nothing is written to the database.
 */
const calculateMetalPrice = async (req, res) => {
    try {
        const body = req.body || {}
        const currency = CURRENCY

        // weight is always in KG (req.body.weight_unit is not used)
        const weightUnit = WEIGHT_UNIT

        const weight = toNumber(isEmpty(body.weight) ? body.weight_kg : body.weight)
        const ppm = METALS.map((metal) => toNumber(body[metal.ppmKey]))

        const invalid = findInvalidNumber([
            ['weight', weight],
            ...METALS.map((metal, i) => [metal.ppmKey, ppm[i]]),
        ])

        if (invalid) return badRequest(res, invalid)

        // weight and every PPM 0 (or not sent): nothing to calculate, no market price fetch, all values 0
        const allZero = weight === 0 && ppm.every((value) => value === 0)

        // saved calculator settings (the single wl_metal_calculator record, or null) and the admin_cent % (tbl_admin)
        let [settings, pricePercent] = await Promise.all([
            metalCalculatorModel.findLatestCalculation(),
            getProductPricePercent(),
        ])

        if (pricePercent === null) {
            return res.status(503).json({
                success: false,
                message: 'Price percentage setting is currently unavailable. Please try again shortly.',
            })
        }

        if (settings) {
            try {
                [settings] = await toCalculatorCurrency([settings])
            } catch (error) {
                console.error('Metal price calculator exchange rate error:', error.message)
                return exchangeRateUnavailable(res)
            }
        }

        const settingsApplied = Boolean(settings)

        const treatmentFee = settingsApplied && !allZero ? Number(settings.treatmentFee) : 0
        const daysOut = settingsApplied && !allZero ? Number(settings.daysOut) : 0
        const interestRate = settingsApplied && !allZero ? Number(settings.interestRate) : 0

        const inputs = METALS.map((metal, i) => {
            if (allZero) {
                return { ...metal, ppm: 0, pricePerKg: 0, returnRate: 0, minimumDeduction: 0, refiningChargePerKg: 0 }
            }

            if (!settingsApplied) {
                // no saved settings: 100% of the live market value, no deductions or charges
                return { ...metal, ppm: ppm[i], pricePerKg: null, returnRate: FULL_RETURN_RATE, minimumDeduction: 0, refiningChargePerKg: 0 }
            }

            const savedPrice = Number(settings[metal.column.pricePerKg])
            const savedReturnRate = Number(settings[metal.column.returnRate])

            return {
                ...metal,
                ppm: ppm[i],
                // saved price source "market" or price 0 => live market price
                pricePerKg: settings[metal.column.priceSource] === 'market' || !(savedPrice > 0) ? null : savedPrice,
                // saved return rate 0 => default 85%
                returnRate: savedReturnRate > 0 ? savedReturnRate : DEFAULT_RETURN_RATE,
                minimumDeduction: Number(settings[metal.column.minimumDeduction]),
                refiningChargePerKg: Number(settings[metal.column.refiningCharge]),
            }
        })

        // live market price only for the metals that need it
        const marketSymbols = inputs
            .filter((input) => input.pricePerKg === null)
            .map((input) => input.symbol)
        let market = null

        if (marketSymbols.length) {
            try {
                market = await getMarketPricesPerKg(marketSymbols, currency)
            } catch (error) {
                console.error('Metal price calculator market rate error:', error.message)

                // never calculate with a missing, stale or fabricated price
                return res.status(503).json({
                    success: false,
                    message: `Live market price is currently unavailable for ${marketSymbols.join(', ')}. ` +
                        'Please try again shortly or save the metal price per kg in the calculator settings.',
                })
            }
        }

        const {
            valuationStatus,
            weightKg,
            grossValue,
            totalRefiningCharge,
            totalTreatmentFee,
            financeCharge,
            totalValue,
            prices: calculatedPrices,
            breakdown,
        } = calculateMetalValues({
            weight,
            weightUnit,
            treatmentFee,
            daysOut,
            interestRate,
            metals: inputs.map((input) => ({
                ...input,
                priceSource: input.pricePerKg === null ? 'market' : 'user',
                pricePerKg: input.pricePerKg === null
                    ? market.pricesPerKg[input.symbol]
                    : input.pricePerKg,
            })),
        })

        const [platinum, palladium, rhodium] = breakdown

        const marketPrice = market
            ? {
                source: market.source,
                ...currencyFields(market.currency),
                unit: market.unit,
                quoteTimestamp: market.quoteTimestamp,
                fetchedAt: market.fetchedAt,
                pricesPerKg: Object.fromEntries(
                    breakdown
                        .filter((metal) => metal.priceSource === 'market')
                        .map((metal) => [metal.name.toLowerCase(), metal.pricePerKg])
                ),
            }
            : null

        // no scrap details (weight / PPM 0): show the price per kg (live market price when not saved)
        const prices = valuationStatus === VALUATION_STATUS.PENDING
            ? {
                platinum: platinum.pricePerKg,
                palladium: palladium.pricePerKg,
                rhodium: rhodium.pricePerKg,
                grandTotal: round2(platinum.pricePerKg + palladium.pricePerKg + rhodium.pricePerKg),
            }
            : calculatedPrices

        // shown amounts = admin_cent % of the full calculated amounts (same as the product price);
        // the per-kg prices shown when there are no scrap details are market prices and are not scaled
        const applyPercent = (value) => round2((value * pricePercent) / 100)
        const shownPrices = valuationStatus === VALUATION_STATUS.PENDING
            ? prices
            : Object.fromEntries(Object.entries(prices).map(([key, value]) => [key, applyPercent(value)]))

        return res.status(200).json(convertNulls({
            success: true,
            message: 'Metal price calculated successfully.',
            data: {
                id: settings?.id ?? null,
                settingsApplied,
                valuation_status: valuationStatus,
                valuation_message: allZero ? ALL_ZERO_MESSAGE : VALUATION_MESSAGES[valuationStatus],
                ...currencyFields(currency),
                weightUnit,
                weight,
                weightKg: round4(weightKg),
                settings: {
                    treatmentFee,
                    daysOut,
                    interestRate,
                },
                grossValue: round2(grossValue),
                totalRefiningCharge: round2(totalRefiningCharge),
                treatmentFee: round2(totalTreatmentFee),
                financeCharge: round2(financeCharge),
                adminCent: pricePercent,
                totalValue: applyPercent(totalValue),
                originalTotalValue: round2(totalValue),
                prices: { ...currencyFields(currency), ...shownPrices },
                originalPrices: { ...currencyFields(currency), ...prices },
                marketPrice,
                breakdown: breakdown.map((metal) => ({ ...metal, ...currencyFields(currency) })),
            },
        }))
    } catch (error) {
        console.error('Metal price calculator error:', error.message)

        return res.status(500).json({
            success: false,
            message: 'Unable to calculate metal price.',
        })
    }
}

// saved settings record as returned by /metal-price-setting and /metal-specifications
const formatSettings = (record) => ({
    id: record.id,
    ...currencyFields(record.currency),
    settings: {
        treatmentFee: record.treatmentFee,
        daysOut: record.daysOut,
        interestRate: record.interestRate,
    },
    grossValue: record.grossValue,
    totalRefiningCharge: record.totalRefiningCharge,
    treatmentFee: record.totalTreatmentFee,
    financeCharge: record.financeCharge,
    totalValue: record.totalValue,
    prices: {
        ...currencyFields(record.currency),
        platinum: record.platinumPrice,
        palladium: record.palladiumPrice,
        rhodium: record.rhodiumPrice,
        grandTotal: record.grandTotal,
    },
    breakdown: METALS.map((metal) => ({
        symbol: metal.symbol,
        name: metal.name,
        minimumDeduction: record[metal.column.minimumDeduction],
        returnRate: record[metal.column.returnRate],
        ...currencyFields(record.currency),
        pricePerKg: record[metal.column.pricePerKg],
        priceSource: record[metal.column.priceSource],
        refiningChargePerKg: record[metal.column.refiningCharge],
        value: record[metal.column.value],
    })),
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
})

// no saved settings: one record with the column defaults of the wl_metal_calculator schema
// (return rates 85, days out 120, interest rate 4, amounts 0); prices 0 = live market price
const defaultSettingsRecord = () => {
    const record = Object.fromEntries(
        Object.entries(getTableColumns(wlMetalCalculator)).map(([key, column]) => [key, column.default ?? null])
    )

    return {
        ...record,
        id: null,
        currency: CURRENCY,
        platinumPriceSource: 'market',
        palladiumPriceSource: 'market',
        rhodiumPriceSource: 'market',
    }
}

const getMetalPriceCalculations = async (req, res) => {
    try {
        const records = await metalCalculatorModel.getCalculations()

        if (!records.length) {
            return res.status(200).json(convertNulls({
                success: true,
                message: 'No saved metal price settings found. Default values are shown.',
                data: {
                    total: 0,
                    records: [formatSettings(defaultSettingsRecord())],
                },
            }))
        }

        let usdRecords
        try {
            usdRecords = await toCalculatorCurrency(records)
        } catch (error) {
            console.error('Metal price calculator exchange rate error:', error.message)
            return exchangeRateUnavailable(res)
        }

        return res.status(200).json(convertNulls({
            success: true,
            message: 'Metal price calculations retrieved successfully.',
            data: {
                total: usdRecords.length,
                records: usdRecords.map(formatSettings),
            },
        }))
    } catch (error) {
        console.error('Metal price calculator history error:', error.message)

        return res.status(500).json({
            success: false,
            message: 'Unable to fetch metal price calculations.',
        })
    }
}

module.exports = { calculateMetalPrice, saveMetalPriceSetting, getMetalPriceCalculations }
