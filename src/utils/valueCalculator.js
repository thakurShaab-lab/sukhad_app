const GRAMS_PER_TROY_OZ = 31.1034768

const RECOVERY_RATE = Number(process.env.RECOVERY_RATE ?? 1)

const round2 = (n) => Math.round(n * 100) / 100
const round4 = (n) => Math.round(n * 10000) / 10000

const calculateMetalValue = ({ ppm, weightKg, pricePerOz }) => {
    const grams = (weightKg * ppm) / 1000
    const troyOunces = grams / GRAMS_PER_TROY_OZ
    const value = troyOunces * pricePerOz * RECOVERY_RATE

    return {
        grams: round4(grams),
        troyOunces: round4(troyOunces),
        value: round2(value),
    }
}

module.exports = { calculateMetalValue, RECOVERY_RATE }