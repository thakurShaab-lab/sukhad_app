/**
 * Metal price calculator (/metal_stats_pages/metal-price-calculator) - calculation logic only.
 * Not used by product pricing (see productPricing.js).
 *
 * Based on the "UPDATED SUKHAD ENTERPRISES" workbook, calculated in KG instead of troy ounces
 * (prices are per KG), with no 3-decimal truncation of quantities.
 *
 * Per metal (Pt, Pd, Rh):
 *   1. Theoretical KG = scrap weight KG x PPM / 1,000,000
 *   2. Returned KG    = theoretical KG x return rate / 100
 *   3. Payable KG     = minimum deduction (PPM of the scrap weight) applied after the return rate:
 *                       payable KG = max(min(returned KG, theoretical KG - weight KG x deduction PPM / 1,000,000), 0)
 *                       i.e. the deduction is the return-rate loss, but never less than the minimum deduction.
 *                       With deduction 0 this is exactly the workbook (returned KG).
 *   4. Metal value    = payable KG x price per KG
 *   5. Refining       = payable KG x refining charge per KG
 * Totals:
 *   6. Gross metal value = Pt value + Pd value + Rh value
 *   7. Treatment fee     = scrap weight KG x treatment fee (charged once)
 *   8. Lease charge      = gross metal value x interest rate / 100 x days out / 365   (workbook: =B18*B19*120/365)
 *   9. Final scrap value = gross metal value - refining charges - treatment fee - lease charge
 */

// metal price calculator currency (product prices in productPricing.js stay in INR)
const CURRENCY = 'USD'
const PPM_DIVISOR = 1000000
const GRAMS_PER_KG = 1000
const KG_PER_LB = 0.45359237
const GRAMS_PER_TROY_OZ = 31.1034768
const TROY_OZ_PER_KG = GRAMS_PER_KG / GRAMS_PER_TROY_OZ
const DAYS_PER_YEAR = 365

// defaults shown in the calculator settings screen
const DEFAULT_RETURN_RATE = 85
const DEFAULT_DAYS_OUT = 120

const VALUATION_STATUS = {
    CALCULATED: 'calculated',
    PENDING: 'pending_scrap_details',
}

// decimal-safe rounding (avoids 1.005 -> 1.00 style floating-point errors); only applied to outputs
const roundTo = (n, places) => {
    if (!Number.isFinite(n)) return 0
    const factor = 10 ** places
    // the relative epsilon nudge fixes binary representation errors such as 1.005 * 100 = 100.49999999999999
    const rounded = Math.round(Math.abs(n) * factor * (1 + Number.EPSILON)) / factor
    return (n < 0 ? -rounded : rounded) || 0
}
const round2 = (n) => roundTo(n, 2)
const round4 = (n) => roundTo(n, 4)
const round8 = (n) => roundTo(n, 8)

// price per troy ounce -> price per KG
const ouncePriceToKg = (pricePerOunce) => pricePerOunce * TROY_OZ_PER_KG

/**
 * @param weight, weightUnit ('kg' | 'lb'), treatmentFee (per KG of scrap), daysOut, interestRate (% per year)
 * @param metals [{ symbol, name, ppm, pricePerKg, priceSource, returnRate, minimumDeduction (PPM), refiningChargePerKg }]
 *               in the order platinum, palladium, rhodium
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
    const hasScrapDetails = weightKg > 0 && metals.some((metal) => metal.ppm > 0)

    const exact = metals.map((metal) => {
        const theoreticalKg = (weightKg * metal.ppm) / PPM_DIVISOR
        const returnedKg = (theoreticalKg * metal.returnRate) / 100
        const minimumDeductionKg = (weightKg * metal.minimumDeduction) / PPM_DIVISOR
        const payableKg = Math.max(Math.min(returnedKg, theoreticalKg - minimumDeductionKg), 0)
        const grossValue = payableKg * metal.pricePerKg
        const refiningCharge = payableKg * metal.refiningChargePerKg

        return { metal, theoreticalKg, returnedKg, minimumDeductionKg, payableKg, grossValue, refiningCharge }
    })

    const grossValue = exact.reduce((sum, item) => sum + item.grossValue, 0)
    const totalRefiningCharge = exact.reduce((sum, item) => sum + item.refiningCharge, 0)
    const totalTreatmentFee = hasScrapDetails ? weightKg * treatmentFee : 0
    const financeCharge = grossValue * (interestRate / 100) * (daysOut / DAYS_PER_YEAR)
    const totalValue = grossValue - totalRefiningCharge - totalTreatmentFee - financeCharge

    const breakdown = exact.map(({ metal, theoreticalKg, returnedKg, minimumDeductionKg, payableKg, grossValue: value, refiningCharge }) => ({
        symbol: metal.symbol,
        name: metal.name,
        ppm: metal.ppm,
        minimumDeduction: metal.minimumDeduction,
        payablePpm: weightKg > 0 ? round4((payableKg / weightKg) * PPM_DIVISOR) : 0,
        returnRate: metal.returnRate,
        pricePerKg: round2(metal.pricePerKg),
        priceSource: metal.priceSource,
        refiningChargePerKg: metal.refiningChargePerKg,
        metalWeightKg: round8(theoreticalKg),
        metalWeightGrams: round4(theoreticalKg * GRAMS_PER_KG),
        returnedWeightKg: round8(returnedKg),
        minimumDeductionWeightKg: round8(minimumDeductionKg),
        payableWeightKg: round8(payableKg),
        payableWeightGrams: round4(payableKg * GRAMS_PER_KG),
        grossValue: round2(value),
        refiningCharge: round2(refiningCharge),
        value: round2(value - refiningCharge),
    }))

    // individual net price of each metal and their grand total (summed from exact values, rounded once)
    const net = exact.map((item) => item.grossValue - item.refiningCharge)
    const prices = {
        platinum: round2(net[0]),
        palladium: round2(net[1]),
        rhodium: round2(net[2]),
        grandTotal: round2(net[0] + net[1] + net[2]),
    }

    return {
        valuationStatus: hasScrapDetails ? VALUATION_STATUS.CALCULATED : VALUATION_STATUS.PENDING,
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

module.exports = {
    CURRENCY,
    DEFAULT_RETURN_RATE,
    DEFAULT_DAYS_OUT,
    VALUATION_STATUS,
    round2,
    round4,
    ouncePriceToKg,
    calculateMetalValues,
}
