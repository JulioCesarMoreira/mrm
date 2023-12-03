/*
  Warnings:

  - A unique constraint covering the columns `[name,tenantId]` on the table `CategoryService` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `CategoryService_color_tenantId_key` ON `CategoryService`;

-- CreateIndex
CREATE UNIQUE INDEX `CategoryService_name_tenantId_key` ON `CategoryService`(`name`, `tenantId`);
