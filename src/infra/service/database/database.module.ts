import { Module } from '@nestjs/common';
import { ITenantRepository } from '@application/core/repositories';
import { PrismaDataService } from './prisma/prisma-data-service.service';
import { PrismaTenantRepository } from './prisma/repositories/prisma-tenant-repository';

@Module({
  imports: [],
  providers: [
    PrismaDataService,
    {
      provide: ITenantRepository,
      useClass: PrismaTenantRepository,
    },
  ],
  exports: [
    {
      provide: ITenantRepository,
      useClass: PrismaTenantRepository,
    },
  ],
})
export class DatabaseModule {}
