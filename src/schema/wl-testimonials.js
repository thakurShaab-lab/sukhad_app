const { mysqlTable, primaryKey, int, tinyint, varchar, text, datetime } = require("drizzle-orm/mysql-core")

const wlTestimonials = mysqlTable("wl_testimonials", {
	testimonialId: int("testimonial_id").autoincrement().notNull(),
	memId: int("mem_id").notNull(),
	testimonialTitle: varchar("testimonial_title", { length: 150 }),
	posterName: varchar("poster_name", { length: 50 }),
	friendlyUrl: varchar("friendly_url", { length: 100 }).notNull(),
	email: varchar({ length: 80 }),
	company: varchar({ length: 200 }),
	testimonialDescription: text("testimonial_description"),
	photo: varchar({ length: 255 }),
	postedDate: datetime("posted_date", { mode: 'string'}),
	status: tinyint().default(1).notNull(),
},
(table) => [
	primaryKey({ columns: [table.testimonialId], name: "wl_testimonials_testimonial_id"}),
])

module.exports = { wlTestimonials }
