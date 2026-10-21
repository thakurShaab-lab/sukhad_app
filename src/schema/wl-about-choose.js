const { mysqlTable, primaryKey, int, tinyint, varchar, tinytext, datetime } = require("drizzle-orm/mysql-core")

const wlAboutChoose = mysqlTable("wl_about_choose", {
	chooseId: int("choose_id").autoincrement().notNull(),
	chooseTitle: varchar("choose_title", { length: 120 }).notNull(),
	chooseDescription: tinytext("choose_description"),
	sortOrder: int("sort_order"),
	status: tinyint().default(1).notNull(),
	dateAdded: datetime("date_added", { mode: 'string'}).notNull(),
	dateUpdated: datetime("date_updated", { mode: 'string'}),
},
(table) => [
	primaryKey({ columns: [table.chooseId], name: "wl_about_choose_choose_id"}),
])

module.exports = { wlAboutChoose }
