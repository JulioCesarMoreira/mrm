import {
  CreateClientDto,
  DeleteClientResponseDto,
  FetchClientsResponseDto,
  GetClientResponseDto,
  UpdateClientResponseDto,
} from '@infra/http/dtos/client';
import { Client } from '@application/core/entities';

export class ClientMapper {
  public static createClientToDomain(createClientDto: CreateClientDto): Client {
    const client = new Client();

    client.contactName = createClientDto.contactName;
    client.contactPhone = createClientDto.contactPhone;
    client.cpfCnpj = createClientDto.cpfCnpj;
    client.name = createClientDto.name;
    client.tenantId = createClientDto.tenantId;

    return client;
  }

  public static getClientToController(
    clientEntity: Client,
  ): GetClientResponseDto {
    let getClientResponseDto = new GetClientResponseDto();

    getClientResponseDto = {
      id: clientEntity.id,
      contactName: clientEntity.contactName,
      contactPhone: clientEntity.contactPhone,
      cpfCnpj: clientEntity.cpfCnpj,
      name: clientEntity.name,
      tenantId: clientEntity.tenantId,
    };

    return getClientResponseDto;
  }

  public static fetchClientToController(
    clientsEntity: Client[],
  ): FetchClientsResponseDto {
    const fetchClientsResponseDto = new FetchClientsResponseDto();
    fetchClientsResponseDto.clients = [];

    for (const clientEntity of clientsEntity) {
      fetchClientsResponseDto.clients.push({
        id: clientEntity.id,
        contactName: clientEntity.contactName,
        contactPhone: clientEntity.contactPhone,
        cpfCnpj: clientEntity.cpfCnpj,
        name: clientEntity.name,
        tenantId: clientEntity.tenantId,
      });
    }

    return fetchClientsResponseDto;
  }

  public static updateClientToController(
    updatedClient: Client,
  ): UpdateClientResponseDto {
    const updateClientResponseDto = new UpdateClientResponseDto();

    updateClientResponseDto.contactName = updatedClient.contactName;
    updateClientResponseDto.contactPhone = updatedClient.contactPhone;
    updateClientResponseDto.cpfCnpj = updatedClient.cpfCnpj;
    updateClientResponseDto.name = updatedClient.name;
    updateClientResponseDto.tenantId = updatedClient.tenantId;

    return updateClientResponseDto;
  }

  public static deleteClientToController(
    resultDelete: boolean,
  ): DeleteClientResponseDto {
    const deleteClientResponseDto = new DeleteClientResponseDto();

    deleteClientResponseDto.sucess = resultDelete;

    return deleteClientResponseDto;
  }
}
