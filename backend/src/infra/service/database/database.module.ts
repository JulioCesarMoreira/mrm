import { Module } from '@nestjs/common';
import {
  IClientRepository,
  ITenantRepository,
} from '@application/core/repositories';
import { PrismaDataService } from './prisma/prisma-database.service';
import { PrismaTenantRepository } from './prisma/repositories/prisma-tenant.repository';
import { PrismaClientRepository } from './prisma/repositories/prisma-client.repository';

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
  ],
})
export class DatabaseModule {}
