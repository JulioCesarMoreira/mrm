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
  CreateModelProposalDto,
  CreateModelProposalResponseDto,
  FetchModelProposalsDto,
  FetchModelProposalsResponseDto,
  GetModelProposalIdDto,
  GetModelProposalResponseDto,
  UpdateModelProposalDto,
  UpdateModelProposalResponseDto,
  DeleteModelProposalResponseDto,
} from '@infra/http/dtos/modelProposal';
import { ModelProposalMapper } from '@infra/http/mappers/modelProposal.mapper';
import {
  CreateModelProposalUseCase,
  GetModelProposalUseCase,
  FetchModelProposalUseCase,
  UpdateModelProposalUseCase,
  DeleteModelProposalUseCase,
} from '@application/use-cases/modelProposal';
import { ErrorResponseDto } from '@infra/http/dtos/error/error-response.dto';
import {
  RequestTenantDataInterface,
  RequestTentantData,
} from 'src/infra/guard/tenantData.decorator';

@Controller('/modelProposal')
export class ModelProposalController {
  constructor(
    private createModelProposalUseCase: CreateModelProposalUseCase,
    private getModelProposalUsecase: GetModelProposalUseCase,
    private fetchModelProposalsUseCase: FetchModelProposalUseCase,
    private updateModelProposalUseCase: UpdateModelProposalUseCase,
    private deleteModelProposalUseCase: DeleteModelProposalUseCase,
  ) {}

  @Post()
  async createModelProposal(
    @Body() modelProposalDto: CreateModelProposalDto,
    @RequestTentantData() tenantData: RequestTenantDataInterface,
  ): Promise<CreateModelProposalResponseDto | ErrorResponseDto> {
    try {
      const tenantId = tenantData.id;
      const createdModelProposal =
        await this.createModelProposalUseCase.createModelProposal({
          ...modelProposalDto,
          tenantId,
        });

      return createdModelProposal;
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Get(':id')
  async getModelProposal(
    @Param() parameters: GetModelProposalIdDto,
    @RequestTentantData() tenantData: RequestTenantDataInterface,
  ): Promise<GetModelProposalResponseDto | ErrorResponseDto> {
    try {
      const tenantId = tenantData.id;
      const modelProposalEntity =
        await this.getModelProposalUsecase.getModelProposal(
          Number(parameters.id),
          tenantId,
        );
      return modelProposalEntity;
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Get()
  async fetchModelProposal(
    @Query() filters: FetchModelProposalsDto,
    @RequestTentantData() tenantData: RequestTenantDataInterface,
  ): Promise<FetchModelProposalsResponseDto | ErrorResponseDto> {
    try {
      const tenantId = tenantData.id;
      const fetchModelProposalsList =
        await this.fetchModelProposalsUseCase.fetchModelProposal(
          filters,
          tenantId,
        );

      return ModelProposalMapper.fetchModelProposalToController(
        fetchModelProposalsList,
      );
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Patch(':id')
  async updateModelProposal(
    @Param() parameters: GetModelProposalIdDto,
    @Body() body: UpdateModelProposalDto,
    @RequestTentantData() tenantData: RequestTenantDataInterface,
  ): Promise<UpdateModelProposalResponseDto | ErrorResponseDto> {
    try {
      const tenantId = tenantData.id;
      const updateModelProposal =
        await this.updateModelProposalUseCase.updateModelProposal(
          Number(parameters.id),
          body,
          tenantId,
        );

      return updateModelProposal;
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Delete(':id')
  async deleteModelProposal(
    @Param() parameters: GetModelProposalIdDto,
    @RequestTentantData() tenantData: RequestTenantDataInterface,
  ): Promise<DeleteModelProposalResponseDto | ErrorResponseDto> {
    try {
      const tenantId = tenantData.id;
      const deleteModelProposal =
        await this.deleteModelProposalUseCase.deleteModelProposal(
          Number(parameters.id),
          tenantId,
        );

      return ModelProposalMapper.deleteModelProposalToController(
        deleteModelProposal,
      );
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }
}
