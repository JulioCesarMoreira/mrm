import { Module } from '@nestjs/common';

import { PrismaDataServicesModule } from 'src/frameworks/data-service/prisma-data-service.module';
@Module({
  imports: [PrismaDataServicesModule],
  exports: [PrismaDataServicesModule],
})
export class DataServicesModule {}
