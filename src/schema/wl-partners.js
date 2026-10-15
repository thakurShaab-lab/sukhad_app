const { mysqlTable, primaryKey, int, tinyint, varchar, tinytext, datetime } = require("drizzle-orm/mysql-core");

const wlPartners = mysqlTable("wl_partners", {
	partnerId: int("partner_id").autoincrement().notNull(),
	templeId: int("temple_id").default(0).notNull(),
	partnerName: varchar("partner_name", { length: 120 }).notNull(),
	designation: varchar({ length: 255 }),
	mobileNumber: varchar("mobile_number", { length: 20 }),
	experience: varchar({ length: 100 }),
	partnerImage: varchar("partner_image", { length: 150 }),
	shortDesc: tinytext("short_desc"),
	sortOrder: int("sort_order"),
	status: tinyint().default(1).notNull(),
	dateAdded: datetime("date_added", { mode: 'string'}).notNull(),
	dateUpdated: datetime("date_updated", { mode: 'string'}),
},
(table) => [
	primaryKey({ columns: [table.partnerId], name: "wl_partners_partner_id"}),
]);

module.exports = { wlPartners };
