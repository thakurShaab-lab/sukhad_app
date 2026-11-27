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
const { currencyFields } = require('../utils/currencySymbol')

const VALUATION_MESSAGES = {
    [VALUATION_STATUS.CALCULATED]: 'Scrap value calculated successfully.',
    [VALUATION_STATUS.PENDING]: 'Enter a valid scrap weight and metal PPM (greater than 0) to calculate the scrap value. Current metal prices are shown.',
}

const WEIGHT_UNITS = ['kg', 'lb']

const METALS = [
    {
        symbol: 'XPT',
        name: 'Platinum',
        ppmKey: 'platinum_ppm',
        priceKey: 'platinum_price_per_kg',
        returnRateKey: 'return_rate_pt',
        minimumDeductionKey: 'minimum_deduction_pt',
        refiningChargeKey: 'refining_charge_pt',
    },
    {
        symbol: 'XPD',
        name: 'Palladium',
        ppmKey: 'palladium_ppm',
        priceKey: 'palladium_price_per_kg',
        returnRateKey: 'return_rate_pd',
        minimumDeductionKey: 'minimum_deduction_pd',
        refiningChargeKey: 'refining_charge_pd',
    },
    {
        symbol: 'XRH',
        name: 'Rhodium',
        ppmKey: 'rhodium_ppm',
        priceKey: 'rhodium_price_per_kg',
        returnRateKey: 'return_rate_rh',
        minimumDeductionKey: 'minimum_deduction_rh',
        refiningChargeKey: 'refining_charge_rh',
    },
]

const isEmpty = (value) =>
    value === undefined || value === null || String(value).trim() === ''

// missing / null / empty values fall back to the default (all fields are optional)
const toNumber = (value, fallback = 0) => (isEmpty(value) ? fallback : Number(value))

// local server time as "YYYY-MM-DD HH:mm:ss" for MySQL DATETIME columns
const toMysqlDateTime = (date) => {
    const pad = (n) => String(n).padStart(2, '0')

    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
        `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
}

const badRequest = (res, message) =>
    res.status(400).json({ success: false, message })

const calculateMetalPrice = async (req, res) => {
    try {
        const body = req.body || {}

        // the calculator always works in USD; req.body.currency is accepted for payload compatibility but not used
        const currency = CURRENCY

        const weightUnit = isEmpty(body.weight_unit)
            ? 'kg'
            : String(body.weight_unit).trim().toLowerCase()

        if (!WEIGHT_UNITS.includes(weightUnit)) {
            return badRequest(res, 'weight_unit must be either "kg" or "lb".')
        }

        const weight = toNumber(isEmpty(body.weight) ? body.weight_kg : body.weight)
        const treatmentFee = toNumber(body.treatment_fee)
        const daysOut = toNumber(body.days_out, DEFAULT_DAYS_OUT)
        const interestRate = toNumber(body.interest_rate)

        const generalChecks = [
            ['weight', weight],
            ['treatment_fee', treatmentFee],
            ['days_out', daysOut],
            ['interest_rate', interestRate],
        ]

        for (const [key, value] of generalChecks) {
            if (!Number.isFinite(value) || value < 0) {
                return badRequest(res, `${key} must be a number of 0 or more.`)
            }
        }

        const inputs = METALS.map((metal) => ({
            ...metal,
            ppm: toNumber(body[metal.ppmKey]),
            // empty or 0 price => use the live market price
            pricePerKg: isEmpty(body[metal.priceKey]) || Number(body[metal.priceKey]) === 0
                ? null
                : Number(body[metal.priceKey]),
            returnRate: toNumber(body[metal.returnRateKey], DEFAULT_RETURN_RATE),
            minimumDeduction: toNumber(body[metal.minimumDeductionKey]),
            refiningChargePerKg: toNumber(body[metal.refiningChargeKey]),
        }))

        for (const input of inputs) {
            const checks = [
                [input.ppmKey, input.ppm],
                [input.minimumDeductionKey, input.minimumDeduction],
                [input.refiningChargeKey, input.refiningChargePerKg],
            ]

            if (input.pricePerKg !== null) {
                checks.push([input.priceKey, input.pricePerKg])
            }

            for (const [key, value] of checks) {
                if (!Number.isFinite(value) || value < 0) {
                    return badRequest(res, `${key} must be a number of 0 or more.`)
                }
            }

            if (!Number.isFinite(input.returnRate) || input.returnRate < 0 || input.returnRate > 100) {
                return badRequest(res, `${input.returnRateKey} must be a number between 0 and 100.`)
            }
        }

        // live market price (requested currency) only for the metals whose price is empty or 0
        const marketSymbols = inputs
            .filter((input) => input.pricePerKg === null)
            .map((input) => input.symbol)
        let market = null

        if (marketSymbols.length) {
            try {
                market = await getMarketPricesPerKg(marketSymbols, currency)
            } catch (error) {
                console.error('Metal price calculator market rate error:', error.message)

                if (error.code === 'INVALID_CURRENCY') {
                    return badRequest(res, `Currency ${currency} is not supported by the market price provider.`)
                }

                // never calculate with a missing, stale or fabricated price
                return res.status(503).json({
                    success: false,
                    message: `Live market price is currently unavailable for ${marketSymbols.join(', ')}. ` +
                        'Please try again shortly or enter the metal price per kg manually.',
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

        // no scrap details (weight / PPM 0): show the price per kg (live market price when not entered)
        const prices = valuationStatus === VALUATION_STATUS.PENDING
            ? {
                platinum: platinum.pricePerKg,
                palladium: palladium.pricePerKg,
                rhodium: rhodium.pricePerKg,
                grandTotal: round2(platinum.pricePerKg + palladium.pricePerKg + rhodium.pricePerKg),
            }
            : calculatedPrices

        const now = toMysqlDateTime(new Date())

        const saved = await metalCalculatorModel.saveCalculation({
            customersId: req.user?.id ?? 0,
            appId: req.user?.app_id ?? null,
            deviceId: req.user?.device_id ?? null,
            currency,
            weightUnit,
            weight,
            weightKg: round4(weightKg),
            platinumPpm: platinum.ppm,
            palladiumPpm: palladium.ppm,
            rhodiumPpm: rhodium.ppm,
            returnRatePt: platinum.returnRate,
            returnRatePd: palladium.returnRate,
            returnRateRh: rhodium.returnRate,
            minimumDeductionPt: platinum.minimumDeduction,
            minimumDeductionPd: palladium.minimumDeduction,
            minimumDeductionRh: rhodium.minimumDeduction,
            treatmentFee,
            refiningChargePt: platinum.refiningChargePerKg,
            refiningChargePd: palladium.refiningChargePerKg,
            refiningChargeRh: rhodium.refiningChargePerKg,
            daysOut,
            interestRate,
            platinumPricePerKg: platinum.pricePerKg,
            palladiumPricePerKg: palladium.pricePerKg,
            rhodiumPricePerKg: rhodium.pricePerKg,
            platinumPriceSource: platinum.priceSource,
            palladiumPriceSource: palladium.priceSource,
            rhodiumPriceSource: rhodium.priceSource,
            platinumPrice: prices.platinum,
            palladiumPrice: prices.palladium,
            rhodiumPrice: prices.rhodium,
            grandTotal: prices.grandTotal,
            grossValue: round2(grossValue),
            totalRefiningCharge: round2(totalRefiningCharge),
            totalTreatmentFee: round2(totalTreatmentFee),
            financeCharge: round2(financeCharge),
            totalValue: round2(totalValue),
            createdAt: now,
            updatedAt: now,
        })

        return res.status(200).json(convertNulls({
            success: true,
            message: 'Metal price calculated successfully.',
            data: {
                id: saved?.id ?? null,
                valuation_status: valuationStatus,
                valuation_message: VALUATION_MESSAGES[valuationStatus],
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
                totalValue: round2(totalValue),
                prices: { ...currencyFields(currency), ...prices },
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

const formatCalculation = (record) => ({
    id: record.id,
    ...currencyFields(record.currency),
    weightUnit: record.weightUnit,
    weight: record.weight,
    weightKg: record.weightKg,
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
    breakdown: [
        {
            symbol: 'XPT',
            name: 'Platinum',
            ppm: record.platinumPpm,
            minimumDeduction: record.minimumDeductionPt,
            returnRate: record.returnRatePt,
            ...currencyFields(record.currency),
            pricePerKg: record.platinumPricePerKg,
            priceSource: record.platinumPriceSource,
            refiningChargePerKg: record.refiningChargePt,
            value: record.platinumPrice,
        },
        {
            symbol: 'XPD',
            name: 'Palladium',
            ppm: record.palladiumPpm,
            minimumDeduction: record.minimumDeductionPd,
            returnRate: record.returnRatePd,
            ...currencyFields(record.currency),
            pricePerKg: record.palladiumPricePerKg,
            priceSource: record.palladiumPriceSource,
            refiningChargePerKg: record.refiningChargePd,
            value: record.palladiumPrice,
        },
        {
            symbol: 'XRH',
            name: 'Rhodium',
            ppm: record.rhodiumPpm,
            minimumDeduction: record.minimumDeductionRh,
            returnRate: record.returnRateRh,
            ...currencyFields(record.currency),
            pricePerKg: record.rhodiumPricePerKg,
            priceSource: record.rhodiumPriceSource,
            refiningChargePerKg: record.refiningChargeRh,
            value: record.rhodiumPrice,
        },
    ],
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
})

// money columns of wl_metal_calculator (amounts and per-kg prices / charges / fees)
const MONEY_FIELDS = [
    'treatmentFee',
    'refiningChargePt', 'refiningChargePd', 'refiningChargeRh',
    'platinumPricePerKg', 'palladiumPricePerKg', 'rhodiumPricePerKg',
    'platinumPrice', 'palladiumPrice', 'rhodiumPrice', 'grandTotal',
    'grossValue', 'totalRefiningCharge', 'totalTreatmentFee', 'financeCharge', 'totalValue',
]

// records saved in another currency (older INR records) are shown in USD at the live exchange rate
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

const getMetalPriceCalculations = async (req, res) => {
    try {
        const records = await metalCalculatorModel.getCalculations()

        let usdRecords
        try {
            usdRecords = await toCalculatorCurrency(records)
        } catch (error) {
            console.error('Metal price calculator exchange rate error:', error.message)

            return res.status(503).json({
                success: false,
                message: `Exchange rate to ${CURRENCY} is currently unavailable. Please try again shortly.`,
            })
        }

        return res.status(200).json(convertNulls({
            success: true,
            message: 'Metal price calculations retrieved successfully.',
            data: {
                total: usdRecords.length,
                records: usdRecords.map(formatCalculation),
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

module.exports = { calculateMetalPrice, getMetalPriceCalculations }
