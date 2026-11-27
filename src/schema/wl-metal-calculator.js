const { mysqlTable, mysqlEnum, primaryKey, index, int, varchar, decimal, datetime } = require("drizzle-orm/mysql-core")

const amount = (name) => decimal(name, { precision: 18, scale: 2, mode: 'number' }).default(0).notNull()
const quantity = (name) => decimal(name, { precision: 14, scale: 4, mode: 'number' }).default(0).notNull()
const percent = (name, fallback = 0) => decimal(name, { precision: 7, scale: 4, mode: 'number' }).default(fallback).notNull()

const wlMetalCalculator = mysqlTable("wl_metal_calculator", {
	id: int().autoincrement().notNull(),
	customersId: int("customers_id").default(0).notNull(),
	appId: varchar("app_id", { length: 100 }),
	deviceId: varchar("device_id", { length: 255 }),
	currency: varchar({ length: 3 }).default('INR').notNull(),

	// calculator settings (saved by /metal-price-setting; weight / PPM are never stored)
	returnRatePt: percent("return_rate_pt", 85),
	returnRatePd: percent("return_rate_pd", 85),
	returnRateRh: percent("return_rate_rh", 85),
	minimumDeductionPt: quantity("minimum_deduction_pt"),
	minimumDeductionPd: quantity("minimum_deduction_pd"),
	minimumDeductionRh: quantity("minimum_deduction_rh"),
	treatmentFee: amount("treatment_fee"),
	refiningChargePt: amount("refining_charge_pt"),
	refiningChargePd: amount("refining_charge_pd"),
	refiningChargeRh: amount("refining_charge_rh"),
	daysOut: int("days_out").default(120).notNull(),
	interestRate: percent("interest_rate").default(4),

	// metal prices per kg (USD); source "market" = live market price at calculation time
	platinumPricePerKg: amount("platinum_price_per_kg"),
	palladiumPricePerKg: amount("palladium_price_per_kg"),
	rhodiumPricePerKg: amount("rhodium_price_per_kg"),
	platinumPriceSource: mysqlEnum("platinum_price_source", ['user','market']).default('user').notNull(),
	palladiumPriceSource: mysqlEnum("palladium_price_source", ['user','market']).default('user').notNull(),
	rhodiumPriceSource: mysqlEnum("rhodium_price_source", ['user','market']).default('user').notNull(),

	// calculated
	platinumPrice: amount("platinum_price"),
	palladiumPrice: amount("palladium_price"),
	rhodiumPrice: amount("rhodium_price"),
	grandTotal: amount("grand_total"),
	grossValue: amount("gross_value"),
	totalRefiningCharge: amount("total_refining_charge"),
	totalTreatmentFee: amount("total_treatment_fee"),
	financeCharge: amount("finance_charge"),
	totalValue: amount("total_value"),

	createdAt: datetime("created_at", { mode: 'string'}).notNull(),
	updatedAt: datetime("updated_at", { mode: 'string'}),
},
(table) => [
	primaryKey({ columns: [table.id], name: "wl_metal_calculator_id"}),
	index("wl_metal_calculator_customers_id").on(table.customersId),
])

module.exports = { wlMetalCalculator }