/*
  Warnings:

  - Added the required column `status` to the `ItemService` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ItemService` ADD COLUMN `status` ENUM('AVAILABLE', 'UNAVAILABLE') NOT NULL;
