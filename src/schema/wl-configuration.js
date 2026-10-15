const { mysqlTable, primaryKey, int, varchar, text, datetime } = require("drizzle-orm/mysql-core");

const wlConfiguration = mysqlTable("wl_configuration", {
	sl: int().autoincrement().notNull(),
	type: varchar({ length: 30 }).notNull(),
	value: text().notNull(),
	upDate: datetime("up_date", { mode: 'string'}).notNull(),
},
(table) => [
	primaryKey({ columns: [table.sl], name: "wl_configuration_sl"}),
]);

module.exports = { wlConfiguration };
