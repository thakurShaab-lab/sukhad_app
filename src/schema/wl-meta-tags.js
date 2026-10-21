const { mysqlTable, mysqlEnum, primaryKey, int, varchar } = require("drizzle-orm/mysql-core")

const wlMetaTags = mysqlTable("wl_meta_tags", {
	metaId: int("meta_id").autoincrement().notNull(),
	isFixed: mysqlEnum("is_fixed", ['Y','N']).default('N').notNull(),
	entityType: varchar("entity_type", { length: 180 }),
	entityId: int("entity_id").default(0).notNull(),
	pageUrl: varchar("page_url", { length: 250 }).notNull(),
	metaTitle: varchar("meta_title", { length: 255 }).notNull(),
	metaDescription: varchar("meta_description", { length: 500 }).notNull(),
	metaKeyword: varchar("meta_keyword", { length: 500 }),
	status: mysqlEnum(['0','1']).default('1').notNull(),
},
(table) => [
	primaryKey({ columns: [table.metaId], name: "wl_meta_tags_meta_id"}),
])

module.exports = { wlMetaTags }
