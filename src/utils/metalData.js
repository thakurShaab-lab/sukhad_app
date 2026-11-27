const { currencyFields } = require('./currencySymbol')

const ATOMIC_NUMBERS = {
  H: 1, He: 2, Li: 3, Be: 4, B: 5, C: 6, N: 7, O: 8, F: 9, Ne: 10,
  Na: 11, Mg: 12, Al: 13, Si: 14, P: 15, S: 16, Cl: 17, Ar: 18,
  K: 19, Ca: 20, Sc: 21, Ti: 22, V: 23, Cr: 24, Mn: 25, Fe: 26,
  Co: 27, Ni: 28, Cu: 29, Zn: 30, Ga: 31, Ge: 32, As: 33, Se: 34,
  Br: 35, Kr: 36, Rb: 37, Sr: 38, Y: 39, Zr: 40, Nb: 41, Mo: 42,
  Tc: 43, Ru: 44, Rh: 45, Pd: 46, Ag: 47, Cd: 48, In: 49, Sn: 50,
  Sb: 51, Te: 52, I: 53, Xe: 54, Cs: 55, Ba: 56, La: 57, Ce: 58,
  Pr: 59, Nd: 60, Pm: 61, Sm: 62, Eu: 63, Gd: 64, Tb: 65, Dy: 66,
  Ho: 67, Er: 68, Tm: 69, Yb: 70, Lu: 71, Hf: 72, Ta: 73, W: 74,
  Re: 75, Os: 76, Ir: 77, Pt: 78, Au: 79, Hg: 80, Tl: 81, Pb: 82,
  Bi: 83, Po: 84, At: 85, Rn: 86, Fr: 87, Ra: 88, Ac: 89, Th: 90,
  Pa: 91, U: 92, Np: 93, Pu: 94, Am: 95, Cm: 96, Bk: 97, Cf: 98,
  Es: 99, Fm: 100, Md: 101, No: 102, Lr: 103, Rf: 104, Db: 105,
  Sg: 106, Bh: 107, Hs: 108, Mt: 109, Ds: 110, Rg: 111, Cn: 112,
  Nh: 113, Fl: 114, Mc: 115, Lv: 116, Ts: 117, Og: 118,
}

const BASE_URL = process.env.METAL_API_BASE_URL
const API_KEY = process.env.METAL_API_ACCESS_KEY

const METAL_SYMBOLS = (
  process.env.METAL_SYMBOLS || 'XRH,XPD,XPT'
)
  .split(',')
  .map((symbol) => symbol.trim())
  .filter(Boolean);

const SHORT_TTL_MS = 60 * 1000
const LONG_TTL_MS = 24 * 60 * 60 * 1000
const cache = new Map()

const cached = (key, ttlMs, loader) => {
  const now = Date.now()
  const hit = cache.get(key)
  if (hit && hit.expiresAt > now) return hit.promise

  for (const [k, v] of cache) {
    if (v.expiresAt <= now) cache.delete(k)
  }

  const promise = loader().catch((error) => {
    cache.delete(key)
    throw error
  })
  cache.set(key, { promise, expiresAt: now + ttlMs })
  return promise
}

const getMonthlyStats = async (symbol, latestPrice, base = 'INR') => {
  const endDate = new Date()
  const startDate = new Date(endDate)
  startDate.setMonth(startDate.getMonth() - 1)

  const dates = []

  for (
    const d = new Date(startDate);
    d <= endDate;
    d.setDate(d.getDate() + 1)
  ) {
    dates.push(d.toISOString().slice(0, 10))
  }

  const results = await Promise.all(
    dates.map(async (date) => {
      try {
        const rates = await fetchRates(date, [symbol], base)

        const price = pricePerOunce(rates, symbol, base)

        if (!Number.isFinite(price) || price <= 0) {
          return null
        }

        return { date, price }
      } catch (error) {
        console.warn(
          `Historical rate unavailable for ${symbol} on ${date}:`,
          error.message
        )
        return null
      }
    })
  )

  const history = results
    .filter(Boolean)
    .sort((a, b) => a.date.localeCompare(b.date))

  if (
    !Number.isFinite(latestPrice) ||
    latestPrice <= 0 ||
    history.length === 0
  ) {
    return {
      periodHigh: null,
      periodLow: null,
      monthlyChange: null,
      monthlyChangePercent: null,
    }
  }

  const firstPrice = history[0].price

  const prices = [
    ...history.map((item) => item.price),
    latestPrice,
  ]

  const monthlyChange = latestPrice - firstPrice
  const monthlyChangePercent =
    firstPrice > 0
      ? (monthlyChange / firstPrice) * 100
      : null

  return {
    periodHigh: round2(Math.max(...prices)),
    periodLow: round2(Math.min(...prices)),
    monthlyChange: round2(monthlyChange),
    monthlyChangePercent:
      monthlyChangePercent === null
        ? null
        : round2(monthlyChangePercent),
  }
}

const round2 = (n) => Math.round(n * 100) / 100

// metals-api returns either a direct "<BASE><SYMBOL>" price (e.g. USDXPT),
// an inverted rate (metal units per 1 base unit, always < 1 for precious
// metals), or occasionally the price itself. Normalise to base per troy oz.
const pricePerOunce = (rates, symbol, base = 'INR') => {
  const direct = rates[`${base}${symbol}`]
  if (Number.isFinite(direct) && direct > 0) {
    return direct
  }

  const rate = rates[symbol]

  if (!Number.isFinite(rate) || rate <= 0) {
    throw new Error(`Invalid or missing rate for ${symbol}`)
  }

  return rate < 1 ? 1 / rate : rate
}

const METAL_NAME_TO_SYMBOL = {
  rhodium: 'XRH',
  palladium: 'XPD',
  platinum: 'XPT'
}

const fetchSymbols = () =>
  cached('symbols', LONG_TTL_MS, async () => {
    const res = await fetch(
      `${BASE_URL}/symbols?access_key=${API_KEY}`
    )

    const json = await res.json()

    if (!res.ok) {
      throw new Error(`Symbols API failed with HTTP ${res.status}`)
    }

    return json.symbols ?? json
  })

const getMetals = async (requestedNames) => {
  const symbolsData = await fetchSymbols()

  if (
    !symbolsData ||
    typeof symbolsData !== 'object' ||
    Array.isArray(symbolsData)
  ) {
    throw new Error('Invalid symbols API response')
  }

const inputs =
  typeof requestedNames === 'string' && requestedNames.trim()
    ? requestedNames.split(',').map((name) => name.trim()).filter(Boolean)
    : METAL_SYMBOLS;

  if (inputs.length === 0) {
    throw new Error('No metals configured or provided')
  }

  const symbols = inputs.map((input) => {
    const upper = input.toUpperCase()
    const symbol = METAL_NAME_TO_SYMBOL[input.toLowerCase()] || upper

    if (!symbolsData[symbol]) {
      throw new Error(`Unsupported metal: ${input}`)
    }

    return symbol
  })

  return [...new Set(symbols)].map((symbol) => {
    const item = symbolsData[symbol]
    const short = symbol.slice(1).toLowerCase()
    const normalizedShort =
      short.charAt(0).toUpperCase() + short.slice(1)

    return {
      symbol,
      name: item.name || symbol,
      short: normalizedShort,
      atomicNumber: ATOMIC_NUMBERS[normalizedShort] ?? null,
    }
  })
}

const fetchRates = (endpoint, symbols, base = 'INR') => {
  const today = new Date().toISOString().slice(0, 10)
  const ttlMs =
    endpoint === 'latest' || endpoint === today ? SHORT_TTL_MS : LONG_TTL_MS

  return cached(`${base}:${endpoint}:${symbols.join(',')}`, ttlMs, async () => {
    const params = new URLSearchParams({
      access_key: API_KEY,
      base,
      symbols: symbols.join(','),
    })

    const res = await fetch(`${BASE_URL}/${endpoint}?${params}`)
    const json = await res.json()
    if (!json.success) {
      throw new Error(json.error?.info || 'Metals API request failed')
    }
    return json.rates
  })
}

const buildMetalRates = async (requestedNames, base = 'INR') => {
  const metals = await getMetals(requestedNames)
  const symbols = metals.map((m) => m.symbol)

  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10)

  const [latest, previous] = await Promise.all([
    fetchRates('latest', symbols, base),
    fetchRates(yesterday, symbols, base),
  ])

  return Promise.all(
    metals.map(async (m) => {
      const price = pricePerOunce(latest, m.symbol, base)
      const prevPrice = pricePerOunce(previous, m.symbol, base)

      const change = price - prevPrice
      const changePercent =
        prevPrice > 0 ? (change / prevPrice) * 100 : null

      const monthly = await getMonthlyStats(m.symbol, price, base)

      return {
        ...m,
        ...currencyFields(base),
        price: round2(price),
        change: round2(change),
        changePercent:
          changePercent === null ? null : round2(changePercent),
        trend: change >= 0 ? 'up' : 'down',
        isPositive: change > 0,
        periodHigh: monthly.periodHigh,
        periodLow: monthly.periodLow,
        monthlyChange: monthly.monthlyChange,
        monthlyChangePercent: monthly.monthlyChangePercent,
      }
    })
  )
}

const getMetalRates = async (requestedNames, currency = 'INR') => {
  const base = String(currency).toUpperCase()
  const metals = await buildMetalRates(requestedNames, base)

  return {
    title: 'Live Precious Metal Rates.',
    subtitle: `${base}/Troy Ounce - Updated from Metal API.`,
    ...currencyFields(base),
    unit: 'troy oz',
    source: 'Metal API',
    updatedAt: new Date().toISOString(),
    metals,
  }
}

// latest price per troy ounce only (no daily / monthly history), e.g. { XPT: 137547.93, ... }
const getLatestMetalPrices = async (symbols, currency = 'INR') => {
  const base = String(currency).toUpperCase()
  const latest = await fetchRates('latest', symbols, base)

  return Object.fromEntries(
    symbols.map((symbol) => [symbol, pricePerOunce(latest, symbol, base)])
  )
}

const QUOTE_TIMEOUT_MS = 10 * 1000

/**
 * Latest price per troy ounce in the requested currency, with the provider's quote time.
 * The provider converts into the requested base currency itself (no separate exchange-rate call).
 * Cached for 60 seconds; the cache is dropped on failure, so a failed call is never served from stale data.
 * @returns { currency, prices: { XPT: 137547.93, ... }, timestamp (provider quote time, ISO), fetchedAt (ISO) }
 * @throws Error with code 'INVALID_CURRENCY' when the provider rejects the currency
 */
const getLatestMetalQuote = (symbols, currency = 'INR') => {
  const base = String(currency).toUpperCase()

  return cached(`quote:${base}:${symbols.join(',')}`, SHORT_TTL_MS, async () => {
    if (!BASE_URL || !API_KEY) {
      throw new Error('Market price API is not configured')
    }

    const params = new URLSearchParams({
      access_key: API_KEY,
      base,
      symbols: symbols.join(','),
    })

    let res
    try {
      res = await fetch(`${BASE_URL}/latest?${params}`, {
        signal: AbortSignal.timeout(QUOTE_TIMEOUT_MS),
      })
    } catch (error) {
      throw new Error(
        error.name === 'TimeoutError' ? 'Market price API timed out' : 'Market price API is unreachable'
      )
    }

    const json = await res.json().catch(() => null)

    if (!json?.success) {
      const info = json?.error?.info || json?.error?.type || `HTTP ${res.status}`
      const error = new Error(`Market price API request failed: ${info}`)
      if (/base|currency/i.test(`${json?.error?.type ?? ''} ${json?.error?.info ?? ''}`)) {
        error.code = 'INVALID_CURRENCY'
      }
      throw error
    }

    const prices = Object.fromEntries(
      symbols.map((symbol) => [symbol, pricePerOunce(json.rates || {}, symbol, base)])
    )

    return {
      currency: base,
      prices,
      timestamp: Number.isFinite(json.timestamp)
        ? new Date(json.timestamp * 1000).toISOString()
        : null,
      fetchedAt: new Date().toISOString(),
    }
  })
}

/**
 * Live exchange rate: how many `to` units 1 `from` unit is worth (e.g. INR -> USD = 0.01078).
 * Cached for 60 seconds; throws on failure (never returns a made-up rate).
 */
const getExchangeRate = (from, to) => {
  const source = String(from).toUpperCase()
  const target = String(to).toUpperCase()
  if (source === target) return Promise.resolve(1)

  return cached(`fx:${source}:${target}`, SHORT_TTL_MS, async () => {
    const params = new URLSearchParams({ access_key: API_KEY, base: target, symbols: source })

    const res = await fetch(`${BASE_URL}/latest?${params}`, {
      signal: AbortSignal.timeout(QUOTE_TIMEOUT_MS),
    })
    const json = await res.json().catch(() => null)
    const perTarget = json?.rates?.[source] // e.g. 92.74 INR per 1 USD

    if (!json?.success || !Number.isFinite(perTarget) || perTarget <= 0) {
      throw new Error(json?.error?.info || `Exchange rate ${source}/${target} is unavailable`)
    }

    return 1 / perTarget
  })
}

module.exports = { getMetalRates, getLatestMetalPrices, getLatestMetalQuote, getExchangeRate }