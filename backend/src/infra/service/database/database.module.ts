import { Module } from '@nestjs/common';
import {
  ICategoryServiceRepository,
  IClientRepository,
  ITenantRepository,
} from '@application/core/repositories';
import { PrismaDataService } from './prisma/prisma-database.service';
import { PrismaTenantRepository } from './prisma/repositories/prisma-tenant.repository';
import { PrismaClientRepository } from './prisma/repositories/prisma-client.repository';
import { PrismaCategoryServiceRepository } from './prisma/repositories/prisma-categoryService.repository';

@Module({
  imports: [],
  providers: [
    PrismaDataService,
    {
      provide: ITenantRepository,
      useClass: PrismaTenantRepository,
    },
    {
      provide: IClientRepository,
      useClass: PrismaClientRepository,
    },
    {
      provide: ICategoryServiceRepository,
      useClass: PrismaCategoryServiceRepository,
    },
  ],
  exports: [
    {
      provide: ITenantRepository,
      useClass: PrismaTenantRepository,
    },
    {
      provide: IClientRepository,
      useClass: PrismaClientRepository,
    },
    {
      provide: ICategoryServiceRepository,
      useClass: PrismaCategoryServiceRepository,
    },
  ],
})
export class DatabaseModule {}
