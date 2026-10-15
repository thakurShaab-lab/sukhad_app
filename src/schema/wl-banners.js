const { mysqlTable, primaryKey, int, tinyint, float, varchar, text, datetime } = require("drizzle-orm/mysql-core");

const wlBanners = mysqlTable("wl_banners", {
	bannerId: int("banner_id").autoincrement().notNull(),
	bannerType: tinyint("banner_type").default(1).notNull(),
	memberId: int("member_id").default(0).notNull(),
	memberType: tinyint("member_type").default(0).notNull(),
	bannerPosition: varchar("banner_position", { length: 100 }),
	refCategoryId: int("ref_category_id").notNull(),
	refProdType: int("ref_prod_type").notNull(),
	refItemId: int("ref_item_id").notNull(),
	bannerImage: varchar("banner_image", { length: 200 }),
	bannerTitle: varchar("banner_title", { length: 100 }),
	bannerUrl: varchar("banner_url", { length: 170 }),
	bannerPage: varchar("banner_page", { length: 30 }),
	bannerPrice: float("banner_price", { precision: 10, scale: 2 }).default(0).notNull(),
	description: text(),
	status: tinyint().default(1),
	lastStatus: tinyint("last_status").notNull(),
	trashedBy: int("trashed_by").notNull(),
	trashed: tinyint().notNull(),
	isReverted: tinyint("is_reverted").notNull(),
	clicks: int().default(0).notNull(),
	isApproved: tinyint("is_approved").default(0).notNull(),
	bannerAddedDate: datetime("banner_added_date", { mode: 'string'}),
	bannerUpdatedDate: datetime("banner_updated_date", { mode: 'string'}).default('0000-00-00 00:00:00').notNull(),
	bannerStartDate: datetime("banner_start_date", { mode: 'string'}),
	bannerEndDate: datetime("banner_end_date", { mode: 'string'}),
},
(table) => [
	primaryKey({ columns: [table.bannerId], name: "wl_banners_banner_id"}),
]);

module.exports = { wlBanners };
