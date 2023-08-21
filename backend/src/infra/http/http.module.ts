import { Module } from '@nestjs/common';
import {
  TenantController,
  ClientController,
  CategoryServiceController,
} from './controllers';
import { CreateTenantUseCase } from '@application/use-cases/tenant';
import { DatabaseModule } from '@infra/service/database/database.module';
import {
  CreateClientUseCase,
  GetClientUseCase,
  FetchClienteUseCase,
  DeleteClientUseCase,
} from '@application/use-cases/client';
import { UpdateClientUseCase } from '@application/use-cases/client/update-client.use-case';
import {
  CreateCategoryServiceUseCase,
  DeleteCategoryServiceUseCase,
  FetchCategoryServiceeUseCase,
  GetCategoryServiceUseCase,
  UpdateCategoryServiceUseCase,
} from '@application/use-cases/categoryService';

@Module({
  imports: [DatabaseModule],
  controllers: [TenantController, ClientController, CategoryServiceController],
  providers: [
    CreateTenantUseCase,

    CreateClientUseCase,
    GetClientUseCase,
    FetchClienteUseCase,
    UpdateClientUseCase,
    DeleteClientUseCase,

    CreateCategoryServiceUseCase,
    GetCategoryServiceUseCase,
    FetchCategoryServiceeUseCase,
    UpdateCategoryServiceUseCase,
    DeleteCategoryServiceUseCase,
  ],
})
export class HttpModule {}
