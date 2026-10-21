const { mysqlTable, mysqlEnum, primaryKey, int, tinyint, varchar, text, datetime } = require("drizzle-orm/mysql-core")

const wlEnquiry = mysqlTable("wl_enquiry", {
	id: int().autoincrement().notNull(),
	customersId: int("customers_id").default(0).notNull(),
	entityId: int("entity_id").default(0).notNull(),
	type: tinyint().default(1).notNull(),
	entityTitle: varchar("entity_title", { length: 255 }),
	firstName: varchar("first_name", { length: 30 }).notNull(),
	lastName: varchar("last_name", { length: 50 }),
	email: varchar({ length: 150 }).notNull(),
	officeAddress: varchar("office_address", { length: 255 }),
	amount: varchar({ length: 55 }).default('0.00'),
	amountCouncry: varchar("amount_councry", { length: 55 }),
	country: varchar({ length: 200 }),
	countryCode: varchar("country_code", { length: 10 }),
	state: varchar({ length: 50 }),
	city: varchar({ length: 50 }),
	phoneNumber: varchar("phone_number", { length: 20 }),
	extNumber: varchar("ext_number", { length: 50 }),
	mobCountryCode: varchar("mob_country_code", { length: 20 }),
	mobileNumber: varchar("mobile_number", { length: 50 }),
	faxNumber: varchar("fax_number", { length: 30 }),
	address: varchar({ length: 220 }),
	zipcode: varchar({ length: 10 }),
	requirement: text(),
	categoryName: varchar("category_name", { length: 255 }),
	message: text().notNull(),
	size: varchar({ length: 255 }),
	status: mysqlEnum(['1','2']).notNull(),
	replyStatus: mysqlEnum("reply_status", ['Y','N']).default('N').notNull(),
	receiveDate: datetime("receive_date", { mode: 'string'}).notNull(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "wl_enquiry_id"}),
])

module.exports = { wlEnquiry }
