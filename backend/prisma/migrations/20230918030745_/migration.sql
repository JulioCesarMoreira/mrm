-- DropForeignKey
ALTER TABLE `Well` DROP FOREIGN KEY `Well_cityId_fkey`;

-- AlterTable
ALTER TABLE `Well` ADD COLUMN `startDate` DATETIME(3) NULL,
    MODIFY `cityId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Well` ADD CONSTRAINT `Well_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
