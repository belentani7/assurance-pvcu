ALTER TABLE `validation_ledger` ADD `operation` varchar(120);--> statement-breakpoint
ALTER TABLE `validation_ledger` ADD `projectId` varchar(120);--> statement-breakpoint
ALTER TABLE `validation_ledger` ADD `actor` varchar(120);--> statement-breakpoint
ALTER TABLE `validation_ledger` ADD `agent` varchar(120);--> statement-breakpoint
ALTER TABLE `validation_ledger` ADD `provider` varchar(120);--> statement-breakpoint
ALTER TABLE `validation_ledger` ADD `model` varchar(120);--> statement-breakpoint
ALTER TABLE `validation_ledger` ADD `inputHash` varchar(128);--> statement-breakpoint
ALTER TABLE `validation_ledger` ADD `policyVersion` varchar(64);--> statement-breakpoint
ALTER TABLE `validation_ledger` ADD `validationProfile` varchar(120);--> statement-breakpoint
ALTER TABLE `validation_ledger` ADD `risk` enum('low','medium','high','critical') DEFAULT 'low';--> statement-breakpoint
ALTER TABLE `validation_ledger` ADD `permissions` json;--> statement-breakpoint
ALTER TABLE `validation_ledger` ADD `validationResults` json;--> statement-breakpoint
ALTER TABLE `validation_ledger` ADD `result` varchar(64);