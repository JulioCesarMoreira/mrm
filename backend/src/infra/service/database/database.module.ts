import { Module } from '@nestjs/common';
import {
  CategoryServiceRepository,
  ClientRepository,
  ItemServiceRepository,
  ProposalServiceRepository,
  TenantRepository,
} from '@application/core/repositories';
import { PrismaDataService } from './prisma/prisma-database.service';
import { PrismaTenantRepository } from './prisma/repositories/prisma-tenant.repository';
import { PrismaClientRepository } from './prisma/repositories/prisma-client.repository';
import { PrismaCategoryServiceRepository } from './prisma/repositories/prisma-categoryService.repository';
import { PrismaItemServiceRepository } from './prisma/repositories/prisma-itemService.repository';
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
      provide: ProposalServiceRepository,
      useClass: PrismaProposalServiceRepository,
    },
  ],
})
export class DatabaseModule {}
