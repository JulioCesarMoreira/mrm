import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  CreateProposalServiceDto,
  CreateProposalServiceResponseDto,
  FetchProposalServicesDto,
  FetchProposalServicesResponseDto,
  GetProposalServiceIdDto,
  GetProposalServiceResponseDto,
  UpdateProposalServiceDto,
  UpdateProposalServiceResponseDto,
  DeleteProposalServiceResponseDto,
} from '@infra/http/dtos/proposalService';
import { ProposalServiceMapper } from '@infra/http/mappers/proposalService.mapper';
import {
  CreateProposalServiceUseCase,
  GetProposalServiceUseCase,
  FetchProposalServiceUseCase,
  UpdateProposalServiceUseCase,
  DeleteProposalServiceUseCase,
} from '@application/use-cases/proposalService';
import { ErrorResponseDto } from '@infra/http/dtos/error/error-response.dto';

@Controller('/proposalService')
export class ProposalServiceController {
  constructor(
    private createProposalServiceUseCase: CreateProposalServiceUseCase,
    private getProposalServiceUsecase: GetProposalServiceUseCase,
    private fetchProposalServicesUseCase: FetchProposalServiceUseCase,
    private updateProposalServiceUseCase: UpdateProposalServiceUseCase,
    private deleteProposalServiceUseCase: DeleteProposalServiceUseCase,
  ) {}

  @Post()
  async createProposalService(
    @Body() proposalServiceDto: CreateProposalServiceDto,
  ): Promise<
    CreateProposalServiceResponseDto | ErrorResponseDto | ErrorResponseDto
  > {
    try {
      const createdProposalService =
        await this.createProposalServiceUseCase.createProposalService(
          proposalServiceDto,
        );

      return createdProposalService;
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Get(':id')
  async getProposalService(
    @Param() parameters: GetProposalServiceIdDto,
  ): Promise<
    GetProposalServiceResponseDto | ErrorResponseDto | ErrorResponseDto
  > {
    try {
      const proposalServiceEntity =
        await this.getProposalServiceUsecase.getProposalService(
          Number(parameters.id),
        );
      return proposalServiceEntity;
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Get()
  async fetchProposalServiceByTenant(
    @Body() filters: FetchProposalServicesDto,
  ): Promise<
    FetchProposalServicesResponseDto | ErrorResponseDto | ErrorResponseDto
  > {
    try {
      const fetchProposalServicesList =
        await this.fetchProposalServicesUseCase.fetchProposalService(filters);

      return ProposalServiceMapper.fetchProposalServiceToController(
        fetchProposalServicesList,
      );
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Patch(':id')
  async updateProposalService(
    @Param() parameters: GetProposalServiceIdDto,
    @Body() body: UpdateProposalServiceDto,
  ): Promise<
    UpdateProposalServiceResponseDto | ErrorResponseDto | ErrorResponseDto
  > {
    try {
      const updateProposalService =
        await this.updateProposalServiceUseCase.updateProposalService(
          Number(parameters.id),
          body,
        );

      return updateProposalService;
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Delete(':id')
  async deleteProposalService(
    @Param() parameters: GetProposalServiceIdDto,
  ): Promise<DeleteProposalServiceResponseDto | ErrorResponseDto> {
    try {
      const deleteProposalService =
        await this.deleteProposalServiceUseCase.deleteProposalService(
          Number(parameters.id),
        );

      return ProposalServiceMapper.deleteProposalServiceToController(
        deleteProposalService,
      );
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }
}
