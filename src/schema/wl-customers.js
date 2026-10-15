const { mysqlTable, mysqlEnum, primaryKey, int, tinyint, float, varchar, text, date, datetime } = require("drizzle-orm/mysql-core");

const wlCustomers = mysqlTable("wl_customers", {
	customersId: int("customers_id").autoincrement().notNull(),
	parentId: int("parent_id").default(0),
	memberType: tinyint("member_type").default(3).notNull(), 												// 1-Admin, 2-Subadmin,3=User
	memNature: tinyint("mem_nature").default(1).notNull(),   												// 1=Buyer,2=Seller
	registrationId: varchar("registration_id", { length: 150 }),
	dealsIn: varchar("deals_in", { length: 50 }),
	userName: varchar("user_name", { length: 80 }),
	alternateEmail: varchar("alternate_email", { length: 100 }),
	password: varchar({ length: 100 }).notNull(),
	title: varchar({ length: 10 }),
	firstName: varchar("first_name", { length: 32 }),
	lastName: varchar("last_name", { length: 32 }),
	storeName: varchar("store_name", { length: 50 }),
	gender: mysqlEnum(['Male','Female','Rather not say']).default('Male'),
	birthDate: date("birth_date", { mode: 'string' }),
	profilePhoto: varchar("profile_photo", { length: 100 }),
	phoneNumber: varchar("phone_number", { length: 32 }),
	countryCode: varchar("country_code", { length: 20 }),
	mobCountryCode: varchar("mob_country_code", { length: 20 }),
	mobileNumber: varchar("mobile_number", { length: 32 }),
	faxNumber: varchar("fax_number", { length: 32 }),
	otherEmails: varchar("other_emails", { length: 255 }),
	address: text(),
	country: int().default(0),
	state: int().default(0),
	city: int().default(0),
	location: int().default(0),
	pinCode: int("pin_code"),
	ucountryName: varchar("ucountry_name", { length: 100 }),
	ustateName: varchar("ustate_name", { length: 100 }),
	ucityName: varchar("ucity_name", { length: 100 }),
	shopName: varchar("shop_name", { length: 150 }),
	shopBanner: varchar("shop_banner", { length: 100 }),
	addressLine1: varchar("address_line1", { length: 200 }),
	googleMap: text("google_map"),
	ulocation: varchar({ length: 100 }),
	customerSupport: varchar("customer_support", { length: 100 }),
	actkey: varchar({ length: 32 }).notNull(),
	userUqToken: varchar("user_uq_token", { length: 70 }),
	isHome: mysqlEnum("is_home", ['Y','N']).default('N'),
	status: mysqlEnum(['0','1','2','3']).default('0').notNull(),   												// 0=Inactive,1=Active,2=Deleted,3=Guest
	lastStatus: tinyint("last_status").notNull(),
	trashedBy: int("trashed_by").notNull(),																		// admin id
	trashed: tinyint().notNull(),  																				// 1=Yes,0=No
	isReverted: tinyint("is_reverted").notNull(),																// 1=Reverted,0=No
	isVerified: mysqlEnum("is_verified", ['0','1','2']).default('0').notNull(),									// 0=unverfied or pending ,1=verfied or approve,2=Reject	
	isVerifiedMobile: mysqlEnum("is_verified_mobile", ['0','1']).default('0').notNull(),
	loginType: mysqlEnum("login_type", ['normal','facebook','twitter']).default('normal').notNull(),
	accountCreatedDate: datetime("account_created_date", { mode: 'string'}),
	currentLogin: datetime("current_login", { mode: 'string'}),
	lastLoginDate: datetime("last_login_date", { mode: 'string'}),
	ipAddress: varchar("ip_address", { length: 25 }).notNull(),
	isBlocked: mysqlEnum("is_blocked", ['0','1']).default('0').notNull(),										// 0=unblocked,1=blocked
	blockTime: datetime("block_time", { mode: 'string'}).default('0000-00-00 00:00:00').notNull(),
	numberOfLoginTry: int("number_of_login_try").default(0).notNull(),
	replied: mysqlEnum(['Y','N']).default('N').notNull(),
	verifyCode: int("verify_code"),																				// Mobile Verify Code
	appId: varchar("app_id", { length: 255 }),
	deviceId: text("device_id"),
	appType: varchar("app_type", { length: 255 }),
	tempMobile: varchar("temp_mobile", { length: 20 }),
	tempEmail: varchar("temp_email", { length: 80 }),
	isVerifiedMailOnce: tinyint("is_verified_mail_once").default(0).notNull(),									// 1=Yes,0=No
	myRefCodeUsers: int("my_ref_code_users").notNull(),
	isImport: tinyint("is_import").default(0).notNull(),														// 1=Imported from excel,0=No
	sellerRating: varchar("seller_rating", { length: 30 }),
	shipOnTime: varchar("ship_on_time", { length: 30 }),
	chatResponse: varchar("chat_response", { length: 30 }),
	bankName: varchar("bank_name", { length: 100 }),
	accountNo: varchar("account_no", { length: 20 }),
	branchName: varchar("branch_name", { length: 100 }),
	ifscCode: varchar("ifsc_code", { length: 12 }),
	adminCommission: float("admin_commission", { precision: 10, scale: 2 }).default(0).notNull(),
	shippingCharges: int("shipping_charges").default(0).notNull(),
	orderAmountForFreeShipping: int("order_amount_for_free_shipping").default(0).notNull(),
	payableAmount: float("payable_amount", { precision: 10, scale: 2 }).default(0).notNull(),
	paidAmount: float("paid_amount", { precision: 10, scale: 2 }).default(0).notNull(),
	commissionAmount: float("commission_amount", { precision: 10, scale: 2 }).default(0).notNull(),
	shippingAmount: float("shipping_amount", { precision: 10, scale: 2 }).default(0).notNull(),
	referApproved: tinyint("refer_approved").default(0).notNull(),
	referUser: int("refer_user").default(0).notNull(),
	isBulkActive: tinyint("is_bulk_active").default(0).notNull(),												// 	1=Yes,0=No
	xlsType: mysqlEnum("xls_type", ['0','1','2']).default('0').notNull(),										// 0=Normal,1=Bulk sheet, 2=mysql file
},
(table) => [
	primaryKey({ columns: [table.customersId], name: "wl_customers_customers_id"}),
]);

module.exports = { wlCustomers };
