import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import {
  CreateClientDto,
  CreateClientResponseDto,
  FetchClientsDto,
  FetchClientsResponseDto,
  ClientIdDto,
  GetClientResponseDto,
  UpdateClientDto,
  UpdateClientResponseDto,
} from '@application/core/dtos/client';
import {
  CreateClientUseCase,
  GetClientUseCase,
  FetchClienteUseCase,
  UpdateClientUseCase,
} from '@application/use-cases/client';
import { ClientMapper } from '../mappers/client.mapper';

@Controller('/client')
export class ClientController {
  constructor(
    private createClientUseCase: CreateClientUseCase,
    private getClientUsecase: GetClientUseCase,
    private fetchClientsUseCase: FetchClienteUseCase,
    private updateClientUseCase: UpdateClientUseCase,
  ) {}

  @Post()
  async createClient(
    @Body() clientDto: CreateClientDto,
  ): Promise<CreateClientResponseDto> {
    const createClientResponse = new CreateClientResponseDto();

    try {
      const clientEntity = ClientMapper.createClientToDomain(clientDto);

      const createdClient = await this.createClientUseCase.createClient(
        clientEntity,
      );

      createClientResponse.sucess = true;
      createClientResponse.createdClient = createdClient;
    } catch (error) {
      console.log(error);

      createClientResponse.sucess = false;
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

      getClientResponse = ClientMapper.getClientToController(clientEntity);
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

  @Put(':id')
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
}
