ALTER TABLE `leads` MODIFY COLUMN `status` enum('partial','submitted','matched','no_match','contacted','sold') NOT NULL DEFAULT 'partial';--> statement-breakpoint
ALTER TABLE `leads` ADD `leadSoldAt` timestamp;--> statement-breakpoint
ALTER TABLE `leads` ADD `saleValue` decimal(8,2);--> statement-breakpoint
ALTER TABLE `leads` ADD `soldToLenderId` int;--> statement-breakpoint
ALTER TABLE `leads` ADD `webhookToken` varchar(64);