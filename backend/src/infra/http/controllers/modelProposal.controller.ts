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
  ): Promise<CreateModelProposalResponseDto | ErrorResponseDto> {
    try {
      const createdModelProposal =
        await this.createModelProposalUseCase.createModelProposal(
          modelProposalDto,
        );

      return createdModelProposal;
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Get(':id')
  async getModelProposal(
    @Param() parameters: GetModelProposalIdDto,
  ): Promise<GetModelProposalResponseDto | ErrorResponseDto> {
    try {
      const modelProposalEntity =
        await this.getModelProposalUsecase.getModelProposal(
          Number(parameters.id),
        );
      return modelProposalEntity;
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Get()
  async fetchModelProposal(
    @Query() filters: FetchModelProposalsDto,
  ): Promise<FetchModelProposalsResponseDto | ErrorResponseDto> {
    try {
      const fetchModelProposalsList =
        await this.fetchModelProposalsUseCase.fetchModelProposal(filters);

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
  ): Promise<UpdateModelProposalResponseDto | ErrorResponseDto> {
    try {
      const updateModelProposal =
        await this.updateModelProposalUseCase.updateModelProposal(
          Number(parameters.id),
          body,
        );

      return updateModelProposal;
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Delete(':id')
  async deleteModelProposal(
    @Param() parameters: GetModelProposalIdDto,
  ): Promise<DeleteModelProposalResponseDto | ErrorResponseDto> {
    try {
      const deleteModelProposal =
        await this.deleteModelProposalUseCase.deleteModelProposal(
          Number(parameters.id),
        );

      return ModelProposalMapper.deleteModelProposalToController(
        deleteModelProposal,
      );
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }
}
