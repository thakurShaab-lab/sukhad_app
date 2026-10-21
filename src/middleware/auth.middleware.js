const db = require('../config/drizzle')
const { eq, and } = require('drizzle-orm')
const crypto = require('crypto')
const { wlCustomers } = require('../schema/wl-customers')


const authTokenMiddleware = (req, res, next) => {
    const expectedToken = process.env.AUTH_TOKEN

    if (!expectedToken) {
        console.error('AUTH_TOKEN is not configured.')

        return res.status(500).json({
            success: false,
            message: 'Server authentication is not configured.',
        })
    }

    const providedToken = req.headers.authorization

    if (typeof providedToken !== 'string' || !providedToken.trim()) {
        return res.status(401).json({
            success: false,
            message: 'Authorization token is required.',
        })
    }

    expected = Buffer.from(expectedToken)
    provided = Buffer.from(providedToken.trim())

    isValid =
        expected.length === provided.length &&
        crypto.timingSafeEqual(expected, provided)

    if (!isValid) {
        return res.status(401).json({
            success: false,
            message: 'Invalid authorization token.',
        })
    }

    next()
}

const deviceAuthMiddleware = async (req, res, next) => {
  try {
    const appId = req.headers['app_id'] || req.body?.app_id
    const deviceId = req.headers['device_id'] || req.body?.device_id

    if (
      typeof appId !== 'string' ||
      typeof deviceId !== 'string' ||
      !appId.trim() ||
      !deviceId.trim()
    ) {
      return res.status(401).json({
        success: false,
        message: 'app_id and device_id are required.',
      })
    }

    const [customer] = await db
      .select({
        customersId: wlCustomers.customersId,
        appId: wlCustomers.appId,
        deviceId: wlCustomers.deviceId,
      })
      .from(wlCustomers)
      .where(
        and(
          eq(wlCustomers.appId, appId.trim()),
          eq(wlCustomers.deviceId, deviceId.trim()),
        )
      )
      .limit(1)

    if (!customer) {
      return res.status(401).json({
        success: false,
        message: 'Invalid app_id or device_id, or account is inactive.',
      })
    }

    req.user = {
      id: customer.customersId,
      app_id: customer.appId,
      device_id: customer.deviceId,
    }

    next()
  } catch (error) {
    console.error('Device authentication error:', error)

    return res.status(500).json({
      success: false,
      message: 'Internal server error.',
    })
  }
}

module.exports = { authTokenMiddleware, deviceAuthMiddleware }