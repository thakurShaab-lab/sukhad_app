const { mysqlTable, mysqlEnum, primaryKey, int, tinyint, varchar, text, datetime } = require("drizzle-orm/mysql-core");

const wlAlbums = mysqlTable("wl_albums", {
	albumId: int("album_id").autoincrement().notNull(),
	parentId: int("parent_id").default(0).notNull(),
	albumType: tinyint("album_type").default(0).notNull(),
	friendlyUrl: varchar("friendly_url", { length: 80 }),
	albumTitle: varchar("album_title", { length: 200 }).notNull(),
	albumDescription: text("album_description"),
	albumImage: varchar("album_image", { length: 50 }),
	sortOrder: int("sort_order"),
	status: mysqlEnum(['1','0']).default('1').notNull(),
	albumDateAdded: datetime("album_date_added", { mode: 'string'}).notNull(),
	albumDateUpdated: datetime("album_date_updated", { mode: 'string'}),
},
(table) => [
	primaryKey({ columns: [table.albumId], name: "wl_albums_album_id"}),
]);

module.exports = { wlAlbums };
