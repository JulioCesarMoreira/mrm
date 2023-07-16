import {
  CreateClientDto,
  FetchClientsResponseDto,
  GetClientResponseDto,
} from '@application/core/dtos/client';
import { Client } from '@application/core/entities';

export class ClientMapper {
  public static createClientMapper(createClientDto: CreateClientDto): Client {
    const client = new Client();

    client.contactName = createClientDto.contactName;
    client.contactPhone = createClientDto.contactPhone;
    client.cpfCnpj = createClientDto.cpfCnpj;
    client.name = createClientDto.name;
    client.tenantId = createClientDto.tenantId;

    return client;
  }

  public static getClientMapper(clientEntity: Client): GetClientResponseDto {
    const getClientResponseDto = new GetClientResponseDto();

    getClientResponseDto.client = {
      id: clientEntity.id,
      contactName: clientEntity.contactName,
      contactPhone: clientEntity.contactPhone,
      cpfCnpj: clientEntity.cpfCnpj,
      name: clientEntity.name,
      tenantId: clientEntity.tenantId,
    };

    return getClientResponseDto;
  }

  public static fetchClientMapper(
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
}
