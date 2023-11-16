-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(200) NOT NULL,
    `cognitoId` VARCHAR(191) NOT NULL,
    `tenantId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_cognitoId_key`(`cognitoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tenant` (
    `id` VARCHAR(191) NOT NULL,
    `cognitoId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Tenant_cognitoId_key`(`cognitoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Client` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL,
    `contactName` VARCHAR(100) NULL,
    `contactPhone` VARCHAR(11) NULL,
    `cpfCnpj` VARCHAR(14) NOT NULL,
    `tenantId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Client_cpfCnpj_key`(`cpfCnpj`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Proposal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sendDate` DATETIME(3) NULL,
    `installmentsBalance` INTEGER NULL,
    `periodValidity` DATETIME(3) NULL,
    `discount` INTEGER NULL,
    `percentageEntry` INTEGER NULL,
    `guaranteePeriod` INTEGER NULL,
    `approved` BOOLEAN NULL DEFAULT false,
    `clientId` INTEGER NOT NULL,
    `tenantId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CategoryService` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `subCategory` ENUM('SUPLIE', 'SERVICE') NOT NULL,
    `color` VARCHAR(7) NOT NULL,
    `tenantId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `CategoryService_name_key`(`name`),
    UNIQUE INDEX `CategoryService_color_tenantId_key`(`color`, `tenantId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ItemService` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `description` VARCHAR(400) NULL,
    `unit` VARCHAR(3) NOT NULL,
    `status` ENUM('AVAILABLE', 'UNAVAILABLE') NOT NULL,
    `categoryServiceId` INTEGER NOT NULL,

    UNIQUE INDEX `ItemService_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ItemProposal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `unitPrice` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `proposalServiceId` INTEGER NOT NULL,
    `itemServiceId` INTEGER NOT NULL,
    `proposalId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProposalService` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `order` INTEGER NOT NULL,
    `side` ENUM('LEFT', 'RIGHT') NOT NULL,
    `proposalId` INTEGER NOT NULL,
    `categoryServiceId` INTEGER NOT NULL,

    UNIQUE INDEX `ProposalService_side_order_proposalId_key`(`side`, `order`, `proposalId`),
    UNIQUE INDEX `ProposalService_categoryServiceId_proposalId_key`(`categoryServiceId`, `proposalId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ModelProposal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `tenantId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ModelProposal_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ModelItemCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `modelProposalId` INTEGER NOT NULL,
    `itemServiceId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Detection` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `accuracy` INTEGER NOT NULL,
    `salinity` INTEGER NOT NULL,
    `maximumDepth` INTEGER NOT NULL,
    `minimumDepth` INTEGER NOT NULL,
    `proposalId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Well` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `voltage` ENUM('V110', 'V220') NULL,
    `totalDepth` INTEGER NULL,
    `sieveDepth` INTEGER NULL,
    `staticLevel` INTEGER NULL,
    `dynamicLevel` INTEGER NULL,
    `startDate` DATETIME(3) NULL,
    `deliveryDate` DATETIME(3) NULL,
    `sedimentaryDepth` INTEGER NULL,
    `distric` VARCHAR(100) NULL,
    `zipcode` VARCHAR(8) NULL,
    `street` VARCHAR(200) NULL,
    `number` VARCHAR(10) NULL,
    `longitude` VARCHAR(20) NULL,
    `latitude` VARCHAR(20) NULL,
    `mapLink` VARCHAR(2000) NULL,
    `cityId` INTEGER NULL,
    `proposalId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `City` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `state` ENUM('PR', 'SC', 'SP') NOT NULL,
    `name` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `City_name_state_key`(`name`, `state`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `Tenant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Client` ADD CONSTRAINT `Client_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `Tenant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Proposal` ADD CONSTRAINT `Proposal_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Proposal` ADD CONSTRAINT `Proposal_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `Tenant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CategoryService` ADD CONSTRAINT `CategoryService_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `Tenant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemService` ADD CONSTRAINT `ItemService_categoryServiceId_fkey` FOREIGN KEY (`categoryServiceId`) REFERENCES `CategoryService`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemProposal` ADD CONSTRAINT `ItemProposal_proposalServiceId_fkey` FOREIGN KEY (`proposalServiceId`) REFERENCES `ProposalService`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemProposal` ADD CONSTRAINT `ItemProposal_itemServiceId_fkey` FOREIGN KEY (`itemServiceId`) REFERENCES `ItemService`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemProposal` ADD CONSTRAINT `ItemProposal_proposalId_fkey` FOREIGN KEY (`proposalId`) REFERENCES `Proposal`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProposalService` ADD CONSTRAINT `ProposalService_proposalId_fkey` FOREIGN KEY (`proposalId`) REFERENCES `Proposal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProposalService` ADD CONSTRAINT `ProposalService_categoryServiceId_fkey` FOREIGN KEY (`categoryServiceId`) REFERENCES `CategoryService`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ModelProposal` ADD CONSTRAINT `ModelProposal_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `Tenant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ModelItemCategory` ADD CONSTRAINT `ModelItemCategory_modelProposalId_fkey` FOREIGN KEY (`modelProposalId`) REFERENCES `ModelProposal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ModelItemCategory` ADD CONSTRAINT `ModelItemCategory_itemServiceId_fkey` FOREIGN KEY (`itemServiceId`) REFERENCES `ItemService`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Detection` ADD CONSTRAINT `Detection_proposalId_fkey` FOREIGN KEY (`proposalId`) REFERENCES `Proposal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Well` ADD CONSTRAINT `Well_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Well` ADD CONSTRAINT `Well_proposalId_fkey` FOREIGN KEY (`proposalId`) REFERENCES `Proposal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
