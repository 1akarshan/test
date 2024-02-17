CREATE TABLE `employees` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	`job_title` varchar(256) NOT NULL,
	`years_with_company` float NOT NULL,
	`department` varchar(256) NOT NULL,
	`salary` double NOT NULL,
	CONSTRAINT `employees_id` PRIMARY KEY(`id`)
);
