import { Module } from '@nestjs/common';
import { TenantController } from './controllers';
import { CreateTenantUseCase } from '@application/use-cases/tenant';
import { DatabaseModule } from '@infra/service/database/database.module';
import { ClientController } from './controllers/client.controller';
import {
  CreateClientUseCase,
  GetClientUseCase,
} from '@application/use-cases/client';

@Module({
  imports: [DatabaseModule],
  controllers: [TenantController, ClientController],
  providers: [CreateTenantUseCase, CreateClientUseCase, GetClientUseCase],
})
export class HttpModule {}
