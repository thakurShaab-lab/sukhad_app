const { mysqlTable, primaryKey, int, varchar, datetime } = require("drizzle-orm/mysql-core");

const wlCronTracker = mysqlTable("wl_cron_tracker", {
	logId: int("log_id").autoincrement().notNull(),
	cronType: varchar("cron_type", { length: 35 }).notNull(),
	crnStartDate: datetime("crn_start_date", { mode: 'string'}).notNull(),
	crnEndDate: datetime("crn_end_date", { mode: 'string'}).notNull(),
},
(table) => [
	primaryKey({ columns: [table.logId], name: "wl_cron_tracker_log_id"}),
]);

module.exports = { wlCronTracker };
