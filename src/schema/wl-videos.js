const { mysqlTable, primaryKey, int, tinyint, varchar, datetime } = require("drizzle-orm/mysql-core");

const wlVideos = mysqlTable("wl_videos", {
	videoId: int("video_id").autoincrement().notNull(),
	categoryId: int("category_id").default(0).notNull(),
	videoTitle: varchar("video_title", { length: 200 }),
	videoLink: varchar("video_link", { length: 200 }),
	videoImage: varchar("video_image", { length: 100 }),
	sortOrder: int("sort_order"),
	status: tinyint().default(1).notNull(),
	videoDateAdded: datetime("video_date_added", { mode: 'string'}).notNull(),
	videoDateUpdated: datetime("video_date_updated", { mode: 'string'}),
},
(table) => [
	primaryKey({ columns: [table.videoId], name: "wl_videos_video_id"}),
]);

module.exports = { wlVideos };
