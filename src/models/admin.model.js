const { eq, and, asc } = require('drizzle-orm')
const db = require('../config/drizzle')
const { tblAdmin } = require('../schema/tbl-admin')

// admin_cent (percentage) of the active super admin (admin_type 1)
const getAdminCent = async () => {
    const [admin] = await db
        .select({ adminCent: tblAdmin.adminCent })
        .from(tblAdmin)
        .where(
            and(
                eq(tblAdmin.adminType, '1'),
                eq(tblAdmin.status, '1')
            )
        )
        .orderBy(asc(tblAdmin.adminId))
        .limit(1)

    return admin ? admin.adminCent : null
}

module.exports = { getAdminCent }
