const { mysqlTable, primaryKey, int, tinyint, varchar, tinytext, datetime } = require("drizzle-orm/mysql-core")

const wlExpertise = mysqlTable("wl_expertise", {
	expertiseId: int("expertise_id").autoincrement().notNull(),
	templeId: int("temple_id").default(0).notNull(),
	expertiseName: varchar("expertise_name", { length: 120 }).notNull(),
	designation: varchar({ length: 255 }),
	mobileNumber: varchar("mobile_number", { length: 20 }),
	experience: varchar({ length: 100 }),
	expertiseImage: varchar("expertise_image", { length: 150 }),
	expertiseDescription: tinytext("expertise_description"),
	sortOrder: int("sort_order"),
	status: tinyint().default(1).notNull(),
	dateAdded: datetime("date_added", { mode: 'string'}).notNull(),
	dateUpdated: datetime("date_updated", { mode: 'string'}),
},
(table) => [
	primaryKey({ columns: [table.expertiseId], name: "wl_expertise_expertise_id"}),
])

module.exports = { wlExpertise }
