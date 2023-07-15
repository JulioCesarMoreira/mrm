import { CreateClientDto } from '@application/core/dtos/client';
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
}
