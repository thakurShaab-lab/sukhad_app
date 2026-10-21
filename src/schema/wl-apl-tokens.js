const { mysqlTable, mysqlEnum, primaryKey, int, varchar, timestamp } = require("drizzle-orm/mysql-core")

const wlAplTokens = mysqlTable("wl_apl_tokens", {
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
])

module.exports = { wlAplTokens }
