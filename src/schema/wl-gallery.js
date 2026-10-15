const { mysqlTable, mysqlEnum, primaryKey, int, varchar, datetime } = require("drizzle-orm/mysql-core");

const wlGallery = mysqlTable("wl_gallery", {
	galleryId: int("gallery_id").autoincrement().notNull(),
	categoryId: int("category_id").default(0).notNull(),
	galleryTitle: varchar("gallery_title", { length: 200 }).notNull(),
	friendlyUrl: varchar("friendly_url", { length: 200 }),
	galleryImage: varchar("gallery_image", { length: 50 }),
	description: varchar({ length: 255 }),
	sortOrder: int("sort_order"),
	status: mysqlEnum(['1','0']).default('1').notNull(),
	galleryDateAdded: datetime("gallery_date_added", { mode: 'string'}).notNull(),
	galleryDateUpdated: datetime("gallery_date_updated", { mode: 'string'}),
},
(table) => [
	primaryKey({ columns: [table.galleryId], name: "wl_gallery_gallery_id"}),
]);

module.exports = { wlGallery };
