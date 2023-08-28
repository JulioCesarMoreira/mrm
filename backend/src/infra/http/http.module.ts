import { Module } from '@nestjs/common';
import {
  ClientController,
  CategoryServiceController,
  ProposalServiceController,
  ItemServiceController,
  DetectionController,
  WellController,
} from './controllers';
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
  FetchCategoryServiceUseCase,
  GetCategoryServiceUseCase,
  UpdateCategoryServiceUseCase,
} from '@application/use-cases/categoryService';
import {
  CreateItemServiceUseCase,
  DeleteItemServiceUseCase,
  FetchItemServiceUseCase,
  GetItemServiceUseCase,
  UpdateItemServiceUseCase,
} from '@application/use-cases/itemService';
import {
  CreateProposalServiceUseCase,
  DeleteProposalServiceUseCase,
  FetchProposalServiceUseCase,
  GetProposalServiceUseCase,
  UpdateProposalServiceUseCase,
} from '@application/use-cases/proposalService';
import {
  CreateDetectionUseCase,
  DeleteDetectionUseCase,
  FetchDetectionUseCase,
  GetDetectionUseCase,
  UpdateDetectionUseCase,
} from '@application/use-cases/detection';
import {
  CreateWellUseCase,
  DeleteWellUseCase,
  FetchWellUseCase,
  GetWellUseCase,
  UpdateWellUseCase,
} from '@application/use-cases/well';
import {
  CreateItemProposalServiceUseCase,
  DeleteItemProposalServiceUseCase,
  FetchItemProposalServiceUseCase,
  GetItemProposalServiceUseCase,
  UpdateItemProposalServiceUseCase,
} from '@application/use-cases/itemProposalService';
import { ItemProposalServiceController } from './controllers/itemProposalService.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [
    ItemServiceController,
    ClientController,
    CategoryServiceController,
    ProposalServiceController,
    DetectionController,
    WellController,
    ItemProposalServiceController,
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
    FetchCategoryServiceUseCase,
    UpdateCategoryServiceUseCase,
    DeleteCategoryServiceUseCase,

    CreateItemServiceUseCase,
    GetItemServiceUseCase,
    FetchItemServiceUseCase,
    UpdateItemServiceUseCase,
    DeleteItemServiceUseCase,

    CreateProposalServiceUseCase,
    GetProposalServiceUseCase,
    FetchProposalServiceUseCase,
    UpdateProposalServiceUseCase,
    DeleteProposalServiceUseCase,

    CreateDetectionUseCase,
    GetDetectionUseCase,
    FetchDetectionUseCase,
    UpdateDetectionUseCase,
    DeleteDetectionUseCase,

    CreateWellUseCase,
    GetWellUseCase,
    FetchWellUseCase,
    UpdateWellUseCase,
    DeleteWellUseCase,

    CreateItemProposalServiceUseCase,
    GetItemProposalServiceUseCase,
    FetchItemProposalServiceUseCase,
    UpdateItemProposalServiceUseCase,
    DeleteItemProposalServiceUseCase,
  ],
})
export class HttpModule {}
