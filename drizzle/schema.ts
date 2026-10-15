import { mysqlTable, mysqlSchema, AnyMySqlColumn, primaryKey, int, varchar, text, float, smallint, mysqlEnum, datetime, date, bigint, char, tinytext, timestamp, longtext, index, tinyint } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const restLogs = mysqlTable("rest_logs", {
	id: int().autoincrement().notNull(),
	uri: varchar({ length: 255 }).notNull(),
	method: varchar({ length: 6 }).notNull(),
	params: text(),
	apiKey: varchar("api_key", { length: 40 }).notNull(),
	ipAddress: varchar("ip_address", { length: 45 }).notNull(),
	time: int().notNull(),
	rtime: float(),
	authorized: varchar({ length: 1 }).notNull(),
	responseCode: smallint("response_code").default(0),
},
(table) => [
	primaryKey({ columns: [table.id], name: "rest_logs_id"}),
]);

export const tblAdmin = mysqlTable("tbl_admin", {
	adminId: int("admin_id").autoincrement().notNull(),
	adminType: mysqlEnum("admin_type", ['1','2','3']).default('2').notNull(),
	adminKey: varchar("admin_key", { length: 15 }).notNull(),
	adminName: varchar("admin_name", { length: 100 }),
	adminUsername: varchar("admin_username", { length: 50 }).notNull(),
	adminPassword: varchar("admin_password", { length: 30 }),
	adminEmail: varchar("admin_email", { length: 255 }).notNull(),
	orderEmail: varchar("order_email", { length: 255 }),
	noreplyEmail: varchar("noreply_email", { length: 100 }),
	litigationDays: int("litigation_days"),
	adminLastLogin: datetime("admin_last_login", { mode: 'string'}).default('0000-00-00 00:00:00').notNull(),
	address: text(),
	city: varchar({ length: 100 }),
	state: varchar({ length: 100 }),
	country: varchar({ length: 100 }),
	zipcode: varchar({ length: 50 }),
	phone: varchar({ length: 50 }),
	whatsappNo: varchar("whatsapp_no", { length: 20 }),
	whatsappText: varchar("whatsapp_text", { length: 499 }),
	freeShippingOrderAmount: int("free_shipping_order_amount").default(500).notNull(),
	fax: varchar({ length: 50 }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	postDate: date("post_date", { mode: 'string' }).notNull(),
	status: mysqlEnum(['0','1','2']).default('1').notNull(),
	totalHits: bigint("total_hits", { mode: "number" }).default(0).notNull(),
	facebookLink: varchar("facebook_link", { length: 250 }),
	twitterLink: varchar("twitter_link", { length: 250 }),
	linkedinLink: varchar("linkedin_link", { length: 250 }),
	googleLink: varchar("google_link", { length: 250 }),
	youtubeLink: varchar("youtube_link", { length: 250 }),
	instagramLink: varchar("instagram_link", { length: 255 }),
	telegramLink: varchar("telegram_link", { length: 250 }),
	googleAnalyticsId: varchar("google_analytics_id", { length: 50 }),
	googleWebCode: text("google_web_code"),
	googleMapCode: text("google_map_code"),
	facebookPixel: text("facebook_pixel"),
	gtmCode: text("gtm_code"),
	googleAdsense: text("google_adsense"),
	footerTime: varchar("footer_time", { length: 255 }),
	companyName: varchar("company_name", { length: 70 }),
	helpline: varchar({ length: 600 }),
	profileIcon: varchar("profile_icon", { length: 100 }),
	tax: float({ precision: 10, scale: 2 }).default(0).notNull(),
	sellerCommission: float("seller_commission", { precision: 10, scale: 2 }).default(0).notNull(),
	serviceCharge: float("service_charge", { precision: 10, scale: 2 }).default(0).notNull(),
	gatewayCharge: float("gateway_charge", { precision: 10, scale: 2 }).default(0).notNull(),
	payableAmount: float("payable_amount", { precision: 10, scale: 2 }).default(0).notNull(),
	paidAmount: float("paid_amount", { precision: 10, scale: 2 }).default(0).notNull(),
	minSalesAmount: float("min_sales_amount", { precision: 15, scale: 2 }).default(0).notNull(),
	codAmountLimit: float("cod_amount_limit", { precision: 15, scale: 2 }).default(0).notNull(),
	cardOnDeliveryLimit: float("card_on_delivery_limit", { precision: 15, scale: 2 }).default(0).notNull(),
	headerQuote: varchar("header_quote", { length: 255 }),
	aboutWebsite: text("about_website"),
	deliveryLeftStatus: tinyint("delivery_left_status").default(1).notNull(),
	verificationStatus: tinyint("verification_status").default(1).notNull(),
	emailVerificationStatus: tinyint("email_verification_status").default(1).notNull(),
},
(table) => [
	primaryKey({ columns: [table.adminId], name: "tbl_admin_admin_id"}),
]);

export const tblAdminAllowedSections = mysqlTable("tbl_admin_allowed_sections", {
	id: int().autoincrement().notNull(),
	subadminId: int("subadmin_id").notNull(),
	secParentId: int("sec_parent_id").notNull(),
	secId: int("sec_id").notNull(),
	permission: varchar({ length: 25 }).default('1').notNull(),
	allowMemberIds: text("allow_member_ids"),
},
(table) => [
	primaryKey({ columns: [table.id], name: "tbl_admin_allowed_sections_id"}),
]);

export const tblAdminSections = mysqlTable("tbl_admin_sections", {
	id: int().autoincrement().notNull(),
	parentId: int("parent_id").default(0).notNull(),
	sectionTitle: varchar("section_title", { length: 100 }),
	sectionController: varchar("section_controller", { length: 100 }),
	dispOrder: int("disp_order").default(0).notNull(),
	actualPrivilege: varchar("actual_privilege", { length: 100 }),
	isVisible: tinyint("is_visible").default(1).notNull(),
	status: char({ length: 1 }).default('1').notNull(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "tbl_admin_sections_id"}),
]);

export const wlAboutChoose = mysqlTable("wl_about_choose", {
	chooseId: int("choose_id").autoincrement().notNull(),
	chooseTitle: varchar("choose_title", { length: 120 }).notNull(),
	chooseDescription: tinytext("choose_description"),
	sortOrder: int("sort_order"),
	status: tinyint().default(1).notNull(),
	dateAdded: datetime("date_added", { mode: 'string'}).notNull(),
	dateUpdated: datetime("date_updated", { mode: 'string'}),
},
(table) => [
	primaryKey({ columns: [table.chooseId], name: "wl_about_choose_choose_id"}),
]);

export const wlAlbums = mysqlTable("wl_albums", {
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

export const wlAplTokens = mysqlTable("wl_apl_tokens", {
	apiTokenId: int("api_token_id").autoincrement().notNull(),
	userId: int("user_id").default(0).notNull(),
	loginType: int("login_type").default(0).notNull(),
	token: varchar({ length: 100 }).notNull(),
	provider: varchar({ length: 100 }).default('user').notNull(),
	appType: mysqlEnum("app_type", ['android','ios']).default('android'),
	appId: varchar("app_id", { length: 255 }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	expiredAt: timestamp("expired_at", { mode: 'string' }),
},
(table) => [
	primaryKey({ columns: [table.apiTokenId], name: "wl_apl_tokens_api_token_id"}),
]);

export const wlAutoRespondMails = mysqlTable("wl_auto_respond_mails", {
	id: int().autoincrement().notNull(),
	emailSection: varchar("email_section", { length: 80 }).notNull(),
	emailSubject: varchar("email_subject", { length: 200 }).notNull(),
	emailContent: text("email_content").notNull(),
	status: mysqlEnum(['0','1','2']).default('1').notNull(),
	updatedOn: datetime("updated_on", { mode: 'string'}),
},
(table) => [
	primaryKey({ columns: [table.id], name: "wl_auto_respond_mails_id"}),
]);

export const wlBanners = mysqlTable("wl_banners", {
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

export const wlCategories = mysqlTable("wl_categories", {
	categoryId: int("category_id").autoincrement().notNull(),
	catType: tinyint("cat_type").default(1).notNull(),
	catLinks: varchar("cat_links", { length: 50 }),
	categoryName: varchar("category_name", { length: 100 }).notNull(),
	friendlyUrl: varchar("friendly_url", { length: 100 }).notNull(),
	categoryImage: varchar("category_image", { length: 255 }),
	categoryDescription: text("category_description").notNull(),
	categoryTag: text("category_tag").notNull(),
	subscriptionPageText: text("subscription_page_text"),
	parentId: int("parent_id").default(0).notNull(),
	isHome: mysqlEnum("is_home", ['1','0']).default('0').notNull(),
	isMenu: mysqlEnum("is_menu", ['1','0']).default('0').notNull(),
	isFooter: mysqlEnum("is_footer", ['0','1']).default('0').notNull(),
	isFixed: mysqlEnum("is_fixed", ['1','0']).default('0').notNull(),
	isAbout: tinyint("is_about").default(0),
	aboutCent: int("about_cent"),
	homeOurProducts: tinyint("home_our_products").default(0).notNull(),
	sortOrder: int("sort_order"),
	dateAdded: datetime("date_added", { mode: 'string'}).default('0000-00-00 00:00:00').notNull(),
	dateModified: datetime("date_modified", { mode: 'string'}).default('0000-00-00 00:00:00').notNull(),
	status: mysqlEnum(['0','1','2']).default('1').notNull(),
	lastStatus: tinyint("last_status").notNull(),
	trashedBy: int("trashed_by").notNull(),
	trashed: tinyint().notNull(),
	isReverted: tinyint("is_reverted").notNull(),
	metaTitle: varchar("meta_title", { length: 100 }),
	metaKeywords: varchar("meta_keywords", { length: 100 }),
	metaDescription: varchar("meta_description", { length: 225 }),
	categoryAlt: varchar("category_alt", { length: 200 }).notNull(),
	categoryBanner: varchar("category_banner", { length: 150 }),
	xlsType: mysqlEnum("xls_type", ['0','1']).default('0').notNull(),
},
(table) => [
	primaryKey({ columns: [table.categoryId], name: "wl_categories_category_id"}),
]);

export const wlCmsPages = mysqlTable("wl_cms_pages", {
	pageId: int("page_id").autoincrement().notNull(),
	parentId: int("parent_id").default(0).notNull(),
	pageName: varchar("page_name", { length: 50 }).default('').notNull(),
	friendlyUrl: varchar("friendly_url", { length: 50 }).notNull(),
	pageDescription: longtext("page_description").notNull(),
	pageShortDescription: text("page_short_description"),
	cmsType: mysqlEnum("cms_type", ['0','1']),
	pageImage: varchar("page_image", { length: 150 }).notNull(),
	status: mysqlEnum(['0','1','2']).default('1').notNull(),
	pageUpdatedDate: datetime("page_updated_date", { mode: 'string'}).notNull(),
},
(table) => [
	primaryKey({ columns: [table.pageId], name: "wl_cms_pages_page_id"}),
]);

export const wlConfiguration = mysqlTable("wl_configuration", {
	sl: int().autoincrement().notNull(),
	type: varchar({ length: 30 }).notNull(),
	value: text().notNull(),
	upDate: datetime("up_date", { mode: 'string'}).notNull(),
},
(table) => [
	primaryKey({ columns: [table.sl], name: "wl_configuration_sl"}),
]);

export const wlCronTracker = mysqlTable("wl_cron_tracker", {
	logId: int("log_id").autoincrement().notNull(),
	cronType: varchar("cron_type", { length: 35 }).notNull(),
	crnStartDate: datetime("crn_start_date", { mode: 'string'}).notNull(),
	crnEndDate: datetime("crn_end_date", { mode: 'string'}).notNull(),
},
(table) => [
	primaryKey({ columns: [table.logId], name: "wl_cron_tracker_log_id"}),
]);

export const wlCurrencies = mysqlTable("wl_currencies", {
	currencyId: int("currency_id").notNull(),
	title: varchar({ length: 32 }).default('').notNull(),
	code: varchar({ length: 3 }).default('').notNull(),
	symbolLeft: varchar("symbol_left", { length: 100 }).notNull(),
	symbolRight: varchar("symbol_right", { length: 12 }).notNull(),
	currImage: varchar("curr_image", { length: 250 }).notNull(),
	decimalPlace: char("decimal_place", { length: 1 }).notNull(),
	value: float({ precision: 15, scale: 8 }).notNull(),
	isDefault: mysqlEnum("is_default", ['Y','N']).default('N').notNull(),
	status: int().notNull(),
	dateModified: datetime("date_modified", { mode: 'string'}).default('0000-00-00 00:00:00').notNull(),
},
(table) => [
	primaryKey({ columns: [table.currencyId], name: "wl_currencies_currency_id"}),
]);

export const wlCustomers = mysqlTable("wl_customers", {
	customersId: int("customers_id").autoincrement().notNull(),
	parentId: int("parent_id").default(0),
	memberType: tinyint("member_type").default(3).notNull(),
	memNature: tinyint("mem_nature").default(1).notNull(),
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
	// you can use { mode: 'date' }, if you want to have Date as type for this column
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
	status: mysqlEnum(['0','1','2','3']).default('0').notNull(),
	lastStatus: tinyint("last_status").notNull(),
	trashedBy: int("trashed_by").notNull(),
	trashed: tinyint().notNull(),
	isReverted: tinyint("is_reverted").notNull(),
	isVerified: mysqlEnum("is_verified", ['0','1','2']).default('0').notNull(),
	isVerifiedMobile: mysqlEnum("is_verified_mobile", ['0','1']).default('0').notNull(),
	loginType: mysqlEnum("login_type", ['normal','facebook','twitter']).default('normal').notNull(),
	accountCreatedDate: datetime("account_created_date", { mode: 'string'}),
	currentLogin: datetime("current_login", { mode: 'string'}),
	lastLoginDate: datetime("last_login_date", { mode: 'string'}),
	ipAddress: varchar("ip_address", { length: 25 }).notNull(),
	isBlocked: mysqlEnum("is_blocked", ['0','1']).default('0').notNull(),
	blockTime: datetime("block_time", { mode: 'string'}).default('0000-00-00 00:00:00').notNull(),
	numberOfLoginTry: int("number_of_login_try").default(0).notNull(),
	replied: mysqlEnum(['Y','N']).default('N').notNull(),
	verifyCode: int("verify_code"),
	appId: varchar("app_id", { length: 255 }),
	deviceId: text("device_id"),
	appType: varchar("app_type", { length: 255 }),
	tempMobile: varchar("temp_mobile", { length: 20 }),
	tempEmail: varchar("temp_email", { length: 80 }),
	isVerifiedMailOnce: tinyint("is_verified_mail_once").default(0).notNull(),
	myRefCodeUsers: int("my_ref_code_users").notNull(),
	isImport: tinyint("is_import").default(0).notNull(),
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
	isBulkActive: tinyint("is_bulk_active").default(0).notNull(),
	xlsType: mysqlEnum("xls_type", ['0','1','2']).default('0').notNull(),
},
(table) => [
	primaryKey({ columns: [table.customersId], name: "wl_customers_customers_id"}),
]);

export const wlEnquiry = mysqlTable("wl_enquiry", {
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
]);

export const wlExpertise = mysqlTable("wl_expertise", {
	expertiseId: int("expertise_id").autoincrement().notNull(),
	templeId: int("temple_id").default(0).notNull(),
	expertiseName: varchar("expertise_name", { length: 120 }).notNull(),
	designation: varchar({ length: 255 }),
	mobileNumber: varchar("mobile_number", { length: 20 }),
	experience: varchar({ length: 100 }),
	expertiseImage: varchar("expertise_image", { length: 150 }),
	expertiseDescription: tinytext("expertise_description"),
	sortOrder: int("sort_order"),
	status: tinyint().default(1).notNull(),
	dateAdded: datetime("date_added", { mode: 'string'}).notNull(),
	dateUpdated: datetime("date_updated", { mode: 'string'}),
},
(table) => [
	primaryKey({ columns: [table.expertiseId], name: "wl_expertise_expertise_id"}),
]);

export const wlFaq = mysqlTable("wl_faq", {
	faqId: int("faq_id").autoincrement().notNull(),
	faqType: tinyint("faq_type").default(1).notNull(),
	faqParentId: int("faq_parent_id").default(0).notNull(),
	entityId: int("entity_id").default(0).notNull(),
	faqQuestion: varchar("faq_question", { length: 225 }).notNull(),
	faqAnswer: text("faq_answer").notNull(),
	sortOrder: int("sort_order"),
	status: tinyint().default(1).notNull(),
	faqDateAdded: datetime("faq_date_added", { mode: 'string'}).notNull(),
},
(table) => [
	primaryKey({ columns: [table.faqId], name: "wl_faq_faq_id"}),
]);

export const wlGallery = mysqlTable("wl_gallery", {
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

export const wlHeaderImages = mysqlTable("wl_header_images", {
	id: int().autoincrement().notNull(),
	headerImage: varchar("header_image", { length: 200 }).notNull(),
	headerUrl: varchar("header_url", { length: 255 }),
	lineOne: varchar("line_one", { length: 100 }),
	lineTwo: varchar("line_two", { length: 150 }),
	lineThree: varchar("line_three", { length: 300 }),
	status: mysqlEnum(['1','0','2']).notNull(),
	addedDate: datetime("added_date", { mode: 'string'}).notNull(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "wl_header_images_id"}),
]);

export const wlInviteFriends = mysqlTable("wl_invite_friends", {
	inviteId: int("invite_id").autoincrement().notNull(),
	productId: int("product_id").default(0).notNull(),
	friendName: varchar("friend_name", { length: 100 }).notNull(),
	friendEmail: varchar("friend_email", { length: 100 }).notNull(),
	yourName: varchar("your_name", { length: 100 }).notNull(),
	yourEmail: varchar("your_email", { length: 100 }).notNull(),
	receiveDate: datetime("receive_date", { mode: 'string'}).notNull(),
},
(table) => [
	primaryKey({ columns: [table.inviteId], name: "wl_invite_friends_invite_id"}),
]);

export const wlMetaTags = mysqlTable("wl_meta_tags", {
	metaId: int("meta_id").autoincrement().notNull(),
	isFixed: mysqlEnum("is_fixed", ['Y','N']).default('N').notNull(),
	entityType: varchar("entity_type", { length: 180 }),
	entityId: int("entity_id").default(0).notNull(),
	pageUrl: varchar("page_url", { length: 250 }).notNull(),
	metaTitle: varchar("meta_title", { length: 255 }).notNull(),
	metaDescription: varchar("meta_description", { length: 500 }).notNull(),
	metaKeyword: varchar("meta_keyword", { length: 500 }),
	status: mysqlEnum(['0','1']).default('1').notNull(),
},
(table) => [
	primaryKey({ columns: [table.metaId], name: "wl_meta_tags_meta_id"}),
]);

export const wlNotification = mysqlTable("wl_notification", {
	notificationId: int("notification_id").autoincrement().notNull(),
	nfType: tinyint("nf_type").default(1).notNull(),
	memberType: tinyint("member_type").default(3).notNull(),
	typeManage: tinyint("type_manage").notNull(),
	typeAction: tinyint("type_action").notNull(),
	notificationTitle: varchar("notification_title", { length: 255 }),
	notificationImage: varchar("notification_image", { length: 100 }),
	description: text(),
	memByType: tinyint("mem_by_type").notNull(),
	refTypeId: int("ref_type_id").notNull(),
	refProdType: int("ref_prod_type").notNull(),
	refItemId: int("ref_item_id").notNull(),
	isRepeat: tinyint("is_repeat").default(0).notNull(),
	repeatFromDay: varchar("repeat_from_day", { length: 20 }).notNull(),
	repeatToDay: varchar("repeat_to_day", { length: 20 }).notNull(),
	repeatTimes: tinyint("repeat_times").notNull(),
	sendSms: tinyint("send_sms").default(0).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	scheduleDate: date("schedule_date", { mode: 'string' }).notNull(),
	scheduleTime: varchar("schedule_time", { length: 20 }).notNull(),
	scheduleDateTime: datetime("schedule_date_time", { mode: 'string'}).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	scheduleEndDate: date("schedule_end_date", { mode: 'string' }).notNull(),
	hasMembers: tinyint("has_members").default(2).notNull(),
	createdAt: datetime("created_at", { mode: 'string'}),
	updatedAt: datetime("updated_at", { mode: 'string'}).notNull(),
	status: tinyint().default(0).notNull(),
	lastStatus: tinyint("last_status").notNull(),
	trashedBy: int("trashed_by").notNull(),
	trashed: tinyint().notNull(),
	isReverted: tinyint("is_reverted").notNull(),
	urlHint: varchar("url_hint", { length: 25 }),
	urlParams: text("url_params"),
},
(table) => [
	index("mem_by_type").on(table.memByType, table.refTypeId, table.refProdType, table.refItemId),
	primaryKey({ columns: [table.notificationId], name: "wl_notification_notification_id"}),
]);

export const wlNotificationCustomer = mysqlTable("wl_notification_customer", {
	id: int().autoincrement().notNull(),
	notificationId: int("notification_id").notNull(),
	customerId: int("customer_id").notNull(),
	readStatus: mysqlEnum("read_status", ['R','U']).default('U').notNull(),
	createdAt: datetime("created_at", { mode: 'string'}),
},
(table) => [
	primaryKey({ columns: [table.id], name: "wl_notification_customer_id"}),
]);

export const wlPartners = mysqlTable("wl_partners", {
	partnerId: int("partner_id").autoincrement().notNull(),
	templeId: int("temple_id").default(0).notNull(),
	partnerName: varchar("partner_name", { length: 120 }).notNull(),
	designation: varchar({ length: 255 }),
	mobileNumber: varchar("mobile_number", { length: 20 }),
	experience: varchar({ length: 100 }),
	partnerImage: varchar("partner_image", { length: 150 }),
	shortDesc: tinytext("short_desc"),
	sortOrder: int("sort_order"),
	status: tinyint().default(1).notNull(),
	dateAdded: datetime("date_added", { mode: 'string'}).notNull(),
	dateUpdated: datetime("date_updated", { mode: 'string'}),
},
(table) => [
	primaryKey({ columns: [table.partnerId], name: "wl_partners_partner_id"}),
]);

export const wlProducts = mysqlTable("wl_products", {
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
]);

export const wlProductsMedia = mysqlTable("wl_products_media", {
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

export const wlResetPwdLink = mysqlTable("wl_reset_pwd_link", {
	id: int().autoincrement().notNull(),
	userId: int("user_id").notNull(),
	code: varchar({ length: 20 }).notNull(),
	expire: datetime({ mode: 'string'}).notNull(),
	added: datetime({ mode: 'string'}).notNull(),
},
(table) => [
	index("user_id").on(table.userId),
	primaryKey({ columns: [table.id], name: "wl_reset_pwd_link_id"}),
]);

export const wlSessions = mysqlTable("wl_sessions", {
	id: varchar({ length: 128 }).notNull(),
	ipAddress: varchar("ip_address", { length: 45 }).notNull(),
	timestamp: int({ unsigned: true }).default(0).notNull(),
	// Warning: Can't parse blob from database
	// blobType: blob("data").notNull(),
});

export const wlTestimonials = mysqlTable("wl_testimonials", {
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
]);

export const wlTrackerNotification = mysqlTable("wl_tracker_notification", {
	notifyId: int("notify_id").autoincrement().notNull(),
	notifyType: varchar("notify_type", { length: 35 }).notNull(),
	memberId: int("member_id").notNull(),
	notifyRefId: int("notify_ref_id").notNull(),
	notifyDate: datetime("notify_date", { mode: 'string'}).notNull(),
},
(table) => [
	index("notify_type").on(table.notifyType, table.memberId, table.notifyRefId),
	primaryKey({ columns: [table.notifyId], name: "wl_tracker_notification_notify_id"}),
]);

export const wlTransactions = mysqlTable("wl_transactions", {
	transactionId: int("transaction_id").autoincrement().notNull(),
	sellerId: int("seller_id").default(0).notNull(),
	transactionAmount: float("transaction_amount", { precision: 10, scale: 2 }).default(0).notNull(),
	transactionDate: datetime("transaction_date", { mode: 'string'}),
},
(table) => [
	primaryKey({ columns: [table.transactionId], name: "wl_transactions_transaction_id"}),
]);

export const wlVideos = mysqlTable("wl_videos", {
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

export const wlWebhookDetails = mysqlTable("wl_webhook_details", {
	id: int().autoincrement().notNull(),
	ipAddress: varchar("ip_address", { length: 50 }),
	userAgent: varchar("user_agent", { length: 255 }),
	webhookData: text("webhook_data").notNull(),
	receiveDate: datetime("receive_date", { mode: 'string'}),
},
(table) => [
	primaryKey({ columns: [table.id], name: "wl_webhook_details_id"}),
]);
