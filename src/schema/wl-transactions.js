const { mysqlTable, primaryKey, int, float, datetime } = require("drizzle-orm/mysql-core");

const wlTransactions = mysqlTable("wl_transactions", {
	transactionId: int("transaction_id").autoincrement().notNull(),
	sellerId: int("seller_id").default(0).notNull(),
	transactionAmount: float("transaction_amount", { precision: 10, scale: 2 }).default(0).notNull(),
	transactionDate: datetime("transaction_date", { mode: 'string'}),
},
(table) => [
	primaryKey({ columns: [table.transactionId], name: "wl_transactions_transaction_id"}),
]);

module.exports = { wlTransactions };
