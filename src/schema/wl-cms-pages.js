const { mysqlTable, mysqlEnum, primaryKey, int, varchar, text, longtext, datetime } = require("drizzle-orm/mysql-core");

const wlCmsPages = mysqlTable("wl_cms_pages", {
	pageId: int("page_id").autoincrement().notNull(),
	parentId: int("parent_id").default(0).notNull(),
	pageName: varchar("page_name", { length: 50 }).default('').notNull(),
	friendlyUrl: varchar("friendly_url", { length: 50 }).notNull(),
	pageDescription: longtext("page_description").notNull(),
	pageShortDescription: text("page_short_description"),
	cmsType: mysqlEnum("cms_type", ['0','1']),
	pageImage: varchar("page_image", { length: 150 }).notNull(),
	status: mysqlEnum(['0','1','2']).default('1').notNull(),
	pageUpdatedDate: datetime("page_updated_date", { mode: 'string'}).notNull(),
},
(table) => [
	primaryKey({ columns: [table.pageId], name: "wl_cms_pages_page_id"}),
]);

module.exports = { wlCmsPages };
