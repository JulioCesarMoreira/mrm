import { Module } from '@nestjs/common';
import { TenantController } from './controllers';
import { CreateTenantUseCase } from '@application/use-cases/tenant';
import { DatabaseModule } from '@infra/service/database/database.module';
import { ClientController } from './controllers/client.controller';
import {
  CreateClientUseCase,
  GetClientUseCase,
  FetchClienteUseCase,
} from '@application/use-cases/client';
import { UpdateClientUseCase } from '@application/use-cases/client/update-client.use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [TenantController, ClientController],
  providers: [
    CreateTenantUseCase,
    CreateClientUseCase,
    GetClientUseCase,
    FetchClienteUseCase,
    UpdateClientUseCase,
  ],
})
export class HttpModule {}
