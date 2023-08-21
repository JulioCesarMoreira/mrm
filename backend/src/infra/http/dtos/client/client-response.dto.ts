import { Client } from '@application/core/entities';

export class CreateClientResponseDto {
  id: number;

  contactName: string;

  contactPhone: string;

  cpfCnpj: string;

  name: string;

  tenantId: string;
}

export class GetClientResponseDto {
  id: number;

  contactName: string;

  contactPhone: string;

  cpfCnpj: string;

  name: string;

  tenantId: string;
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
