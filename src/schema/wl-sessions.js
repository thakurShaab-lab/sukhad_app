const { mysqlTable, int, varchar } = require("drizzle-orm/mysql-core");
const { blob } = require("./custom-types");

const wlSessions = mysqlTable("wl_sessions", {
	id: varchar({ length: 128 }).notNull(),
	ipAddress: varchar("ip_address", { length: 45 }).notNull(),
	timestamp: int({ unsigned: true }).default(0).notNull(),
	data: blob("data").notNull(),
});

module.exports = { wlSessions };
