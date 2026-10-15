-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `rest_logs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`uri` varchar(255) NOT NULL,
	`method` varchar(6) NOT NULL,
	`params` text,
	`api_key` varchar(40) NOT NULL,
	`ip_address` varchar(45) NOT NULL,
	`time` int NOT NULL,
	`rtime` float,
	`authorized` varchar(1) NOT NULL,
	`response_code` smallint DEFAULT 0,
	CONSTRAINT `rest_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tbl_admin` (
	`admin_id` int AUTO_INCREMENT NOT NULL,
	`admin_type` enum('1','2','3') NOT NULL DEFAULT '2',
	`admin_key` varchar(15) NOT NULL,
	`admin_name` varchar(100),
	`admin_username` varchar(50) NOT NULL,
	`admin_password` varchar(30),
	`admin_email` varchar(255) NOT NULL,
	`order_email` varchar(255),
	`noreply_email` varchar(100),
	`litigation_days` int,
	`admin_last_login` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
	`address` text,
	`city` varchar(100),
	`state` varchar(100),
	`country` varchar(100),
	`zipcode` varchar(50),
	`phone` varchar(50),
	`whatsapp_no` varchar(20),
	`whatsapp_text` varchar(499),
	`free_shipping_order_amount` int NOT NULL DEFAULT 500,
	`fax` varchar(50),
	`post_date` date NOT NULL,
	`status` enum('0','1','2') NOT NULL DEFAULT '1',
	`total_hits` bigint NOT NULL DEFAULT 0,
	`facebook_link` varchar(250),
	`twitter_link` varchar(250),
	`linkedin_link` varchar(250),
	`google_link` varchar(250),
	`youtube_link` varchar(250),
	`instagram_link` varchar(255),
	`telegram_link` varchar(250),
	`google_analytics_id` varchar(50),
	`google_web_code` text,
	`google_map_code` text,
	`facebook_pixel` text,
	`gtm_code` text,
	`google_adsense` text,
	`footer_time` varchar(255),
	`company_name` varchar(70),
	`helpline` varchar(600),
	`profile_icon` varchar(100),
	`tax` float(10,2) NOT NULL DEFAULT 0,
	`seller_commission` float(10,2) NOT NULL DEFAULT 0,
	`service_charge` float(10,2) NOT NULL DEFAULT 0,
	`gateway_charge` float(10,2) NOT NULL DEFAULT 0,
	`payable_amount` float(10,2) NOT NULL DEFAULT 0,
	`paid_amount` float(10,2) NOT NULL DEFAULT 0,
	`min_sales_amount` float(15,2) NOT NULL DEFAULT 0,
	`cod_amount_limit` float(15,2) NOT NULL DEFAULT 0,
	`card_on_delivery_limit` float(15,2) NOT NULL DEFAULT 0,
	`header_quote` varchar(255),
	`about_website` text,
	`delivery_left_status` tinyint(1) NOT NULL DEFAULT 1,
	`verification_status` tinyint(1) NOT NULL DEFAULT 1,
	`email_verification_status` tinyint(1) NOT NULL DEFAULT 1,
	CONSTRAINT `tbl_admin_admin_id` PRIMARY KEY(`admin_id`)
);
--> statement-breakpoint
CREATE TABLE `tbl_admin_allowed_sections` (
	`id` int AUTO_INCREMENT NOT NULL,
	`subadmin_id` int NOT NULL,
	`sec_parent_id` int NOT NULL,
	`sec_id` int NOT NULL,
	`permission` varchar(25) NOT NULL DEFAULT '1',
	`allow_member_ids` text,
	CONSTRAINT `tbl_admin_allowed_sections_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tbl_admin_sections` (
	`id` int AUTO_INCREMENT NOT NULL,
	`parent_id` int NOT NULL DEFAULT 0,
	`section_title` varchar(100),
	`section_controller` varchar(100),
	`disp_order` int NOT NULL DEFAULT 0,
	`actual_privilege` varchar(100),
	`is_visible` tinyint(1) NOT NULL DEFAULT 1,
	`status` char(1) NOT NULL DEFAULT '1',
	CONSTRAINT `tbl_admin_sections_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `wl_about_choose` (
	`choose_id` int AUTO_INCREMENT NOT NULL,
	`choose_title` varchar(120) NOT NULL,
	`choose_description` tinytext,
	`sort_order` int,
	`status` tinyint(1) NOT NULL DEFAULT 1,
	`date_added` datetime NOT NULL,
	`date_updated` datetime,
	CONSTRAINT `wl_about_choose_choose_id` PRIMARY KEY(`choose_id`)
);
--> statement-breakpoint
CREATE TABLE `wl_albums` (
	`album_id` int AUTO_INCREMENT NOT NULL,
	`parent_id` int NOT NULL DEFAULT 0,
	`album_type` tinyint(1) NOT NULL DEFAULT 0,
	`friendly_url` varchar(80),
	`album_title` varchar(200) NOT NULL,
	`album_description` text,
	`album_image` varchar(50),
	`sort_order` int,
	`status` enum('1','0') NOT NULL DEFAULT '1',
	`album_date_added` datetime NOT NULL,
	`album_date_updated` datetime,
	CONSTRAINT `wl_albums_album_id` PRIMARY KEY(`album_id`)
);
--> statement-breakpoint
CREATE TABLE `wl_apl_tokens` (
	`api_token_id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL DEFAULT 0,
	`login_type` int NOT NULL DEFAULT 0,
	`token` varchar(100) NOT NULL,
	`provider` varchar(100) NOT NULL DEFAULT 'user',
	`app_type` enum('android','ios') DEFAULT 'android',
	`app_id` varchar(255),
	`created_at` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`expired_at` timestamp,
	CONSTRAINT `wl_apl_tokens_api_token_id` PRIMARY KEY(`api_token_id`)
);
--> statement-breakpoint
CREATE TABLE `wl_auto_respond_mails` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email_section` varchar(80) NOT NULL,
	`email_subject` varchar(200) NOT NULL,
	`email_content` text NOT NULL,
	`status` enum('0','1','2') NOT NULL DEFAULT '1',
	`updated_on` datetime,
	CONSTRAINT `wl_auto_respond_mails_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `wl_banners` (
	`banner_id` int AUTO_INCREMENT NOT NULL,
	`banner_type` tinyint(1) NOT NULL DEFAULT 1,
	`member_id` int NOT NULL DEFAULT 0,
	`member_type` tinyint(1) NOT NULL DEFAULT 0,
	`banner_position` varchar(100),
	`ref_category_id` int NOT NULL,
	`ref_prod_type` int NOT NULL,
	`ref_item_id` int NOT NULL,
	`banner_image` varchar(200),
	`banner_title` varchar(100),
	`banner_url` varchar(170),
	`banner_page` varchar(30),
	`banner_price` float(10,2) NOT NULL DEFAULT 0,
	`description` text,
	`status` tinyint(1) DEFAULT 1,
	`last_status` tinyint(1) NOT NULL,
	`trashed_by` int NOT NULL,
	`trashed` tinyint(1) NOT NULL,
	`is_reverted` tinyint(1) NOT NULL,
	`clicks` int NOT NULL DEFAULT 0,
	`is_approved` tinyint(1) NOT NULL DEFAULT 0,
	`banner_added_date` datetime,
	`banner_updated_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
	`banner_start_date` datetime,
	`banner_end_date` datetime,
	CONSTRAINT `wl_banners_banner_id` PRIMARY KEY(`banner_id`)
);
--> statement-breakpoint
CREATE TABLE `wl_categories` (
	`category_id` int AUTO_INCREMENT NOT NULL,
	`cat_type` tinyint(1) NOT NULL DEFAULT 1,
	`cat_links` varchar(50),
	`category_name` varchar(100) NOT NULL,
	`friendly_url` varchar(100) NOT NULL,
	`category_image` varchar(255),
	`category_description` text NOT NULL,
	`category_tag` text NOT NULL,
	`subscription_page_text` text,
	`parent_id` int NOT NULL DEFAULT 0,
	`is_home` enum('1','0') NOT NULL DEFAULT '0',
	`is_menu` enum('1','0') NOT NULL DEFAULT '0',
	`is_footer` enum('0','1') NOT NULL DEFAULT '0',
	`is_fixed` enum('1','0') NOT NULL DEFAULT '0',
	`is_about` tinyint(1) DEFAULT 0,
	`about_cent` int,
	`home_our_products` tinyint(1) NOT NULL DEFAULT 0,
	`sort_order` int,
	`date_added` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
	`date_modified` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
	`status` enum('0','1','2') NOT NULL DEFAULT '1',
	`last_status` tinyint(1) NOT NULL,
	`trashed_by` int NOT NULL,
	`trashed` tinyint(1) NOT NULL,
	`is_reverted` tinyint(1) NOT NULL,
	`meta_title` varchar(100),
	`meta_keywords` varchar(100),
	`meta_description` varchar(225),
	`category_alt` varchar(200) NOT NULL,
	`category_banner` varchar(150),
	`xls_type` enum('0','1') NOT NULL DEFAULT '0',
	CONSTRAINT `wl_categories_category_id` PRIMARY KEY(`category_id`)
);
--> statement-breakpoint
CREATE TABLE `wl_cms_pages` (
	`page_id` int AUTO_INCREMENT NOT NULL,
	`parent_id` int NOT NULL DEFAULT 0,
	`page_name` varchar(50) NOT NULL DEFAULT '',
	`friendly_url` varchar(50) NOT NULL,
	`page_description` longtext NOT NULL,
	`page_short_description` text,
	`cms_type` enum('0','1'),
	`page_image` varchar(150) NOT NULL,
	`status` enum('0','1','2') NOT NULL DEFAULT '1',
	`page_updated_date` datetime NOT NULL,
	CONSTRAINT `wl_cms_pages_page_id` PRIMARY KEY(`page_id`)
);
--> statement-breakpoint
CREATE TABLE `wl_configuration` (
	`sl` int AUTO_INCREMENT NOT NULL,
	`type` varchar(30) NOT NULL,
	`value` text NOT NULL,
	`up_date` datetime NOT NULL,
	CONSTRAINT `wl_configuration_sl` PRIMARY KEY(`sl`)
);
--> statement-breakpoint
CREATE TABLE `wl_cron_tracker` (
	`log_id` int AUTO_INCREMENT NOT NULL,
	`cron_type` varchar(35) NOT NULL,
	`crn_start_date` datetime NOT NULL,
	`crn_end_date` datetime NOT NULL,
	CONSTRAINT `wl_cron_tracker_log_id` PRIMARY KEY(`log_id`)
);
--> statement-breakpoint
CREATE TABLE `wl_currencies` (
	`currency_id` int NOT NULL,
	`title` varchar(32) NOT NULL DEFAULT '',
	`code` varchar(3) NOT NULL DEFAULT '',
	`symbol_left` varchar(100) NOT NULL,
	`symbol_right` varchar(12) NOT NULL,
	`curr_image` varchar(250) NOT NULL,
	`decimal_place` char(1) NOT NULL,
	`value` float(15,8) NOT NULL,
	`is_default` enum('Y','N') NOT NULL DEFAULT 'N',
	`status` int NOT NULL,
	`date_modified` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
	CONSTRAINT `wl_currencies_currency_id` PRIMARY KEY(`currency_id`)
);
--> statement-breakpoint
CREATE TABLE `wl_customers` (
	`customers_id` int AUTO_INCREMENT NOT NULL,
	`parent_id` int DEFAULT 0,
	`member_type` tinyint(1) NOT NULL DEFAULT 3,
	`mem_nature` tinyint(1) NOT NULL DEFAULT 1,
	`registration_id` varchar(150),
	`deals_in` varchar(50),
	`user_name` varchar(80),
	`alternate_email` varchar(100),
	`password` varchar(100) NOT NULL,
	`title` varchar(10),
	`first_name` varchar(32),
	`last_name` varchar(32),
	`store_name` varchar(50),
	`gender` enum('Male','Female','Rather not say') DEFAULT 'Male',
	`birth_date` date,
	`profile_photo` varchar(100),
	`phone_number` varchar(32),
	`country_code` varchar(20),
	`mob_country_code` varchar(20),
	`mobile_number` varchar(32),
	`fax_number` varchar(32),
	`other_emails` varchar(255),
	`address` text,
	`country` int DEFAULT 0,
	`state` int DEFAULT 0,
	`city` int DEFAULT 0,
	`location` int DEFAULT 0,
	`pin_code` int,
	`ucountry_name` varchar(100),
	`ustate_name` varchar(100),
	`ucity_name` varchar(100),
	`shop_name` varchar(150),
	`shop_banner` varchar(100),
	`address_line1` varchar(200),
	`google_map` text,
	`ulocation` varchar(100),
	`customer_support` varchar(100),
	`actkey` varchar(32) NOT NULL,
	`user_uq_token` varchar(70),
	`is_home` enum('Y','N') DEFAULT 'N',
	`status` enum('0','1','2','3') NOT NULL DEFAULT '0',
	`last_status` tinyint(1) NOT NULL,
	`trashed_by` int NOT NULL,
	`trashed` tinyint(1) NOT NULL,
	`is_reverted` tinyint(1) NOT NULL,
	`is_verified` enum('0','1','2') NOT NULL DEFAULT '0',
	`is_verified_mobile` enum('0','1') NOT NULL DEFAULT '0',
	`login_type` enum('normal','facebook','twitter') NOT NULL DEFAULT 'normal',
	`account_created_date` datetime,
	`current_login` datetime,
	`last_login_date` datetime,
	`ip_address` varchar(25) NOT NULL,
	`is_blocked` enum('0','1') NOT NULL DEFAULT '0',
	`block_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
	`number_of_login_try` int NOT NULL DEFAULT 0,
	`replied` enum('Y','N') NOT NULL DEFAULT 'N',
	`verify_code` int,
	`app_id` varchar(255),
	`device_id` text,
	`app_type` varchar(255),
	`temp_mobile` varchar(20),
	`temp_email` varchar(80),
	`is_verified_mail_once` tinyint(1) NOT NULL DEFAULT 0,
	`my_ref_code_users` int NOT NULL,
	`is_import` tinyint(1) NOT NULL DEFAULT 0,
	`seller_rating` varchar(30),
	`ship_on_time` varchar(30),
	`chat_response` varchar(30),
	`bank_name` varchar(100),
	`account_no` varchar(20),
	`branch_name` varchar(100),
	`ifsc_code` varchar(12),
	`admin_commission` float(10,2) NOT NULL DEFAULT 0,
	`shipping_charges` int NOT NULL DEFAULT 0,
	`order_amount_for_free_shipping` int NOT NULL DEFAULT 0,
	`payable_amount` float(10,2) NOT NULL DEFAULT 0,
	`paid_amount` float(10,2) NOT NULL DEFAULT 0,
	`commission_amount` float(10,2) NOT NULL DEFAULT 0,
	`shipping_amount` float(10,2) NOT NULL DEFAULT 0,
	`refer_approved` tinyint(1) NOT NULL DEFAULT 0,
	`refer_user` int NOT NULL DEFAULT 0,
	`is_bulk_active` tinyint(1) NOT NULL DEFAULT 0,
	`xls_type` enum('0','1','2') NOT NULL DEFAULT '0',
	CONSTRAINT `wl_customers_customers_id` PRIMARY KEY(`customers_id`)
);
--> statement-breakpoint
CREATE TABLE `wl_enquiry` (
	`id` int AUTO_INCREMENT NOT NULL,
	`customers_id` int NOT NULL DEFAULT 0,
	`entity_id` int NOT NULL DEFAULT 0,
	`type` tinyint(1) NOT NULL DEFAULT 1,
	`entity_title` varchar(255),
	`first_name` varchar(30) NOT NULL,
	`last_name` varchar(50),
	`email` varchar(150) NOT NULL,
	`office_address` varchar(255),
	`amount` varchar(55) DEFAULT '0.00',
	`amount_councry` varchar(55),
	`country` varchar(200),
	`country_code` varchar(10),
	`state` varchar(50),
	`city` varchar(50),
	`phone_number` varchar(20),
	`ext_number` varchar(50),
	`mob_country_code` varchar(20),
	`mobile_number` varchar(50),
	`fax_number` varchar(30),
	`address` varchar(220),
	`zipcode` varchar(10),
	`requirement` text,
	`category_name` varchar(255),
	`message` text NOT NULL,
	`size` varchar(255),
	`status` enum('1','2') NOT NULL,
	`reply_status` enum('Y','N') NOT NULL DEFAULT 'N',
	`receive_date` datetime NOT NULL,
	CONSTRAINT `wl_enquiry_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `wl_expertise` (
	`expertise_id` int AUTO_INCREMENT NOT NULL,
	`temple_id` int NOT NULL DEFAULT 0,
	`expertise_name` varchar(120) NOT NULL,
	`designation` varchar(255),
	`mobile_number` varchar(20),
	`experience` varchar(100),
	`expertise_image` varchar(150),
	`expertise_description` tinytext,
	`sort_order` int,
	`status` tinyint(1) NOT NULL DEFAULT 1,
	`date_added` datetime NOT NULL,
	`date_updated` datetime,
	CONSTRAINT `wl_expertise_expertise_id` PRIMARY KEY(`expertise_id`)
);
--> statement-breakpoint
CREATE TABLE `wl_faq` (
	`faq_id` int AUTO_INCREMENT NOT NULL,
	`faq_type` tinyint(1) NOT NULL DEFAULT 1,
	`faq_parent_id` int NOT NULL DEFAULT 0,
	`entity_id` int NOT NULL DEFAULT 0,
	`faq_question` varchar(225) NOT NULL,
	`faq_answer` text NOT NULL,
	`sort_order` int,
	`status` tinyint(1) NOT NULL DEFAULT 1,
	`faq_date_added` datetime NOT NULL,
	CONSTRAINT `wl_faq_faq_id` PRIMARY KEY(`faq_id`)
);
--> statement-breakpoint
CREATE TABLE `wl_gallery` (
	`gallery_id` int AUTO_INCREMENT NOT NULL,
	`category_id` int NOT NULL DEFAULT 0,
	`gallery_title` varchar(200) NOT NULL,
	`friendly_url` varchar(200),
	`gallery_image` varchar(50),
	`description` varchar(255),
	`sort_order` int,
	`status` enum('1','0') NOT NULL DEFAULT '1',
	`gallery_date_added` datetime NOT NULL,
	`gallery_date_updated` datetime,
	CONSTRAINT `wl_gallery_gallery_id` PRIMARY KEY(`gallery_id`)
);
--> statement-breakpoint
CREATE TABLE `wl_header_images` (
	`id` int AUTO_INCREMENT NOT NULL,
	`header_image` varchar(200) NOT NULL,
	`header_url` varchar(255),
	`line_one` varchar(100),
	`line_two` varchar(150),
	`line_three` varchar(300),
	`status` enum('1','0','2') NOT NULL,
	`added_date` datetime NOT NULL,
	CONSTRAINT `wl_header_images_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `wl_invite_friends` (
	`invite_id` int AUTO_INCREMENT NOT NULL,
	`product_id` int NOT NULL DEFAULT 0,
	`friend_name` varchar(100) NOT NULL,
	`friend_email` varchar(100) NOT NULL,
	`your_name` varchar(100) NOT NULL,
	`your_email` varchar(100) NOT NULL,
	`receive_date` datetime NOT NULL,
	CONSTRAINT `wl_invite_friends_invite_id` PRIMARY KEY(`invite_id`)
);
--> statement-breakpoint
CREATE TABLE `wl_meta_tags` (
	`meta_id` int AUTO_INCREMENT NOT NULL,
	`is_fixed` enum('Y','N') NOT NULL DEFAULT 'N',
	`entity_type` varchar(180),
	`entity_id` int NOT NULL DEFAULT 0,
	`page_url` varchar(250) NOT NULL,
	`meta_title` varchar(255) NOT NULL,
	`meta_description` varchar(500) NOT NULL,
	`meta_keyword` varchar(500),
	`status` enum('0','1') NOT NULL DEFAULT '1',
	CONSTRAINT `wl_meta_tags_meta_id` PRIMARY KEY(`meta_id`)
);
--> statement-breakpoint
CREATE TABLE `wl_notification` (
	`notification_id` int AUTO_INCREMENT NOT NULL,
	`nf_type` tinyint(1) NOT NULL DEFAULT 1,
	`member_type` tinyint(1) NOT NULL DEFAULT 3,
	`type_manage` tinyint NOT NULL,
	`type_action` tinyint NOT NULL,
	`notification_title` varchar(255),
	`notification_image` varchar(100),
	`description` text,
	`mem_by_type` tinyint(1) NOT NULL,
	`ref_type_id` int NOT NULL,
	`ref_prod_type` int NOT NULL,
	`ref_item_id` int NOT NULL,
	`is_repeat` tinyint(1) NOT NULL DEFAULT 0,
	`repeat_from_day` varchar(20) NOT NULL,
	`repeat_to_day` varchar(20) NOT NULL,
	`repeat_times` tinyint NOT NULL,
	`send_sms` tinyint(1) NOT NULL DEFAULT 0,
	`schedule_date` date NOT NULL,
	`schedule_time` varchar(20) NOT NULL,
	`schedule_date_time` datetime NOT NULL,
	`schedule_end_date` date NOT NULL,
	`has_members` tinyint(1) NOT NULL DEFAULT 2,
	`created_at` datetime,
	`updated_at` datetime NOT NULL,
	`status` tinyint(1) NOT NULL DEFAULT 0,
	`last_status` tinyint(1) NOT NULL,
	`trashed_by` int NOT NULL,
	`trashed` tinyint(1) NOT NULL,
	`is_reverted` tinyint(1) NOT NULL,
	`url_hint` varchar(25),
	`url_params` text,
	CONSTRAINT `wl_notification_notification_id` PRIMARY KEY(`notification_id`)
);
--> statement-breakpoint
CREATE TABLE `wl_notification_customer` (
	`id` int AUTO_INCREMENT NOT NULL,
	`notification_id` int NOT NULL,
	`customer_id` int NOT NULL,
	`read_status` enum('R','U') NOT NULL DEFAULT 'U',
	`created_at` datetime,
	CONSTRAINT `wl_notification_customer_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `wl_partners` (
	`partner_id` int AUTO_INCREMENT NOT NULL,
	`temple_id` int NOT NULL DEFAULT 0,
	`partner_name` varchar(120) NOT NULL,
	`designation` varchar(255),
	`mobile_number` varchar(20),
	`experience` varchar(100),
	`partner_image` varchar(150),
	`short_desc` tinytext,
	`sort_order` int,
	`status` tinyint(1) NOT NULL DEFAULT 1,
	`date_added` datetime NOT NULL,
	`date_updated` datetime,
	CONSTRAINT `wl_partners_partner_id` PRIMARY KEY(`partner_id`)
);
--> statement-breakpoint
CREATE TABLE `wl_products` (
	`product_id` int AUTO_INCREMENT NOT NULL,
	`category_id` int DEFAULT 0,
	`category_links` varchar(80),
	`product_title` varchar(100) NOT NULL,
	`product_code` varchar(80),
	`reference_id` varchar(255),
	`product_make` varchar(150),
	`product_model` varchar(100),
	`year` varchar(100),
	`friendly_url` varchar(110),
	`product_alt` varchar(100),
	`product_description` text NOT NULL,
	`product_video` varchar(255),
	`is_best` tinyint(1) NOT NULL DEFAULT 0,
	`is_hot` tinyint(1) DEFAULT 0,
	`is_new` tinyint(1) NOT NULL DEFAULT 0,
	`is_featured` tinyint(1) NOT NULL DEFAULT 0,
	`is_recent` tinyint(1) NOT NULL DEFAULT 0,
	`product_type` tinyint(1) NOT NULL DEFAULT 0,
	`xls_type` enum('0','1') NOT NULL DEFAULT '0',
	`status` tinyint(1) NOT NULL DEFAULT 1,
	`added_date` datetime NOT NULL,
	`updated_date` datetime,
	CONSTRAINT `wl_products_product_id` PRIMARY KEY(`product_id`)
);
--> statement-breakpoint
CREATE TABLE `wl_products_media` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`product_id` int unsigned NOT NULL,
	`media_type` enum('photo','video','pdf') NOT NULL DEFAULT 'photo',
	`media` varchar(255) NOT NULL,
	`is_default` enum('Y','N') NOT NULL DEFAULT 'N',
	`sort_order` int,
	`media_date_added` datetime NOT NULL,
	CONSTRAINT `wl_products_media_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `wl_reset_pwd_link` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`code` varchar(20) NOT NULL,
	`expire` datetime NOT NULL,
	`added` datetime NOT NULL,
	CONSTRAINT `wl_reset_pwd_link_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `wl_sessions` (
	`id` varchar(128) NOT NULL,
	`ip_address` varchar(45) NOT NULL,
	`timestamp` int unsigned NOT NULL DEFAULT 0,
	`data` blob NOT NULL
);
--> statement-breakpoint
CREATE TABLE `wl_testimonials` (
	`testimonial_id` int AUTO_INCREMENT NOT NULL,
	`mem_id` int NOT NULL,
	`testimonial_title` varchar(150),
	`poster_name` varchar(50),
	`friendly_url` varchar(100) NOT NULL,
	`email` varchar(80),
	`company` varchar(200),
	`testimonial_description` text,
	`photo` varchar(255),
	`posted_date` datetime,
	`status` tinyint(1) NOT NULL DEFAULT 1,
	CONSTRAINT `wl_testimonials_testimonial_id` PRIMARY KEY(`testimonial_id`)
);
--> statement-breakpoint
CREATE TABLE `wl_tracker_notification` (
	`notify_id` int AUTO_INCREMENT NOT NULL,
	`notify_type` varchar(35) NOT NULL,
	`member_id` int NOT NULL,
	`notify_ref_id` int NOT NULL,
	`notify_date` datetime NOT NULL,
	CONSTRAINT `wl_tracker_notification_notify_id` PRIMARY KEY(`notify_id`)
);
--> statement-breakpoint
CREATE TABLE `wl_transactions` (
	`transaction_id` int AUTO_INCREMENT NOT NULL,
	`seller_id` int NOT NULL DEFAULT 0,
	`transaction_amount` float(10,2) NOT NULL DEFAULT 0,
	`transaction_date` datetime,
	CONSTRAINT `wl_transactions_transaction_id` PRIMARY KEY(`transaction_id`)
);
--> statement-breakpoint
CREATE TABLE `wl_videos` (
	`video_id` int AUTO_INCREMENT NOT NULL,
	`category_id` int NOT NULL DEFAULT 0,
	`video_title` varchar(200),
	`video_link` varchar(200),
	`video_image` varchar(100),
	`sort_order` int,
	`status` tinyint(1) NOT NULL DEFAULT 1,
	`video_date_added` datetime NOT NULL,
	`video_date_updated` datetime,
	CONSTRAINT `wl_videos_video_id` PRIMARY KEY(`video_id`)
);
--> statement-breakpoint
CREATE TABLE `wl_webhook_details` (
	`id` int AUTO_INCREMENT NOT NULL,
	`ip_address` varchar(50),
	`user_agent` varchar(255),
	`webhook_data` text NOT NULL,
	`receive_date` datetime,
	CONSTRAINT `wl_webhook_details_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `mem_by_type` ON `wl_notification` (`mem_by_type`,`ref_type_id`,`ref_prod_type`,`ref_item_id`);--> statement-breakpoint
CREATE INDEX `idx_products_images_products_id` ON `wl_products_media` (`product_id`);--> statement-breakpoint
CREATE INDEX `user_id` ON `wl_reset_pwd_link` (`user_id`);--> statement-breakpoint
CREATE INDEX `notify_type` ON `wl_tracker_notification` (`notify_type`,`member_id`,`notify_ref_id`);
*/