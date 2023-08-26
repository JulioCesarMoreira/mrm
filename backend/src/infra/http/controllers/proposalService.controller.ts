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
  FetchProposalServiceeUseCase,
  UpdateProposalServiceUseCase,
  DeleteProposalServiceUseCase,
} from '@application/use-cases/proposalService';
import { Prisma } from '@prisma/client';

@Controller('/proposalService')
export class ProposalServiceController {
  constructor(
    private createProposalServiceUseCase: CreateProposalServiceUseCase,
    private getProposalServiceUsecase: GetProposalServiceUseCase,
    private fetchProposalServicesUseCase: FetchProposalServiceeUseCase,
    private updateProposalServiceUseCase: UpdateProposalServiceUseCase,
    private deleteProposalServiceUseCase: DeleteProposalServiceUseCase,
  ) {}

  @Post()
  async createProposalService(
    @Body() proposalServiceDto: CreateProposalServiceDto,
  ): Promise<CreateProposalServiceResponseDto> {
    let createProposalServiceResponse = new CreateProposalServiceResponseDto();

    try {
      const createdProposalService =
        await this.createProposalServiceUseCase.createProposalService(
          proposalServiceDto,
        );

      createProposalServiceResponse = createdProposalService;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Prisma.PrismaClientKnownRequestError(error.message, error);
      }
    }

    return createProposalServiceResponse;
  }

  @Get(':id')
  async getProposalService(
    @Param() parameters: GetProposalServiceIdDto,
  ): Promise<GetProposalServiceResponseDto> {
    let getProposalServiceResponse = {} as GetProposalServiceResponseDto;

    try {
      const proposalServiceEntity =
        await this.getProposalServiceUsecase.getProposalService(
          Number(parameters.id),
        );
      getProposalServiceResponse = proposalServiceEntity;
    } catch (error) {
      console.log('Error: ', error);
    }
    return getProposalServiceResponse;
  }

  @Get()
  async fetchProposalServiceByTenant(
    @Body() filters: FetchProposalServicesDto,
  ): Promise<FetchProposalServicesResponseDto> {
    let fetchCLientsResponse = new FetchProposalServicesResponseDto();

    try {
      const fetchProposalServicesList =
        await this.fetchProposalServicesUseCase.fetchProposalService(filters);

      fetchCLientsResponse =
        ProposalServiceMapper.fetchProposalServiceToController(
          fetchProposalServicesList,
        );
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Prisma.PrismaClientKnownRequestError(error.message, error);
      }
    }

    return fetchCLientsResponse;
  }

  @Patch(':id')
  async updateProposalService(
    @Param() parameters: GetProposalServiceIdDto,
    @Body() body: UpdateProposalServiceDto,
  ): Promise<UpdateProposalServiceResponseDto> {
    let updateProposalServiceResponse = new UpdateProposalServiceResponseDto();

    try {
      const updateProposalService =
        await this.updateProposalServiceUseCase.updateProposalService(
          Number(parameters.id),
          body,
        );

      updateProposalServiceResponse = updateProposalService;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Prisma.PrismaClientKnownRequestError(error.message, error);
      }
    }

    return updateProposalServiceResponse;
  }

  @Delete(':id')
  async deleteProposalService(
    @Param() parameters: GetProposalServiceIdDto,
  ): Promise<DeleteProposalServiceResponseDto> {
    let deleteProposalServiceResponse = new DeleteProposalServiceResponseDto();
    try {
      const deleteProposalService =
        await this.deleteProposalServiceUseCase.deleteProposalService(
          Number(parameters.id),
        );

      deleteProposalServiceResponse =
        ProposalServiceMapper.deleteProposalServiceToController(
          deleteProposalService,
        );
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Prisma.PrismaClientKnownRequestError(error.message, error);
      }
    }

    return deleteProposalServiceResponse;
  }
}
