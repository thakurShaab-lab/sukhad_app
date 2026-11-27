// currency code -> display symbol, e.g. USD -> "$", INR -> "₹"
const CURRENCY_SYMBOLS = {
    USD: '$',
    INR: '₹',
}

const getCurrencySymbol = (currency) => {
    const code = String(currency || '').trim().toUpperCase()
    if (CURRENCY_SYMBOLS[code]) return CURRENCY_SYMBOLS[code]

    // any other ISO code: the symbol from the runtime, else the code itself
    try {
        const part = new Intl.NumberFormat('en', { style: 'currency', currency: code })
            .formatToParts(0)
            .find((p) => p.type === 'currency')
        return part?.value || code
    } catch {
        return code
    }
}

// { currency, currencySymbol } for spreading into a response object
const currencyFields = (currency) => {
    const code = String(currency || '').trim().toUpperCase()
    return { currency: code, currencySymbol: getCurrencySymbol(code) }
}

module.exports = { CURRENCY_SYMBOLS, getCurrencySymbol, currencyFields }
