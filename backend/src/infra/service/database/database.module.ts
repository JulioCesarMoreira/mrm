import { Module } from '@nestjs/common';
import {
  CategoryServiceRepository,
  ClientRepository,
  DetectionRepository,
  ItemProposalServiceRepository,
  ItemServiceRepository,
  ProposalServiceRepository,
  TenantRepository,
  WellRepository,
} from '@application/core/repositories';
import { PrismaDataService } from './prisma/prisma-database.service';
import { PrismaTenantRepository } from './prisma/repositories/prisma-tenant.repository';
import { PrismaClientRepository } from './prisma/repositories/prisma-client.repository';
import { PrismaCategoryServiceRepository } from './prisma/repositories/prisma-categoryService.repository';
import { PrismaItemServiceRepository } from './prisma/repositories/prisma-itemService.repository';
import { PrismaProposalServiceRepository } from './prisma/repositories/prisma-proposalService.repository';
import { PrismaDetectionRepository } from './prisma/repositories/prisma-detection.repository';
import { PrismaWellRepository } from './prisma/repositories/prisma-well.repository';
import { PrismaItemProposalServiceRepository } from './prisma/repositories/prisma-itemProposalService.repository';

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
      provide: ProposalServiceRepository,
      useClass: PrismaProposalServiceRepository,
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
      provide: ItemProposalServiceRepository,
      useClass: PrismaItemProposalServiceRepository,
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
      provide: ProposalServiceRepository,
      useClass: PrismaProposalServiceRepository,
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
      provide: ItemProposalServiceRepository,
      useClass: PrismaItemProposalServiceRepository,
    },
  ],
})
export class DatabaseModule {}
