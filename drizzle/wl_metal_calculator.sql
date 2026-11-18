-- Metal price calculator: request details + calculated prices
-- Used by POST/GET /api/metal_stats_pages/metal-price-calculator
-- Drizzle schema: src/schema/wl-metal-calculator.js

CREATE TABLE IF NOT EXISTS `wl_metal_calculator` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customers_id` int NOT NULL DEFAULT '0',
  `app_id` varchar(100) DEFAULT NULL,
  `device_id` varchar(255) DEFAULT NULL,
  `currency` varchar(3) NOT NULL DEFAULT 'INR',

  `weight_unit` enum('kg','lb') NOT NULL DEFAULT 'kg',
  `weight` decimal(14,4) NOT NULL DEFAULT '0.0000',
  `weight_kg` decimal(14,4) NOT NULL DEFAULT '0.0000',

  `platinum_ppm` decimal(14,4) NOT NULL DEFAULT '0.0000',
  `palladium_ppm` decimal(14,4) NOT NULL DEFAULT '0.0000',
  `rhodium_ppm` decimal(14,4) NOT NULL DEFAULT '0.0000',

  `return_rate_pt` decimal(7,4) NOT NULL DEFAULT '85.0000',
  `return_rate_pd` decimal(7,4) NOT NULL DEFAULT '85.0000',
  `return_rate_rh` decimal(7,4) NOT NULL DEFAULT '85.0000',
  `minimum_deduction_pt` decimal(14,4) NOT NULL DEFAULT '0.0000',
  `minimum_deduction_pd` decimal(14,4) NOT NULL DEFAULT '0.0000',
  `minimum_deduction_rh` decimal(14,4) NOT NULL DEFAULT '0.0000',
  `treatment_fee` decimal(18,2) NOT NULL DEFAULT '0.00',
  `refining_charge_pt` decimal(18,2) NOT NULL DEFAULT '0.00',
  `refining_charge_pd` decimal(18,2) NOT NULL DEFAULT '0.00',
  `refining_charge_rh` decimal(18,2) NOT NULL DEFAULT '0.00',
  `days_out` int NOT NULL DEFAULT '120',
  `interest_rate` decimal(7,4) NOT NULL DEFAULT '0.0000',

  `platinum_price_per_kg` decimal(18,2) NOT NULL DEFAULT '0.00',
  `palladium_price_per_kg` decimal(18,2) NOT NULL DEFAULT '0.00',
  `rhodium_price_per_kg` decimal(18,2) NOT NULL DEFAULT '0.00',
  `platinum_price_source` enum('user','market') NOT NULL DEFAULT 'user',
  `palladium_price_source` enum('user','market') NOT NULL DEFAULT 'user',
  `rhodium_price_source` enum('user','market') NOT NULL DEFAULT 'user',

  `platinum_price` decimal(18,2) NOT NULL DEFAULT '0.00',
  `palladium_price` decimal(18,2) NOT NULL DEFAULT '0.00',
  `rhodium_price` decimal(18,2) NOT NULL DEFAULT '0.00',
  `grand_total` decimal(18,2) NOT NULL DEFAULT '0.00',
  `gross_value` decimal(18,2) NOT NULL DEFAULT '0.00',
  `total_refining_charge` decimal(18,2) NOT NULL DEFAULT '0.00',
  `total_treatment_fee` decimal(18,2) NOT NULL DEFAULT '0.00',
  `finance_charge` decimal(18,2) NOT NULL DEFAULT '0.00',
  `total_value` decimal(18,2) NOT NULL DEFAULT '0.00',

  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `wl_metal_calculator_customers_id` (`customers_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- For a table created before `updated_at` was added:
-- ALTER TABLE `wl_metal_calculator` ADD COLUMN `updated_at` datetime DEFAULT NULL AFTER `created_at`;
