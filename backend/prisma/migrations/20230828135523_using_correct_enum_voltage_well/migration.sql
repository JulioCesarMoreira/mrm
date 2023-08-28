/*
  Warnings:

  - You are about to alter the column `voltage` on the `Well` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Enum(EnumId(2))`.

*/
-- AlterTable
ALTER TABLE `Well` MODIFY `voltage` ENUM('V110', 'V220') NULL;
