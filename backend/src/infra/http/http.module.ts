import { Module } from '@nestjs/common';
import { ClientController, CategoryServiceController } from './controllers';
import { GetTenantUseCase } from '@application/use-cases/tenant';
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
import { ItemServiceController } from './controllers/itemService.controller';
import {
  CreateItemServiceUseCase,
  DeleteItemServiceUseCase,
  FetchItemServiceeUseCase,
  GetItemServiceUseCase,
  UpdateItemServiceUseCase,
} from '@application/use-cases/itemService';

@Module({
  imports: [DatabaseModule],
  controllers: [
    ItemServiceController,
    ClientController,
    CategoryServiceController,
  ],
  providers: [
    GetTenantUseCase,

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

    CreateItemServiceUseCase,
    GetItemServiceUseCase,
    FetchItemServiceeUseCase,
    UpdateItemServiceUseCase,
    DeleteItemServiceUseCase,
  ],
})
export class HttpModule {}
