-- CreateTable
CREATE TABLE `users` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `phone_number` VARCHAR(15) NOT NULL,
    `email_id` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `company_name` VARCHAR(150) NULL,
    `office_type` VARCHAR(50) NOT NULL,
    `branch` VARCHAR(100) NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `phone_number`(`phone_number`),
    UNIQUE INDEX `email_id`(`email_id`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

