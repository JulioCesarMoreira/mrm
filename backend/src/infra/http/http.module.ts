import { Module } from '@nestjs/common';
import {
  ClientController,
  CategoryServiceController,
  ProposalController,
  ItemServiceController,
  DetectionController,
  WellController,
  ModelProposalController,
  ModelItemCategoryController,
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
  CreateProposalUseCase,
  DeleteProposalUseCase,
  FetchProposalUseCase,
  GetProposalUseCase,
  UpdateProposalUseCase,
} from '@application/use-cases/proposal';
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
  CreateItemProposalUseCase,
  DeleteItemProposalUseCase,
  FetchItemProposalUseCase,
  GetItemProposalUseCase,
  UpdateItemProposalUseCase,
} from '@application/use-cases/itemProposal';
import { ItemProposalController } from './controllers/itemProposal.controller';
import {
  CreateModelProposalUseCase,
  DeleteModelProposalUseCase,
  FetchModelProposalUseCase,
  GetModelProposalUseCase,
  UpdateModelProposalUseCase,
} from '@application/use-cases/modelProposal';
import {
  CreateModelItemCategoryUseCase,
  DeleteModelItemCategoryUseCase,
  FetchModelItemCategoryUseCase,
  GetModelItemCategoryUseCase,
} from '@application/use-cases/modelItemCategory';
import {
  CreateProposalServiceUseCase,
  DeleteProposalServiceUseCase,
  FetchProposalServiceUseCase,
  GetProposalServiceUseCase,
  UpdateProposalServiceUseCase,
} from '@application/use-cases/proposalService';
import { ProposalServiceController } from './controllers/proposalService.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [
    ItemServiceController,
    ClientController,
    CategoryServiceController,
    ProposalController,
    DetectionController,
    WellController,
    ItemProposalController,
    ModelProposalController,
    ModelItemCategoryController,
    ProposalServiceController,
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

    CreateProposalUseCase,
    GetProposalUseCase,
    FetchProposalUseCase,
    UpdateProposalUseCase,
    DeleteProposalUseCase,

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

    CreateItemProposalUseCase,
    GetItemProposalUseCase,
    FetchItemProposalUseCase,
    UpdateItemProposalUseCase,
    DeleteItemProposalUseCase,

    CreateModelProposalUseCase,
    GetModelProposalUseCase,
    FetchModelProposalUseCase,
    UpdateModelProposalUseCase,
    DeleteModelProposalUseCase,

    CreateModelItemCategoryUseCase,
    DeleteModelItemCategoryUseCase,
    FetchModelItemCategoryUseCase,
    GetModelItemCategoryUseCase,

    CreateProposalServiceUseCase,
    UpdateProposalServiceUseCase,
    DeleteProposalServiceUseCase,
    FetchProposalServiceUseCase,
    GetProposalServiceUseCase,
  ],
})
export class HttpModule {}
