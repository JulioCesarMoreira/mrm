import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  CreateProposalDto,
  CreateProposalResponseDto,
  FetchProposalsDto,
  FetchProposalsResponseDto,
  GetProposalIdDto,
  GetProposalResponseDto,
  UpdateProposalDto,
  UpdateProposalResponseDto,
  DeleteProposalResponseDto,
  FetchItemServicesToProposalResponseDto,
} from '@infra/http/dtos/proposal';
import { ProposalMapper } from '@infra/http/mappers/proposal.mapper';
import {
  CreateProposalUseCase,
  GetProposalUseCase,
  FetchProposalUseCase,
  UpdateProposalUseCase,
  DeleteProposalUseCase,
} from '@application/use-cases/proposal';
import { ErrorResponseDto } from '@infra/http/dtos/error/error-response.dto';
import { FetchItemServiceToProposalUseCase } from '@application/use-cases/itemService/fetchToProposal-itemService.use-case';
import { ItemServiceMapper } from '../mappers/itemService.mapper';
import {
  RequestTenantDataInterface,
  RequestTentantData,
} from 'src/infra/guard/tenantData.decorator';

@Controller('/proposal')
export class ProposalController {
  constructor(
    private createProposalUseCase: CreateProposalUseCase,
    private getProposalUsecase: GetProposalUseCase,
    private fetchProposalsUseCase: FetchProposalUseCase,
    private updateProposalUseCase: UpdateProposalUseCase,
    private deleteProposalUseCase: DeleteProposalUseCase,
    private itemsServiceFetchUseCase: FetchItemServiceToProposalUseCase,
  ) {}

  @Post()
  async createProposal(
    @Body() proposalDto: CreateProposalDto,
    @RequestTentantData() tenantData: RequestTenantDataInterface,
  ): Promise<CreateProposalResponseDto | ErrorResponseDto> {
    try {
      const tenantId = tenantData.id;
      const createdProposal = await this.createProposalUseCase.createProposal({
        ...proposalDto,
        tenantId,
      });

      return createdProposal;
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Get('get/:id')
  async getProposal(
    @Param() parameters: GetProposalIdDto,
    @RequestTentantData() tenantData: RequestTenantDataInterface,
  ): Promise<GetProposalResponseDto | ErrorResponseDto> {
    try {
      const tenantId = tenantData.id;
      const proposalEntity = await this.getProposalUsecase.getProposal(
        Number(parameters.id),
        tenantId,
      );
      return proposalEntity;
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Get()
  async fetchProposal(
    @Query() filters: FetchProposalsDto,
    @RequestTentantData() tenantData: RequestTenantDataInterface,
  ): Promise<FetchProposalsResponseDto | ErrorResponseDto> {
    try {
      const tenantId = tenantData.id;
      const fetchProposalsList = await this.fetchProposalsUseCase.fetchProposal(
        filters,
        tenantId,
      );

      return ProposalMapper.fetchProposalToController(fetchProposalsList);
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Patch(':id')
  async updateProposal(
    @Param() parameters: GetProposalIdDto,
    @Body() body: UpdateProposalDto,
    @RequestTentantData() tenantData: RequestTenantDataInterface,
  ): Promise<UpdateProposalResponseDto | ErrorResponseDto> {
    try {
      const tenantId = tenantData.id;
      const updateProposal = await this.updateProposalUseCase.updateProposal(
        Number(parameters.id),
        body,
        tenantId,
      );

      return updateProposal;
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Delete(':id')
  async deleteProposal(
    @Param() parameters: GetProposalIdDto,
    @RequestTentantData() tenantData: RequestTenantDataInterface,
  ): Promise<DeleteProposalResponseDto | ErrorResponseDto> {
    try {
      const tenantId = tenantData.id;
      const deleteProposal = await this.deleteProposalUseCase.deleteProposal(
        Number(parameters.id),
        tenantId,
      );

      return ProposalMapper.deleteProposalToController(deleteProposal);
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Get('item-service/')
  async getItemServiceToProposal(): Promise<
    FetchItemServicesToProposalResponseDto | ErrorResponseDto
  > {
    try {
      const fetchItemsServices =
        await this.itemsServiceFetchUseCase.fetchItemService();

      return ItemServiceMapper.fetchItemServiceToController(fetchItemsServices);
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }
}
