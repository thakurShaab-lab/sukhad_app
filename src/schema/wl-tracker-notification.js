const { mysqlTable, primaryKey, index, int, varchar, datetime } = require("drizzle-orm/mysql-core")

const wlTrackerNotification = mysqlTable("wl_tracker_notification", {
	notifyId: int("notify_id").autoincrement().notNull(),
	notifyType: varchar("notify_type", { length: 35 }).notNull(),
	memberId: int("member_id").notNull(),
	notifyRefId: int("notify_ref_id").notNull(),
	notifyDate: datetime("notify_date", { mode: 'string'}).notNull(),
},
(table) => [
	index("notify_type").on(table.notifyType, table.memberId, table.notifyRefId),
	primaryKey({ columns: [table.notifyId], name: "wl_tracker_notification_notify_id"}),
])

module.exports = { wlTrackerNotification }
