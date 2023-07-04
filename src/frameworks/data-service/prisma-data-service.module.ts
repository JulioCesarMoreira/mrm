import { Module } from '@nestjs/common';
import { IDataServices } from '../../core/abstracts';
import { PrismaDataService } from './prisma/prisma-data-service.service';

@Module({
  imports: [],
  providers: [
    {
      provide: IDataServices,
      useClass: PrismaDataService,
    },
  ],
  exports: [IDataServices],
})
export class PrismaDataServicesModule {}
