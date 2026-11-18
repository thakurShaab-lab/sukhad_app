const { convertNulls } = require('../utils/convertNulls')
const metalCalculatorModel = require('../models/metalCalculator.model')
const {
    CURRENCY,
    DEFAULT_RETURN_RATE,
    DEFAULT_DAYS_OUT,
    round2,
    round4,
    getMarketPricesPerKg,
    calculateMetalValues,
} = require('../utils/metalPricing')

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

        const currency = isEmpty(body.currency)
            ? CURRENCY
            : String(body.currency).trim().toUpperCase()

        if (currency !== CURRENCY) {
            return badRequest(res, `Only ${CURRENCY} currency is supported.`)
        }

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
            pricePerKg: isEmpty(body[metal.priceKey]) ? null : Number(body[metal.priceKey]),
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

        // by default the calculator uses current market prices for any price not entered
        const needsMarketPrice = inputs.some((input) => input.pricePerKg === null)
        let marketPrices = {}

        if (needsMarketPrice) {
            try {
                marketPrices = await getMarketPricesPerKg(inputs.map((input) => input.symbol))
            } catch (error) {
                console.error('Metal price calculator market rate error:', error.message)

                return res.status(503).json({
                    success: false,
                    message: 'Market rates are currently unavailable. Please enter the metal prices manually.',
                })
            }
        }

        // shared pricing logic (also used for the product list / detail prices)
        const {
            weightKg,
            grossValue,
            totalRefiningCharge,
            totalTreatmentFee,
            financeCharge,
            totalValue,
            prices,
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
                    ? marketPrices[input.symbol] ?? 0
                    : input.pricePerKg,
            })),
        })

        const [platinum, palladium, rhodium] = breakdown

        const now = toMysqlDateTime(new Date())

        const saved = await metalCalculatorModel.saveCalculation({
            customersId: req.user?.id ?? 0,
            appId: req.user?.app_id ?? null,
            deviceId: req.user?.device_id ?? null,
            currency: CURRENCY,
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
                currency: CURRENCY,
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
                prices,
                breakdown,
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
    currency: record.currency,
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
            pricePerKg: record.rhodiumPricePerKg,
            priceSource: record.rhodiumPriceSource,
            refiningChargePerKg: record.refiningChargeRh,
            value: record.rhodiumPrice,
        },
    ],
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
})

const getMetalPriceCalculations = async (req, res) => {
    try {
        const records = await metalCalculatorModel.getCalculations()

        return res.status(200).json(convertNulls({
            success: true,
            message: 'Metal price calculations retrieved successfully.',
            data: {
                total: records.length,
                records: records.map(formatCalculation),
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
