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
  CreateClientDto,
  CreateClientResponseDto,
  FetchClientsDto,
  FetchClientsResponseDto,
  ClientIdDto,
  GetClientResponseDto,
  UpdateClientDto,
  UpdateClientResponseDto,
  DeleteClientResponseDto,
} from '@infra/http/dtos/client';
import {
  CreateClientUseCase,
  GetClientUseCase,
  FetchClienteUseCase,
  UpdateClientUseCase,
  DeleteClientUseCase,
} from '@application/use-cases/client';
import { ClientMapper } from '@infra/http/mappers/client.mapper';
import { Prisma } from '@prisma/client';

@Controller('/client')
export class ClientController {
  constructor(
    private createClientUseCase: CreateClientUseCase,
    private getClientUsecase: GetClientUseCase,
    private fetchClientsUseCase: FetchClienteUseCase,
    private updateClientUseCase: UpdateClientUseCase,
    private deleteClientUseCase: DeleteClientUseCase,
  ) {}

  @Post()
  async createClient(
    @Body() clientDto: CreateClientDto,
  ): Promise<CreateClientResponseDto> {
    let createClientResponse = new CreateClientResponseDto();

    try {
      const clientEntity = ClientMapper.createClientToDomain(clientDto);

      const createdClient = await this.createClientUseCase.createClient(
        clientEntity,
      );

      createClientResponse = createdClient;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Prisma.PrismaClientKnownRequestError(error.message, error);
      }
    }

    return createClientResponse;
  }

  @Get(':id')
  async getClient(
    @Param() parameters: ClientIdDto,
  ): Promise<GetClientResponseDto> {
    let getClientResponse = {} as GetClientResponseDto;
    try {
      const clientEntity = await this.getClientUsecase.getClient(
        Number(parameters.id),
      );

      if (clientEntity) {
        getClientResponse = ClientMapper.getClientToController(clientEntity);
      }
    } catch (error) {
      console.log('Error: ', error);
    }
    return getClientResponse;
  }

  @Get()
  async fetchClientByTenant(
    @Body() filters: FetchClientsDto,
  ): Promise<FetchClientsResponseDto> {
    let fetchCLientsResponse = new FetchClientsResponseDto();

    try {
      const fetchClientsList = await this.fetchClientsUseCase.fetchClient(
        filters,
      );

      fetchCLientsResponse =
        ClientMapper.fetchClientToController(fetchClientsList);
    } catch (error) {
      console.log(error);
    }

    return fetchCLientsResponse;
  }

  @Patch(':id')
  async updateClient(
    @Param() parameters: ClientIdDto,
    @Body() body: UpdateClientDto,
  ): Promise<UpdateClientResponseDto> {
    let updateClientResponse = new UpdateClientResponseDto();

    try {
      const updateClient = await this.updateClientUseCase.updateClient(
        Number(parameters.id),
        body,
      );

      updateClientResponse =
        ClientMapper.updateClientToController(updateClient);
    } catch (error) {
      console.log(error);
    }

    return updateClientResponse;
  }

  @Delete(':id')
  async deleteClient(
    @Param() parameters: ClientIdDto,
  ): Promise<DeleteClientResponseDto> {
    let deleteClientResponse = new DeleteClientResponseDto();
    try {
      const deleteClient = await this.deleteClientUseCase.deleteClient(
        Number(parameters.id),
      );

      deleteClientResponse =
        ClientMapper.deleteClientToController(deleteClient);
    } catch (error) {
      console.log(error);
    }

    return deleteClientResponse;
  }
}
