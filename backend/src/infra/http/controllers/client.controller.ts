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
import {
  RequestTenantDataInterface,
  RequestTentantData,
} from 'src/infra/guard/tenantData.decorator';

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
    @RequestTentantData() tenantData: RequestTenantDataInterface,
  ): Promise<CreateClientResponseDto | ErrorResponseDto> {
    try {
      const tenantId = tenantData.id;

      const clientEntity = ClientMapper.createClientToDomain(
        clientDto,
        tenantId,
      );

      const createdClient = await this.createClientUseCase.createClient({
        ...clientEntity,
        tenantId,
      });

      return createdClient;
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Get(':id')
  async getClient(
    @Param() parameters: ClientIdDto,
    @RequestTentantData() tenantData: RequestTenantDataInterface,
  ): Promise<GetClientResponseDto | ErrorResponseDto> {
    try {
      const tenantId = tenantData.id;

      const clientEntity = await this.getClientUsecase.getClient(
        Number(parameters.id),
        tenantId,
      );

      return clientEntity;
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Get()
  async fetchClient(
    @Query() filters: FetchClientsDto,
    @RequestTentantData() tenantData: RequestTenantDataInterface,
  ): Promise<FetchClientsResponseDto | ErrorResponseDto> {
    try {
      const tenantId = tenantData.id;
      const fetchClientsList = await this.fetchClientsUseCase.fetchClient(
        filters,
        tenantId,
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
    @RequestTentantData() tenantData: RequestTenantDataInterface,
  ): Promise<UpdateClientResponseDto | ErrorResponseDto> {
    try {
      const tenantId = tenantData.id;

      const updateClient = await this.updateClientUseCase.updateClient(
        Number(parameters.id),
        body,
        tenantId,
      );

      return updateClient;
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }

  @Delete(':id')
  async deleteClient(
    @Param() parameters: ClientIdDto,
    @RequestTentantData() tenantData: RequestTenantDataInterface,
  ): Promise<DeleteClientResponseDto | ErrorResponseDto> {
    try {
      const tenantId = tenantData.id;

      const deleteClient = await this.deleteClientUseCase.deleteClient(
        Number(parameters.id),
        tenantId,
      );

      return ClientMapper.deleteClientToController(deleteClient);
    } catch (error) {
      return new ErrorResponseDto(error);
    }
  }
}
