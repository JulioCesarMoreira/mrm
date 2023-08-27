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
import { ErrorResponseDto } from '@infra/http/dtos/error/error-response.dto';

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
  ): Promise<CreateClientResponseDto | ErrorResponseDto> {
    try {
      const clientEntity = ClientMapper.createClientToDomain(clientDto);

      const createdClient = await this.createClientUseCase.createClient(
        clientEntity,
      );

      return createdClient;
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Get(':id')
  async getClient(
    @Param() parameters: ClientIdDto,
  ): Promise<GetClientResponseDto | ErrorResponseDto> {
    try {
      const clientEntity = await this.getClientUsecase.getClient(
        Number(parameters.id),
      );

      return clientEntity;
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Get()
  async fetchClientByTenant(
    @Body() filters: FetchClientsDto,
  ): Promise<FetchClientsResponseDto | ErrorResponseDto> {
    try {
      const fetchClientsList = await this.fetchClientsUseCase.fetchClient(
        filters,
      );

      return ClientMapper.fetchClientToController(fetchClientsList);
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Patch(':id')
  async updateClient(
    @Param() parameters: ClientIdDto,
    @Body() body: UpdateClientDto,
  ): Promise<UpdateClientResponseDto | ErrorResponseDto> {
    try {
      const updateClient = await this.updateClientUseCase.updateClient(
        Number(parameters.id),
        body,
      );

      return updateClient;
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Delete(':id')
  async deleteClient(
    @Param() parameters: ClientIdDto,
  ): Promise<DeleteClientResponseDto | ErrorResponseDto> {
    try {
      const deleteClient = await this.deleteClientUseCase.deleteClient(
        Number(parameters.id),
      );

      return ClientMapper.deleteClientToController(deleteClient);
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }
}
