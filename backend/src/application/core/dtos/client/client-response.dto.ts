import { Client } from '@application/core/entities';

export class CreateClientResponseDto {
  sucess: boolean;

  createdClient: Client;
}

export class GetClientResponseDto {
  client: {
    id: number;

    contactName: string;

    contactPhone: string;

    cpfCnpj: string;

    name: string;

    tenantId: string;
  };
}

export class FetchClientsResponseDto {
  clients: {
    id: number;

    contactName: string;

    contactPhone: string;

    cpfCnpj: string;

    name: string;

    tenantId: string;
  }[];
}

export class DeleteClientResponseDto {
  sucess: boolean;
}

export class UpdateClientResponseDto extends Client {}
