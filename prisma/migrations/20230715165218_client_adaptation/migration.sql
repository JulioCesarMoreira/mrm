/*
  Warnings:

  - You are about to drop the column `phone` on the `Client` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Client` DROP COLUMN `phone`,
    ADD COLUMN `contactName` VARCHAR(191) NULL,
    ADD COLUMN `contactPhone` VARCHAR(191) NULL;
