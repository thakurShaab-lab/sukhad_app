const { mysqlTable, mysqlEnum, primaryKey, index, int, varchar, datetime } = require("drizzle-orm/mysql-core");

const wlProductsMedia = mysqlTable("wl_products_media", {
	id: int({ unsigned: true }).autoincrement().notNull(),
	productId: int("product_id", { unsigned: true }).notNull(),
	mediaType: mysqlEnum("media_type", ['photo','video','pdf']).default('photo').notNull(),
	media: varchar({ length: 255 }).notNull(),
	isDefault: mysqlEnum("is_default", ['Y','N']).default('N').notNull(),
	sortOrder: int("sort_order"),
	mediaDateAdded: datetime("media_date_added", { mode: 'string'}).notNull(),
},
(table) => [
	index("idx_products_images_products_id").on(table.productId),
	primaryKey({ columns: [table.id], name: "wl_products_media_id"}),
]);

module.exports = { wlProductsMedia };
