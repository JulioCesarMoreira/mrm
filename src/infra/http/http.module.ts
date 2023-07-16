import { Module } from '@nestjs/common';
import { TenantController } from './controllers';
import { CreateTenantUseCase } from '@application/use-cases/tenant';
import { DatabaseModule } from '@infra/service/database/database.module';
import { ClientController } from './controllers/client.controller';
import {
  CreateClientUseCase,
  GetClientUseCase,
} from '@application/use-cases/client';
import { FetchClienteUseCase } from '@application/use-cases/client/fetch-client.use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [TenantController, ClientController],
  providers: [
    CreateTenantUseCase,
    CreateClientUseCase,
    GetClientUseCase,
    FetchClienteUseCase,
  ],
})
export class HttpModule {}
