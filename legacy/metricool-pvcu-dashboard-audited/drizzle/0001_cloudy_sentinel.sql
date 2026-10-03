CREATE TABLE `analytics_snapshots` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`network` varchar(64) NOT NULL,
	`capturedAt` timestamp NOT NULL DEFAULT (now()),
	`reach` int NOT NULL DEFAULT 0,
	`impressions` int NOT NULL DEFAULT 0,
	`engagementRate` decimal(6,2) NOT NULL DEFAULT '0',
	`payload` json,
	CONSTRAINT `analytics_snapshots_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pipeline_runs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`pipeline` enum('login','planner','analytics') NOT NULL,
	`status` enum('OK','ERR','SKIP') NOT NULL DEFAULT 'SKIP',
	`durationMs` int,
	`steps` json,
	`errorMessage` text,
	`startedAt` timestamp NOT NULL DEFAULT (now()),
	`finishedAt` timestamp,
	CONSTRAINT `pipeline_runs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `publications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`title` varchar(255),
	`body` text NOT NULL,
	`hashtags` json,
	`networks` json,
	`status` enum('draft','review','scheduled','published','error') NOT NULL DEFAULT 'draft',
	`scheduledAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `publications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `validation_ledger` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`profileId` int,
	`sphere` varchar(64) NOT NULL,
	`errorCode` varchar(64),
	`message` text NOT NULL,
	`status` enum('OK','ERR','SKIP') NOT NULL DEFAULT 'OK',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `validation_ledger_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `validation_profiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`activeSpheres` json,
	`policies` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `validation_profiles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `workspace_settings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`metricoolEmail` varchar(320),
	`metricoolPassword` text,
	`headless` boolean NOT NULL DEFAULT true,
	`timeoutMs` int NOT NULL DEFAULT 30000,
	`retries` int NOT NULL DEFAULT 2,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `workspace_settings_id` PRIMARY KEY(`id`)
);
