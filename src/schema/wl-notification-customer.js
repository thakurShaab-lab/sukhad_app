const { mysqlTable, mysqlEnum, primaryKey, int, datetime } = require("drizzle-orm/mysql-core");

const wlNotificationCustomer = mysqlTable("wl_notification_customer", {
	id: int().autoincrement().notNull(),
	notificationId: int("notification_id").notNull(),
	customerId: int("customer_id").notNull(),
	readStatus: mysqlEnum("read_status", ['R','U']).default('U').notNull(),
	createdAt: datetime("created_at", { mode: 'string'}),
},
(table) => [
	primaryKey({ columns: [table.id], name: "wl_notification_customer_id"}),
]);

module.exports = { wlNotificationCustomer };
