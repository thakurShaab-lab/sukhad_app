const { mysqlTable, mysqlEnum, primaryKey, int, tinyint, varchar, text, datetime } = require("drizzle-orm/mysql-core")

const wlProducts = mysqlTable("wl_products", {
	productId: int("product_id").autoincrement().notNull(),
	categoryId: int("category_id").default(0),
	categoryLinks: varchar("category_links", { length: 80 }),
	productTitle: varchar("product_title", { length: 100 }).notNull(),
	productCode: varchar("product_code", { length: 80 }),
	referenceId: varchar("reference_id", { length: 255 }),
	productMake: varchar("product_make", { length: 150 }),
	productModel: varchar("product_model", { length: 100 }),
	year: varchar({ length: 100 }),
	friendlyUrl: varchar("friendly_url", { length: 110 }),
	productAlt: varchar("product_alt", { length: 100 }),
	productDescription: text("product_description").notNull(),
	productVideo: varchar("product_video", { length: 255 }),
	isBest: tinyint("is_best").default(0).notNull(),
	isHot: tinyint("is_hot").default(0),
	isNew: tinyint("is_new").default(0).notNull(),
	isFeatured: tinyint("is_featured").default(0).notNull(),
	isRecent: tinyint("is_recent").default(0).notNull(),
	productType: tinyint("product_type").default(0).notNull(),
	xlsType: mysqlEnum("xls_type", ['0','1']).default('0').notNull(),
	status: tinyint().default(1).notNull(),
	addedDate: datetime("added_date", { mode: 'string'}).notNull(),
	updatedDate: datetime("updated_date", { mode: 'string'}),
},
(table) => [
	primaryKey({ columns: [table.productId], name: "wl_products_product_id"}),
])

module.exports = { wlProducts }
