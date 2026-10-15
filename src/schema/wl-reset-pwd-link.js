const { mysqlTable, primaryKey, index, int, varchar, datetime } = require("drizzle-orm/mysql-core");

const wlResetPwdLink = mysqlTable("wl_reset_pwd_link", {
	id: int().autoincrement().notNull(),
	userId: int("user_id").notNull(),
	code: varchar({ length: 20 }).notNull(),
	expire: datetime({ mode: 'string'}).notNull(),
	added: datetime({ mode: 'string'}).notNull(),
},
(table) => [
	index("user_id").on(table.userId),
	primaryKey({ columns: [table.id], name: "wl_reset_pwd_link_id"}),
]);

module.exports = { wlResetPwdLink };
