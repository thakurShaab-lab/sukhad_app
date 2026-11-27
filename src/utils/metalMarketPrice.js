/**
 * Live market prices per KG for the metal price calculator.
 *
 * Provider: metals-api.com (METAL_API_BASE_URL / METAL_API_ACCESS_KEY in .env).
 * The provider quotes per troy ounce directly in the requested currency, so:
 *   price per KG = price per troy ounce x 1000 / 31.1034768
 * Never returns fabricated or fallback prices: any failure is thrown to the caller.
 */
const { getLatestMetalQuote } = require('./metalData')
const { ouncePriceToKg } = require('./metalPricing')

const MARKET_PRICE_SOURCE = 'metals-api.com'

/**
 * @param symbols  e.g. ['XPT', 'XRH'] - only the metals whose price was not supplied
 * @param currency ISO currency code, e.g. 'INR', 'USD'
 * @returns { source, currency, unit, quoteTimestamp, fetchedAt, pricesPerKg: { XPT: 3855706.35, ... } }
 */
const getMarketPricesPerKg = async (symbols, currency) => {
    const quote = await getLatestMetalQuote(symbols, currency)

    const pricesPerKg = Object.fromEntries(
        Object.entries(quote.prices).map(([symbol, perOunce]) => [symbol, ouncePriceToKg(perOunce)])
    )

    for (const [symbol, price] of Object.entries(pricesPerKg)) {
        if (!Number.isFinite(price) || price <= 0) {
            throw new Error(`Invalid market price received for ${symbol}`)
        }
    }

    return {
        source: MARKET_PRICE_SOURCE,
        currency: quote.currency,
        unit: 'kg',
        quoteTimestamp: quote.timestamp,
        fetchedAt: quote.fetchedAt,
        pricesPerKg,
    }
}

module.exports = { MARKET_PRICE_SOURCE, getMarketPricesPerKg }
