-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 15, 2026 at 12:18 PM
-- Server version: 8.0.46-0ubuntu0.24.04.4
-- PHP Version: 8.2.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shukhad_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `rest_logs`
--

CREATE TABLE `rest_logs` (
  `id` int NOT NULL,
  `uri` varchar(255) NOT NULL,
  `method` varchar(6) NOT NULL,
  `params` text,
  `api_key` varchar(40) NOT NULL,
  `ip_address` varchar(45) NOT NULL,
  `time` int NOT NULL,
  `rtime` float DEFAULT NULL,
  `authorized` varchar(1) NOT NULL,
  `response_code` smallint DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `rest_logs`
--

INSERT INTO `rest_logs` (`id`, `uri`, `method`, `params`, `api_key`, `ip_address`, `time`, `rtime`, `authorized`, `response_code`) VALUES
(1, 'apis/pages/aboutus', 'get', 'a:9:{s:13:\"AUTHORIZATION\";s:15:\"MLt!45ai#17xA68\";s:10:\"User-Agent\";s:21:\"PostmanRuntime/7.37.3\";s:6:\"Accept\";s:3:\"*/*\";s:13:\"Cache-Control\";s:8:\"no-cache\";s:13:\"Postman-Token\";s:36:\"cd106c78-1015-4a89-9ff8-5ad46ff35d4b\";s:4:\"Host\";s:9:\"localhost\";s:15:\"Accept-Encoding\";s:17:\"gzip, deflate, br\";s:10:\"Connection\";s:10:\"keep-alive\";s:6:\"Cookie\";s:86:\"KLP_2378M=cac2649e6be48a5c78d94fc134d62130; PHPSESSID=09unhd5iegucc2ause8ciaq5979qs60i\";}', 'MLt!45ai#17xA68', '::1', 1762936506, 0.0192831, '1', 200),
(2, 'apis/pages/aboutus', 'get', 'a:9:{s:13:\"AUTHORIZATION\";s:15:\"MLt!45ai#17xA68\";s:10:\"User-Agent\";s:21:\"PostmanRuntime/7.37.3\";s:6:\"Accept\";s:3:\"*/*\";s:13:\"Cache-Control\";s:8:\"no-cache\";s:13:\"Postman-Token\";s:36:\"c913c02f-c7df-41eb-a797-5371690e2a23\";s:4:\"Host\";s:9:\"localhost\";s:15:\"Accept-Encoding\";s:17:\"gzip, deflate, br\";s:10:\"Connection\";s:10:\"keep-alive\";s:6:\"Cookie\";s:86:\"KLP_2378M=cac2649e6be48a5c78d94fc134d62130; PHPSESSID=09unhd5iegucc2ause8ciaq5979qs60i\";}', 'MLt!45ai#17xA68', '::1', 1762937035, 0.0192831, '1', 200),
(3, 'apis/pages/aboutus', 'get', 'a:9:{s:13:\"AUTHORIZATION\";s:15:\"MLt!45ai#17xA68\";s:10:\"User-Agent\";s:21:\"PostmanRuntime/7.37.3\";s:6:\"Accept\";s:3:\"*/*\";s:13:\"Cache-Control\";s:8:\"no-cache\";s:13:\"Postman-Token\";s:36:\"0bfc963a-52bf-4392-a9e2-89ce2cf96c23\";s:4:\"Host\";s:9:\"localhost\";s:15:\"Accept-Encoding\";s:17:\"gzip, deflate, br\";s:10:\"Connection\";s:10:\"keep-alive\";s:6:\"Cookie\";s:86:\"KLP_2378M=cac2649e6be48a5c78d94fc134d62130; PHPSESSID=eff5tiq38cvfcc9m8elejlgpqji3a8vi\";}', 'MLt!45ai#17xA68', '::1', 1762937312, 0.0144289, '1', 200),
(4, 'apis/pages/aboutus', 'get', 'a:9:{s:13:\"AUTHORIZATION\";s:15:\"MLt!45ai#17xA68\";s:10:\"User-Agent\";s:21:\"PostmanRuntime/7.37.3\";s:6:\"Accept\";s:3:\"*/*\";s:13:\"Cache-Control\";s:8:\"no-cache\";s:13:\"Postman-Token\";s:36:\"394a7f99-b96e-4401-b20f-ada4d9281cba\";s:4:\"Host\";s:9:\"localhost\";s:15:\"Accept-Encoding\";s:17:\"gzip, deflate, br\";s:10:\"Connection\";s:10:\"keep-alive\";s:6:\"Cookie\";s:86:\"KLP_2378M=cac2649e6be48a5c78d94fc134d62130; PHPSESSID=eff5tiq38cvfcc9m8elejlgpqji3a8vi\";}', 'MLt!45ai#17xA68', '::1', 1762938059, 0.0139019, '1', 200),
(5, 'apis/pages/aboutus', 'get', 'a:8:{s:10:\"User-Agent\";s:21:\"PostmanRuntime/7.37.3\";s:6:\"Accept\";s:3:\"*/*\";s:13:\"Cache-Control\";s:8:\"no-cache\";s:13:\"Postman-Token\";s:36:\"09d5add8-91c8-41d1-969a-fb11e529f126\";s:4:\"Host\";s:9:\"localhost\";s:15:\"Accept-Encoding\";s:17:\"gzip, deflate, br\";s:10:\"Connection\";s:10:\"keep-alive\";s:6:\"Cookie\";s:86:\"KLP_2378M=cac2649e6be48a5c78d94fc134d62130; PHPSESSID=r1p6t112isc3teoo42oocc6651hrnl0t\";}', '', '::1', 1762938389, 0.0110772, '0', 403),
(6, 'apis/pages/aboutus', 'get', 'a:9:{s:13:\"AUTHORIZATION\";s:15:\"MLt!45ai#17xA68\";s:10:\"User-Agent\";s:21:\"PostmanRuntime/7.37.3\";s:6:\"Accept\";s:3:\"*/*\";s:13:\"Cache-Control\";s:8:\"no-cache\";s:13:\"Postman-Token\";s:36:\"cc7149e3-f503-4d2c-8d92-aa21ff3b26cf\";s:4:\"Host\";s:9:\"localhost\";s:15:\"Accept-Encoding\";s:17:\"gzip, deflate, br\";s:10:\"Connection\";s:10:\"keep-alive\";s:6:\"Cookie\";s:86:\"KLP_2378M=cac2649e6be48a5c78d94fc134d62130; PHPSESSID=6umvkdpt7g91n42h7o42sle6m9s1n9ar\";}', 'MLt!45ai#17xA68', '::1', 1762938404, 0.0228479, '1', 200),
(7, 'apis/pages/aboutus', 'post', 'a:10:{s:13:\"AUTHORIZATION\";s:15:\"MLt!45ai#17xA68\";s:10:\"User-Agent\";s:21:\"PostmanRuntime/7.37.3\";s:6:\"Accept\";s:3:\"*/*\";s:13:\"Cache-Control\";s:8:\"no-cache\";s:13:\"Postman-Token\";s:36:\"d569d98c-dd1e-422e-8ec3-e796a2b38b79\";s:4:\"Host\";s:9:\"localhost\";s:15:\"Accept-Encoding\";s:17:\"gzip, deflate, br\";s:10:\"Connection\";s:10:\"keep-alive\";s:6:\"Cookie\";s:42:\"KLP_2378M=c86e70b5b37b1163b2a0a97351583071\";s:14:\"Content-Length\";s:1:\"0\";}', 'MLt!45ai#17xA68', '::1', 1763014359, 0.0246022, '1', 200),
(8, 'apis/home', 'post', 'a:10:{s:13:\"AUTHORIZATION\";s:15:\"MLt!45ai#17xA68\";s:10:\"User-Agent\";s:21:\"PostmanRuntime/7.37.3\";s:6:\"Accept\";s:3:\"*/*\";s:13:\"Cache-Control\";s:8:\"no-cache\";s:13:\"Postman-Token\";s:36:\"710a5dee-a982-4316-997b-3a4c5f26b8bb\";s:4:\"Host\";s:9:\"localhost\";s:15:\"Accept-Encoding\";s:17:\"gzip, deflate, br\";s:10:\"Connection\";s:10:\"keep-alive\";s:6:\"Cookie\";s:86:\"KLP_2378M=c86e70b5b37b1163b2a0a97351583071; PHPSESSID=eg000ig6h42o4vuo0ehp1knu6djf6q8g\";s:14:\"Content-Length\";s:1:\"0\";}', 'MLt!45ai#17xA68', '::1', 1763014446, 0.0145221, '1', 0),
(9, 'apis/home', 'get', 'a:9:{s:13:\"AUTHORIZATION\";s:15:\"MLt!45ai#17xA68\";s:10:\"User-Agent\";s:21:\"PostmanRuntime/7.37.3\";s:6:\"Accept\";s:3:\"*/*\";s:13:\"Cache-Control\";s:8:\"no-cache\";s:13:\"Postman-Token\";s:36:\"43dfc4c9-8fbb-413c-8d62-d98c0c04670a\";s:4:\"Host\";s:9:\"localhost\";s:15:\"Accept-Encoding\";s:17:\"gzip, deflate, br\";s:10:\"Connection\";s:10:\"keep-alive\";s:6:\"Cookie\";s:86:\"KLP_2378M=c86e70b5b37b1163b2a0a97351583071; PHPSESSID=eg000ig6h42o4vuo0ehp1knu6djf6q8g\";}', 'MLt!45ai#17xA68', '::1', 1763014468, 0.0133281, '1', 400),
(10, 'apis/home', 'put', 'a:10:{s:13:\"AUTHORIZATION\";s:15:\"MLt!45ai#17xA68\";s:10:\"User-Agent\";s:21:\"PostmanRuntime/7.37.3\";s:6:\"Accept\";s:3:\"*/*\";s:13:\"Cache-Control\";s:8:\"no-cache\";s:13:\"Postman-Token\";s:36:\"8273e9e9-d3c0-4fd2-9d20-e78317047b48\";s:4:\"Host\";s:9:\"localhost\";s:15:\"Accept-Encoding\";s:17:\"gzip, deflate, br\";s:10:\"Connection\";s:10:\"keep-alive\";s:6:\"Cookie\";s:86:\"KLP_2378M=c86e70b5b37b1163b2a0a97351583071; PHPSESSID=eg000ig6h42o4vuo0ehp1knu6djf6q8g\";s:14:\"Content-Length\";s:1:\"0\";}', 'MLt!45ai#17xA68', '::1', 1763014490, 0.0124471, '1', 200),
(11, 'apis/home', 'put', 'a:10:{s:13:\"AUTHORIZATION\";s:15:\"MLt!45ai#17xA68\";s:10:\"User-Agent\";s:21:\"PostmanRuntime/7.37.3\";s:6:\"Accept\";s:3:\"*/*\";s:13:\"Cache-Control\";s:8:\"no-cache\";s:13:\"Postman-Token\";s:36:\"d75a0b29-b66c-40ba-98b9-9a3dafd92b73\";s:4:\"Host\";s:9:\"localhost\";s:15:\"Accept-Encoding\";s:17:\"gzip, deflate, br\";s:10:\"Connection\";s:10:\"keep-alive\";s:6:\"Cookie\";s:86:\"KLP_2378M=c86e70b5b37b1163b2a0a97351583071; PHPSESSID=eg000ig6h42o4vuo0ehp1knu6djf6q8g\";s:14:\"Content-Length\";s:1:\"0\";}', 'MLt!45ai#17xA68', '::1', 1763014534, 0.011723, '1', 0),
(12, 'apis/home', 'put', 'a:10:{s:13:\"AUTHORIZATION\";s:15:\"MLt!45ai#17xA68\";s:10:\"User-Agent\";s:21:\"PostmanRuntime/7.37.3\";s:6:\"Accept\";s:3:\"*/*\";s:13:\"Cache-Control\";s:8:\"no-cache\";s:13:\"Postman-Token\";s:36:\"86181cb6-c175-406d-ba93-d2d40ae9df58\";s:4:\"Host\";s:9:\"localhost\";s:15:\"Accept-Encoding\";s:17:\"gzip, deflate, br\";s:10:\"Connection\";s:10:\"keep-alive\";s:6:\"Cookie\";s:86:\"KLP_2378M=c86e70b5b37b1163b2a0a97351583071; PHPSESSID=eg000ig6h42o4vuo0ehp1knu6djf6q8g\";s:14:\"Content-Length\";s:1:\"0\";}', 'MLt!45ai#17xA68', '::1', 1763014571, 0.012567, '1', 202),
(13, 'apis/pages/contactus', 'post', 'a:10:{s:13:\"AUTHORIZATION\";s:15:\"MLt!45ai#17xA68\";s:10:\"User-Agent\";s:21:\"PostmanRuntime/7.37.3\";s:6:\"Accept\";s:3:\"*/*\";s:13:\"Cache-Control\";s:8:\"no-cache\";s:13:\"Postman-Token\";s:36:\"c9f5c805-22ad-4b29-bdde-6b019f879d78\";s:4:\"Host\";s:9:\"localhost\";s:15:\"Accept-Encoding\";s:17:\"gzip, deflate, br\";s:10:\"Connection\";s:10:\"keep-alive\";s:6:\"Cookie\";s:86:\"KLP_2378M=c86e70b5b37b1163b2a0a97351583071; PHPSESSID=eg000ig6h42o4vuo0ehp1knu6djf6q8g\";s:14:\"Content-Length\";s:1:\"0\";}', 'MLt!45ai#17xA68', '::1', 1763014656, 0.0168869, '1', 200);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_admin`
--

CREATE TABLE `tbl_admin` (
  `admin_id` int NOT NULL,
  `admin_type` enum('1','2','3') CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT '2' COMMENT '1= super admin , 2= half_admin_right,3=low_admin_right',
  `admin_key` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `admin_name` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `admin_username` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `admin_password` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL,
  `admin_email` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `order_email` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `noreply_email` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `litigation_days` int DEFAULT NULL,
  `admin_last_login` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `address` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `city` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `state` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `country` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `zipcode` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `phone` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `whatsapp_no` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `whatsapp_text` varchar(499) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `free_shipping_order_amount` int NOT NULL DEFAULT '500',
  `fax` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `post_date` date NOT NULL,
  `status` enum('0','1','2') CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT '1',
  `total_hits` bigint NOT NULL DEFAULT '0',
  `facebook_link` varchar(250) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `twitter_link` varchar(250) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `linkedin_link` varchar(250) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `google_link` varchar(250) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `youtube_link` varchar(250) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `instagram_link` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `telegram_link` varchar(250) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `google_analytics_id` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `google_web_code` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `google_map_code` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `facebook_pixel` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `gtm_code` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `google_adsense` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `footer_time` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `company_name` varchar(70) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `helpline` varchar(600) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `profile_icon` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `tax` float(10,2) NOT NULL DEFAULT '0.00',
  `seller_commission` float(10,2) NOT NULL DEFAULT '0.00',
  `service_charge` float(10,2) NOT NULL DEFAULT '0.00',
  `gateway_charge` float(10,2) NOT NULL DEFAULT '0.00',
  `payable_amount` float(10,2) NOT NULL DEFAULT '0.00',
  `paid_amount` float(10,2) NOT NULL DEFAULT '0.00',
  `min_sales_amount` float(15,2) NOT NULL DEFAULT '0.00',
  `cod_amount_limit` float(15,2) NOT NULL DEFAULT '0.00',
  `card_on_delivery_limit` float(15,2) NOT NULL DEFAULT '0.00',
  `header_quote` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `about_website` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `delivery_left_status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1=On,0=Off',
  `verification_status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1=On,0=Off',
  `email_verification_status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1=On,0=Off'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `tbl_admin`
--

INSERT INTO `tbl_admin` (`admin_id`, `admin_type`, `admin_key`, `admin_name`, `admin_username`, `admin_password`, `admin_email`, `order_email`, `noreply_email`, `litigation_days`, `admin_last_login`, `address`, `city`, `state`, `country`, `zipcode`, `phone`, `whatsapp_no`, `whatsapp_text`, `free_shipping_order_amount`, `fax`, `post_date`, `status`, `total_hits`, `facebook_link`, `twitter_link`, `linkedin_link`, `google_link`, `youtube_link`, `instagram_link`, `telegram_link`, `google_analytics_id`, `google_web_code`, `google_map_code`, `facebook_pixel`, `gtm_code`, `google_adsense`, `footer_time`, `company_name`, `helpline`, `profile_icon`, `tax`, `seller_commission`, `service_charge`, `gateway_charge`, `payable_amount`, `paid_amount`, `min_sales_amount`, `cod_amount_limit`, `card_on_delivery_limit`, `header_quote`, `about_website`, `delivery_left_status`, `verification_status`, `email_verification_status`) VALUES
(1, '1', 'cnsgkMd4', NULL, 'admin', 'Admin@123', 'shukhadenterprises@gmail.com', NULL, NULL, 20, '0000-00-00 00:00:00', '703 12th street SE Menomonie Wisconsin- 54751 praveen', NULL, NULL, NULL, NULL, '+1 715 619 2486', NULL, NULL, 0, NULL, '0000-00-00', '1', 112, 'https://www.facebook.com/', 'https://www.twitter.com/', 'https://www.linkedin.com/', NULL, 'https://www.youtube.com/', 'https://www.instagram.com/', NULL, '12345678', '', 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5654.6319825834435!2d-91.916048!3d44.876218!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87f87b838ccc5d4f:0xb2b786373acf6ee0!2s703 12th St SE, Menomonie, WI 54751!5e0!3m2!1sen!2sus!4v1786353749112!5m2!1sen!2sus', NULL, NULL, NULL, NULL, 'JV cartTrade', NULL, '2759.jpg', 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, '', 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_admin_allowed_sections`
--

CREATE TABLE `tbl_admin_allowed_sections` (
  `id` int NOT NULL,
  `subadmin_id` int NOT NULL,
  `sec_parent_id` int NOT NULL,
  `sec_id` int NOT NULL,
  `permission` varchar(25) NOT NULL DEFAULT '1' COMMENT '1=View,2=Add,3=Edit,4=Activate,5=Deactivate,6=Delete',
  `allow_member_ids` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_admin_sections`
--

CREATE TABLE `tbl_admin_sections` (
  `id` int NOT NULL,
  `parent_id` int NOT NULL DEFAULT '0',
  `section_title` varchar(100) DEFAULT NULL,
  `section_controller` varchar(100) DEFAULT NULL,
  `disp_order` int NOT NULL DEFAULT '0',
  `actual_privilege` varchar(100) DEFAULT NULL,
  `is_visible` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1=Visible to subadmin,0=No',
  `status` char(1) NOT NULL DEFAULT '1' COMMENT '0=Inactive, 1=Active'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `wl_about_choose`
--

CREATE TABLE `wl_about_choose` (
  `choose_id` int NOT NULL,
  `choose_title` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `choose_description` tinytext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `sort_order` int DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0=Inactive, 1=Active, 2=Delete',
  `date_added` datetime NOT NULL,
  `date_updated` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `wl_about_choose`
--

INSERT INTO `wl_about_choose` (`choose_id`, `choose_title`, `choose_description`, `sort_order`, `status`, `date_added`, `date_updated`) VALUES
(1, 'Market-linked valuation', 'Prices follow current Platinum, Palladium, Rhodium rates.', NULL, 1, '2026-10-13 18:34:08', '2026-10-15 13:14:30'),
(2, 'Accurate Identification', 'Every unit is matched by reference before it is valued.', NULL, 1, '2026-10-15 13:15:49', NULL),
(3, 'Transparent Process', 'Valuation basis is a shared before you agree to selll.', NULL, 1, '2026-10-15 13:17:08', NULL),
(4, 'Responsive Team', 'Enquiries are answered directly by our trading desk.', NULL, 1, '2026-10-15 13:18:46', '2026-10-15 13:18:49');

-- --------------------------------------------------------

--
-- Table structure for table `wl_albums`
--

CREATE TABLE `wl_albums` (
  `album_id` int NOT NULL,
  `parent_id` int NOT NULL DEFAULT '0',
  `album_type` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0=Photo,1=Video',
  `friendly_url` varchar(80) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `album_title` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `album_description` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `album_image` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `sort_order` int DEFAULT NULL,
  `status` enum('1','0') CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT '1',
  `album_date_added` datetime NOT NULL,
  `album_date_updated` datetime DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `wl_albums`
--

INSERT INTO `wl_albums` (`album_id`, `parent_id`, `album_type`, `friendly_url`, `album_title`, `album_description`, `album_image`, `sort_order`, `status`, `album_date_added`, `album_date_updated`) VALUES
(1, 0, 0, 'image-album-1', 'Image album 1', '', 'candidate_img.jpg', 1, '1', '2026-10-12 16:25:19', '2026-10-12 16:26:26'),
(2, 0, 1, 'video-album-1', 'Video Album 1', '', 'candidate_img1.jpg', 1, '1', '2026-10-12 16:27:04', NULL),
(3, 0, 0, 'image-album-2', 'Image album 2', '', 'category-img1.jpg', 2, '1', '2026-10-13 15:15:01', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `wl_apl_tokens`
--

CREATE TABLE `wl_apl_tokens` (
  `api_token_id` int NOT NULL,
  `user_id` int NOT NULL DEFAULT '0',
  `login_type` int NOT NULL DEFAULT '0' COMMENT '0=Normal,1=Guest ',
  `token` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `provider` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT 'user',
  `app_type` enum('android','ios') CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT 'android',
  `app_id` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `expired_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `wl_auto_respond_mails`
--

CREATE TABLE `wl_auto_respond_mails` (
  `id` int NOT NULL,
  `email_section` varchar(80) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `email_subject` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `email_content` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `status` enum('0','1','2') CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT '1',
  `updated_on` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `wl_auto_respond_mails`
--

INSERT INTO `wl_auto_respond_mails` (`id`, `email_section`, `email_subject`, `email_content`, `status`, `updated_on`) VALUES
(1, 'Member Registration ', 'Welcome to {site_name}', '<table border=\"0\" style=\"width:100%\">\r\n <tbody>\r\n  <tr>\r\n   <td colspan=\"2\"><strong>Hi {mem_name},</strong></td>\r\n  </tr>\r\n  <tr>\r\n   <td colspan=\"2\">We are happy to have you as the newest member of {site_name}!</td>\r\n  </tr>\r\n  <tr>\r\n   <td colspan=\"2\">This is a registration email as per the details submitted by you. You are now registered on {site_name} with the following details::</td>\r\n  </tr>\r\n  <tr>\r\n   <td colspan=\"2\"> </td>\r\n  </tr>\r\n  <tr>\r\n   <td><strong>Email ID:</strong></td>\r\n   <td>{username}</td>\r\n  </tr>\r\n  <tr>\r\n   <td><strong>Password:</strong></td>\r\n   <td>{password}</td>\r\n  </tr>\r\n  <tr>\r\n   <td colspan=\"2\"> </td>\r\n  </tr>\r\n  <tr>\r\n   <td colspan=\"2\"> </td>\r\n  </tr>\r\n  <tr>\r\n   <td colspan=\"2\">Thanks again. We hope you will visit us again soon and put these special services to work for you.<br />\r\n   Please feel free to contact us if you have any questions at all.</td>\r\n  </tr>\r\n  <tr>\r\n   <td colspan=\"2\"> </td>\r\n  </tr>\r\n  <tr>\r\n   <td colspan=\"2\">Thank you.<br />\r\n   {site_name} Customer Service<br />\r\n   Email: {admin_email}</td>\r\n  </tr>\r\n  <tr>\r\n   <td colspan=\"2\" style=\"text-align:center\">{site_name}. All right reserved.</td>\r\n  </tr>\r\n </tbody>\r\n</table>', '1', '2021-01-08 10:04:19'),
(2, 'Forgot Password', 'Forgot Password', '<table border=\"0\" style=\"width:100%\">\r\n <tbody>\r\n  <tr>\r\n   <td colspan=\"2\"><strong>Hi {mem_name},</strong></td>\r\n  </tr>\r\n  <tr>\r\n   <td colspan=\"2\">Your login details are as follows:</td>\r\n  </tr>\r\n  <tr>\r\n   <td colspan=\"2\"> </td>\r\n  </tr>\r\n  <tr>\r\n   <td><strong>Email ID:</strong></td>\r\n   <td>{username}</td>\r\n  </tr>\r\n  <tr>\r\n   <td><strong>password:</strong></td>\r\n   <td>{password}</td>\r\n  </tr>\r\n  <tr>\r\n   <td colspan=\"2\"> </td>\r\n  </tr>\r\n  <tr>\r\n   <td colspan=\"2\">Click here to login {link}</td>\r\n  </tr>\r\n  <tr>\r\n   <td colspan=\"2\"> </td>\r\n  </tr>\r\n  <tr>\r\n   <td colspan=\"2\">Thank you.<br />\r\n   {site_name} Customer Service<br />\r\n   Email: {admin_email}</td>\r\n  </tr>\r\n  <tr>\r\n   <td colspan=\"2\" style=\"text-align:center\">{site_name}. All right reserved.</td>\r\n  </tr>\r\n </tbody>\r\n</table>', '1', '2016-07-13 12:31:11'),
(3, 'Refer To Friends', 'Refer a Friend', '<table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border:2px solid rgb(233, 233, 233); margin-top:10px; width:600px\">\r\n <tbody>\r\n  <tr>\r\n   <td style=\"text-align:left\">Hi {friend_name},</td>\r\n  </tr>\r\n  <tr>\r\n   <td>\r\n   <p>{your_name} has recommended this {text}, as {your_name} thinks you would like it.<br />\r\n   <br />\r\n   To view the Deal details please click on the following link.<br />\r\n   <br />\r\n   {site_link}</p>\r\n\r\n   <p> </p>\r\n\r\n   <p>Thanks and Regards,</p>\r\n\r\n   <p>{site_name} Team</p>\r\n   </td>\r\n  </tr>\r\n  <tr>\r\n   <td style=\"text-align:center\">{site_name}. All right reserved.</td>\r\n  </tr>\r\n </tbody>\r\n</table>', '2', '2016-07-13 12:30:51'),
(4, 'Wallet Refund Notification', 'Refund credited in to wallet on {site_name}', '<table border=\"0\" xss=\"removed\">\r\n <tbody>\r\n  <tr>\r\n   <td colspan=\"2\"><strong>Dear {mem_name}</strong></td>\r\n  </tr>\r\n  <tr>\r\n   <td colspan=\"2\"> </td>\r\n  </tr>\r\n  <tr>\r\n   <td colspan=\"2\">Refund has been credited with following info :</td>\r\n  </tr>\r\n  <tr>\r\n   <td colspan=\"2\"> </td>\r\n  </tr>\r\n  <tr>\r\n   <td><strong>Invoice:</strong></td>\r\n   <td>{invoice_number}</td>\r\n  </tr>\r\n  <tr>\r\n   <td><strong>Sub Order Id:</strong></td>\r\n   <td>{sub_order_id}</td>\r\n  </tr>\r\n  <tr>\r\n   <td><strong>Product Name:</strong></td>\r\n   <td>{product_name}</td>\r\n  </tr>\r\n  <tr>\r\n   <td><strong>Quantity:</strong></td>\r\n   <td>{refund_qty}</td>\r\n  </tr>\r\n  <tr>\r\n   <td><strong>Amount:</strong></td>\r\n   <td>{refund_total}</td>\r\n  </tr>\r\n </tbody>\r\n</table>\r\n\r\n<p><br>\r\nThank you.<br>\r\n{site_name} Customer Service<br>\r\nEmail: {admin_email}</p>', '2', '2024-01-15 17:04:43'),
(5, 'Contact Us', 'Enquiry', '<table border=\"0\" style=\"width:100%\">\r\n <tbody>\r\n  <tr>\r\n   <td colspan=\"2\"><strong>Dear {mem_name}</strong></td>\r\n  </tr>\r\n  <tr>\r\n   <td colspan=\"2\">Enquiry has been submitted with following info :</td>\r\n  </tr>\r\n  <tr>\r\n   <td colspan=\"2\"> </td>\r\n  </tr>\r\n  <tr>\r\n   <td><strong>Email:</strong></td>\r\n   <td>{email}</td>\r\n  </tr>\r\n  <tr>\r\n   <td><strong>Mobile no.:</strong></td>\r\n   <td>{mobile}</td>\r\n  </tr>\r\n  <tr>\r\n   <td><strong>Comments:</strong></td>\r\n   <td>{comments}</td>\r\n  </tr>\r\n  <tr>\r\n   <td colspan=\"2\"> </td>\r\n  </tr>\r\n  <tr>\r\n   <td colspan=\"2\">{link} to login</td>\r\n  </tr>\r\n </tbody>\r\n</table>\r\n\r\n<p><br />\r\nThank you.<br />\r\n{site_name} Customer Service<br />\r\nEmail: {admin_email}</p>', '1', '2018-04-18 08:02:04'),
(6, 'Admin Registration ', 'Welcome to {site_name}', '<table border=\"0\" style=\"width:100%\">\n <tbody>\n  <tr>\n   <td colspan=\"2\"><strong>Hi Admin,</strong></td>\n  </tr>\n  <tr>\n   <td colspan=\"2\"> </td>\n  </tr>\n  <tr>\n   <td colspan=\"2\">This is a registration email as per the details submitted by you. You are now registered on {site_name} with the following details:</td>\n  </tr>\n  <tr>\n   <td colspan=\"2\"> </td>\n  </tr>\n  <tr>\n   <td><strong>Name:</strong></td>\n   <td>{name}</td>\n  </tr>\n  <tr>\n   <td><strong>Email ID:</strong></td>\n   <td>{username}</td>\n  </tr>\n  <tr>\n   <td><strong>Password:</strong></td>\n   <td>{password}</td>\n  </tr>\n  <tr>\n   <td colspan=\"2\"> </td>\n  </tr>\n  <tr>\n   <td colspan=\"2\">Thanks again. We hope you will visit us again soon and put these special services to work for you.<br />\n   Please feel free to contact us if you have any questions at all.</td>\n  </tr>\n  <tr>\n   <td colspan=\"2\"> </td>\n  </tr>\n  <tr>\n   <td colspan=\"2\">Thank you.<br />\n   {site_name} Customer Service<br />\n   Email: {admin_email}</td>\n  </tr>\n  <tr>\n   <td colspan=\"2\" style=\"text-align:center\">{site_name}. All right reserved.</td>\n  </tr>\n </tbody>\n</table>', '2', '2016-07-13 12:31:35'),
(7, 'Notification Email', 'Notification from {site_name}', '<table border=\"0\" xss=removed>\n <tbody>\n  <tr>\n   <td colspan=\"2\"><strong>Hi {mem_name},</strong></td>\n  </tr>\n  <tr>\n   <td colspan=\"2\"> </td>\n  </tr>\n  <tr>\n   <td colspan=\"2\">{notification_title}</td>\n  </tr>\n  <tr>\n   <td colspan=\"2\"> </td>\n  </tr>\n  <tr>\n   <td colspan=\"2\">{description}</td>\n  </tr>\n  <tr>\n   <td colspan=\"2\"> </td>\n  </tr>\n  <tr>\n   <td colspan=\"2\">Thank you.<br>\n   {site_name} Customer Service<br>\n   Email: {admin_email}</td>\n  </tr>\n  <tr>\n   <td colspan=\"2\" xss=removed>{site_name}. All right reserved.</td>\n  </tr>\n </tbody>\n</table>', '2', '2021-04-24 18:24:32'),
(8, 'Email Verification', 'Verify your email at {site_name}', '<table border=\"0\" xss=removed>\n <tbody>\n  <tr>\n   <td colspan=\"2\"><strong>Hi {mem_name},</strong></td>\n  </tr>\n  <tr>\n   <td colspan=\"2\">Please click the link given below to verify your email</td>\n  </tr>\n  <tr>\n   <td colspan=\"2\">{verify_link}</td>\n  </tr>\n  <tr>\n   <td colspan=\"2\"> </td>\n  </tr>\n  <tr>\n   <td colspan=\"2\"> </td>\n  </tr>\n  <tr>\n   <td colspan=\"2\">Thanks again. We hope you will visit us again soon and put these special services to work for you.<br>\n   Please feel free to contact us if you have any questions at all.</td>\n  </tr>\n  <tr>\n   <td colspan=\"2\"> </td>\n  </tr>\n  <tr>\n   <td colspan=\"2\">Thank you.<br>\n   {site_name} Customer Service<br>\n   Email: {admin_email}</td>\n  </tr>\n  <tr>\n   <td colspan=\"2\" xss=removed>{site_name}. All right reserved.</td>\n  </tr>\n </tbody>\n</table>', '1', '2021-06-09 10:00:18'),
(9, 'Profile Rejection', 'Profile Rejected at {site_name}', '<table border=\"0\" width=\"100%\">\r\n <tbody>\r\n  <tr>\r\n   <td colspan=\"2\"><strong>Hi {mem_name},</strong></td>\r\n  </tr>\r\n  <tr>\r\n   <td colspan=\"2\"> </td>\r\n  </tr>\r\n  <tr>\r\n   <td colspan=\"2\">Your profile has been rejected.</td>\r\n  </tr>\r\n  <tr>\r\n   <td colspan=\"2\"> </td>\r\n  </tr>\r\n  <tr>\r\n   <td colspan=\"2\">Thank you.<br>\r\n   {site_name} Customer Service<br>\r\n   Email: {admin_email}</td>\r\n  </tr>\r\n  <tr>\r\n   <td colspan=\"2\" xss=\"removed\">{site_name}. All right reserved.</td>\r\n  </tr>\r\n </tbody>\r\n</table>', '1', '2022-07-21 17:41:29'),
(10, 'Profile Approval', 'Profile Approved at {site_name}', '<table border=\"0\" width=\"100%\">\r\n <tbody>\r\n  <tr>\r\n   <td colspan=\"2\"><strong>Hi {mem_name},</strong></td>\r\n  </tr>\r\n  <tr>\r\n   <td colspan=\"2\"> </td>\r\n  </tr>\r\n  <tr>\r\n   <td colspan=\"2\">Your profile has been approved.</td>\r\n  </tr>\r\n  <tr>\r\n   <td colspan=\"2\">{login_link}</td>\r\n  </tr>\r\n  <tr>\r\n   <td colspan=\"2\"> </td>\r\n  </tr>\r\n  <tr>\r\n   <td colspan=\"2\">Thank you.<br>\r\n   {site_name} Customer Service<br>\r\n   Email: {admin_email}</td>\r\n  </tr>\r\n  <tr>\r\n   <td colspan=\"2\" xss=\"removed\">{site_name}. All right reserved.</td>\r\n  </tr>\r\n </tbody>\r\n</table>', '1', '2022-07-21 17:43:14'),
(11, 'Order product Cancelled', 'Order product Cancelled {site_name}', '<table border=\"0\" width=\"100%\">  <tbody>   <tr>    <td colspan=\"2\"><strong>Hi Admin ,</strong></td>   </tr>   <tr>    <td colspan=\"2\"> </td>   </tr>   <tr>    <td colspan=\"2\">Member {mem_name}, want to cancelled his order produict id {sub_order_id} of invoice no-{invoice_number}.</td>   </tr>   <tr>    <td >Title</td>    <td >{reason_title}.</td>   </tr>   <tr>    <td >Description</td>    <td >{reason_description}.</td>   </tr>      <tr>    <td colspan=\"2\"> </td>   </tr>   <tr>    <td colspan=\"2\">Thank you.<br>    {mem_name}<br>    Email: {username}</td>   </tr>   <tr>    <td colspan=\"2\" xss=\"removed\">{site_name}. All right reserved.</td>   </tr>  </tbody> </table>', '1', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `wl_banners`
--

CREATE TABLE `wl_banners` (
  `banner_id` int NOT NULL,
  `banner_type` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1=Normal,2=Ads banner',
  `member_id` int NOT NULL DEFAULT '0' COMMENT '0=Admin',
  `member_type` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1=Buyer,2=Seller',
  `banner_position` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `ref_category_id` int NOT NULL,
  `ref_prod_type` int NOT NULL,
  `ref_item_id` int NOT NULL,
  `banner_image` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `banner_title` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `banner_url` varchar(170) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `banner_page` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL COMMENT 'Like : home page,category page',
  `banner_price` float(10,2) NOT NULL DEFAULT '0.00',
  `description` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `status` tinyint(1) DEFAULT '1' COMMENT '1=Actice,0=Inactive,2=Deleted',
  `last_status` tinyint(1) NOT NULL COMMENT 'populates status before trashing',
  `trashed_by` int NOT NULL COMMENT 'admin id',
  `trashed` tinyint(1) NOT NULL COMMENT '1=Yes,0=No',
  `is_reverted` tinyint(1) NOT NULL COMMENT '1=Reverted,0=No',
  `clicks` int NOT NULL DEFAULT '0',
  `is_approved` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0=Pending,1=Approved, 2=Disapproved',
  `banner_added_date` datetime DEFAULT NULL,
  `banner_updated_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `banner_start_date` datetime DEFAULT NULL,
  `banner_end_date` datetime DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `wl_banners`
--

INSERT INTO `wl_banners` (`banner_id`, `banner_type`, `member_id`, `member_type`, `banner_position`, `ref_category_id`, `ref_prod_type`, `ref_item_id`, `banner_image`, `banner_title`, `banner_url`, `banner_page`, `banner_price`, `description`, `status`, `last_status`, `trashed_by`, `trashed`, `is_reverted`, `clicks`, `is_approved`, `banner_added_date`, `banner_updated_date`, `banner_start_date`, `banner_end_date`) VALUES
(1, 1, 0, 0, 'inner_page_top', 0, 0, 0, 'inner-banner.jpg', '', '', '', 0.00, NULL, 2, 0, 0, 0, 0, 0, 0, '2026-08-10 13:30:43', '2026-08-10 13:47:24', NULL, NULL),
(2, 1, 0, 0, 'inner_page_top', 0, 0, 0, 'screenshot_4.png', '', '', '', 0.00, NULL, 2, 0, 0, 0, 0, 0, 0, '2026-08-18 16:22:45', '0000-00-00 00:00:00', NULL, NULL),
(3, 1, 0, 0, 'home_page_left_first', 0, 0, 0, 'promotion-banner1.jpg', '', '', '', 0.00, NULL, 1, 0, 0, 0, 0, 0, 0, '2026-08-25 17:17:15', '2026-08-25 17:32:01', NULL, NULL),
(4, 1, 0, 0, 'home_page_right_first', 0, 0, 0, 'promotion-banner2.jpg', '', '', '', 0.00, NULL, 1, 0, 0, 0, 0, 0, 0, '2026-08-25 17:18:12', '2026-08-25 17:32:06', NULL, NULL),
(5, 1, 0, 0, 'home_page_left_second', 0, 0, 0, 'promotion-banner3.jpg', '', '', '', 0.00, NULL, 1, 0, 0, 0, 0, 0, 0, '2026-08-25 17:18:23', '0000-00-00 00:00:00', NULL, NULL),
(6, 1, 0, 0, 'home_page_right_second', 0, 0, 0, 'promotion-banner4.jpg', '', '', '', 0.00, NULL, 1, 0, 0, 0, 0, 0, 0, '2026-08-25 17:18:34', '0000-00-00 00:00:00', NULL, NULL),
(7, 1, 0, 0, 'home_page_bottom', 0, 0, 0, 'footer-banner.jpg', '', '', '', 0.00, NULL, 1, 0, 0, 0, 0, 0, 0, '2026-08-25 17:18:45', '0000-00-00 00:00:00', NULL, NULL),
(8, 1, 0, 0, 'home_page_left_first', 0, 0, 0, 'category-img3.jpg', '', '', '', 0.00, NULL, 1, 0, 0, 0, 0, 0, 0, '2026-10-13 15:16:06', '0000-00-00 00:00:00', NULL, NULL),
(9, 1, 0, 0, 'home_page_right_second', 0, 0, 0, 'footer-banner1.jpg', '', '', '', 0.00, NULL, 1, 0, 0, 0, 0, 0, 0, '2026-10-13 15:16:32', '0000-00-00 00:00:00', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `wl_categories`
--

CREATE TABLE `wl_categories` (
  `category_id` int NOT NULL,
  `cat_type` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1=Product,2=Package,3=Blog',
  `cat_links` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `category_name` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `friendly_url` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `category_image` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `category_description` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `category_tag` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `subscription_page_text` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `parent_id` int NOT NULL DEFAULT '0',
  `is_home` enum('1','0') CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT '0' COMMENT '1=Yes,0=No',
  `is_menu` enum('1','0') CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL DEFAULT '0' COMMENT '1=yes,0=no',
  `is_footer` enum('0','1') CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT '0',
  `is_fixed` enum('1','0') CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL DEFAULT '0' COMMENT '1=yes,0=no',
  `is_about` tinyint(1) DEFAULT '0',
  `about_cent` int DEFAULT NULL,
  `home_our_products` tinyint(1) NOT NULL DEFAULT '0',
  `sort_order` int DEFAULT NULL,
  `date_added` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `date_modified` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `status` enum('0','1','2') CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT '1' COMMENT '1=active,0=inactive,2=deleted',
  `last_status` tinyint(1) NOT NULL COMMENT 'populates status before trashing',
  `trashed_by` int NOT NULL COMMENT 'admin id',
  `trashed` tinyint(1) NOT NULL COMMENT '1=Yes,0=No',
  `is_reverted` tinyint(1) NOT NULL COMMENT '1=Reverted,0=No',
  `meta_title` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `meta_keywords` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `meta_description` varchar(225) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `category_alt` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `category_banner` varchar(150) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `xls_type` enum('0','1') CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `wl_categories`
--

INSERT INTO `wl_categories` (`category_id`, `cat_type`, `cat_links`, `category_name`, `friendly_url`, `category_image`, `category_description`, `category_tag`, `subscription_page_text`, `parent_id`, `is_home`, `is_menu`, `is_footer`, `is_fixed`, `is_about`, `about_cent`, `home_our_products`, `sort_order`, `date_added`, `date_modified`, `status`, `last_status`, `trashed_by`, `trashed`, `is_reverted`, `meta_title`, `meta_keywords`, `meta_description`, `category_alt`, `category_banner`, `xls_type`) VALUES
(1, 1, '1', 'Ceramic Converters', 'products/ceramic-converters', '', 'Close-coupled OEM ceeramic unit with full substrate and original casing.', '', NULL, 0, '0', '0', '0', '0', 0, NULL, 0, 1, '2026-10-14 13:10:25', '0000-00-00 00:00:00', '1', 0, 0, 0, 0, NULL, NULL, NULL, 'Ceramic Converters', '', '0'),
(2, 1, '1,2', 'Toyota Corolla 1.8 ceramic converter', 'products/ceramic-converters/toyota-corolla-1-8-ceramic-converter', '', 'Close-coupled OEM ceeramic unit with full substrate and original casing.', '', NULL, 1, '0', '0', '0', '0', 0, NULL, 0, 1, '2026-10-14 13:11:33', '0000-00-00 00:00:00', '1', 0, 0, 0, 0, NULL, NULL, NULL, 'Toyota Corolla 1.8 ceramic converter', '', '0');

-- --------------------------------------------------------

--
-- Table structure for table `wl_cms_pages`
--

CREATE TABLE `wl_cms_pages` (
  `page_id` int NOT NULL,
  `parent_id` int NOT NULL DEFAULT '0',
  `page_name` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT '',
  `friendly_url` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `page_description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `page_short_description` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `cms_type` enum('0','1') CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL COMMENT '0=normal, 1=service',
  `page_image` varchar(150) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `status` enum('0','1','2') CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT '1' COMMENT '0=Inactive,1=Active,2=Deleted',
  `page_updated_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `wl_cms_pages`
--

INSERT INTO `wl_cms_pages` (`page_id`, `parent_id`, `page_name`, `friendly_url`, `page_description`, `page_short_description`, `cms_type`, `page_image`, `status`, `page_updated_date`) VALUES
(1, 0, 'About Us', 'aboutus', '<p class=\"mt-3\">A family business with a love of stationery and whiteboards!</p>\r\n\r\n<div class=\"w-100 mb-5 mt-5\">\r\n<div class=\"row align-items-center\">\r\n<div class=\"col-sm-8 col-lg-9\">\r\n<div class=\"abut-cnt text-center text-sm-start\">\r\n<h2>1976</h2>\r\n\r\n<p>Maurice Temple starts a business selling accountancy stationery in London. This then morphs into a larger business selling general stationery and office products.</p>\r\n</div>\r\n</div>\r\n<!-- end -->\r\n\r\n<div class=\"col-sm-4 col-lg-3\">\r\n<div class=\"abut-img\">\r\n<figure><img alt=\"\" class=\"img-fluid\" decoding=\"async\" fetchpriority=\"low\" loading=\"lazy\" src=\"http://localhost/showme_au/uploaded_files/userfiles/images/about-img-1.jpg\" style=\"width: 300px; height: 300px;\" /></figure>\r\n</div>\r\n</div>\r\n<!-- end --></div>\r\n</div>\r\n<!-- end section -->\r\n\r\n<div class=\"w-100 mb-5 mt-5\">\r\n<div class=\"row align-items-center\">\r\n<div class=\"col-sm-8 col-lg-9\">\r\n<div class=\"abut-cnt text-center text-sm-start\">\r\n<h2>1994</h2>\r\n\r\n<p>The Temple family sell the business and escape the city to Lowestoft, the most easterly town in Britain. The 2nd generation then start a new business from a caravan in a garden.</p>\r\n</div>\r\n</div>\r\n<!-- end -->\r\n\r\n<div class=\"col-sm-4 col-lg-3\">\r\n<div class=\"abut-img\">\r\n<figure><img alt=\"\" class=\"img-fluid\" decoding=\"async\" fetchpriority=\"low\" loading=\"lazy\" src=\"http://localhost/showme_au/uploaded_files/userfiles/images/about-img-2.jpg\" style=\"width: 300px; height: 300px;\" /></figure>\r\n</div>\r\n</div>\r\n<!-- end --></div>\r\n</div>\r\n<!-- end section -->\r\n\r\n<div class=\"w-100 mb-5 mt-5\">\r\n<div class=\"row align-items-center\">\r\n<div class=\"col-sm-8 col-lg-9\">\r\n<div class=\"abut-cnt text-center text-sm-start\">\r\n<h2>1999</h2>\r\n\r\n<p>Numeracy and Literacy Hours launched into schools in England. Schools were looking for a way to easily do regular practice of key skills without using lots of paper. So Show-me launched mini whiteboards as a cost effective way to get a classroom full of answers.</p>\r\n</div>\r\n</div>\r\n<!-- end -->\r\n\r\n<div class=\"col-sm-4 col-lg-3\">\r\n<div class=\"abut-img\">\r\n<figure><img alt=\"\" class=\"img-fluid\" decoding=\"async\" fetchpriority=\"low\" loading=\"lazy\" src=\"http://localhost/showme_au/uploaded_files/userfiles/images/about-img-3.jpg\" style=\"width: 300px; height: 300px;\" /></figure>\r\n</div>\r\n</div>\r\n<!-- end --></div>\r\n</div>\r\n<!-- end section -->\r\n\r\n<p class=\"clearfix\">&nbsp;</p>\r\n\r\n<div class=\"abut-cnt text-center mt-5\">\r\n<h2>Become a Distributor</h2>\r\n\r\n<p>Start selling a range of whiteboards and accessories which schools love. You&rsquo;ll get full marketing support, competitive pricing, sales training, the best Customer Care Team in the industry and whatever else you need to give schools access to the best whiteboard products.<br />\r\n<br />\r\nFind out how on our <a href=\"contactus\" title=\"contact page\">contact page</a></p>\r\n\r\n<p class=\"clearfix\">&nbsp;</p>\r\n</div>\r\n\r\n<p class=\"clearfix\">&nbsp;</p>', '', '0', 'ab.jpg', '1', '2026-10-13 16:36:07'),
(2, 0, 'Certificates', 'certificates', '<p class=\"mt-3 cms_pc\" xss=\"removed\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet scelerisque tortor. Maecenas dui turpis, faucibus vel iaculis at, auctor non sapien. Donec dignissim nisl id posuere pulvinar. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis facilisis sem quis elit aliquet tempus. Vivamus dapibus commodo dolor in gravida. Nunc suscipit euismod nibh a auctor. Nullam placerat mi quis ligula fermentum, vel dignissim mauris venenatis. Nunc sollicitudin velit velit, eu tincidunt sapien semper non. Curabitur quis sapien eget magna luctus tincidunt eu eu neque. Morbi dapibus pulvinar sem, non lobortis orci consectetur semper. Aenean eget leo sit amet turpis efficitur aliquam. Aenean purus leo, lacinia ac metus vitae, auctor finibus erat. Donec sollicitudin sagittis libero. Vivamus ut auctor magna. Mauris vehicula lectus neque, non viverra neque faucibus et.<br xss=\"removed\" />\r\n<br xss=\"removed\" />\r\nSed hendrerit tortor nisl. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus ornare ornare pulvinar. Vivamus ornare faucibus sollicitudin. Sed suscipit gravida tincidunt. Duis eu luctus lacus, nec consectetur massa. Phasellus orci mauris, tristique quis dolor sit amet, porttitor fermentum mauris. Ut tempor et neque id lobortis. Cras eleifend consectetur mi, vitae congue elit rutrum at. Morbi nec risus maximus sapien dignissim euismod sit amet non neque.<br xss=\"removed\" />\r\n<br xss=\"removed\" />\r\nQuisque non mauris dui. Vivamus rhoncus magna ac urna vestibulum bibendum sed nec ex. Mauris auctor pretium felis vitae scelerisque. Quisque lectus dui, eleifend pellentesque urna quis, pellentesque porttitor sem. Donec non lectus dictum, lobortis nibh ut, varius dui. Praesent id lacus congue, rutrum urna eu, luctus tellus. Curabitur quis est nec lectus tincidunt ultrices. Maecenas finibus justo eu porttitor volutpat. Vestibulum a purus dignissim, convallis magna tristique, imperdiet purus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras ac ullamcorper nibh, quis rhoncus lorem. Sed porta egestas lorem, a interdum nulla vehicula quis. Fusce libero nisi, tincidunt ut luctus ut, pulvinar sit amet ante. Quisque posuere ipsum vel nibh ornare pulvinar. In pharetra accumsan rutrum.</p>\r\n\r\n<ul xss=\"removed\">\r\n	<li xss=\"removed\">Full-fledged engineering and construction solutions</li>\r\n	<li xss=\"removed\">State-of-the-art, well-equipped fabrication yard</li>\r\n	<li xss=\"removed\">Highly-skilled and experienced technical crew</li>\r\n</ul>\r\n\r\n<ol xss=\"removed\">\r\n	<li xss=\"removed\">Architectural and structural steel installation services</li>\r\n	<li xss=\"removed\">Project mobilization, planning &amp; engineering services...</li>\r\n</ol>', '', '0', 'ab4.jpg', '1', '2026-10-13 16:27:42'),
(3, 0, 'Terms and Conditions', 'terms-conditions', '<p class=\"mt-3 cms_pc\" xss=\"removed\"><span xss=\"removed\">5Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet scelerisque tortor. Maecenas dui turpis, faucibus vel iaculis at, auctor non sapien. Donec dignissim nisl id posuere pulvinar. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis facilisis sem quis elit aliquet tempus. Vivamus dapibus commodo dolor in gravida. Nunc suscipit euismod nibh a auctor. Nullam placerat mi quis ligula fermentum, vel dignissim mauris venenatis. Nunc sollicitudin velit velit, eu tincidunt sapien semper non. Curabitur quis sapien eget magna luctus tincidunt eu eu neque. Morbi dapibus pulvinar sem, non lobortis orci consectetur semper. Aenean eget leo sit amet turpis efficitur aliquam. Aenean purus leo, lacinia ac metus vitae, auctor finibus erat. Donec sollicitudin sagittis libero. Vivamus ut auctor magna. Mauris vehicula lectus neque, non viverra neque faucibus et.</span><br xss=\"removed\" />\r\n<br xss=\"removed\" />\r\n<span xss=\"removed\">Sed hendrerit tortor nisl. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus ornare ornare pulvinar. Vivamus ornare faucibus sollicitudin. Sed suscipit gravida tincidunt. Duis eu luctus lacus, nec consectetur massa. Phasellus orci mauris, tristique quis dolor sit amet, porttitor fermentum mauris. Ut tempor et neque id lobortis. Cras eleifend consectetur mi, vitae congue elit rutrum at. Morbi nec risus maximus sapien dignissim euismod sit amet non neque.</span></p>\r\n\r\n<ul xss=\"removed\">\r\n	<li xss=\"removed\">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>\r\n	<li xss=\"removed\">Quisque non mauris dui. Vivamus rhoncus magna ac urna vestibulum bibendum sed nec ex.</li>\r\n	<li xss=\"removed\">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>\r\n</ul>\r\n\r\n<ol xss=\"removed\">\r\n	<li xss=\"removed\">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>\r\n	<li xss=\"removed\">Quisque non mauris dui. Vivamus rhoncus magna ac urna vestibulum bibendum sed nec ex....</li>\r\n</ol>', '', '0', 'ab3.jpg', '1', '2026-08-19 16:09:19'),
(4, 0, 'Privacy Policy', 'privacy-policy', '<p class=\"mt-3 cms_pc\" xss=\"removed\"><span xss=\"removed\">3Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet scelerisque tortor. Maecenas dui turpis, faucibus vel iaculis at, auctor non sapien. Donec dignissim nisl id posuere pulvinar. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis facilisis sem quis elit aliquet tempus. Vivamus dapibus commodo dolor in gravida. Nunc suscipit euismod nibh a auctor. Nullam placerat mi quis ligula fermentum, vel dignissim mauris venenatis. Nunc sollicitudin velit velit, eu tincidunt sapien semper non. Curabitur quis sapien eget magna luctus tincidunt eu eu neque. Morbi dapibus pulvinar sem, non lobortis orci consectetur semper. Aenean eget leo sit amet turpis efficitur aliquam. Aenean purus leo, lacinia ac metus vitae, auctor finibus erat. Donec sollicitudin sagittis libero. Vivamus ut auctor magna. Mauris vehicula lectus neque, non viverra neque faucibus et.</span><br xss=\"removed\" />\r\n<br xss=\"removed\" />\r\n<span xss=\"removed\">Sed hendrerit tortor nisl. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus ornare ornare pulvinar. Vivamus ornare faucibus sollicitudin. Sed suscipit gravida tincidunt. Duis eu luctus lacus, nec consectetur massa. Phasellus orci mauris, tristique quis dolor sit amet, porttitor fermentum mauris. Ut tempor et neque id lobortis. Cras eleifend consectetur mi, vitae congue elit rutrum at. Morbi nec risus maximus sapien dignissim euismod sit amet non neque.</span></p>\r\n\r\n<ul xss=\"removed\">\r\n	<li xss=\"removed\">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>\r\n	<li xss=\"removed\">Quisque non mauris dui. Vivamus rhoncus magna ac urna vestibulum bibendum sed nec ex.</li>\r\n	<li xss=\"removed\">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>\r\n</ul>\r\n\r\n<ol xss=\"removed\">\r\n	<li xss=\"removed\">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>\r\n	<li xss=\"removed\">Quisque non mauris dui. Vivamus rhoncus magna ac urna vestibulum bibendum sed nec ex...</li>\r\n</ol>', '', '0', 'ab2.jpg', '1', '2026-08-19 16:09:04'),
(5, 0, 'Legal Disclaimer', 'legal-disclaimer', '<p class=\"mt-3 cms_pc\" xss=\"removed\"><span xss=\"removed\">2Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet scelerisque tortor. Maecenas dui turpis, faucibus vel iaculis at, auctor non sapien. Donec dignissim nisl id posuere pulvinar. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis facilisis sem quis elit aliquet tempus. Vivamus dapibus commodo dolor in gravida. Nunc suscipit euismod nibh a auctor. Nullam placerat mi quis ligula fermentum, vel dignissim mauris venenatis. Nunc sollicitudin velit velit, eu tincidunt sapien semper non. Curabitur quis sapien eget magna luctus tincidunt eu eu neque. Morbi dapibus pulvinar sem, non lobortis orci consectetur semper. Aenean eget leo sit amet turpis efficitur aliquam. Aenean purus leo, lacinia ac metus vitae, auctor finibus erat. Donec sollicitudin sagittis libero. Vivamus ut auctor magna. Mauris vehicula lectus neque, non viverra neque faucibus et.</span><br xss=\"removed\" />\r\n<br xss=\"removed\" />\r\n<span xss=\"removed\">Sed hendrerit tortor nisl. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus ornare ornare pulvinar. Vivamus ornare faucibus sollicitudin. Sed suscipit gravida tincidunt. Duis eu luctus lacus, nec consectetur massa. Phasellus orci mauris, tristique quis dolor sit amet, porttitor fermentum mauris. Ut tempor et neque id lobortis. Cras eleifend consectetur mi, vitae congue elit rutrum at. Morbi nec risus maximus sapien dignissim euismod sit amet non neque.</span></p>\r\n\r\n<ul xss=\"removed\">\r\n	<li xss=\"removed\">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>\r\n	<li xss=\"removed\">Quisque non mauris dui. Vivamus rhoncus magna ac urna vestibulum bibendum sed nec ex.</li>\r\n	<li xss=\"removed\">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>\r\n</ul>\r\n\r\n<ol xss=\"removed\">\r\n	<li xss=\"removed\">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>\r\n	<li xss=\"removed\">Quisque non mauris dui. Vivamus rhoncus magna ac urna vestibulum bibendum sed nec ex....</li>\r\n</ol>', NULL, '0', 'ab.jpg', '1', '2026-08-19 16:08:56'),
(6, 0, 'Company Overview', 'company-overview', '<p class=\"mt-3 cms_pc\" xss=\"removed\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet scelerisque tortor. Maecenas dui turpis, faucibus vel iaculis at, auctor non sapien. Donec dignissim nisl id posuere pulvinar. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis facilisis sem quis elit aliquet tempus. Vivamus dapibus commodo dolor in gravida. Nunc suscipit euismod nibh a auctor. Nullam placerat mi quis ligula fermentum, vel dignissim mauris venenatis. Nunc sollicitudin velit velit, eu tincidunt sapien semper non. Curabitur quis sapien eget magna luctus tincidunt eu eu neque. Morbi dapibus pulvinar sem, non lobortis orci consectetur semper. Aenean eget leo sit amet turpis efficitur aliquam. Aenean purus leo, lacinia ac metus vitae, auctor finibus erat. Donec sollicitudin sagittis libero. Vivamus ut auctor magna. Mauris vehicula lectus neque, non viverra neque faucibus et.<br xss=\"removed\">\r\n<br xss=\"removed\">\r\nSed hendrerit tortor nisl. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus ornare ornare pulvinar. Vivamus ornare faucibus sollicitudin. Sed suscipit gravida tincidunt. Duis eu luctus lacus, nec consectetur massa. Phasellus orci mauris, tristique quis dolor sit amet, porttitor fermentum mauris. Ut tempor et neque id lobortis. Cras eleifend consectetur mi, vitae congue elit rutrum at. Morbi nec risus maximus sapien dignissim euismod sit amet non neque.<br xss=\"removed\">\r\n<br xss=\"removed\">\r\nQuisque non mauris dui. Vivamus rhoncus magna ac urna vestibulum bibendum sed nec ex. Mauris auctor pretium felis vitae scelerisque. Quisque lectus dui, eleifend pellentesque urna quis, pellentesque porttitor sem. Donec non lectus dictum, lobortis nibh ut, varius dui. Praesent id lacus congue, rutrum urna eu, luctus tellus. Curabitur quis est nec lectus tincidunt ultrices. Maecenas finibus justo eu porttitor volutpat. Vestibulum a purus dignissim, convallis magna tristique, imperdiet purus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras ac ullamcorper nibh, quis rhoncus lorem. Sed porta egestas lorem, a interdum nulla vehicula quis. Fusce libero nisi, tincidunt ut luctus ut, pulvinar sit amet ante. Quisque posuere ipsum vel nibh ornare pulvinar. In pharetra accumsan rutrum.</p>\r\n\r\n<ul xss=\"removed\">\r\n <li xss=\"removed\">Full-fledged engineering and construction solutions</li>\r\n <li xss=\"removed\">State-of-the-art, well-equipped fabrication yard</li>\r\n <li xss=\"removed\">Highly-skilled and experienced technical crew</li>\r\n</ul>\r\n\r\n<ol xss=\"removed\">\r\n <li xss=\"removed\">Architectural and structural steel installation services</li>\r\n <li xss=\"removed\">Project mobilization, planning & engineering services..</li>\r\n</ol>\r\n', NULL, '0', 'ab5.jpg', '1', '2023-10-26 16:11:29'),
(7, 0, 'Catalytic Converter & Scarp Trading', 'scarp-trading', '<p class=\"mt-3 cms_pc\" xss=\"removed\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet scelerisque tortor. Maecenas dui turpis, faucibus vel iaculis at, auctor non sapien. Donec dignissim nisl id posuere pulvinar. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis facilisis sem quis elit aliquet tempus. Vivamus dapibus commodo dolor in gravida. Nunc suscipit euismod nibh a auctor. Nullam placerat mi quis ligula fermentum, vel dignissim mauris venenatis. Nunc sollicitudin velit velit, eu tincidunt sapien semper non. Curabitur quis sapien eget magna luctus tincidunt eu eu neque. Morbi dapibus pulvinar sem, non lobortis orci consectetur semper. Aenean eget leo sit amet turpis efficitur aliquam. Aenean purus leo, lacinia ac metus vitae, auctor finibus erat. Donec sollicitudin sagittis libero. Vivamus ut auctor magna. Mauris vehicula lectus neque, non viverra neque faucibus et.<br xss=\"removed\">\r\n<br xss=\"removed\">\r\nSed hendrerit tortor nisl. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus ornare ornare pulvinar. Vivamus ornare faucibus sollicitudin. Sed suscipit gravida tincidunt. Duis eu luctus lacus, nec consectetur massa. Phasellus orci mauris, tristique quis dolor sit amet, porttitor fermentum mauris. Ut tempor et neque id lobortis. Cras eleifend consectetur mi, vitae congue elit rutrum at. Morbi nec risus maximus sapien dignissim euismod sit amet non neque.<br xss=\"removed\">\r\n<br xss=\"removed\">\r\nQuisque non mauris dui. Vivamus rhoncus magna ac urna vestibulum bibendum sed nec ex. Mauris auctor pretium felis vitae scelerisque. Quisque lectus dui, eleifend pellentesque urna quis, pellentesque porttitor sem. Donec non lectus dictum, lobortis nibh ut, varius dui. Praesent id lacus congue, rutrum urna eu, luctus tellus. Curabitur quis est nec lectus tincidunt ultrices. Maecenas finibus justo eu porttitor volutpat. Vestibulum a purus dignissim, convallis magna tristique, imperdiet purus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras ac ullamcorper nibh, quis rhoncus lorem. Sed porta egestas lorem, a interdum nulla vehicula quis. Fusce libero nisi, tincidunt ut luctus ut, pulvinar sit amet ante. Quisque posuere ipsum vel nibh ornare pulvinar. In pharetra accumsan rutrum.</p>\r\n\r\n<ul xss=\"removed\">\r\n <li xss=\"removed\">Full-fledged engineering and construction solutions</li>\r\n <li xss=\"removed\">State-of-the-art, well-equipped fabrication yard</li>\r\n <li xss=\"removed\">Highly-skilled and experienced technical crew</li>\r\n</ul>\r\n\r\n<ol xss=\"removed\">\r\n <li xss=\"removed\">Architectural and structural steel installation services</li>\r\n <li xss=\"removed\">Project mobilization, planning & engineering services</li>\r\n</ol>\r\n', NULL, '0', 'ser-img11.jpg', '1', '2023-01-02 11:29:01'),
(8, 0, 'Become A Distributor', 'become-a-distributor', '<p><span xss=\"removed\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet scelerisque tortor. Maecenas dui turpis, faucibus vel iaculis at, auctor non sapien. Donec dignissim nisl id posuere pulvinar. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis facilisis sem quis elit aliquet tempus. Vivamus dapibus commodo dolor in gravida. Nunc suscipit euismod nibh a auctor. Nullam placerat mi quis ligula fermentum, vel dignissim mauris venenatis. Nunc sollicitudin velit velit, eu tincidunt sapien semper non. Curabitur quis sapien eget magna luctus tincidunt eu eu neque. Morbi dapibus pulvinar sem, non lobortis orci consectetur semper. Aenean eget leo sit amet turpis efficitur aliquam. Aenean purus leo, lacinia ac metus vitae, auctor finibus erat. Donec sollicitudin sagittis libero. Vivamus ut auctor magna. Mauris vehicula lectus neque, non viverra neque faucibus et.</span><br xss=\"removed\">\r\n<br xss=\"removed\">\r\n<span xss=\"removed\">Sed hendrerit tortor nisl. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus ornare ornare pulvinar. Vivamus ornare faucibus sollicitudin. Sed suscipit gravida tincidunt. Duis eu luctus lacus, nec consectetur massa. Phasellus orci mauris, tristique quis dolor sit amet, porttitor fermentum mauris. Ut tempor et neque id lobortis. Cras eleifend consectetur mi, vitae congue elit rutrum at. Morbi nec risus maximus sapien dignissim euismod sit amet non neque.</span></p>\r\n\r\n<ul xss=\"removed\">\r\n <li xss=\"removed\">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>\r\n <li xss=\"removed\">Quisque non mauris dui. Vivamus rhoncus magna ac urna vestibulum bibendum sed nec ex.</li>\r\n <li xss=\"removed\">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>\r\n</ul>\r\n\r\n<ol xss=\"removed\">\r\n <li xss=\"removed\">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>\r\n <li xss=\"removed\">Quisque non mauris dui. Vivamus rhoncus magna ac urna vestibulum bibendum sed nec ex....</li>\r\n</ol>\r\n', NULL, '0', 'ab7.jpg', '2', '2023-10-26 16:12:04'),
(9, 0, 'Home page', 'home', '<div class=\"form_field form_field2\" xss=\"removed\">\r\n<p style=\"box-sizing: border-box; margin-top: 0px; margin-bottom: 24px; font-size: 28.8px; font-weight: 700; line-height: 1.4; color: rgb(26, 26, 26); font-family: &quot;Work Sans&quot;, sans-serif; text-align: center;\">We believe that if every pupil enjoys learning, they&#39;ll do better work &ndash; if they do better work, you have a happier school.</p>\r\n\r\n<p style=\"box-sizing: border-box; margin-top: 0px; margin-bottom: 24px; font-size: 28.8px; font-weight: 700; line-height: 1.4; color: rgb(26, 26, 26); font-family: &quot;Work Sans&quot;, sans-serif; text-align: center;\">With products built to endure the rough and tumble of the classroom, that make teaching fun, and learning a joy, you can see the visible difference Show-me are making to teaching.</p>\r\n\r\n<p style=\"box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; font-size: 28.8px; font-weight: 700; line-height: 1.4; color: rgb(26, 26, 26); font-family: &quot;Work Sans&quot;, sans-serif; text-align: center;\">In the right hands, anything is possible.</p>\r\n</div>', NULL, '0', 'ser-img3.jpg', '2', '2026-08-25 16:03:30'),
(10, 0, 'Shipping Information', 'shipping-information', '<p><span xss=\"removed\">4Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet scelerisque tortor. Maecenas dui turpis, faucibus vel iaculis at, auctor non sapien. Donec dignissim nisl id posuere pulvinar. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis facilisis sem quis elit aliquet tempus. Vivamus dapibus commodo dolor in gravida. Nunc suscipit euismod nibh a auctor. Nullam placerat mi quis ligula fermentum, vel dignissim mauris venenatis. Nunc sollicitudin velit velit, eu tincidunt sapien semper non. Curabitur quis sapien eget magna luctus tincidunt eu eu neque. Morbi dapibus pulvinar sem, non lobortis orci consectetur semper. Aenean eget leo sit amet turpis efficitur aliquam. Aenean purus leo, lacinia ac metus vitae, auctor finibus erat. Donec sollicitudin sagittis libero. Vivamus ut auctor magna. Mauris vehicula lectus neque, non viverra neque faucibus et.</span><br xss=\"removed\" />\r\n<br xss=\"removed\" />\r\n<span xss=\"removed\">Sed hendrerit tortor nisl. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus ornare ornare pulvinar. Vivamus ornare faucibus sollicitudin. Sed suscipit gravida tincidunt. Duis eu luctus lacus, nec consectetur massa. Phasellus orci mauris, tristique quis dolor sit amet, porttitor fermentum mauris. Ut tempor et neque id lobortis. Cras eleifend consectetur mi, vitae congue elit rutrum at. Morbi nec risus maximus sapien dignissim euismod sit amet non neque.</span></p>\r\n\r\n<ul xss=\"removed\">\r\n	<li xss=\"removed\">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>\r\n	<li xss=\"removed\">Quisque non mauris dui. Vivamus rhoncus magna ac urna vestibulum bibendum sed nec ex.</li>\r\n	<li xss=\"removed\">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>\r\n</ul>\r\n\r\n<ol xss=\"removed\">\r\n	<li xss=\"removed\">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>\r\n	<li xss=\"removed\">Quisque non mauris dui. Vivamus rhoncus magna ac urna vestibulum bibendum sed nec ex....</li>\r\n</ol>', NULL, '0', 'ser-img21.jpg', '2', '2026-08-19 16:09:12');

-- --------------------------------------------------------

--
-- Table structure for table `wl_configuration`
--

CREATE TABLE `wl_configuration` (
  `sl` int NOT NULL,
  `type` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `value` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `up_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `wl_cron_tracker`
--

CREATE TABLE `wl_cron_tracker` (
  `log_id` int NOT NULL,
  `cron_type` varchar(35) NOT NULL,
  `crn_start_date` datetime NOT NULL,
  `crn_end_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `wl_currencies`
--

CREATE TABLE `wl_currencies` (
  `currency_id` int NOT NULL,
  `title` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL DEFAULT '',
  `code` varchar(3) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL DEFAULT '',
  `symbol_left` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `symbol_right` varchar(12) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `curr_image` varchar(250) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `decimal_place` char(1) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `value` float(15,8) NOT NULL,
  `is_default` enum('Y','N') CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL DEFAULT 'N',
  `status` int NOT NULL,
  `date_modified` datetime NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `wl_currencies`
--

INSERT INTO `wl_currencies` (`currency_id`, `title`, `code`, `symbol_left`, `symbol_right`, `curr_image`, `decimal_place`, `value`, `is_default`, `status`, `date_modified`) VALUES
(1, 'Mauritian Rupee', 'MUR', 'MUR', '', '', '2', 1.00000000, 'N', 0, '2017-03-15 09:48:45'),
(2, 'Pound Sterling', 'GBP', '£', '', 'flagvNci.jpg', '2', 1.00000000, 'N', 0, '2010-10-30 09:59:24'),
(3, 'Euro', 'EUR', '€', '', '', '2', 1.15020001, 'N', 0, '2010-10-30 09:59:24'),
(4, 'Indian Rupee', 'INR', '₹', '', '', '2', 1.00000000, 'Y', 1, '2017-03-15 09:48:45');

-- --------------------------------------------------------

--
-- Table structure for table `wl_customers`
--

CREATE TABLE `wl_customers` (
  `customers_id` int NOT NULL,
  `parent_id` int DEFAULT '0',
  `member_type` tinyint(1) NOT NULL DEFAULT '3' COMMENT '1-Admin, 2-Subadmin,3=User',
  `mem_nature` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1=Buyer,2=Seller',
  `registration_id` varchar(150) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL COMMENT 'Store add user offline',
  `deals_in` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `user_name` varchar(80) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL COMMENT 'customer  email  id used as username',
  `alternate_email` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `password` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `title` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `first_name` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `last_name` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `store_name` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `gender` enum('Male','Female','Rather not say') CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT 'Male',
  `birth_date` date DEFAULT NULL,
  `profile_photo` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `phone_number` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `country_code` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `mob_country_code` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `mobile_number` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `fax_number` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `other_emails` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `address` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `country` int DEFAULT '0',
  `state` int DEFAULT '0',
  `city` int DEFAULT '0',
  `location` int DEFAULT '0',
  `pin_code` int DEFAULT NULL,
  `ucountry_name` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `ustate_name` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `ucity_name` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `shop_name` varchar(150) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `shop_banner` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `address_line1` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `google_map` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `ulocation` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `customer_support` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `actkey` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `user_uq_token` varchar(70) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `is_home` enum('Y','N') CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT 'N' COMMENT 'Y=Yes,N=No',
  `status` enum('0','1','2','3') CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT '0' COMMENT '0=Inactive,1=Active,2=Deleted,3=Guest',
  `last_status` tinyint(1) NOT NULL COMMENT 'populates status before trashing',
  `trashed_by` int NOT NULL COMMENT 'admin id',
  `trashed` tinyint(1) NOT NULL COMMENT '1=Yes,0=No',
  `is_reverted` tinyint(1) NOT NULL COMMENT '1=Reverted,0=No',
  `is_verified` enum('0','1','2') CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT '0' COMMENT '0=unverfied or pending ,1=verfied or approve,2=Reject',
  `is_verified_mobile` enum('0','1') CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT '0',
  `login_type` enum('normal','facebook','twitter') CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT 'normal',
  `account_created_date` datetime DEFAULT NULL,
  `current_login` datetime DEFAULT NULL,
  `last_login_date` datetime DEFAULT NULL,
  `ip_address` varchar(25) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `is_blocked` enum('0','1') CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT '0' COMMENT '0=unblocked,1=blocked',
  `block_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `number_of_login_try` int NOT NULL DEFAULT '0',
  `replied` enum('Y','N') CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT 'N',
  `verify_code` int DEFAULT NULL COMMENT 'Mobile Verify Code',
  `app_id` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `device_id` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `app_type` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `temp_mobile` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `temp_email` varchar(80) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `is_verified_mail_once` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1=Yes,0=No',
  `my_ref_code_users` int NOT NULL COMMENT 'Referral Code Used by other user',
  `is_import` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1=Imported from excel,0=No',
  `seller_rating` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `ship_on_time` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `chat_response` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `bank_name` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `account_no` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `branch_name` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `ifsc_code` varchar(12) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `admin_commission` float(10,2) NOT NULL DEFAULT '0.00',
  `shipping_charges` int NOT NULL DEFAULT '0',
  `order_amount_for_free_shipping` int NOT NULL DEFAULT '0',
  `payable_amount` float(10,2) NOT NULL DEFAULT '0.00',
  `paid_amount` float(10,2) NOT NULL DEFAULT '0.00',
  `commission_amount` float(10,2) NOT NULL DEFAULT '0.00',
  `shipping_amount` float(10,2) NOT NULL DEFAULT '0.00',
  `refer_approved` tinyint(1) NOT NULL DEFAULT '0',
  `refer_user` int NOT NULL DEFAULT '0',
  `is_bulk_active` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1=Yes,0=No',
  `xls_type` enum('0','1','2') CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT '0' COMMENT '0=Normal,1=Bulk sheet, 2=mysql file'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `wl_customers`
--

INSERT INTO `wl_customers` (`customers_id`, `parent_id`, `member_type`, `mem_nature`, `registration_id`, `deals_in`, `user_name`, `alternate_email`, `password`, `title`, `first_name`, `last_name`, `store_name`, `gender`, `birth_date`, `profile_photo`, `phone_number`, `country_code`, `mob_country_code`, `mobile_number`, `fax_number`, `other_emails`, `address`, `country`, `state`, `city`, `location`, `pin_code`, `ucountry_name`, `ustate_name`, `ucity_name`, `shop_name`, `shop_banner`, `address_line1`, `google_map`, `ulocation`, `customer_support`, `actkey`, `user_uq_token`, `is_home`, `status`, `last_status`, `trashed_by`, `trashed`, `is_reverted`, `is_verified`, `is_verified_mobile`, `login_type`, `account_created_date`, `current_login`, `last_login_date`, `ip_address`, `is_blocked`, `block_time`, `number_of_login_try`, `replied`, `verify_code`, `app_id`, `device_id`, `app_type`, `temp_mobile`, `temp_email`, `is_verified_mail_once`, `my_ref_code_users`, `is_import`, `seller_rating`, `ship_on_time`, `chat_response`, `bank_name`, `account_no`, `branch_name`, `ifsc_code`, `admin_commission`, `shipping_charges`, `order_amount_for_free_shipping`, `payable_amount`, `paid_amount`, `commission_amount`, `shipping_amount`, `refer_approved`, `refer_user`, `is_bulk_active`, `xls_type`) VALUES
(1, 0, 3, 1, 'MECEL26-001', NULL, 'roshan@weblink.com', NULL, 'eTBEOEZ1aldOUW95eEgrQ2RvalQyUT09', NULL, 'Roshan', 'Dev', NULL, 'Male', NULL, NULL, NULL, NULL, NULL, '7878787878', NULL, NULL, '33 & 33A, Rama Road, Industrial Area, Near Kirti Nagar Metro Station', 99, 10, 5861, 0, 110015, 'India', 'Delhi', 'Kirti Nagar', NULL, NULL, NULL, NULL, NULL, NULL, '45ec7702ae5ebbcbf256c65a700d9f3c', NULL, 'N', '1', 0, 0, 0, 0, '1', '0', 'normal', '2026-06-16 11:15:18', '2026-08-17 11:48:25', '2026-08-12 15:58:12', '115.241.25.146', '0', '0000-00-00 00:00:00', 0, 'N', NULL, NULL, NULL, NULL, NULL, 'roshan@weblink.com', 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0.00, 0, 0, 0.00, 0.00, 0.00, 0.00, 0, 0, 0, '0'),
(2, 0, 3, 1, 'MECEL26-002', NULL, 'dia@weblink.com', NULL, 'OXU3azArMEVIQnh0SlNHVnBEWlV4dz09', NULL, 'Dinesh', 'Raj', NULL, 'Male', NULL, NULL, NULL, NULL, NULL, '7878787878', NULL, NULL, 'wfjoiwehfiw', 173, 10, 5861, 0, 110001, 'Qatar', 'Delhi', 'Kirti Nagar', NULL, NULL, NULL, NULL, NULL, NULL, '68ef7ed7f9b61626e39d8766109e97d9', NULL, 'N', '1', 0, 0, 0, 0, '1', '0', 'normal', '2026-06-16 16:48:37', '2026-06-16 17:01:19', '2026-06-16 16:48:37', '::1', '0', '0000-00-00 00:00:00', 0, 'N', NULL, NULL, NULL, NULL, NULL, 'dia@weblink.com', 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0.00, 0, 0, 0.00, 0.00, 0.00, 0.00, 0, 0, 0, '0'),
(3, 0, 3, 1, 'MECEL26-003', NULL, 'gazal@weblink.com', NULL, 'OXU3azArMEVIQnh0SlNHVnBEWlV4dz09', NULL, 'Gajal', 'Web', NULL, 'Male', NULL, NULL, NULL, NULL, NULL, '9997878787', NULL, NULL, 'wfjoiwehfiw', 173, 10, 5862, 0, 110001, 'Qatar', 'Delhi', 'Janakpuri', NULL, NULL, NULL, NULL, NULL, NULL, '4d989507d88ad0413762e329a62c2f6d', NULL, 'N', '1', 0, 0, 0, 0, '0', '0', 'normal', '2026-06-19 14:56:19', '2026-06-19 14:56:19', NULL, '::1', '0', '0000-00-00 00:00:00', 0, 'N', NULL, NULL, NULL, NULL, NULL, 'gazal@weblink.com', 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0.00, 0, 0, 0.00, 0.00, 0.00, 0.00, 0, 0, 0, '0'),
(4, 0, 3, 1, 'MECEL26-004', NULL, 'Rohan@weblink.com', NULL, 'OXU3azArMEVIQnh0SlNHVnBEWlV4dz09', NULL, 'Rohn', 'John', NULL, 'Male', NULL, NULL, NULL, NULL, NULL, '99978787878', NULL, NULL, 'wfjoiwehfiw', 173, 10, 5862, 0, 110001, 'Qatar', 'Delhi', 'Janakpuri', NULL, NULL, NULL, NULL, NULL, NULL, '1971d5d7f6b50fd7a67732235c702359', NULL, 'N', '1', 0, 0, 0, 0, '0', '0', 'normal', '2026-06-19 16:59:54', '2026-06-19 16:59:54', NULL, '::1', '0', '0000-00-00 00:00:00', 0, 'N', NULL, NULL, NULL, NULL, NULL, 'Rohan@weblink.com', 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0.00, 0, 0, 0.00, 0.00, 0.00, 0.00, 0, 0, 0, '0'),
(5, 0, 3, 1, 'MECEL26-005', NULL, 'satyendra.weblink@gmail.com', NULL, 'S0NuMjFWODU0TGFqeW9YcUxNN1k4dz09', NULL, 'Satyendra', 'Singh', NULL, 'Male', NULL, NULL, NULL, NULL, NULL, '8368592486', NULL, NULL, NULL, 0, 0, 0, 0, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '4f2ddf05b605bf2f7b5d7018eff9fd31', NULL, 'N', '1', 0, 0, 0, 0, '1', '0', 'normal', '2026-08-12 11:54:28', '2026-08-17 08:40:21', '2026-08-12 11:54:28', '::1', '0', '0000-00-00 00:00:00', 0, 'N', NULL, NULL, NULL, NULL, NULL, 'satyendra.weblink@gmail.com', 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0.00, 0, 0, 0.00, 0.00, 0.00, 0.00, 0, 0, 0, '0'),
(6, 0, 3, 1, 'MECEL26-006', NULL, 'jonshon@weblink.com', NULL, 'OXU3azArMEVIQnh0SlNHVnBEWlV4dz09', NULL, 'Jonshon', '', NULL, 'Male', NULL, NULL, NULL, NULL, NULL, '8888888888', NULL, NULL, 'Delhi india', 173, 10, 5863, 0, 110011, 'Qatar', 'Delhi', 'New Delhi', NULL, NULL, NULL, NULL, NULL, NULL, '178c6076a4da57e00ef5ff56c60fdc3d', NULL, 'N', '1', 0, 0, 0, 0, '0', '0', 'normal', '2026-08-17 12:51:12', '2026-08-17 12:51:12', NULL, '115.241.25.146', '0', '0000-00-00 00:00:00', 0, 'N', NULL, NULL, NULL, NULL, NULL, 'jonshon@weblink.com', 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0.00, 0, 0, 0.00, 0.00, 0.00, 0.00, 0, 0, 0, '0'),
(7, 0, 3, 1, 'MECEL26-007', NULL, 'praveen.weblink309@gmail.com', NULL, 'OXU3azArMEVIQnh0SlNHVnBEWlV4dz09', NULL, 'praveen', 'chaturvedi', NULL, 'Male', NULL, NULL, NULL, NULL, NULL, '9632587410', NULL, NULL, '11/34 ramesh nagar', 173, 10, 5862, 0, 110015, 'Qatar', 'Delhi', 'Janakpuri', NULL, NULL, NULL, NULL, NULL, NULL, 'cefd5f4cb244d16c8c65facab01bcdc8', NULL, 'N', '1', 0, 0, 0, 0, '0', '0', 'normal', '2026-08-18 12:56:01', '2026-08-18 12:56:01', NULL, '115.241.25.146', '0', '0000-00-00 00:00:00', 0, 'N', NULL, NULL, NULL, NULL, NULL, 'praveen.weblink309@gmail.com', 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0.00, 0, 0, 0.00, 0.00, 0.00, 0.00, 0, 0, 0, '0'),
(8, 0, 3, 1, 'MECEL26-008', NULL, 'pkc@gmail.com', NULL, 'aW9CYVBZK0o2eXU4VDVmRG9DdmRXUT09', NULL, 'praveen', 'Kumar', NULL, '', '0000-00-00', '', NULL, NULL, NULL, '7412596326', NULL, NULL, NULL, 0, 0, 0, 0, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '04146ff92f8647e3b503ee3038c3c6e4', NULL, 'N', '1', 0, 0, 0, 0, '1', '0', 'normal', '2026-08-18 14:13:22', '2026-08-20 17:05:15', '2026-08-20 16:06:26', '115.241.25.146', '0', '0000-00-00 00:00:00', 0, 'Y', NULL, NULL, NULL, NULL, NULL, 'pkc@gmail.com', 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0.00, 0, 0, 0.00, 0.00, 0.00, 0.00, 0, 0, 0, '0'),
(9, 0, 3, 1, 'MECEL26-009', NULL, 'sagarpu123r@gmail.com', NULL, 'OXU3azArMEVIQnh0SlNHVnBEWlV4dz09', NULL, 'Vikas', 'Suryan', NULL, 'Male', NULL, NULL, NULL, NULL, NULL, '5412036958', NULL, NULL, 'sagarpur', 173, 10, 5862, 0, 110046, 'Qatar', 'Delhi', 'Janakpuri', NULL, NULL, NULL, NULL, NULL, NULL, '217a6c13b8660c6755a9058e2ec37b67', NULL, 'N', '3', 0, 0, 0, 0, '0', '0', 'normal', '2026-08-20 15:44:59', '2026-08-20 15:44:59', NULL, '115.241.25.146', '0', '0000-00-00 00:00:00', 0, 'N', NULL, NULL, NULL, NULL, NULL, 'sagarpu123r@gmail.com', 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0.00, 0, 0, 0.00, 0.00, 0.00, 0.00, 0, 0, 0, '0');

-- --------------------------------------------------------

--
-- Table structure for table `wl_enquiry`
--

CREATE TABLE `wl_enquiry` (
  `id` int NOT NULL,
  `customers_id` int NOT NULL DEFAULT '0',
  `entity_id` int NOT NULL DEFAULT '0',
  `type` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1=ContactUs,2=Product',
  `entity_title` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `first_name` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `last_name` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `email` varchar(150) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `office_address` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `amount` varchar(55) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT '0.00',
  `amount_councry` varchar(55) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `country` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `country_code` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `state` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `city` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `phone_number` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `ext_number` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `mob_country_code` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `mobile_number` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `fax_number` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `address` varchar(220) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `zipcode` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `requirement` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `category_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `message` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `size` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `status` enum('1','2') CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `reply_status` enum('Y','N') CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT 'N',
  `receive_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `wl_enquiry`
--

INSERT INTO `wl_enquiry` (`id`, `customers_id`, `entity_id`, `type`, `entity_title`, `first_name`, `last_name`, `email`, `office_address`, `amount`, `amount_councry`, `country`, `country_code`, `state`, `city`, `phone_number`, `ext_number`, `mob_country_code`, `mobile_number`, `fax_number`, `address`, `zipcode`, `requirement`, `category_name`, `message`, `size`, `status`, `reply_status`, `receive_date`) VALUES
(1, 0, 8, 2, 'Natural Body Wash', 'Claude Test', NULL, 'test@example.com', NULL, '0.00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '9876543210', NULL, NULL, NULL, NULL, 'Conditioner', 'Test enquiry from automated check', NULL, '1', 'N', '2026-10-14 10:19:11'),
(2, 0, 9, 2, 'Natural Pineapple Noni Shampoo', 'Satyendra Singh', NULL, 'satyendra.weblink@gmail.com', NULL, '0.00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '08368592486', NULL, NULL, NULL, NULL, 'Massage Emollients', 'TEsting message', NULL, '1', 'N', '2026-10-14 10:19:30');

-- --------------------------------------------------------

--
-- Table structure for table `wl_expertise`
--

CREATE TABLE `wl_expertise` (
  `expertise_id` int NOT NULL,
  `temple_id` int NOT NULL DEFAULT '0',
  `expertise_name` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `designation` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mobile_number` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `experience` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `expertise_image` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `expertise_description` tinytext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `sort_order` int DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0=Inactive, 1=Active, 2=Delete',
  `date_added` datetime NOT NULL,
  `date_updated` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `wl_expertise`
--

INSERT INTO `wl_expertise` (`expertise_id`, `temple_id`, `expertise_name`, `designation`, `mobile_number`, `experience`, `expertise_image`, `expertise_description`, `sort_order`, `status`, `date_added`, `date_updated`) VALUES
(4, 0, 'Converter Identification', NULL, NULL, NULL, 'category-img4.jpg', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since 1966,', NULL, 1, '2026-10-13 17:41:43', '2026-10-13 17:45:54'),
(5, 0, 'Precious Metal Assay', '', NULL, NULL, 'jvc-logo.png', 'Pt, Pd and Rh content analysis', NULL, 1, '2026-10-14 13:19:11', NULL),
(6, 0, 'Scrap Procurement', '', NULL, NULL, 'jvc-logo1.png', 'Single unit to bulk lots', NULL, 1, '2026-10-14 13:19:55', NULL),
(7, 0, 'Collections & Logistics', '', NULL, NULL, 'jvc-logo2.png', 'Scheduled pickup with documentions', NULL, 1, '2026-10-14 13:20:50', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `wl_faq`
--

CREATE TABLE `wl_faq` (
  `faq_id` int NOT NULL,
  `faq_type` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1-Buyer, 2-Seller',
  `faq_parent_id` int NOT NULL DEFAULT '0',
  `entity_id` int NOT NULL DEFAULT '0',
  `faq_question` varchar(225) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `faq_answer` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `sort_order` int DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0=Inactive,1=Active,2=Deleted',
  `faq_date_added` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `wl_faq`
--

INSERT INTO `wl_faq` (`faq_id`, `faq_type`, `faq_parent_id`, `entity_id`, `faq_question`, `faq_answer`, `sort_order`, `status`, `faq_date_added`) VALUES
(1, 1, 0, 0, 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', '<p><span style=\"color: rgb(102, 102, 102); font-family: Outfit, sans-serif; font-size: 14px; background-color: rgb(245, 245, 245);\">Lorem ipsum dolor sit amet, consectetur adipisicing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</span></p>\r\n\r\n<ul style=\"box-sizing: border-box; margin: 20px 0px 20px 30px; padding-right: 0px; padding-left: 0px; border: 0px; outline: none; font-variant-numeric: normal; font-variant-east-asian: normal; font-stretch: normal; line-height: 22px; font-family: Outfit, sans-serif; color: rgb(102, 102, 102);\">\r\n	<li style=\"box-sizing: border-box; margin: 0px; padding: 0px; border: 0px; outline: none;\">Full-fledged engineering and construction solutions</li>\r\n	<li style=\"box-sizing: border-box; margin: 0px; padding: 0px; border: 0px; outline: none;\">State-of-the-art, well-equipped fabrication yard</li>\r\n	<li style=\"box-sizing: border-box; margin: 0px; padding: 0px; border: 0px; outline: none;\">Highly-skilled and experienced technical crew</li>\r\n</ul>\r\n\r\n<ol style=\"box-sizing: border-box; margin: 20px 0px 20px 30px; padding-right: 0px; padding-left: 0px; border: 0px; outline: none; font-variant-numeric: normal; font-variant-east-asian: normal; font-stretch: normal; line-height: 22px; font-family: Outfit, sans-serif; color: rgb(102, 102, 102);\">\r\n	<li style=\"box-sizing: border-box; margin: 0px; padding: 0px; border: 0px; outline: none;\">Architectural and structural steel installation services</li>\r\n	<li style=\"box-sizing: border-box; margin: 0px; padding: 0px; border: 0px; outline: none;\">Project mobilization, planning &amp; engineering services</li>\r\n</ol>', 1, 1, '2025-07-03 09:47:12'),
(2, 1, 0, 0, 'Architectural and structural steel installation services', '<p><span style=\"color: rgb(102, 102, 102); font-family: Outfit, sans-serif; font-size: 14px; background-color: rgb(245, 245, 245);\">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</span></p>', 2, 1, '2025-07-03 10:40:12'),
(3, 1, 0, 0, 'What is goods?', '<p style=\"margin: 0px 0px 15px; padding: 0px; text-align: justify; color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; font-size: 14px;\">&quot;But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?&quot;</p>', 3, 1, '2025-07-03 10:42:12'),
(4, 1, 0, 0, 'TESTING', '<p>TESTING</p>', 4, 0, '2025-07-03 10:49:12'),
(5, 1, 0, 0, 'What is goods?fdgfdg', '<p>satish</p>', 5, 0, '2025-07-03 11:48:41'),
(6, 1, 0, 0, 'What is delivery charge ?', '<p>50</p>', 6, 1, '2025-07-03 11:49:22'),
(7, 1, 0, 0, 'long established fact that a reader will be distracted', '<p>established fact that a reader will be distracted&nbsp;</p>', 7, 1, '2026-08-19 16:10:19');

-- --------------------------------------------------------

--
-- Table structure for table `wl_gallery`
--

CREATE TABLE `wl_gallery` (
  `gallery_id` int NOT NULL,
  `category_id` int NOT NULL DEFAULT '0',
  `gallery_title` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `friendly_url` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `gallery_image` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `sort_order` int DEFAULT NULL,
  `status` enum('1','0') CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT '1',
  `gallery_date_added` datetime NOT NULL,
  `gallery_date_updated` datetime DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `wl_gallery`
--

INSERT INTO `wl_gallery` (`gallery_id`, `category_id`, `gallery_title`, `friendly_url`, `gallery_image`, `description`, `sort_order`, `status`, `gallery_date_added`, `gallery_date_updated`) VALUES
(1, 1, 'Gallery 1', NULL, 'candidate_img1.jpg', '', 1, '1', '2026-10-12 16:26:41', NULL),
(2, 3, 'Gallery title 2', NULL, 'category-img3.jpg', '', 2, '1', '2026-10-13 15:15:16', '2026-10-13 15:15:32');

-- --------------------------------------------------------

--
-- Table structure for table `wl_header_images`
--

CREATE TABLE `wl_header_images` (
  `id` int NOT NULL,
  `header_image` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `header_url` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `line_one` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `line_two` varchar(150) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `line_three` varchar(300) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `status` enum('1','0','2') CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `added_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `wl_header_images`
--

INSERT INTO `wl_header_images` (`id`, `header_image`, `header_url`, `line_one`, `line_two`, `line_three`, `status`, `added_date`) VALUES
(2, 'banner.jpg', 'https://www.google.com/', 'Natural Shampoo', 'Infused with cold-pressed botanicals for deeply hydrated, glowing skin — straight from the Himalayas', '', '1', '2026-08-13 08:39:44'),
(5, 'category-img4.jpg', '', '', '', '', '1', '2026-10-13 15:16:16');

-- --------------------------------------------------------

--
-- Table structure for table `wl_invite_friends`
--

CREATE TABLE `wl_invite_friends` (
  `invite_id` int NOT NULL,
  `product_id` int NOT NULL DEFAULT '0',
  `friend_name` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `friend_email` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `your_name` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `your_email` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `receive_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `wl_meta_tags`
--

CREATE TABLE `wl_meta_tags` (
  `meta_id` int NOT NULL,
  `is_fixed` enum('Y','N') CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT 'N',
  `entity_type` varchar(180) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL COMMENT 'name of controllers  ',
  `entity_id` int NOT NULL DEFAULT '0',
  `page_url` varchar(250) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `meta_title` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `meta_description` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `meta_keyword` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `status` enum('0','1') NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `wl_meta_tags`
--

INSERT INTO `wl_meta_tags` (`meta_id`, `is_fixed`, `entity_type`, `entity_id`, `page_url`, `meta_title`, `meta_description`, `meta_keyword`, `status`) VALUES
(1, 'Y', 'home', 0, 'home', 'Home | JV CatTrade', 'JV CatTrade', 'JV CatTrade', '1'),
(2, 'Y', 'pages/contactus', 0, 'contactus', 'Contact Us', 'Contact Us', 'Contact Us', '1'),
(3, 'Y', 'pages/sitemap', 0, 'sitemap', 'Sitemap', 'Sitemap', 'Sitemap', '1'),
(5, 'Y', 'pages/index', 0, 'aboutus', 'About Us', 'About Us', 'About Us', '1'),
(6, 'Y', 'pages/index', 0, 'terms-conditions', 'Terms & Conditions', 'Terms & Conditions', 'Terms & Conditions', '1'),
(7, 'Y', 'pages/index', 0, 'privacy-policy', 'Privacy Policy', 'Privacy Policy', 'Privacy Policy', '1'),
(8, 'Y', 'pages/index', 0, 'legal-disclaimer', 'Legal Disclaimer', 'Legal Disclaimer', 'Legal Disclaimer', '1'),
(9, 'Y', 'pages/index', 0, 'certificates', 'Certificates', 'Certificates', 'Certificates', '1'),
(10, 'Y', 'pages/index', 0, 'scarp-trading', 'Catalytic Converter & Scarp Trading', 'Catalytic Converter & Scarp Trading', 'Catalytic Converter & Scarp Trading', '1'),
(11, 'Y', 'pages/index', 0, 'company-overview', 'Company Overview', 'Company Overview', 'Company Overview', '1'),
(15, 'Y', 'gallery/index', 0, 'gallery', 'Image Gallery', 'Image, Gallery', 'Image, Gallery', '1'),
(16, 'Y', 'videos/index', 0, 'videos', 'Video Gallery', 'Video, Gallery', 'Video, Gallery', '0'),
(19, 'Y', 'testimonials/index', 0, 'testimonials', 'Our Testimonials', 'Our Testimonials', 'Our Testimonials', '1'),
(21, 'Y', 'products/index/featured-products', 0, 'featured-products', 'Featured Products', 'Featured Products', 'Featured Products', '1'),
(22, 'Y', 'products/index/hot-products', 0, 'hot-products', 'Hot Products', 'Hot Products', 'Hot Products', '1'),
(23, 'Y', 'products/index/new-products', 0, 'new-products', 'New Arrivals Products', 'New Arrivals Products', 'New Arrivals Products', '1'),
(24, 'Y', 'products/index/best-products', 0, 'best-products', 'Best Selling Products', 'Best Selling Products', 'Best Selling Products', '1'),
(25, 'Y', 'products/index/recent-products', 0, 'recent-products', 'Recently Added Products', 'Recently Added Products', 'Recently Added Products', '1'),
(26, 'Y', 'products/category', 0, 'products-category', 'Products Category', 'Products Category', 'Products Category', '1'),
(60, 'N', 'gallery/category', 1, 'image-album-1', 'Image album 1', '', '', '1'),
(61, 'N', 'videos/category', 2, 'video-album-1', 'Video Album 1', '', '', '1'),
(63, 'N', 'gallery/category', 3, 'image-album-2', 'Image album 2', '', '', '1'),
(64, 'Y', 'gallery/category', 0, 'gallery-albums', 'Image Gallery Album', 'Image Gallery Album', 'Image Gallery Album', '1'),
(65, 'Y', 'videos/category', 0, 'video-albums', 'Video Gallery Album', 'Video Gallery Album', 'Video Gallery Album', '0'),
(66, 'N', 'products/category', 1, 'products/ceramic-converters', 'Ceramic Converters', 'Close-coupled OEM ceeramic unit with full substrate and original casing.', 'Close-coupled, ceeramic, unit, full, substrate, original, casing', '1'),
(67, 'N', 'products/category', 2, 'products/ceramic-converters/toyota-corolla-1-8-ceramic-converter', 'Toyota Corolla 1.8 ceramic converter', 'Close-coupled OEM ceeramic unit with full substrate and original casing.', 'Close-coupled, ceeramic, unit, full, substrate, original, casing', '1'),
(68, 'N', 'products/details', 1, 'products/1-8-ceramic-converter', '1.8 ceramic converter', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride', 'dummy, text, Lorem, Ipsum, typesetting, simply, printing, industry, industry\'s, standard, designers, Letraset, James, Mosley, librarian, Bride, Printing, Library, London, Cicero', '1'),
(69, 'N', 'products/details', 2, 'products/honda-city-1-5-i-vtec-converter', 'Honda City 1.5 i-VTEC Converter', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride', 'dummy, text, Lorem, Ipsum, typesetting, simply, printing, industry, industry\'s, standard, designers, Letraset, James, Mosley, librarian, Bride, Printing, Library, London, Cicero', '1');

-- --------------------------------------------------------

--
-- Table structure for table `wl_notification`
--

CREATE TABLE `wl_notification` (
  `notification_id` int NOT NULL,
  `nf_type` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1=Activity Log,2=Sceduled By Admin,3=Auto',
  `member_type` tinyint(1) NOT NULL DEFAULT '3' COMMENT '3=Member',
  `type_manage` tinyint NOT NULL,
  `type_action` tinyint NOT NULL,
  `notification_title` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `notification_image` varchar(100) DEFAULT NULL,
  `description` text,
  `mem_by_type` tinyint(1) NOT NULL,
  `ref_type_id` int NOT NULL,
  `ref_prod_type` int NOT NULL,
  `ref_item_id` int NOT NULL,
  `is_repeat` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1=Yes,0=N0',
  `repeat_from_day` varchar(20) NOT NULL,
  `repeat_to_day` varchar(20) NOT NULL,
  `repeat_times` tinyint NOT NULL,
  `send_sms` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1=Yes,0=N0',
  `schedule_date` date NOT NULL,
  `schedule_time` varchar(20) NOT NULL,
  `schedule_date_time` datetime NOT NULL,
  `schedule_end_date` date NOT NULL,
  `has_members` tinyint(1) NOT NULL DEFAULT '2' COMMENT '1=Yes,2=No',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1=Actice,0=Inactive,2=Delete',
  `last_status` tinyint(1) NOT NULL COMMENT 'populates status before trashing',
  `trashed_by` int NOT NULL COMMENT 'admin id',
  `trashed` tinyint(1) NOT NULL COMMENT '1=Yes,0=No',
  `is_reverted` tinyint(1) NOT NULL COMMENT '1=Reverted,0=No',
  `url_hint` varchar(25) DEFAULT NULL,
  `url_params` text
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `wl_notification_customer`
--

CREATE TABLE `wl_notification_customer` (
  `id` int NOT NULL,
  `notification_id` int NOT NULL,
  `customer_id` int NOT NULL,
  `read_status` enum('R','U') NOT NULL DEFAULT 'U' COMMENT 'R=Read,U=Unread',
  `created_at` datetime DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `wl_partners`
--

CREATE TABLE `wl_partners` (
  `partner_id` int NOT NULL,
  `temple_id` int NOT NULL DEFAULT '0',
  `partner_name` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `designation` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mobile_number` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `experience` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `partner_image` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `short_desc` tinytext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `sort_order` int DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0=Inactive, 1=Active, 2=Delete',
  `date_added` datetime NOT NULL,
  `date_updated` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `wl_partners`
--

INSERT INTO `wl_partners` (`partner_id`, `temple_id`, `partner_name`, `designation`, `mobile_number`, `experience`, `partner_image`, `short_desc`, `sort_order`, `status`, `date_added`, `date_updated`) VALUES
(1, 0, 'Partner 1', '', NULL, NULL, 'brand-logo1.jpg', '', NULL, 1, '2026-10-09 13:10:59', NULL),
(2, 0, 'Partner 2', '', NULL, NULL, 'brand-logo2.jpg', '', NULL, 1, '2026-10-09 13:11:10', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `wl_products`
--

CREATE TABLE `wl_products` (
  `product_id` int NOT NULL,
  `category_id` int DEFAULT '0' COMMENT 'parent_id= last level of category ',
  `category_links` varchar(80) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `product_title` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `product_code` varchar(80) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `reference_id` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `product_make` varchar(150) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `product_model` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `year` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `friendly_url` varchar(110) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `product_alt` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `product_description` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `product_video` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `is_best` tinyint(1) NOT NULL DEFAULT '0',
  `is_hot` tinyint(1) DEFAULT '0',
  `is_new` tinyint(1) NOT NULL DEFAULT '0',
  `is_featured` tinyint(1) NOT NULL DEFAULT '0',
  `is_recent` tinyint(1) NOT NULL DEFAULT '0',
  `product_type` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0=normal, 1=discounted,2=near expiry',
  `xls_type` enum('0','1') CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT '0',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1=active,0=inactive,2=deleted',
  `added_date` datetime NOT NULL,
  `updated_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `wl_products`
--

INSERT INTO `wl_products` (`product_id`, `category_id`, `category_links`, `product_title`, `product_code`, `reference_id`, `product_make`, `product_model`, `year`, `friendly_url`, `product_alt`, `product_description`, `product_video`, `is_best`, `is_hot`, `is_new`, `is_featured`, `is_recent`, `product_type`, `xls_type`, `status`, `added_date`, `updated_date`) VALUES
(1, 2, '2,1', '1.8 ceramic converter', 'JV-C1042', 'TOY-25051-0D140', 'Toyota', 'Corolla', '2009-2014', 'products/1-8-ceramic-converter', '1.8 ceramic converter', '<p><strong style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; font-size: 14px; text-align: justify;\">Lorem Ipsum</strong><span style=\"color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; font-size: 14px; text-align: justify;\"> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset&#39;s Body Type sheets. It has survived not only many decades, but also the leap into electronic typesetting, remaining essentially unchanged.</span></p>', NULL, 0, 0, 0, 0, 0, 0, '0', 1, '2026-10-14 13:15:13', NULL),
(2, 2, '2,1', 'Honda City 1.5 i-VTEC Converter', 'JV-C1044', 'TOY-25051-0D148', 'Toyota', 'Corolla', '2009-2015', 'products/honda-city-1-5-i-vtec-converter', 'Honda City 1.5 i-VTEC Converter', '<p><strong style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; font-size: 14px; text-align: justify;\">Lorem Ipsum</strong><span style=\"color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; font-size: 14px; text-align: justify;\"> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset&#39;s Body Type sheets. It has survived not only many decades, but also the leap into electronic typesetting, remaining essentially unchanged.</span></p>', NULL, 0, 0, 0, 0, 0, 0, '0', 1, '2026-10-14 13:17:08', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `wl_products_media`
--

CREATE TABLE `wl_products_media` (
  `id` int UNSIGNED NOT NULL,
  `product_id` int UNSIGNED NOT NULL,
  `media_type` enum('photo','video','pdf') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT 'photo',
  `media` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `is_default` enum('Y','N') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT 'N',
  `sort_order` int DEFAULT NULL,
  `media_date_added` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `wl_products_media`
--

INSERT INTO `wl_products_media` (`id`, `product_id`, `media_type`, `media`, `is_default`, `sort_order`, `media_date_added`) VALUES
(32, 8, 'photo', 'dl-pro3.jpg', 'Y', NULL, '2026-08-20 12:29:47'),
(33, 8, 'photo', 'dm-pro42.jpg', 'N', NULL, '2026-08-20 12:29:47'),
(34, 8, 'photo', 'ds-pro1.jpg', 'N', NULL, '2026-08-20 12:29:47'),
(35, 8, 'photo', 'dm-pro21.jpg', 'N', NULL, '2026-08-20 12:29:47'),
(36, 8, 'photo', 'ds-pro42.jpg', 'N', NULL, '2026-08-20 12:29:47'),
(37, 9, 'photo', 'dl-pro16.jpg', 'Y', NULL, '2026-08-20 16:20:17'),
(38, 9, 'photo', 'ds-pro3.jpg', 'N', NULL, '2026-08-20 16:21:37'),
(39, 9, 'photo', 'dm-pro43.jpg', 'N', NULL, '2026-08-20 16:21:37'),
(40, 9, 'photo', 'dm-pro1.jpg', 'N', NULL, '2026-08-20 16:21:37'),
(41, 9, 'photo', 'dl-pro28.jpg', 'N', NULL, '2026-08-20 16:21:37');

-- --------------------------------------------------------

--
-- Table structure for table `wl_reset_pwd_link`
--

CREATE TABLE `wl_reset_pwd_link` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `code` varchar(20) NOT NULL,
  `expire` datetime NOT NULL,
  `added` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `wl_sessions`
--

CREATE TABLE `wl_sessions` (
  `id` varchar(128) NOT NULL,
  `ip_address` varchar(45) NOT NULL,
  `timestamp` int UNSIGNED NOT NULL DEFAULT '0',
  `data` blob NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `wl_sessions`
--

INSERT INTO `wl_sessions` (`id`, `ip_address`, `timestamp`, `data`) VALUES
('oum1lesgl0jda9f7n9rk0hq1tmc6mpf3', '115.241.25.146', 1791959924, 0x5f5f63695f6c6173745f726567656e65726174657c693a313739313935393932343b756e715f757365725f7265667c733a32313a223877594f6462793636616366323061383264646235223b6c6e675f7468656d657c733a363a22617261626963223b61646d696e5f757365727c733a353a2261646d696e223b61646d5f6b65797c733a383a22636e73676b4d6434223b61646d696e5f747970657c733a313a2231223b61646d696e5f69647c733a313a2231223b61646d696e5f6c6f676765645f696e7c623a313b7573655f6d656d5f61646d696e5f69647c693a303b),
('cts91218t13lkabhe34njpuhssq3g24i', '115.241.25.146', 1791959617, 0x5f5f63695f6c6173745f726567656e65726174657c693a313739313935393631373b),
('dmnemmtj957n5r5holn2qv1mqmsd6r33', '115.241.25.146', 1791959818, 0x5f5f63695f6c6173745f726567656e65726174657c693a313739313935393632353b6d73675f747970657c733a353a226572726f72223b61646d696e5f757365727c733a353a2261646d696e223b61646d5f6b65797c733a383a22636e73676b4d6434223b61646d696e5f747970657c733a313a2231223b61646d696e5f69647c733a313a2231223b61646d696e5f6c6f676765645f696e7c623a313b7573655f6d656d5f61646d696e5f69647c693a303b756e715f757365725f7265667c733a32313a22447638467274783036616366323235613438343466223b6c6e675f7468656d657c733a363a22617261626963223b),
('a61r4bg1v0mf9926f1gbq98u1l7d5c9v', '115.241.25.146', 1791960246, 0x5f5f63695f6c6173745f726567656e65726174657c693a313739313936303234363b756e715f757365725f7265667c733a32313a223877594f6462793636616366323061383264646235223b6c6e675f7468656d657c733a363a22617261626963223b61646d696e5f757365727c733a353a2261646d696e223b61646d5f6b65797c733a383a22636e73676b4d6434223b61646d696e5f747970657c733a313a2231223b61646d696e5f69647c733a313a2231223b61646d696e5f6c6f676765645f696e7c623a313b7573655f6d656d5f61646d696e5f69647c693a303b),
('8eqo7la2ilh5n4vsc743ilt3uq1encog', '115.241.25.146', 1791960560, 0x5f5f63695f6c6173745f726567656e65726174657c693a313739313936303536303b756e715f757365725f7265667c733a32313a223877594f6462793636616366323061383264646235223b6c6e675f7468656d657c733a363a22617261626963223b61646d696e5f757365727c733a353a2261646d696e223b61646d5f6b65797c733a383a22636e73676b4d6434223b61646d696e5f747970657c733a313a2231223b61646d696e5f69647c733a313a2231223b61646d696e5f6c6f676765645f696e7c623a313b7573655f6d656d5f61646d696e5f69647c693a303b),
('7hvc32mfaegge857g2f35n8bo0g5tpt2', '115.241.25.146', 1791963478, 0x5f5f63695f6c6173745f726567656e65726174657c693a313739313936333437383b756e715f757365725f7265667c733a32313a223877594f6462793636616366323061383264646235223b6c6e675f7468656d657c733a363a22617261626963223b61646d696e5f757365727c733a353a2261646d696e223b61646d5f6b65797c733a383a22636e73676b4d6434223b61646d696e5f747970657c733a313a2231223b61646d696e5f69647c733a313a2231223b61646d696e5f6c6f676765645f696e7c623a313b7573655f6d656d5f61646d696e5f69647c693a303b6d73675f747970657c733a373a2273756363657373223b),
('32adnntj6eh5gghm8fhrl57km61gdefc', '52.74.145.225', 1791960640, 0x5f5f63695f6c6173745f726567656e65726174657c693a313739313936303634303b756e715f757365725f7265667c733a32313a22737a544f3266496236616366323634303166323464223b6c6e675f7468656d657c733a363a22617261626963223b),
('3v8r0tch4tfov4u2k9pnc1sdlmv6ond3', '115.241.25.146', 1791963831, 0x5f5f63695f6c6173745f726567656e65726174657c693a313739313936333833313b756e715f757365725f7265667c733a32313a223877594f6462793636616366323061383264646235223b6c6e675f7468656d657c733a363a22617261626963223b61646d696e5f757365727c733a353a2261646d696e223b61646d5f6b65797c733a383a22636e73676b4d6434223b61646d696e5f747970657c733a313a2231223b61646d696e5f69647c733a313a2231223b61646d696e5f6c6f676765645f696e7c623a313b7573655f6d656d5f61646d696e5f69647c693a303b6d73675f747970657c733a373a2273756363657373223b),
('de03eaqm3qq1epdtugal5sj144hcbqkf', '115.241.25.146', 1791964143, 0x5f5f63695f6c6173745f726567656e65726174657c693a313739313936343134333b756e715f757365725f7265667c733a32313a223877594f6462793636616366323061383264646235223b6c6e675f7468656d657c733a363a22617261626963223b61646d696e5f757365727c733a353a2261646d696e223b61646d5f6b65797c733a383a22636e73676b4d6434223b61646d696e5f747970657c733a313a2231223b61646d696e5f69647c733a313a2231223b61646d696e5f6c6f676765645f696e7c623a313b7573655f6d656d5f61646d696e5f69647c693a303b6d73675f747970657c733a373a2273756363657373223b),
('4931s5v07glc3pk78bdla1ebv83d6dbo', '115.241.25.146', 1791964250, 0x5f5f63695f6c6173745f726567656e65726174657c693a313739313936343134333b756e715f757365725f7265667c733a32313a223877594f6462793636616366323061383264646235223b6c6e675f7468656d657c733a363a22617261626963223b61646d696e5f757365727c733a353a2261646d696e223b61646d5f6b65797c733a383a22636e73676b4d6434223b61646d696e5f747970657c733a313a2231223b61646d696e5f69647c733a313a2231223b61646d696e5f6c6f676765645f696e7c623a313b7573655f6d656d5f61646d696e5f69647c693a303b6d73675f747970657c733a373a2273756363657373223b737563636573737c733a32363a225265636f7264206164646564207375636365737366756c6c792e223b5f5f63695f766172737c613a313a7b733a373a2273756363657373223b733a333a226f6c64223b7d),
('cgbgrtjmojdmqvoburef2oit13nit25l', '203.115.97.156', 1791980187, 0x5f5f63695f6c6173745f726567656e65726174657c693a313739313938303138373b),
('sq1ieq65ooa04bfm5sfklqm1u874ssau', '203.115.97.156', 1791980187, 0x5f5f63695f6c6173745f726567656e65726174657c693a313739313938303138373b),
('i5i41r1q39s7ueagkerplaeg2h708o7l', '203.115.97.156', 1791980216, 0x5f5f63695f6c6173745f726567656e65726174657c693a313739313938303231363b),
('q0dsj066p81ke47gd3d208emnsr385to', '203.115.97.156', 1791981242, 0x5f5f63695f6c6173745f726567656e65726174657c693a313739313938313234323b756e715f757365725f7265667c733a32313a2250556a6766364e6b36616366373662613763316130223b6c6e675f7468656d657c733a363a22617261626963223b),
('pdkqt4a0krutp48btip6tr3jnua9hm3k', '14.194.4.66', 1791981267, 0x5f5f63695f6c6173745f726567656e65726174657c693a313739313938313236373b756e715f757365725f7265667c733a32313a2238556c7472754c4736616366373664336262313936223b6c6e675f7468656d657c733a363a22617261626963223b),
('jmggu5kjkn0cegfb07air882vemkmlj0', '203.115.97.156', 1792049360, 0x5f5f63695f6c6173745f726567656e65726174657c693a313739323034393336303b756e715f757365725f7265667c733a32313a225a4a6452577a306236616430383064303939303438223b6c6e675f7468656d657c733a363a22617261626963223b),
('1c0fg07uaf8fte0577q0ek96chcoessl', '14.194.4.66', 1792050023, 0x5f5f63695f6c6173745f726567656e65726174657c693a313739323035303032333b756e715f757365725f7265667c733a32313a226b4262694976714836616430383066383637323766223b6c6e675f7468656d657c733a363a22617261626963223b),
('4582i5r6uiisgtsgmg0giu6gtefd3qov', '14.194.4.66', 1792050023, 0x5f5f63695f6c6173745f726567656e65726174657c693a313739323035303032333b756e715f757365725f7265667c733a32313a226b4262694976714836616430383066383637323766223b6c6e675f7468656d657c733a363a22617261626963223b),
('s8p7vms004ealnf9spn514eettddrfkh', '14.194.4.66', 1792050349, 0x5f5f63695f6c6173745f726567656e65726174657c693a313739323035303334393b756e715f757365725f7265667c733a32313a22663254417562726536616430383337313562666530223b6c6e675f7468656d657c733a363a22617261626963223b61646d696e5f757365727c733a353a2261646d696e223b61646d5f6b65797c733a383a22636e73676b4d6434223b61646d696e5f747970657c733a313a2231223b61646d696e5f69647c733a313a2231223b61646d696e5f6c6f676765645f696e7c623a313b7573655f6d656d5f61646d696e5f69647c693a303b6d73675f747970657c733a373a2273756363657373223b),
('gf4ekth860n3hajk14gpu4ghgu2dns3n', '14.194.4.66', 1792050046, 0x5f5f63695f6c6173745f726567656e65726174657c693a313739323035303034363b756e715f757365725f7265667c733a32313a226c72473537624e5a36616430383337656134646462223b6c6e675f7468656d657c733a363a22617261626963223b),
('mm7fud6g2l7totk6ucevpn9ieccvov74', '14.194.4.66', 1792050333, 0x5f5f63695f6c6173745f726567656e65726174657c693a313739323035303333333b),
('56kmv7c9kpcjljkoi09n93o8u7nau7qf', '14.194.4.66', 1792050333, 0x5f5f63695f6c6173745f726567656e65726174657c693a313739323035303333333b),
('d18hhvbrf1ijjimk897masfqunmh48mo', '14.194.4.66', 1792050695, 0x5f5f63695f6c6173745f726567656e65726174657c693a313739323035303639353b756e715f757365725f7265667c733a32313a22663254417562726536616430383337313562666530223b6c6e675f7468656d657c733a363a22617261626963223b61646d696e5f757365727c733a353a2261646d696e223b61646d5f6b65797c733a383a22636e73676b4d6434223b61646d696e5f747970657c733a313a2231223b61646d696e5f69647c733a313a2231223b61646d696e5f6c6f676765645f696e7c623a313b7573655f6d656d5f61646d696e5f69647c693a303b6d73675f747970657c733a373a2273756363657373223b737563636573737c733a33373a225265636f726420686173206265656e2075706461746564207375636365737366756c6c792e223b5f5f63695f766172737c613a313a7b733a373a2273756363657373223b733a333a226f6c64223b7d),
('o5rtfrs55uktgl8qrh7ujg2s1rj3ca8s', '14.194.4.66', 1792050633, 0x5f5f63695f6c6173745f726567656e65726174657c693a313739323035303633333b),
('n5ia17v461v56bri3t7hn6dhtn92efuh', '14.194.4.66', 1792050633, 0x5f5f63695f6c6173745f726567656e65726174657c693a313739323035303633333b),
('3hs6pqrpo45bn2mjdvsd5khrmcgjpp6g', '14.194.4.66', 1792051210, 0x5f5f63695f6c6173745f726567656e65726174657c693a313739323035313231303b756e715f757365725f7265667c733a32313a22663254417562726536616430383337313562666530223b6c6e675f7468656d657c733a363a22617261626963223b61646d696e5f757365727c733a353a2261646d696e223b61646d5f6b65797c733a383a22636e73676b4d6434223b61646d696e5f747970657c733a313a2231223b61646d696e5f69647c733a313a2231223b61646d696e5f6c6f676765645f696e7c623a313b7573655f6d656d5f61646d696e5f69647c693a303b6d73675f747970657c733a373a2273756363657373223b),
('au66f4budr77a1nm1pap45j04eqkjh7f', '14.194.4.66', 1792050933, 0x5f5f63695f6c6173745f726567656e65726174657c693a313739323035303933333b),
('ig82jvua5k8229h5vsc4fsgs9tuniru2', '14.194.4.66', 1792050933, 0x5f5f63695f6c6173745f726567656e65726174657c693a313739323035303933333b),
('e9vpk4tfr7i0rp2ac10h3am4dcaair3k', '14.194.4.66', 1792051220, 0x5f5f63695f6c6173745f726567656e65726174657c693a313739323035313231303b756e715f757365725f7265667c733a32313a22663254417562726536616430383337313562666530223b6c6e675f7468656d657c733a363a22617261626963223b61646d696e5f757365727c733a353a2261646d696e223b61646d5f6b65797c733a383a22636e73676b4d6434223b61646d696e5f747970657c733a313a2231223b61646d696e5f69647c733a313a2231223b61646d696e5f6c6f676765645f696e7c623a313b7573655f6d656d5f61646d696e5f69647c693a303b6d73675f747970657c733a373a2273756363657373223b);

-- --------------------------------------------------------

--
-- Table structure for table `wl_testimonials`
--

CREATE TABLE `wl_testimonials` (
  `testimonial_id` int NOT NULL,
  `mem_id` int NOT NULL,
  `testimonial_title` varchar(150) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `poster_name` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `friendly_url` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `email` varchar(80) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `company` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `testimonial_description` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `photo` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `posted_date` datetime DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1=Actice,0=Inactive,2=Deleted,3=Draft'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `wl_testimonials`
--

INSERT INTO `wl_testimonials` (`testimonial_id`, `mem_id`, `testimonial_title`, `poster_name`, `friendly_url`, `email`, `company`, `testimonial_description`, `photo`, `posted_date`, `status`) VALUES
(1, 0, NULL, 'Roshan', '', 'roshan@weblink.com', '', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet scelerisque tortor. Maecenas dui turpis, faucibus vel iaculis at, auctor non sapien. Donec dignissim nisl id posuere pulvinar. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis facilisis sem quis elit aliquet tempus. Vivamus dapibus commodo dolor in gravida. Nunc suscipit euismod nibh a auctor.\r\nREAD LESSDate 5 May, 2025', 'user3.jpg', '2026-06-11 15:05:35', 1),
(2, 0, NULL, 'Suhani', '', 'suhani@weblink.com', '', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet scelerisque tortor. Maecenas dui turpis, faucibus vel iaculis at, auctor non sapien. Donec dignissim nisl id posuere pulvinar. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis facilisis sem quis elit aliquet tempus. Vivamus dapibus commodo dolor in gravida. Nunc suscipit euismod nibh a auctor. READ LESSDate 05 Jun, 2026', 'user2.jpg', '2026-06-12 11:44:45', 1),
(3, 0, NULL, 'Vinod Chaudhary', '', 'satyendra.weblink@gmail.com', NULL, 'I bought the Chakra Candles as a gift for myself after a stressful month at work, and they have become part of my nightly wind-down routine. The scent is subtle but not overpowering, and the candle burns evenly without any strange smoke. What really impressed me was how quickly it arrived and how well it was packaged. Sant\'i clearly cares about the little details, from the herbal ingredients to the presentation. Will definitely be ordering more scents soon.', 'user-image1.jpg', '2026-08-11 10:03:47', 1),
(4, 0, NULL, 'Satyendra', '', 'mr.satyendra7@gmail.com', '', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet scelerisque tortor. Maecenas dui turpis, faucibus vel iaculis at, auctor non sapien. Donec dignissim nisl id posuere pulvinar. Class aptent taciti sociosqu ad litora torquent per conubia nostra,Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet scelerisque tortor. Maecenas dui turpis, faucibus vel iaculis at, auctor non sapien. Donec dignissim nisl id posuere pulvinar. Class aptent taciti sociosqu ad litora torquent per conubia nostra,', 'user-image2.jpg', '2026-08-11 10:09:20', 1),
(5, 0, NULL, 'Dr Shilpa Patil', '', 'sagarpur@gmail.com', '', 'I bought the Chakra Candles as a gift for myself after a stressful month at work, and they have become part of my nightly wind-down routine. The scent is subtle but not overpowering, and the candle burns evenly without any strange smoke. What really impressed me was how quickly it arrived and how well it was packaged. Sant\'i clearly cares about the little details, from the herbal ingredients to the presentation. Will definitely be ordering more scents soon', 'test-img2.jpg', '2026-08-19 16:19:18', 1);

-- --------------------------------------------------------

--
-- Table structure for table `wl_tracker_notification`
--

CREATE TABLE `wl_tracker_notification` (
  `notify_id` int NOT NULL,
  `notify_type` varchar(35) NOT NULL,
  `member_id` int NOT NULL,
  `notify_ref_id` int NOT NULL,
  `notify_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `wl_transactions`
--

CREATE TABLE `wl_transactions` (
  `transaction_id` int NOT NULL,
  `seller_id` int NOT NULL DEFAULT '0',
  `transaction_amount` float(10,2) NOT NULL DEFAULT '0.00',
  `transaction_date` datetime DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `wl_transactions`
--

INSERT INTO `wl_transactions` (`transaction_id`, `seller_id`, `transaction_amount`, `transaction_date`) VALUES
(1, 2, 10.00, '2023-11-03 10:22:12');

-- --------------------------------------------------------

--
-- Table structure for table `wl_videos`
--

CREATE TABLE `wl_videos` (
  `video_id` int NOT NULL,
  `category_id` int NOT NULL DEFAULT '0',
  `video_title` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `video_link` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `video_image` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `sort_order` int DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `video_date_added` datetime NOT NULL,
  `video_date_updated` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `wl_videos`
--

INSERT INTO `wl_videos` (`video_id`, `category_id`, `video_title`, `video_link`, `video_image`, `sort_order`, `status`, `video_date_added`, `video_date_updated`) VALUES
(1, 2, 'VIdeo title 1', 'https://www.youtube.com/embed/NOHuPH11P-k?si=VCfaIjnbsBnmw-Kl', 'candidate_img.jpg', 1, 1, '2026-10-12 16:27:29', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `wl_webhook_details`
--

CREATE TABLE `wl_webhook_details` (
  `id` int NOT NULL,
  `ip_address` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `user_agent` varchar(255) DEFAULT NULL,
  `webhook_data` text NOT NULL,
  `receive_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `rest_logs`
--
ALTER TABLE `rest_logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_admin`
--
ALTER TABLE `tbl_admin`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `tbl_admin_allowed_sections`
--
ALTER TABLE `tbl_admin_allowed_sections`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_admin_sections`
--
ALTER TABLE `tbl_admin_sections`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wl_about_choose`
--
ALTER TABLE `wl_about_choose`
  ADD PRIMARY KEY (`choose_id`);

--
-- Indexes for table `wl_albums`
--
ALTER TABLE `wl_albums`
  ADD PRIMARY KEY (`album_id`);

--
-- Indexes for table `wl_apl_tokens`
--
ALTER TABLE `wl_apl_tokens`
  ADD PRIMARY KEY (`api_token_id`);

--
-- Indexes for table `wl_auto_respond_mails`
--
ALTER TABLE `wl_auto_respond_mails`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wl_banners`
--
ALTER TABLE `wl_banners`
  ADD PRIMARY KEY (`banner_id`);

--
-- Indexes for table `wl_categories`
--
ALTER TABLE `wl_categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `wl_cms_pages`
--
ALTER TABLE `wl_cms_pages`
  ADD PRIMARY KEY (`page_id`);

--
-- Indexes for table `wl_configuration`
--
ALTER TABLE `wl_configuration`
  ADD PRIMARY KEY (`sl`);

--
-- Indexes for table `wl_cron_tracker`
--
ALTER TABLE `wl_cron_tracker`
  ADD PRIMARY KEY (`log_id`);

--
-- Indexes for table `wl_currencies`
--
ALTER TABLE `wl_currencies`
  ADD PRIMARY KEY (`currency_id`);

--
-- Indexes for table `wl_customers`
--
ALTER TABLE `wl_customers`
  ADD PRIMARY KEY (`customers_id`);

--
-- Indexes for table `wl_enquiry`
--
ALTER TABLE `wl_enquiry`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wl_expertise`
--
ALTER TABLE `wl_expertise`
  ADD PRIMARY KEY (`expertise_id`);

--
-- Indexes for table `wl_faq`
--
ALTER TABLE `wl_faq`
  ADD PRIMARY KEY (`faq_id`);

--
-- Indexes for table `wl_gallery`
--
ALTER TABLE `wl_gallery`
  ADD PRIMARY KEY (`gallery_id`);

--
-- Indexes for table `wl_header_images`
--
ALTER TABLE `wl_header_images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wl_invite_friends`
--
ALTER TABLE `wl_invite_friends`
  ADD PRIMARY KEY (`invite_id`);

--
-- Indexes for table `wl_meta_tags`
--
ALTER TABLE `wl_meta_tags`
  ADD PRIMARY KEY (`meta_id`);

--
-- Indexes for table `wl_notification`
--
ALTER TABLE `wl_notification`
  ADD PRIMARY KEY (`notification_id`),
  ADD KEY `mem_by_type` (`mem_by_type`,`ref_type_id`,`ref_prod_type`,`ref_item_id`);

--
-- Indexes for table `wl_notification_customer`
--
ALTER TABLE `wl_notification_customer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wl_partners`
--
ALTER TABLE `wl_partners`
  ADD PRIMARY KEY (`partner_id`);

--
-- Indexes for table `wl_products`
--
ALTER TABLE `wl_products`
  ADD PRIMARY KEY (`product_id`) USING BTREE;

--
-- Indexes for table `wl_products_media`
--
ALTER TABLE `wl_products_media`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_products_images_products_id` (`product_id`) USING BTREE;

--
-- Indexes for table `wl_reset_pwd_link`
--
ALTER TABLE `wl_reset_pwd_link`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `wl_testimonials`
--
ALTER TABLE `wl_testimonials`
  ADD PRIMARY KEY (`testimonial_id`);

--
-- Indexes for table `wl_tracker_notification`
--
ALTER TABLE `wl_tracker_notification`
  ADD PRIMARY KEY (`notify_id`),
  ADD KEY `notify_type` (`notify_type`,`member_id`,`notify_ref_id`);

--
-- Indexes for table `wl_transactions`
--
ALTER TABLE `wl_transactions`
  ADD PRIMARY KEY (`transaction_id`);

--
-- Indexes for table `wl_videos`
--
ALTER TABLE `wl_videos`
  ADD PRIMARY KEY (`video_id`);

--
-- Indexes for table `wl_webhook_details`
--
ALTER TABLE `wl_webhook_details`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `rest_logs`
--
ALTER TABLE `rest_logs`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `tbl_admin`
--
ALTER TABLE `tbl_admin`
  MODIFY `admin_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_admin_allowed_sections`
--
ALTER TABLE `tbl_admin_allowed_sections`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_admin_sections`
--
ALTER TABLE `tbl_admin_sections`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `wl_about_choose`
--
ALTER TABLE `wl_about_choose`
  MODIFY `choose_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `wl_albums`
--
ALTER TABLE `wl_albums`
  MODIFY `album_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `wl_apl_tokens`
--
ALTER TABLE `wl_apl_tokens`
  MODIFY `api_token_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `wl_auto_respond_mails`
--
ALTER TABLE `wl_auto_respond_mails`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `wl_banners`
--
ALTER TABLE `wl_banners`
  MODIFY `banner_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `wl_categories`
--
ALTER TABLE `wl_categories`
  MODIFY `category_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `wl_cms_pages`
--
ALTER TABLE `wl_cms_pages`
  MODIFY `page_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `wl_configuration`
--
ALTER TABLE `wl_configuration`
  MODIFY `sl` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `wl_cron_tracker`
--
ALTER TABLE `wl_cron_tracker`
  MODIFY `log_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `wl_customers`
--
ALTER TABLE `wl_customers`
  MODIFY `customers_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `wl_enquiry`
--
ALTER TABLE `wl_enquiry`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `wl_expertise`
--
ALTER TABLE `wl_expertise`
  MODIFY `expertise_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `wl_faq`
--
ALTER TABLE `wl_faq`
  MODIFY `faq_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `wl_gallery`
--
ALTER TABLE `wl_gallery`
  MODIFY `gallery_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `wl_header_images`
--
ALTER TABLE `wl_header_images`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `wl_invite_friends`
--
ALTER TABLE `wl_invite_friends`
  MODIFY `invite_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `wl_meta_tags`
--
ALTER TABLE `wl_meta_tags`
  MODIFY `meta_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT for table `wl_notification`
--
ALTER TABLE `wl_notification`
  MODIFY `notification_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `wl_notification_customer`
--
ALTER TABLE `wl_notification_customer`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `wl_partners`
--
ALTER TABLE `wl_partners`
  MODIFY `partner_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `wl_products`
--
ALTER TABLE `wl_products`
  MODIFY `product_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `wl_products_media`
--
ALTER TABLE `wl_products_media`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `wl_reset_pwd_link`
--
ALTER TABLE `wl_reset_pwd_link`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `wl_testimonials`
--
ALTER TABLE `wl_testimonials`
  MODIFY `testimonial_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `wl_tracker_notification`
--
ALTER TABLE `wl_tracker_notification`
  MODIFY `notify_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `wl_transactions`
--
ALTER TABLE `wl_transactions`
  MODIFY `transaction_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `wl_videos`
--
ALTER TABLE `wl_videos`
  MODIFY `video_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `wl_webhook_details`
--
ALTER TABLE `wl_webhook_details`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
