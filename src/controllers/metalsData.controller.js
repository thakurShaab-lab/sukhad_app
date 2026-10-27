const { getMetalRates } = require('../utils/metalData')
const { calculateMetalValue } = require('../utils/valueCalculator')
const { validateRequestDevice } = require('./device&app.controller')
const { convertNulls } = require('../utils/convertNulls')

const metalData = async (req, res) => {
  try {
    if (!(await validateRequestDevice(req, res))) return
    const { metals } = req.body

    if (metals !== undefined && typeof metals !== 'string') {
      return res.status(400).json({
        success: false,
        message: '"metals" must be a string',
      })
    }

    const data = await getMetalRates(metals)

    res.status(200).json(convertNulls({
      success: true,
      data,
    }))
  } catch (error) {
    console.error('All metal data API error:', error.message)

    res.status(500).json({
      success: false,
      message: 'Unable to fetch metal rates',
    })
  }
}

const INPUTS = [
    { key: 'platinum_ppm', symbol: 'XPT' },
    { key: 'palladium_ppm', symbol: 'XPD' },
    { key: 'rhodium_ppm', symbol: 'XRH' },
]

// empty/missing PPM counts as 0 (the screen shows 0.00 placeholders)
const toNumber = (value) =>
    value === undefined || value === null || String(value).trim() === ''
        ? 0
        : Number(value)

const calculateMetalVlue = async (req, res) => {
    try {
        if (!(await validateRequestDevice(req, res))) return
        const { metals } = req.body
        const weightKg = toNumber(req.body.weight_kg)
        const ppmValues = INPUTS.map((i) => ({ ...i, ppm: toNumber(req.body[i.key]) }))

        if (!Number.isFinite(weightKg) || weightKg <= 0) {
            return res.status(400).json({
                success: false,
                message: 'weight_kg must be a number greater than 0.',
            })
        }

        const invalid = ppmValues.find((i) => !Number.isFinite(i.ppm) || i.ppm < 0)
        if (invalid) {
            return res.status(400).json({
                success: false,
                message: `${invalid.key} must be a number of 0 or more.`,
            })
        }

        const rates = await getMetalRates(metals)
        if (!rates.metals.length) {
            return res.status(503).json({
                success: false,
                message: 'Market rates are currently unavailable. Please try again.',
            })
        }

        const breakdown = ppmValues.map(({ key, symbol, ppm }) => {
            const metal = rates.metals.find((m) => m.symbol === symbol)
            if (!metal) {
                throw new Error(`Market rate for ${symbol} is not available.`)
            }

            const result = calculateMetalValue({
                ppm,
                weightKg,
                pricePerOz: metal.price,
            })

            return {
                symbol,
                name: metal.name,
                ppm,
                pricePerOz: metal.price,
                ...result,
            }
        })

        const estimatedValue =
            Math.round(breakdown.reduce((sum, b) => sum + b.value, 0) * 100) / 100

        return res.status(200).json(convertNulls({
            success: true,
            message: 'Estimated value calculated successfully.',
            data: {
                currency: rates.currency,
                weightKg,
                estimatedValue,
                recoveryRate: RECOVERY_RATE,
                ratesUpdatedAt: rates.updatedAt,
                breakdown,
                disclaimer: 'Indicative only. The calculation formula is a placeholder and will follow JV CatTrade\'s final business logic.',
            },
        }))
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

module.exports = { metalData, calculateMetalVlue }