const { mysqlTable, primaryKey, int, smallint, float, varchar, text } = require("drizzle-orm/mysql-core");

const restLogs = mysqlTable("rest_logs", {
	id: int().autoincrement().notNull(),
	uri: varchar({ length: 255 }).notNull(),
	method: varchar({ length: 6 }).notNull(),
	params: text(),
	apiKey: varchar("api_key", { length: 40 }).notNull(),
	ipAddress: varchar("ip_address", { length: 45 }).notNull(),
	time: int().notNull(),
	rtime: float(),
	authorized: varchar({ length: 1 }).notNull(),
	responseCode: smallint("response_code").default(0),
},
(table) => [
	primaryKey({ columns: [table.id], name: "rest_logs_id"}),
]);

module.exports = { restLogs };
