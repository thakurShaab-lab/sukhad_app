const { mysqlTable, primaryKey, int, varchar, text, datetime } = require("drizzle-orm/mysql-core")

const wlWebhookDetails = mysqlTable("wl_webhook_details", {
	id: int().autoincrement().notNull(),
	ipAddress: varchar("ip_address", { length: 50 }),
	userAgent: varchar("user_agent", { length: 255 }),
	webhookData: text("webhook_data").notNull(),
	receiveDate: datetime("receive_date", { mode: 'string'}),
},
(table) => [
	primaryKey({ columns: [table.id], name: "wl_webhook_details_id"}),
])

module.exports = { wlWebhookDetails }
