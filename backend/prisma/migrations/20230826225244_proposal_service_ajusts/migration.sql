-- AlterTable
ALTER TABLE `ProposalService` MODIFY `sendDate` DATETIME(3) NULL,
    MODIFY `installmentsBalance` INTEGER NULL,
    MODIFY `periodValidity` DATETIME(3) NULL,
    MODIFY `discount` INTEGER NULL,
    MODIFY `percentageEntry` INTEGER NULL,
    MODIFY `guaranteePeriod` INTEGER NULL,
    MODIFY `approved` BOOLEAN NULL DEFAULT false;
