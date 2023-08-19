export class CreateClientDto {
  contactName?: string;

  contactPhone?: string;

  name: string;

  cpfCnpj: string;

  tenantId: string;
}

export class ClientIdDto {
  id: number;
}

export class FetchClientsDto {
  name?: string;

  contactName?: string;

  contactPhone?: string;

  tenantId?: string;
}

export class UpdateClientDto {
  name?: string;

  contactName?: string;

  contactPhone?: string;
}
