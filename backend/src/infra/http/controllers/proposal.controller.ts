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

@Controller('/proposal')
export class ProposalController {
  constructor(
    private createProposalUseCase: CreateProposalUseCase,
    private getProposalUsecase: GetProposalUseCase,
    private fetchProposalsUseCase: FetchProposalUseCase,
    private updateProposalUseCase: UpdateProposalUseCase,
    private deleteProposalUseCase: DeleteProposalUseCase,
  ) {}

  @Post()
  async createProposal(
    @Body() proposalDto: CreateProposalDto,
  ): Promise<CreateProposalResponseDto | ErrorResponseDto> {
    try {
      const createdProposal = await this.createProposalUseCase.createProposal(
        proposalDto,
      );

      return createdProposal;
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Get(':id')
  async getProposal(
    @Param() parameters: GetProposalIdDto,
  ): Promise<GetProposalResponseDto | ErrorResponseDto> {
    try {
      const proposalEntity = await this.getProposalUsecase.getProposal(
        Number(parameters.id),
      );
      return proposalEntity;
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Get()
  async fetchProposal(
    @Query() filters: FetchProposalsDto,
  ): Promise<FetchProposalsResponseDto | ErrorResponseDto> {
    try {
      const fetchProposalsList = await this.fetchProposalsUseCase.fetchProposal(
        filters,
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
  ): Promise<UpdateProposalResponseDto | ErrorResponseDto> {
    try {
      const updateProposal = await this.updateProposalUseCase.updateProposal(
        Number(parameters.id),
        body,
      );

      return updateProposal;
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Delete(':id')
  async deleteProposal(
    @Param() parameters: GetProposalIdDto,
  ): Promise<DeleteProposalResponseDto | ErrorResponseDto> {
    try {
      const deleteProposal = await this.deleteProposalUseCase.deleteProposal(
        Number(parameters.id),
      );

      return ProposalMapper.deleteProposalToController(deleteProposal);
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }
}
