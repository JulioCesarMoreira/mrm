import { Module } from '@nestjs/common';
import {
  CategoryServiceRepository,
  CityRepository,
  ClientRepository,
  DetectionRepository,
  ItemProposalRepository,
  ItemServiceRepository,
  ModelItemCategoryRepository,
  ModelProposalRepository,
  ProposalRepository,
  ProposalServiceRepository,
  TenantRepository,
  WellRepository,
} from '@application/core/repositories/database';
import { PrismaDataService } from './prisma/prisma-database.service';
import { PrismaTenantRepository } from './prisma/repositories/prisma-tenant.repository';
import { PrismaClientRepository } from './prisma/repositories/prisma-client.repository';
import { PrismaCategoryServiceRepository } from './prisma/repositories/prisma-categoryService.repository';
import { PrismaItemServiceRepository } from './prisma/repositories/prisma-itemService.repository';
import { PrismaProposalRepository } from './prisma/repositories/prisma-proposal.repository';
import { PrismaDetectionRepository } from './prisma/repositories/prisma-detection.repository';
import { PrismaWellRepository } from './prisma/repositories/prisma-well.repository';
import { PrismaItemProposalRepository } from './prisma/repositories/prisma-itemProposal.repository';
import { PrismaModelProposalRepository } from './prisma/repositories/prisma-modelProposal.repository';
import { PrismaModelItemCategoryRepository } from './prisma/repositories/prisma-modelItemCategory.repository';
import { PrismaCityRepository } from './prisma/repositories/prisma-city.repository';
import { PrismaProposalServiceRepository } from './prisma/repositories/prisma-proposalService.repository';

@Module({
  imports: [],
  providers: [
    PrismaDataService,
    {
      provide: TenantRepository,
      useClass: PrismaTenantRepository,
    },
    {
      provide: ClientRepository,
      useClass: PrismaClientRepository,
    },
    {
      provide: CategoryServiceRepository,
      useClass: PrismaCategoryServiceRepository,
    },
    {
      provide: ItemServiceRepository,
      useClass: PrismaItemServiceRepository,
    },
    {
      provide: ProposalRepository,
      useClass: PrismaProposalRepository,
    },
    {
      provide: DetectionRepository,
      useClass: PrismaDetectionRepository,
    },
    {
      provide: WellRepository,
      useClass: PrismaWellRepository,
    },
    {
      provide: ItemProposalRepository,
      useClass: PrismaItemProposalRepository,
    },
    {
      provide: ModelProposalRepository,
      useClass: PrismaModelProposalRepository,
    },
    {
      provide: ModelItemCategoryRepository,
      useClass: PrismaModelItemCategoryRepository,
    },
    {
      provide: CityRepository,
      useClass: PrismaCityRepository,
    },
    {
      provide: ProposalServiceRepository,
      useClass: PrismaProposalServiceRepository,
    },
  ],
  exports: [
    {
      provide: TenantRepository,
      useClass: PrismaTenantRepository,
    },
    {
      provide: ClientRepository,
      useClass: PrismaClientRepository,
    },
    {
      provide: CategoryServiceRepository,
      useClass: PrismaCategoryServiceRepository,
    },
    {
      provide: ItemServiceRepository,
      useClass: PrismaItemServiceRepository,
    },
    {
      provide: ProposalRepository,
      useClass: PrismaProposalRepository,
    },
    {
      provide: DetectionRepository,
      useClass: PrismaDetectionRepository,
    },
    {
      provide: WellRepository,
      useClass: PrismaWellRepository,
    },
    {
      provide: ItemProposalRepository,
      useClass: PrismaItemProposalRepository,
    },
    {
      provide: ModelProposalRepository,
      useClass: PrismaModelProposalRepository,
    },
    {
      provide: ModelItemCategoryRepository,
      useClass: PrismaModelItemCategoryRepository,
    },
    {
      provide: CityRepository,
      useClass: PrismaCityRepository,
    },
    {
      provide: ProposalServiceRepository,
      useClass: PrismaProposalServiceRepository,
    },
  ],
})
export class DatabaseModule {}
