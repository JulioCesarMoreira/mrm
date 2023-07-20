CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `cognitoId` VARCHAR(191) NOT NULL,
    `tenantId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_cognitoId_key`(`cognitoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `Tenant` (
    `id` VARCHAR(191) NOT NULL,
    `cognitoId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Tenant_cognitoId_key`(`cognitoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `CategoryAttachment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `Client` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `cpfCnpj` VARCHAR(191) NOT NULL,
    `tenantId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `ProposalService` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sendDate` DATETIME(3) NOT NULL,
    `installmentsBalance` INTEGER NOT NULL,
    `periodValidity` DATETIME(3) NOT NULL,
    `discount` INTEGER NOT NULL,
    `percentageEntry` INTEGER NOT NULL,
    `guaranteePeriod` INTEGER NOT NULL,
    `approved` BOOLEAN NOT NULL,
    `clientId` INTEGER NOT NULL,
    `tenantId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `CategoryService` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `subCategory` ENUM('SUPLIE', 'SERVICE') NOT NULL,
    `tenantId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `ItemService` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `unit` VARCHAR(191) NOT NULL,
    `categoryServiceId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `ItemProposalService` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `unitPrice` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `proposalServiceId` INTEGER NOT NULL,
    `itemServiceId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `ModelProposal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `tenantId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `modelProposalItemService` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `modelProposalId` INTEGER NOT NULL,
    `itemServiceId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `Detection` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `accuracy` INTEGER NOT NULL,
    `sality` INTEGER NOT NULL,
    `maximumDepth` INTEGER NOT NULL,
    `minimumDepth` INTEGER NOT NULL,
    `proposalServiceId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `Well` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `voltage` INTEGER NOT NULL,
    `totalDepth` INTEGER NOT NULL,
    `sieveDepth` INTEGER NOT NULL,
    `staticLevel` INTEGER NOT NULL,
    `dynamicLevel` INTEGER NOT NULL,
    `deliveryDate` DATETIME(3) NOT NULL,
    `sedimentaryDepth` INTEGER NOT NULL,
    `price` INTEGER NOT NULL,
    `distric` VARCHAR(191) NOT NULL,
    `cep` VARCHAR(191) NOT NULL,
    `street` VARCHAR(191) NOT NULL,
    `number` VARCHAR(191) NOT NULL,
    `longitude` VARCHAR(191) NOT NULL,
    `latitude` VARCHAR(191) NOT NULL,
    `mapLink` VARCHAR(191) NOT NULL,
    `uf` ENUM('PR', 'SP') NOT NULL,
    `cityId` INTEGER NOT NULL,
    `proposalServiceId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `Attachment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `categoryAttachmentId` INTEGER NOT NULL,
    `detectionId` INTEGER NOT NULL,
    `wellId` INTEGER NOT NULL,
    `proposalServiceId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `City` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uf` ENUM('PR', 'SP') NOT NULL,
    `nome` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `User` ADD CONSTRAINT `User_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `Tenant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `Client` ADD CONSTRAINT `Client_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `Tenant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `ProposalService` ADD CONSTRAINT `ProposalService_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `ProposalService` ADD CONSTRAINT `ProposalService_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `Tenant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `CategoryService` ADD CONSTRAINT `CategoryService_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `Tenant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `ItemService` ADD CONSTRAINT `ItemService_categoryServiceId_fkey` FOREIGN KEY (`categoryServiceId`) REFERENCES `CategoryService`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `ItemProposalService` ADD CONSTRAINT `ItemProposalService_proposalServiceId_fkey` FOREIGN KEY (`proposalServiceId`) REFERENCES `ProposalService`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `ItemProposalService` ADD CONSTRAINT `ItemProposalService_itemServiceId_fkey` FOREIGN KEY (`itemServiceId`) REFERENCES `ItemService`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `ModelProposal` ADD CONSTRAINT `ModelProposal_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `Tenant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `modelProposalItemService` ADD CONSTRAINT `modelProposalItemService_modelProposalId_fkey` FOREIGN KEY (`modelProposalId`) REFERENCES `ModelProposal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `modelProposalItemService` ADD CONSTRAINT `modelProposalItemService_itemServiceId_fkey` FOREIGN KEY (`itemServiceId`) REFERENCES `ItemService`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `Detection` ADD CONSTRAINT `Detection_proposalServiceId_fkey` FOREIGN KEY (`proposalServiceId`) REFERENCES `ProposalService`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `Well` ADD CONSTRAINT `Well_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `Well` ADD CONSTRAINT `Well_proposalServiceId_fkey` FOREIGN KEY (`proposalServiceId`) REFERENCES `ProposalService`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `Attachment` ADD CONSTRAINT `Attachment_categoryAttachmentId_fkey` FOREIGN KEY (`categoryAttachmentId`) REFERENCES `CategoryAttachment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `Attachment` ADD CONSTRAINT `Attachment_detectionId_fkey` FOREIGN KEY (`detectionId`) REFERENCES `Detection`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `Attachment` ADD CONSTRAINT `Attachment_wellId_fkey` FOREIGN KEY (`wellId`) REFERENCES `Well`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `Attachment` ADD CONSTRAINT `Attachment_proposalServiceId_fkey` FOREIGN KEY (`proposalServiceId`) REFERENCES `ProposalService`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
